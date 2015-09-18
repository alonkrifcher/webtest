---
title: AWS S3 Integration
---
# AWS S3 Integration

Follow the instructions on this page to get started with your AWS S3 integration. AWS S3 integration is required for advanced data export functionality.

__Estimated Time: 5 Minutes__

## Obtaining AWS S3 Credentials

__Note:__ These instructions assume that you have already created an AWS S3 account and have familiarity with Amazon S3. If you have not, follow the instructions [here][3]. You will need to have your own Amazon S3 bucket, access ID, and secret access key. For security purposes, we recommend creating a separate AWS user under AWS Identity and Access Management (IAM) that only has access to the bucket you will be using.

## Linking Appboy to AWS S3

If you have _not_ already registered, create an Appboy account on [appboy.com](https://dashboard.appboy.com/developers/sign_up). Then follow the [app group configuration](/App_Group_Configuration) documentation to setup your first app.

#### Step 1:
Navigate to the '3rd Party Integrations' page on the Appboy Dashboard under the 'APP SETTINGS' section and click the 'AWS Credentials' tab.

![AWS Creds][5]

#### Step 2:
On the AWS Credentials page, input your AWS Access ID, AWS Secret Access Key, and AWS S3 Bucket Name in the designated fields.

## Integration Complete

AWS S3 should now be integrated into your Appboy account. To confirm a successful integration, you can click on the "Test Credentials" button. A notification will inform you if your credentials have been successfully validated.

[3]: http://aws.amazon.com/
[4]: http://aws.amazon.com/
[5]: /assets/img/aws_creds.png "AWS Creds"
