---
title: Nervos CKB Mining Tutorial
date: '2019-05-23'
spoiler: Nervos CKB , that is the layer1 blockchain for Nervos network, testnet launched on May 18th. In this episode I will take you though the process of running a CKB node and mining CKB blocks to get reward. We will be using MacOS as the operating system, CKB Javascript SDK to generate wallet, and the blockchain's explorer to view results.
plink: 'https://img.haoqicat.com/2019052401.jpg'
video: 'https://youtu.be/ZumXJa74mek'
---

Nervos CKB , that is the layer1 blockchain for Nervos network, testnet launched on May 18th. In this episode I will take you through the process of running a CKB node and mining CKB blocks to get reward. We will be using MacOS as the operating system, CKB Javascript SDK to generate wallet, and the blockchain's explorer to view results.

## How Things Fit Together

Before getting hands dirty, let's first look at the big picture to see how things fit together. 

In order to mine CKB, you need to run your own node first, but what is a node? The answer is simple

> A node is a computer with CKB client installed.

I will show you how to download the client software and install it soon enough.

And what is CKB testnet? CKB is a blockchain, a peer to peer network, which means there is no server, so the testnet is nothing but all the CKB nodes together, the nodes talk to each other, and reach consensus on data to make the whole chain trust worthy. Testnet is different from mainnet in that it is here for testing things.

![](https://img.haoqicat.com/2019052402.jpg)

A SDK is a piece of code that help you interact with CKB network. In this episode, Javascript version of the SDK will be used, so in order to follow along, You might need to have basic understanding of how Javascript and Nodejs works. But there are SDKs for other languages too, check the official doc site https://docs.nervos.org for more on that. 

The process goes like this. I will first show you how to setup a node, then using the SDK to generate a wallet of your own, now change the node config to use your own wallet, so that the mining reward will be saved to the wallet. Then I will start to mine the block, and mining means to use my laptop's computing power to find a hash that match the network's requirement, once I find the hash, that means I find the seal for the block, I can publish the block to the network and get certain amount of CKB coins as the reward. And finally, I will show you how to use CKB blockchain explorer to check your rewards.

![](https://img.haoqicat.com/2019052403.jpg)


Finally be warned. The testnet will be reset every two weeks, so any coins you have on the testnet will be cleared upon the reset.

## Run a node

OK, let's setup a node. 

Firstly, download the binary from official Github repo

```
wget https://github.com/nervosnetwork/ckb/releases/download/v0.12.0/ckb_v0.12.0_darwin_amd64.zip
```

Uncompress the zip file

```
unzip ckb_v0.12.0_darwin_amd64.zip
cd ckb_v0.12.0_darwin_amd64
```

Run this command to make `ckb` a system command. It's a typical unix trick to create a symlink, but it's OK for you not to understand what a symlink is for now.

```
sudo ln -snf "$(pwd)/ckb" /usr/local/bin/ckb
```

Then check if it works by running:

```
ckb --version
```

Now that CKB client is installed, I can generate the default configuration files for the testnet with

```
ckb init -C ckb-testnet --spec testnet
```

We created a folder named ckb-testnet, and generated config files in it.

Go inside the folder and start CKB software

```
cd ckb-testnet
ckb run
```

In the console output we see that my node is downloading the whole blockchain from other nodes, this will take sometime. You can go to https://explorer.nervos.org/ to know the latest block height, so that you will get a sense of how long the downloading will take.

Once the downloading finished, we have our node up and running, awesome~~~

## Use Your Own Wallet

Now I need to generate my own wallet and replace the default configuration for the local node, so that the mining reward goes to my own wallet.

Firstly, create a simple Nodejs project. Be aware that this project is not part of the CKB node, and it's only used to generate a wallet for us. 

```
$ node --version
v10.10.0
```

The code will use some new JS features like async/await, so make sure your Nodejs version is not too old, mine is 10.10, please use a same or greater version.

```
mkdir gen-wallet
cd gen-wallet
npm init -y
```

Create a folder to save the node project, run `node init` to generate a package.json file.

```
yarn add @nervosnetwork/ckb-sdk-core
```

And install the JS SDK as a npm package.

Now create a file named index.js with demo code from the JS SDK official repo https://github.com/nervosnetwork/ckb-sdk-js .

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

To generate a new wallet， run

```
$ node index.js

privateKey:  0x25395da41ffb99c007ef1e0e2621381577faeeeec486d0943894bba0edacbaeb
address:  ckt1q9gry5zgckljj20cxh4k33ufu3q2kxxx2jv0cmk4ykgkhc


script:  { codeHash:
   '0x9e3b3557f11b2b3532ce352bfe8017e9fd11d154c4c7f9b7aaaa1e621b539a08',
  args: [ '0xc5bf2929f835eb68c789e440ab18c65498fc6ed5' ] }
```

The first two lines of output is the wallet, which is nothing more than a private and public key pair. The later script part is another form for your wallet's public key, which you can use to replace the node's default config in ckb.toml

```
[block_assembler]
  code_hash = "0x9e3b3557f11b2b3532ce352bfe8017e9fd11d154c4c7f9b7aaaa1e621b539a08"
  args = ["0xc5bf2929f835eb68c789e440ab18c65498fc6ed5"]
```

Now Ctrl-C to stop the ckb process, restart again to load the modified config.

To start mining, we need to open a new terminal and run

```
ckb miner
```

Wait for a few minutes, until you see something like this in the console output

```
2019-05-22 22:04:56.210 +08:00 main INFO miner  found seal: Seal { nonce: 12598543649063525489, proof: 0xf9030000ab350000ad3a0000ab4000007f4600001e4b00005d5200003e5b0000625d00003d6200001e6f000069780000 }
```

This means I've found a seal for a block, and mined a block successfully.

So we can go to https://explorer.nervos.org , search our wallet by its address and check to see the reward.

## Conclusion

Alright, that is all for this episode, I showed you how to setup a CKB node and mine blocks. Hope you enjoyed it, see you next time.
