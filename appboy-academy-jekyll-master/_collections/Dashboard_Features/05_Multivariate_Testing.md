---
title: Multivariate Testing
---
# Multivariate Testing

##  Introduction to Multivariate Testing

### What is Multivariate Testing?

A multivariate test is an experiment that compares users’ responses to multiple versions of the same marketing campaign. These versions share similar marketing goals, but differ in wording and style. The objective is to identify the version of the campaign that best accomplishes your marketing goals.

For example, suppose you have two push notifications:

- This deal expires tomorrow!
- This deal expires in 24 hours!

Using a multivariate test, you can see which wording results in a higher conversion rate. The next time you send a push notification about a deal, you’ll know which type of wording is more effective.

### The Benefits of Multivariate Testing {#the-benefits-of}

Multivariate testing gives you an easy, clear way to learn about your audience. You no longer have to guess what users will respond to - every campaign becomes an opportunity to try different variants of a message and gauge audience response.

Specific scenarios in which multivariate testing could come in handy include:

- __The first time you’re trying out a messaging type.__ Worried about getting in-app messaging right the first time? Multivariate testing allows you to experiment and learn what resonates with your users.
- __The creation of onboarding campaigns and other campaigns that are constantly being sent out.__ Since most of your users will encounter this campaign, why not ensure that it's as effective as possible?
- __Cases in which you have multiple ideas for messages to send.__ If you are unsure of which to choose, run a multivariate test and then make a data-driven decision.
- __Investigating whether your users respond to “tried and true” marketing techniques.__ Marketers often stick to conventional tactics to engage with users, but every product’s user base is different. Sometimes, repeating your call to action and using social proof won’t get you the results you desired. Multivariate testing lets you step outside the box and discover unconventional tactics that work for your specific audience.

### Five Rules for Multivariate Testing {#five-rules-for}

Multivariate testing can unveil powerful insights regarding your users. To ensure that your test results are truly reflective of your users’ behaviors, you need to:

1. __Run the test on a large number of users.__
Large samples ensure that your results reflect the preferences of your average user and are less likely to be swayed by outliers. Larger sample sizes also allow you to identify winning variants that have smaller margins of victory.

2. __Randomly sort users into different test groups.__
Appboy’s multivariate testing feature allows you to create up to eight randomly selected test groups. Randomizing is designed to remove bias in the test set and increase the odds of the test groups being similar in composition. This ensures that differing response rates are due to differences in your messages rather than your samples.

3. __Know what elements you are trying to test.__
Multivariate testing allows you to test differences between several versions of a message. In some cases, a simple test may be most effective, since isolating changes allows you to identify which elements had the greatest impact on response. Other times, presenting more differences between variants will let you examine outliers and compare different sets of elements. Neither method is necessarily wrong, provided you are clear from the beginning what you are trying to test for.

4. __Decide how long your test will run for before beginning the test, and don’t end your test early.__
Marketers are often tempted to stop tests after they see results that they like, biasing their findings. Resist the temptation to peek and never end your test early!

5. __Include a control group if possible.__
Including a control group lets you know whether your messages have a greater impact on user conversion than sending no message at all. Learn more about control groups [here][100].

##  Creating Multivariate Tests with Appboy {#creating-tests}

### How To Create a Multivariate Test {#how-to-create}

#### Step 1: Create your campaign

On the Campaigns section of Appboy's dashboard, click "Create Campaign" and select a channel for the campaign.

![AB_1_campaign][160]

#### Step 2: Compose your variants

Create up to 8 variants of your message. For some ideas on how to get started differentiating your variants, see [here][70].

![AB_2_variants][170]

#### Step 3: Schedule your campaign

Test scheduling works the same as scheduling any other Appboy campaign. All of Appboy's [standard campaign scheduling options][175] are available.

#### Step 4: Choose a segment to run your campaign on

Select a segment to send the campaign to. For best practices around choosing a segment to test with, see [here][80].

![AB_4_segments][180]

#### Optional Step: Limit the number of users to test with

Sometimes, you'll want to limit the number of users you send a test to, so that later, once you know which of your variants performs best, you will have users who haven't received the campaign and can be sent the winner. This typically most useful if your test isn't scheduled to recur and you won't be using [Intelligent Selection][90].

![Limit Users][190]

#### Step 5: Distribute users among your variants

Decide what percentage of your target segment should receive each of your variants. Or have [Intelligent Selection][90] handle the distribution for you.

![AB_control][200]

#### Step 6: Designate a Conversion Event

Setting a conversion event for a campaign allows you to see how many of the recipients of that campaign performed a particular action after receiving it. Unlike other campaigns, multivariate tests must define a conversion event. You can read more about our Conversion Events feature [here][205].

#### Step 7: Review and launch

On the confirmation page, review the details of your multivariate campaign and launch the test!

#### Step 8: View results

Once your campaign has launched, you can check how each variant is performing by selecting clicking on your campaign from teh Campaigns section of the dashboard.

![AB_8_view_results][210]

You will see a summary of the campaign and statistics on how the different variants are performing. If one variant is outperforming the others with better than [95% confidence][120], Appboy will mark that variant with a banner indicating that it is best performing.

| Messaging type | Projected winner is selected based on... |
| ---------------------| ------------- |
| Push | conversion rate (if unavailable, open rate) |
| Email | conversion rate (if unavailable, click rate) |
| In-app message | conversion rate (if unavailable, click rate) |

#### Step 9: Select a winner and continue sending

Once you are satisfied that one of your variants is the best performing, you can edit the campaign and adjust the distribution of users so that 100% of users receive the best performing variant. All users in the segment who have not yet received the campaign (including users who enter the segment at a future date) will then get the best performing variant, provided your campaign is scheduled to send again in the future. If you configured your campaign to only send to a limited number of users initially, this is typically when you would also remove that restriction, so that the best variant can reach as many of your segment users as possible.

Keep in mind that Appboy recommends that you wait to select a winner like this until you have [95% confidence][120] in a particular variant. If no variant did better than the others with 95% confidence, it's possible that multiple variants received similar response rates, or your sample size of users was not large enough to yield 95% confidence.  While you can still select a winner, the chances that your selection will not reflect users' true preferences will be greater than 5%. [Follow-up tests][140] may yield more informative results.

![AB_winner][220]

### What Can Your Variants Test? {#what-can-you-test}

Try to compose variants with an idea of what you want to test and what you hope to prove. What levers do you have to pull and what are the desired effects? While there are millions of possibilities that you can investigate using a multivariate test, we have some suggestions to get you started:

| Channel | Aspects of Message You Can Change | Results To Look For |
| ---------------------| --------------- | ------------- |
| Push | Wording, punctuation, presentation of numbers (e.g. "triple" vs. "increase by 200%"), presentation of time (e.g. "ends at midnight" vs. "ends in 6 hours")| Open rate |
| Email | Subject, display name, salutation | Open rate |
| - | Use of images, organization of text (e.g. bulleted vs. numbered lists) | Click rate |
| - | Reply-to field, sign-off | Unsubscribe rate |
| In-app Notification | Use of images, inclusion of deep linking, slide-up position, on-click behavior, message close method, aspects listed for "Push" | Click rate |

### Choosing a Segment {#choosing-a-segment}

Since different segments of your users may respond differently to messaging, the success of a particular message says something about both the message itself and its target segment. Therefore, try to design a test with your target segment in mind. For instance, while active users may have equal response rates to “This deal expires tomorrow!” and “This deal expires in 24 hours!”, users who haven’t opened the app for a week may be more responsive toward the latter wording since it creates a greater sense of urgency.

Additionally, when choosing which segment to run your test on, be sure to consider whether the size of that segment will be large enough for your test. In general, multivariate tests with more variants require a larger test group to achieve [statistically significant results][120]. This is because more variants will result in fewer users seeing each individual variant. As a crude guide, you will likely need around 15,000 users per variant (including the control) to achieve 95% confidence in your test results. However, the exact number of users you need could be higher or lower than that depending on your particular case. For more exact guidance on variant sample sizes, consider referring to [Optimizely's Sample Size Calculator][225].

### Intelligent Selection {#intelligent-selection}

Intelligent Selection is a feature that analyzes the performance of your campaign twice a day and automatically adjusts the percentage of users that receive each message variant. A variant that appears to be performing better than others will go to more users, while variants that are underperforming will be targeted at fewer users. Each adjustment is made using a [statistical algorithm][227] that makes sure we are adjusting for real performance differences and not just random chance.

By looking at performance data in real-time and shifting campaign traffic toward winning variants gradually, Intelligent Selection ensures that more users receive your best performing variant, without any sacrifice in statistical confidence. Intelligent Selection will also rule out underperforming variants and identify high performing variants faster than a traditional A/B test. Basically, with Intelligent Selection, you can test more frequently and with greater confidence that your users will see your best message.

One thing to note is that this only works well for campaigns that are scheduled to send multiple times. Since Intelligent Selection needs initial results to begin adjusting your campaign, a campaign that sends only once won't benefit. On the other hand, this make Intelligent Selection ideal for campaigns that are scheduled to recur frequently.

![Intelligent_Selection_Shot][271]

### Including a Control Group {#including-a-control-group}

When you create a multivariate test, you can reserve a percentage of your target audience for a randomized control group. Users in the control group will not receive the test, but Appboy will monitor their conversion rate for the duration of the campaign. When viewing your results, you'll be able to compare the conversion rates of your variants against a baseline conversion rate provided by your control group. This lets you compare not only the effects of your variants, but also compare the effects of your variants against the conversion rate that would result if you didn't send a message at all.

## Understanding Your Multivariate Test Results {#understanding-your}

Congratulations on getting to this stage! Receiving your multivariate test results is, however, not the last step of the testing process.  Now you need to understand what your results mean and apply these insights to your engagement strategy.

### Understanding Confidence {#understanding-confidence}

An important part of your results is the confidence of your test.  The confidence shows the reliability of your test results - the greater the confidence, the more reliable your findings.   For instance, your results may show that “A” had a 20% click rate and “B” had a 25% click rate.  This seems to indicate that “B” is the more effective message.  Having a confidence of 95% means that the difference between the two click rates is likely due to an actual difference in users’ responses, and that there is only a 5% likelihood that the difference is due to chance.

In general, a confidence of at least 95% is necessary to show that your results are reflective of users’ actual preferences, and not due to chance.  In rigorous scientific tests, 95% confidence is the common benchmark used to determine statistical significance.  If you continually fail to achieve 95% confidence, try increasing your sample size or decreasing the number of variants.

Appboy will mark any variants that have 95% confidence with a banner indicating that they are projected as best performing.
![Winner Banner][230]

### Statistically Insignificant Results — Now What? {#statistically-insignificant-results}

A test that doesn't have a confidence of 95% can still hold important insights. Here are a few things you can learn from a test with statistically insignificant results:

- It's possible that all of your variants had roughly the same effect. Knowing this saves you the time you would've spent making these changes. Sometimes, you may find that conventional marketing tactics, such as repeating your call to action, don't necessarily work for your audience.
- While your results may have been due to chance, they can inform the hypothesis for your next test. If multiple variants appear to have roughly the same results, run some of them again alongside new variants to see if you can find a more effective alternative. If one variant does better, but not by a significant amount, you can perform another test in which this variant's difference is more exaggerated.
- Keep testing! A test with insignificant results should lead to certain questions. Was there truly no difference between your variants? Should you have structured your test differently? You can answer these questions by running [follow-up tests.][140]

While multivariate testing is useful for discovering which type of messaging generates the most response from your audience, it’s also important to understand which alterations in messaging have only a negligible effect.  This allows you to either continue testing for another more effective alternative, or save the time that may have been spent deciding between two alternate messages.

Whether or not your multivariate test has a clear winner, it can be helpful to run [follow-up test][140] to confirm your results or apply your findings to a slightly different scenario.

## Recommended Follow-ups {#recommended-follow-ups}

One multivariate test can (and should!) inspire ideas for future multivariate tests, as well as guide you toward changes in your messaging strategy. Possible follow-up actions include:

- __Changing your messaging strategy based on test results.__  Your multivariate results may lead you to change the way you word or format your messaging.

- __Changing the way you understand your users.__ Each multivariate test will shed light on your users’ behaviors, how users respond to different messaging channels, and the differences (and similarities) among your segments.  

- __Improving the way you structure future multivariate tests.__  Was your sample size too small? Were the differences between your variants too subtle? Each multivariate test provides an opportunity to learn how to improve future tests.  If your confidence is low, your sample size is too small and should be enlarged for future tests.  If you find no clear difference between how your variants performed, it’s possible that their differences were too subtle to have a discernible effect on users' responses.

- __Running a follow-up test with a larger sample size.__
Larger samples will increase the chances of detecting small differences between variants.

- __Running a follow-up test using a different messaging channel.__
If you find that a particular strategy is very effective in one channel, you may want to test that strategy in other channels.  If one type of message is effective in one channel but not effective in another, you may be able to conclude that certain channels are more conducive to certain types of messages.  Or, perhaps there is a difference between users who are more likely to enable push notifications and those who are more likely to pay attention to in-app messages.  Ultimately, running this sort of test will help you learn about how your audience interacts with your different communication channels.

- __Running a follow-up test on a different segment of users.__
To do this, create another test with the same messaging channel and variants, but choose a different segment of users.  For instance, if one type of messaging was extremely effective for engaged users, it may be useful to investigate its effect on lapsed users. It’s possible that the lapsed users will respond similarly, or they may prefer another one of the other variants.  This sort of test will help you learn more about your different segments and how they respond to different sorts of messages.  Why make assumptions about your segments when you can base your strategy on data?

- __Running a follow-up test based on insights from a previous test.__
Use the intuitions you gather from past tests to guide your future ones. Does a previous test hint at one messaging technique being more effective? Are you unsure about what specific aspect of a variant made it better? Running follow-up tests based on these questions will help you generate insightful findings about your users.

## A Quick Recap of Multivariate Testing {#recap}

There's a lot that can be said on multivariate testing. Looking for a quick summary of this page or a way to easily share this information with your team? Check out this slideshow, which contains our main tips on multivariate testing.

<iframe src="//www.slideshare.net/slideshow/embed_code/38223376" width="427" height="356" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>

[Perfect Your Multivariate Tests][240] from [Appboy][250]

This slideshow was originally presented at a NYC Meetup on [Optimizing Mobile Apps][260] and is hosted by Slideshare. For more presentations by Appboy, check out our [Slideshare page][270].

[10]: #introduction-to
[20]: #what-is
[30]: #the-benefits-of
[40]: #five-rules-for
[50]: #creating-tests
[60]: #how-to-create
[70]: #what-can-you-test
[80]: #choosing-a-segment
[90]: #intelligent-selection
[100]: #including-a-control-group
[110]: #understanding-your
[120]: #understanding-confidence
[130]: #statistically-insignificant-results
[140]: #recommended-follow-ups
[150]: #recap
[160]: /assets/img/multivariate-screen-1.png
[170]: /assets/img/multivariate-screen-2.png
[175]: /Quick_Wins/Scheduling_Your_Campaign
[180]: /assets/img/multivariate-screen-3.png
[190]: /assets/img/multivariate-screen-4.png
[200]: /assets/img/multivariate-screen-5.png
[205]: /Deep_Dives/Conversion_Events
[210]: /assets/img/multivariate-screen-6.png
[220]: /assets/img/multivariate-screen-7.png
[225]: https://www.optimizely.com/resources/sample-size-calculator/
[227]: https://en.wikipedia.org/wiki/Multi-armed_bandit
[230]: /assets/img/best-performing-banner.png
[240]: https://www.slideshare.net/Appboy/perfect-your-multivariate-tests
[250]: https://www.slideshare.net/Appboy
[260]: http://www.meetup.com/Optimizing-Mobile-Apps-NYC/
[270]: https://www.slideshare.net/Appboy/presentations
[271]: /assets/img/Intelligent_Selection_Shot.png
