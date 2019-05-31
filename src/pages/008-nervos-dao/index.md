---
title: A Gentle Intro To The NervosDAO
date: '2019-05-30'
spoiler: People new to the Nervos CKB blockchain may wonder why there is something called NervosDAO. In this episode we will be focusing on why the NervosDAO is created and how it works as an indispensable part of CKB.
plink: 'https://img.haoqicat.com/2019052401.jpg'
video: 'https://youtu.be/ZumXJa74mek'
---

People new to the Nervos CKB blockchain may wonder why there is something called NervosDAO. In this episode we will be focusing on why is the NervosDAO created and how it works as an indispensable part of CKB.

## State Rent

To understand what is the NervosDAO, we will need to understand why and how Nervos CKB collects state rent.

Bitcoin brought mankind decentralized immutable data, which inspired people. Many people wanted to use Bitcoin as a smart contract platform, but later found out it was hard to do so because Bitcoin is not designed as a data preservation focused blockchain. On Bitcoin blockchain, neither the size nor the growth rate of the global state can be bounded in a controlled way. When I save data on Bitcoin blockchain, I pay once with transaction fee, but miners and full nodes have to bear the cost of storage over time. In other word, Bitcoin holds the "pay once, occupy forever" state storage model. There is no way to charge users for their use of the blockchain based on both space and time, and this will easily result in the abuse of the storage space. That's where the Nervos' state rent idea comes in.

However, it's challenging to collect state rent to the state users,  which are usually decentralized communities, because it's difficult to coordinate all the users to pay for state rent in a fair and efficient way. That's why Nervos CKB takes a different approach called secondary issuance. We will talk about secondary issuance in detail later in this episode. But the basic idea is simple, unlike Bitcoin which had a hard capped token supply,  Nervos CKB 's native token, also called CKB, will be inflated over time. As a smart contract developer you will need to hold certain amount of CKB token in order to occupy the blockchain space to preserve your state. The rent will be charged in the form of inflation tax, in other words, you pay the rent bearing the inflation of your tokens.

That's how it works.

## Why NervosDAO?

Now it's time to introduce the NervosDAO, what is it and what benefits it brings.

The NervosDAO is a smart contract built on CKB blockchain, and it works like a bank, CKB token holders can deposit their token in it, and get interest in return.

But for long term CKB token holders, as long as they lock their tokens in the NervosDAO, that means never occupy the space on blockchain, the inflationary effect of secondary issuance is only nominal. For token holders it's as if the secondary issuance doesn't exist, and they're holding hard-capped tokens like Bitcoin.

To put it shortly, the NervosDAO is there to make CKB token a good Store of Value medium.

## How NervosDAO Works?

You can stop here if you don't want to know the details of the NervosDAO. But if you want to more precise, let's go on with the details of how token issuance and the NervosDAO works.

The number of base issuance halves approximately every 4 years until all the base issuance tokens are mined out, that's exactly like Bitcoin. The secondary issuance is designed to collect state rent, and has issuance amount that is constant over time. After base issuance stops, there will only be secondary issuance.

The Nervos CKB uses a two-step approach as an inflation scheme to collect this rent. On top of the base issuance, we add the secondary issuance which can be seen as "inflation tax" to all existing token holders. For users who use their CKB token to store state, this recurring inflation tax is how they pay state rent to the miners. However, we would have also collected rent from the CKB token that are not used to store state, and we need to return to them what we collected. We allow those users to deposit their CKB tokens into NervosDAO. The NervosDAO receives part of the secondary issuance to make up for the otherwise unfair dilution.

Let me give you an example. Let's suppose at the time of a secondary issuance event, 60% of all CKB tokens are used to store state, 35% of all CKB tokens are deposited in the NervosDAO, and 5% are kept liquid. Then 60% of the secondary issuance goes to the miners, 35% of the issuance goes to the NervosDAO to be distributed to the locked tokens proportionally. The use of the rest of the secondary issuance - in this example, 5% of the that issuance is burned.

For more information, check the Nervos CKB economics paper https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0015-ckb-cryptoeconomics/0015-ckb-cryptoeconomics.md .

## Conclusion

Alright, that's almost it for the episode, we talked about what is NervosDAO and how it works. The Nervos CKB design allows the system to collect state rent with inflation tax and meanwhile keep the CKB tokens works like a hard capped money for long time coin hodlers.

That's all for this, I am Peter, see you in next episode.
