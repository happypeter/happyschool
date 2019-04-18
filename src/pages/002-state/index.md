---
title: Blockchain State Explosion
date: '2019-04-18'
spoiler: What is Blockchain State Explosion, and why is that a problem? Is all data on a blockchain state? What’s the current situation of Bitcoin and other chains, why we need to solve this before we can move on? 
plink: 'https://img.haoqicat.com/2019041801.jpg'
video: 'https://www.youtube.com/watch?v=qdoq5i8Ppus'
---

[](/yes/)
What is Blockchain State Explosion, and why is that a problem? Is all data on a blockchain state? What’s the current situation of Bitcoin and other chains, why we need to solve this before we can move on? With these questions, let’s start this week’s episode.

A few months ago, I read a post https://talk.nervos.org/t/topic/1515 by @janx, CTO at Nervos Network, which helped me a lot to understand what Blockchain State Explosion is. Before that I was always considering state explosion simply means the blockchain gets too big in size, but now I know I was wrong. However the post is a bit long and takes some time to digest for people don’t know blockchain technology well. So I decide to tell the story again with a bit explanation and leaving some tech details alone. Hopefully my version can be much easier to understand.

## What is State?
We know that over time blockchains save data to every each block, we somehow knows that the data, once saved, is not mutable any more. But Is all the data on Blockchain state? Can blockchain state ever be changed?

![](https://img.haoqicat.com/2019041802.jpg)

First question, is all data state? The short answer is NO. let’s say we have an ordinary programing running. there is a variable x, current value is 1. Then 1 is the state of the program, later x is changed to 2, now 1 becomes history, 2 becomes the state of the program. State means not only data but also data in use. 

Likewise, data saved on blockchain can be divided into two categories：

- State — the current data in use.
- History — data besides state, or we can simply call it ‘past data’

Now the answer for the first question, is all data state? No, there is history too.

![](https://img.haoqicat.com/2019041803.jpg)

The second question is actually interesting. Can state be changed? Surely Yes. Take Bitcoin for example, the state is who owns how much, with new transactions happening constantly, the state changes accordingly. When we say blockchain is IMMUTABLE, we mean the history, not the state.

Now we know what state means.

## What is Blockchain State Explosion?
Next part, let’s figure out what is blockchain state explosion. State explosion means the state size grows too fast and is out of control.


![](https://img.haoqicat.com/2019041804.jpg)


Bitcoin currently does not have this problem, cause the Bitcoin state size only grows linearly. Bitcoin is a ledger, the state of Bitcoin is what the ledger looks like or what everyone’s balance is right now. Within every Bitcoin block, there are transactions, the history consists of all these transactions. The state is all these UTXO, that is Unspent Transaction Output. The size of Bitcoin’s entire history (the size of all blocks combined) is about 200G, and the size of state is only ~3G (consisting of ~50 million UTXO components). With the constraint of fixed block size, the state growth is linear. That is not too much for the network to handle, giving the fact that the price of hardware and bandwidth will going down slowly.



But smart contract platforms like Ethereum are more vulnerable to the explosion. People need to store all kinds of data on the chain. Once the blockchain get mass adoption the state growth rate will exponentially outpaced the hardware capability growth. Nervos tries to solve this with its layered architecture, the details are out of the scope of this episode.

So Blockchain State Explosion is becoming a problem.

## Why Is It a Problem?

So why is the explosion a problem?

![](https://img.haoqicat.com/2019041805.jpg)

Firstly. Once the blockchain grows too big in size, nodes on the network will have to spend more money for storage hardware, that harms decentralization cause normal people will not be able to afford running a node.

![](https://img.haoqicat.com/2019041806.jpg)

Secondly. History is ignorable, state is not. Nodes sometimes only need to store state to function properly. History can be saved elsewhere and verified by introducing some techniques like checkpoints and zero-knowledge proof when necessary, but if the state explodes, all nodes will have to bear it, because state is indispensable to keep things going.

That’s why state explosion is a problem for blockchains.

## Conclusion
To conclusion this episode. I hope I have made two points really clear. NO.1 Blockchain data can be categorized into two types: history and state. NO.2 Blockchain State Explosion has to be solved before blockchain mass adoption.

ref:

- https://talk.nervos.org/t/blockchain-and-state-explosion/1566
- https://talk.nervos.org/t/topic/1515
