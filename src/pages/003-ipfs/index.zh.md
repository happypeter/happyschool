---
title: 理解 IPFS 星际文件系统
date: '2019-04-25'
spoiler: 一个更加中立自由，更加去中心化的互联网是加密经济的基础设施保证。而去中心化存储又是一个更加自由的互联网的基础。所以就不奇怪为何 Filecoin + IFPS 这套组合在2017年获得了如此高的共识度。这期来聊聊 Filecoin 和 IPFS 。
video: 'https://www.bilibili.com/video/av50444622/'
plink: 'https://img.haoqicat.com/2019042507.jpg'
---


一个更加中立自由，更加去中心化的互联网是加密经济的基础设施保证。而去中心化存储又是一个更加自由的互联网的基础。所以就不奇怪为何 Filecoin + IFPS 这套组合在2017年获得了如此高的共识度，获得了来自 Y Combinator, Naval Ravikant, Andreessen Horowitz, Union Square Ventures Sequoia and Winklevoss Capital ，这些互联网和比特币圈子的顶级投资机构的2.5亿美金的融资。这期来聊聊 Filecoin 和 IPFS 。

![](https://img.haoqicat.com/2019042501.jpg)


## 从按位置查找到按内容查找

The InterPlanetary File System (IPFS) 是 Protocol Labs 发起的一个全新的存储互联网数据的协议。IPFS 跟当前互联网（ Web ）的 HTTP 协议查找数据的方式有非常明显的区别。


当前的互联网基于的是从域名到 IP 再到服务器的获取数据方式。简单的一个取数据过程就会遇到两个会发生单点失效的中心，一个是 DNS 服务，另外一个是具体的服务器，域名被污染，服务器被勒令关停，直接数据就获取不到了，互联网的自由何在？我想对于这些痛点做互联网开发的人都会有体会。

![](https://img.haoqicat.com/2019042502.jpg)


而 IPFS 给出的思路不是 where it is （去哪里找）而是 what it is （要找的是什么）。只要给定内容的 Hash https://zhuanlan.zhihu.com/p/45811215 ，就可以把数据拿到，Hash 是数据内容的指纹，按照 Hash 去查找数据，就是所谓的按照内容查找和按照 What it is 去查找。这种方式带来两个明显的好处：首先，如果我请求一个文件，但是文件的被恶意篡改过了，这样我拿到文件后，运算一下哈希，发现哈希跟文件名是不相同的，就可以判定文件是不可信的。其次，既然是按照哈希存储，那么相同内容的文件，文件名也必然相同，所以就可以合理的删除一些同名文件，保证了互联网存储资源的充分利用。

简单来说，IPFS 查找内容的新方式是基于 Hash 去查找，或者是基于内容区去查找。

## 从单台服务器存储到去中心化存储

IPFS 和当前 Web 的存储数据的方式也非常不同。

传统互联网的内容都是存放到单台服务器上。这样的弊端是非常明显：首先，所有用户都去同一台服务器上，会造成拥堵。其次，这种架构也会非常容易遭受 DDOS 攻击，也就是有人恶意的向这台服务器发起频繁请求造成拥堵。

![](https://img.haoqicat.com/2019042503.jpg)

而 IPFS 采用了去中心化的存放方式。数据是存放到每个使用 IPFS 的客户机上的，他人的客户机就是我的服务器。当我存放一个文件的时候，文件会被切分成很多个小数据块，每个小块叫做一个 IPFS Object ，每个 IPFS Object 可以存储256k 的数据。所有的小块组成一个 [Merkle Tree](./merkle) ，分别存储到不同的机器上，这就是为何 IFPS 有个外号叫 The Merkle Web 了。

![](https://img.haoqicat.com/2019042504.jpg)

另外，使用 IPFS 存储数据的时候，数据是进行了版本控制的。因为 IPFS 存储数据的形式跟 Git 非常类似的。Git 本质上也是一个按内容寻址的文件系统。IPFS 网络数据是 immutable 的，也就是不可篡改的，这个特点和 Git 以及区块链都是一致的。如果我更改了我自己原来的一个文件，那么这个更新文件就会以新版本的形式存在，原来的老版本保持不被修改。底层新老版本之间的关系跟 Git 存储方式很类似，也是通过 commit 来更新文件版本的，所以两个文件的相同部分的不会重复存储操作硬盘浪费。

总之，IPFS 采用了基于 Merkle Tree 的去中心化存储的思路。

## Filecoin

IPFS 本身没有解决一个重要的问题，那就是他人为何要贡献出自己的资源来为我存储数据。于是受到比特币和以太坊的启发， Protocol Labs 研发了 Filecoin ，从此帮助他人存放数据便可以获得代币奖励了。

存储即挖矿。Filecoin 的作者们看到，比特币矿场是多么的巨大。如果有了 Filecoin ，应该同样会有人投资硬件和电力用来运行文件存储服务器，帮助大家存放文件的。当然，普通人的普通机器在安装了 IPFS 软件之后也一样可以来进行 Filecoin 的挖矿，在 Filecoin 这里，存储即挖矿。如果我需要他人帮我存储数据，我就可以花费 Filecoin 雇佣他人来帮我存储。



持有 Filecoin 的人就是 IPFS 的股东了。Filecoin 不仅仅具有维持系统运行的实用性，同时也具有证券性。越早期加入 IPFS 体系的人，就可以通过越低的价格去挖矿或者直接购买得到 Filecoin 。这样，随着 IPFS 整个网络增大，而 Filecoin 的发行总量有限，这样 Filecoin 就有升值的潜力。所以 Filecoin 的这个特性也有可能刺激整个网络很快进入爆发式增长。

同时 Filecoin 通过自己的算法设计，可以去激励相对良性的社区行为。例如，鼓励大家把一份数据做适当的多个拷贝，这样在部分服务器不在线的时候，数据依然可以被访问到。

总之，Filecoin 提供的激励可以让 IFPS 尽快落地。

## 总结

IFPS 的目标是替代当前互联网的以 HTTP 为核心的架构。总结本期内容，重点有这么几个： 首先，IPFS 采用的是根据内容查找，而不是传统的根据位置查找。其次，IPFS 存储是基于 Merkle Tree 的去中心化存储方式。第三，Filecoin 为 IPFS 提供了激励层，可以让 IPFS 迅速落地。最后要补充的是，IFPS 要真正成为构建新一代互联的基础，就需要全面的考虑如何实现当前 Web2.0 已有的各项功能，例如如何实现友好的 url ，如何实现认证保护隐私等，针对这些需求，IPFS 实现了 IPNS ，用来取代 DNS ，实现去中心化的域名服务，并且用密码学的方式来实现隐私保护。



参考：

- https://medium.com/bitfwd/what-is-decentralised-storage-ipfs-filecoin-sia-storj-swarm-5509e476995f
- https://en.wikipedia.org/wiki/InterPlanetary_File_System
- https://filecoin.io/
- https://ipfs.io/
- https://www.youtube.com/watch?v=5Uj6uR3fp-U IPFS - Simply Explained
