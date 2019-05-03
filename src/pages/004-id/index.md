---
title: Why Decentralized ID?
date: '2019-05-02'
spoiler: Many people believe the next generation Web will be decentralized, therefore digital identity, ID for short, will be decentralized as well. What exactly is ID? Why should it be decentralized? Will the concept of login still be relevant for a decentralized Web? And most importantly how decentralized ID works?
plink: 'https://img.haoqicat.com/2019050201.jpg'
video: 'https://www.youtube.com/watch?v=JheSCTT-0v0&feature=youtu.be'
---

Many people believe the next generation Web will be decentralized, therefore digital identity, ID for short, will be decentralized as well. What exactly is ID? Why should it be decentralized? Will the concept of login still be relevant for a decentralized Web? And most importantly how decentralized ID works? Let's take a glimpse of the future.

## What is Digital Identity?

A simple question first, what is ID? In digital world, a user ID is made of everything we say, do and experience.

![](https://img.haoqicat.com/2019050202.jpg)

Your ID is more than your username and password. For example, my Github username is happypeter, happypeter is my ID identifier, and password is like the secret key to prove I own my ID, but it is very different from a private key which we will talk soon. So happypeter is not my ID, it is the identifier of my ID.

![](https://img.haoqicat.com/2019050203.jpg)

Your ID is a virtual you in digital form. Your ID is everything that defines you in the digital world, a collection of all your personal data generated with technology. Today, the digital representation of a ID is a mix of data fragmented across many apps and services.

You don't own your ID, large commercial entities like google and facebook own it. There are two reasons for this. NO.1, Till now, most user data is generated when a lot of user using the same app, say google search, or facebook, as the creator of the apps, the companies behind them own the data. NO.2, the Web is not a secure environment, it is impossible to store data in an immutable way before the blockchain technology is invented, so we need  large cooperations as the root of trust, whatever in their databases is considered truth.

To conclude this part. An ID is a virtual you in digital world, and for now, it is 
not owned by you, but some companies.

## Why Need Decentralized ID?

Now it's time to ask a serious question. Why do we need decentralized ID? The answer is quite simple, users need to control their own data.

![](https://img.haoqicat.com/2019050204.jpg)

Let's first make it clear that what is a decentralized ID. What are the key differences between a decentralized ID and a current centralized one? Currently, my facebook ID is owned by facebook, the id identifier, and all my personal data that goes with this username is stored in facebooks's database. However, a decentralized ID is not owned by anybody but you. It is user-generated, self-owned, with a globally unique identifier rooted in blockchain.

Every user needs a ID that she truly owns. She will be in control of her own data and able to decide what she shares, who she shares with and when to stop sharing. 

![](https://img.haoqicat.com/2019050205.jpg)


Apps will be designed with users at the center. In the coming decentralized digital world, data will not be generated according to a specific app's logic and saved in SQL structure. Data will be saved in a more semantic syntax, following some open standard that is shared by all users on Web. All apps should save the data following the open standard that users choose. This is a huge paradigm shift, user will no longer be under the dictation of some popular apps. I am free to leave facebook if I don't like their UI. All my personal data goes with the my decentralized ID, I am able to use another app, and still have all my friends connected, cause the connection is at the data layer, not the app layer.

![](https://img.haoqicat.com/2019050206.jpg)


That's why we need decentralized ID.

## How It Works?

A decentralized ID system is still not widely deployed, it's hard to say what's the final solution. But we can clearly see a lot of consensus has gathered around W3C DID https://w3c-ccg.github.io/did-spec and people are collaborating on platforms like DIF https://identity.foundation/ with members like Microsoft, IBM, Webank, and also blockchain projects like Ethereum, Bytom, Blockstack etc. 



Users first need to generate their ID identifier, a username in the decentralized world. Currently cellphone number or email addresses or social network usernames are wildly used to login our daily apps. They are nice identifiers in that they are really human-friendly, but problems is that they are centralized and given by other provider and can be removed by them. If you use a decentralized system like Blockstack, your ID identifier will be generated on blockchain, with W3C DID data syntax. However decentralized ID identifier is not human-friendly, I can no longer use something like `happypeter`, DID identifier usually is much longer, like

```
did:example:123456789abcdefghi
```

Due to the Zooko's Triangle, DID is hard to make human-meaningful. Binding an easy to remember username to the DID in a really secure and decentralized way is harder than it looks.

The decentralized world has no server at all, users is responsive to save their own data. Blockchain projects like Ethereum is like a mainframe trying to save all the user data on the chain, but considering how much data a user using her social app can generate, many people are now prefer a layered solution. That is only saving the most important root of trust data on-chain, while users' actual identity data resides encrypted off-chain. 

Users will store data at their own devices or their own controlled cloud space. Preferably it will be a blockchain backed decentralized storage method, say IPFS or Blockstack's Gaia system https://github.com/blockstack/gaia . Because these are not controlled by any commercial entity and is immune to censorship. Or you can still use Google or Microsoft's cloud services as long as you do enough backups. All your data is encrypted, so nobody knows what's inside.

![](https://img.haoqicat.com/2019050207.jpg)

Each DID has its own Public Key also saved on blockchain, and user uses the private key to do authentication and authorization. Even you are not a Cryptography expert, and have no idea about how digital signatures work. It's not hard to understand how people can sign with their private key to  prove that they are associated with a DID, and they have the right to do something. But authenticating by signing way is not like the traditional logging in.

Bitcoin developer Peter Todd once said,

> If you're logging in it is centralized

Traditionally, my username and password are stored in the app's database, the logging in is actually asking the app if I can come in. But now under the decentralized way, I don't need to stay logging in at all, whenever I need to prove my right to do sth, I sign with my private key. Also I sign to authorize people how they can access my data, say, I can allow all my friends to view my posts, and my collaborators to edit the documentation I shared with them, everything can be done in a fine-grained way.

That's how decentralized ID works.

## Conclusion

Lastly, I hope I have made two points clear: NO.1 Decentralized ID is needed if people want to control their virtual self, with our life becoming more digitalized day-by-day, it's hard to imagine people will still want a small group of strangers control their ID. NO.2 It will take some time and a big paradigm shift, but the current Web2.0 functionalities can be done in a decentralized manner.

ref:

- https://w3c-ccg.github.io/did-spec/
- https://azure.microsoft.com/en-us/overview/decentralized-identity/
- microsoft.com/ownyouridentity
- https://identity.foundation
