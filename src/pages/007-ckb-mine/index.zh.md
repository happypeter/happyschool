---
title: Nervos CKB 挖矿教程
date: '2019-05-23'
spoiler: Nervos CKB 是 Nervos 的第一层，是一条无需许可的公链，CKB 的测试网刚刚5月18号上线了。所以本期的快乐加密学院，咱们一起看看如何运行一个 CKB 的节点，然后进行挖矿获得奖励。操作会基于 MacOS 和官方提供的 Javascript 的 SDK 来进行，然后通过 CKB 的区块链浏览器来查看最终结果。
video: 'https://www.bilibili.com/video/av53403812/'
plink: 'https://happypeter.github.io/images/2019052401.jpg'
---

Nervos CKB 是 Nervos 的第一层，是一条无需许可的公链，CKB 的测试网刚刚5月18号上线了。所以本期的快乐加密学院，咱们一起看看如何运行一个 CKB 的节点，然后进行挖矿获得奖励。操作会基于 MacOS 和官方提供的 Javascript 的 SDK 来进行，然后通过 CKB 的区块链浏览器来查看最终结果。

## 基本原理介绍

动手之前，先对各个组件和概念进行一下介绍。

挖 CKB 之前，我得先有一个自己的 CKB 节点，那么什么叫一个节点，也就是 node 呢？答案其实很简单

> 节点就是一个安装了 CKB 客户端的计算机

稍后我会给大家演示怎么下载客户端并进行安装的。

另外，什么是 CKB 的测试网呢？CKB 是一个区块链项目，所以基本结构是点对点的，这就意味着整个网络上没有服务器，所有的节点就组成了整个网络，各个节点间通过平等通信来达成对数据的共识，这样保证了整条区块链是可以被信赖的。测试网是区别于主网来说的，主要是用于测试目的。

![](https://happypeter.github.io/images/2019052402.jpg)

SDK 是一些方便我们跟 CKB 网络进行交互的代码。本期咱们会使用 Javascript 版本的 SDK 。所以最好你对 Nodejs 和 Javascript 要有基本的了解。如果你平常喜欢用其他语言开发的话，官方的文档网站上 https://docs.nervos.org 有其他语言的 SDK 的介绍。

整个的过程是这样的。首先要搭建一个节点，然后使用 SDK 来生成自己的钱包，修改节点配置使用自己的钱包，这样挖矿奖励才能到自己手里。然后就开始挖矿过程，也就是用我的笔记本的算力去运算一个满足网络要求的哈希值，运算成功之后就相当于找到了当前 block 的 Seal 也就是封印。有了封印就成功制作了这个区块，也就可以把这个区块广播到全网获得挖矿奖励了。最后，可以到测试网的区块浏览器上去查看一下最终的结果，例如看看是不是地址上真正有了币。

![](https://happypeter.github.io/images/2019052403.jpg)

最后要提醒的是，测试网每两周就会重置一次，到时候所有的币也就都清空了。

## 运行一个节点

下面来搭建一下节点。

首先，从官方的 Github 仓库，下载二进制包

```
wget https://github.com/nervosnetwork/ckb/releases/download/v0.12.0/ckb_v0.12.0_darwin_amd64.zip
```

解压缩

```
unzip ckb_v0.12.0_darwin_amd64.zip
cd ckb_v0.12.0_darwin_amd64
```

接下来把 ckb 变成一个系统命令。我们这里做的就是一个常见的 Unix 操作，创建了一个符号链接，不过如果你不理解什么是符号链接也没关系的，不影响后续的操作。

```
sudo ln -snf "$(pwd)/ckb" /usr/local/bin/ckb
```

到底这个命令是不是生效了呢？

```
ckb --version
```

可以看到输出的版本号即可。

这样 CKB 客户端安装就成功了。接下来可以运行命令来生成测试网的配置文件。

```
ckb init -C ckb-testnet --spec testnet
```

创建一个文件夹叫 `ckb-testnet` ，里面保存了配置文件。

进入这个文件夹，启动 CKB 。

```
cd ckb-testnet
ckb run
```

终端输出中可以看到正在从其他节点下载整条区块链，过程的确是需要一些时间的。区块链浏览器的首页 https://explorer.nervos.org/ 上可以看到最新的块高度，这样我们可以大概感觉出下载整条链需要多久。

下载完毕之后，我们的节点就运行起来了，可以庆祝一下了。

## 使用自己的钱包

现在需要来生成自己的钱包，替换掉节点配置中默认的钱包，这样挖矿奖励才能到我们自己手里。

首先要创建一个 Nodejs 的项目。注意，这个项目不是节点的一部分，我们只是用它来生成一下钱包。

```
$ node --version
v10.10.0
```

代码里面会用到 async/await 这样的比较新的 Javascript 的功能，所以要确保 Nodejs 版本不能太老。我本地是10.10.0，你那边保证不低于这个版本就好了。

```
mkdir gen-wallet
cd gen-wallet
npm init -y
```

创建文件夹来存放这个项目，运行 `node init` 来创建 package.json 文件。

```
yarn add @nervosnetwork/ckb-sdk-core
```

SDK 可以作为一个 npm 包来安装。

下面创建一下 index.js 文件，里面的代码是从 SDK 仓库 https://github.com/nervosnetwork/ckb-sdk-js 的 demo 里面摘出来的。

```js
const EC = require('elliptic').ec
const Core = require('@nervosnetwork/ckb-sdk-core').default
const Address = require('@nervosnetwork/ckb-sdk-address').default

const ec = new EC('secp256k1')

const privateKey = ec.genKeyPair()

const address = new Address(privateKey, { prefix: 'ckt' })

console.log('privateKey: ', '0x' + address.getPrivateKey())
console.log('address: ', address.value)


const nodeUrl = process.env.NODE_URL || 'http://localhost:8114'

const core = new Core(nodeUrl)
const bootstrap = async () => {
  const systemCellInfo = await core.loadSystemCell()


  const SYSTEM_ENCRYPTION_CODE_HASH = core.rpc.paramsFormatter.toHash(
    systemCellInfo.codeHash
  )

  const myAddressObj = core.generateAddress(privateKey)

  const blake160edPublicKey = core.utils.blake160(myAddressObj.publicKey, 'hex')


  const script = {
    codeHash: SYSTEM_ENCRYPTION_CODE_HASH,
    args: ['0x' + blake160edPublicKey]
  }

  console.log('\nscript: ', script)
}

bootstrap()
```

要生成新的钱包，运行

```
$ node index.js

privateKey:  0x25395da41ffb99c007ef1e0e2621381577faeeeec486d0943894bba0edacbaeb
address:  ckt1q9gry5zgckljj20cxh4k33ufu3q2kxxx2jv0cmk4ykgkhc


script:  { codeHash:
   '0x9e3b3557f11b2b3532ce352bfe8017e9fd11d154c4c7f9b7aaaa1e621b539a08',
  args: [ '0xc5bf2929f835eb68c789e440ab18c65498fc6ed5' ] }
```

输出中的前两项就是钱包了，钱包就是一个公钥加一个私钥。下面的 script 这一项是钱包的另外一种形式，当前其中是不包含私钥的。可以用这些内容区替换 ckb.toml 中的对应内容。

Ctrl-C 停下 ckb 进程，然后重启一下，就可以加载新的配置了。

要进行挖矿，还要新开一个终端窗口，运行

```
ckb miner
```

这样就开始了挖矿。注意这里的输出，一般几分钟之后，就可以看到弹出了这样的信息

```
2019-05-22 22:04:56.210 +08:00 main INFO miner  found seal: Seal { nonce: 12598543649063525489, proof: 0xf9030000ab350000ad3a0000ab4000007f4600001e4b00005d5200003e5b0000625d00003d6200001e6f000069780000 }
```

这就意味着找到 Seal 了，也就是找到了一个区块的封印了，这就意味着成功挖出了一个区块。

可以到区块链浏览器 https://explorer.nervos.org 中，搜索一下我的钱包地址，这样就可以看到是否收到奖励了。

## 结论

好，这就是本期的主体内容。咱们一起搭建了一个 CKB 的节点，然后挖出了区块。希望你能喜欢这个视频，我是 Peter ，咱们下次再见。
