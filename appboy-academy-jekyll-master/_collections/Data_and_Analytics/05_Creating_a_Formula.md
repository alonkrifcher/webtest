---
title: Creating a Formula
---
# Creating a Formula

## What Are Formulas?

Appboy's analytics views now allow you to combine several data points together to provide valuable insights into your user data. Formulas will allow you to normalize your time series data based on your total number of MAU/DAU as well as to easily understand complex relationships that exist in your data. For example, you can compare how many custom events were completed by daily active users that qualify for a particular segment versus the general population (or against another segment).

## Why Data Normalization Is Important

Normalizing your data is useful for data comparison. For example, you might be interested in comparing custom event data across segments. Using our formulas feature, you can compare custom events performed / DAU across different segments. In other words, you can view the number of custom events performed by a particular segment / that segment's DAU. Here's an example that illustrates the importance of data normalization: 

Let's say that you want to compare data on cart abandonment across segments. You decide to look at your "new users" and "big spenders" segment.

 First, you use the raw statistics feature in the custom event dashboard to compare the ## of times each segment has abandoned their cart. You create the following view:

![big spenders][12]

 It seems like "big spenders" abandon their carts more than "new users". Next, you create a different view using an abandoned cart / DAU formula:
 
![new users][13]

 On most days, the "new users" segment has more cart abandons per DAU. There are more total users in the "big spenders" category than there are in the "new users" category, so it seemed like "big spenders" were abandoning their carts more than "new users". It turns out that "big spenders" have more total cart abandons than "new users" but almost always have less abandon cart events per DAU. Thus, the ability to view normalized data is important because it can completely change the insights that you glean from your data.

## Where to Access Your Formulas

Formulas can be accessed in the "Detailed Statistics" panels on the [App Usage][9], [Revenue][10] and [Custom Events][11] pages in the dashboard. Change the dropdown from "Raw Stats" to "Formulas" and select a formula.

![select forumla][16]

## How to Create a New Formula

To create a new formula, navigate to the appropriate dashboard (App Usage, Revenue or Custom Events) and click on the "manage formula" button in the detailed statistics section. 

![manage formula][14]

Enter a name for your formula and select the relevant numerators and denominators. Save your formula.

![create formula][15]

## Available Numerators and Denominators

### App Usage Dashboard
 
The available numerators are:
- DAU
- Sessions

The available denominators are: 
- MAU
- DAU
- Segment Size 

### Revenue Dashboard

The available numerators are: 
- Purchases (all)
- Select Purchases (e.g a gift card or a product ID)

The available denominators are:
- DAU
- MAU

### Custom Event Dashboard

The available numerators are: 
- Custom Event Count

The available numerators are: 
- MAU
- DAU
- Segment Size (only segments that have [analytics tracking][17] enabled can be used)

## Coming Soon

We're actively improving this feature, so the following functionality will be available soon: 

- Ability to add multiple numerators per formula
- Ability to graph more than one formula at a time

[9]: https://academy.appboy.com/Deep_Dives/Understanding_Your_App_Usage_Data#overview
[10]: https://academy.appboy.com/Deep_Dives/Exporting_Dashboard_Data#revenue
[11]: https://academy.appboy.com/Deep_Dives/Exporting_Dashboard_Data#events
[12]: /assets/img/Not_Normalized.png
[13]: /assets/img/Normalized.png
[14]: /assets/img/Manage_Formulas.png
[15]: /assets/img/Create_Formula.png
[16]: /assets/img/Select_Formula.png
[17]: https://academy.appboy.com/Deep_Dives/Viewing_and_Understanding_Segment_Data#tracking
