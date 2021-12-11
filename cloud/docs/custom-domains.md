---
title: Custom Domains
menuText: Custom Domains
description: Learn how you can assign custom domains to your Serverless Cloud Apps
menuOrder: 5
---

# Custom Domains

By default, all instances on Serverless Cloud have a URL that ends with `cloud.serverless.com`. You may want to replace this domain with a domain that you already own. 
Note that it’s not allowed to set a domain for personal instances or preview instances as they are temporary. You’ll need to create a permanent stage by using `cloud deploy` command from your terminal, or `deploy` on Cloud Shell, or by creating a new stage on the Dashboard. 
There are two steps that you need to take to assign a custom domain to your instance: 

- Verify your ownership of the domain
- Map the domain to the Serverless Cloud stage 

## Verifying Custom Domain Ownership

To map a custom domain to your application, you must first prove ownership of the domain by adding a CNAME entry at your domain registrar. Follow the steps below to verify the ownership of the custom domain: 

- On the settings section of one of your stages, navigate to the "Domains" tab. You’ll see a domain that’s assigned by Serverless Cloud for this instance. 
- Click on "Add new domain"  and enter the name of the domain that you would like to assign for this instance in the dialog. Note that you can map subdomains following the steps here. See [our documentation](/cloud/docs/custom-domains#mapping-naked-domains) about naked domains. 
- You’ll see the first CNAME Name/Value pair that you use to prove the ownership of the custom domain. See in the image below the Name equals `_4453ae612288a32ae779be80e251735c.cooldomain.emrahsamdan.com` while Value equals `_18cd929a9bd28592b7c824fa456bdbb4.bwzjrqdvsp.acm-validations.aws.`

![VerifyDomain](https://user-images.githubusercontent.com/85096820/141490291-17839dc2-b497-4e50-9fca-9b236e328284.png)

- Go into the DNS page of your domain registrar and add the CNAME there. Note that some registrars require you to provide the whole string for the Name, while others need only the part of your custom domain name, `_4453ae612288a32ae779be80e251735c.cooldomain` in our example. Godaddy, for example, warns you about this issue if you enter the whole string in the Name area.

![VerifyDomain2](https://user-images.githubusercontent.com/85096820/141490356-b7aab089-436d-41c5-9259-b48b52679356.png)

- It may take a few minutes for your changes to take place. You can click the "Refresh" button on the Serverless Cloud Dashboard to track the progress. After a few minutes, you’ll see that your ownership of the custom domain is verified as below. Now we can continue to map our domain to our instance.

![Screen Shot 2021-12-10 at 10 54 41 AM](https://user-images.githubusercontent.com/85096820/145537902-e73466a4-1d2d-400c-aae2-2679e85416c4.png)

## Mapping Custom Domain to Serverless Cloud Instance

Continue from the previous step by adding another CNAME record at your domain registrar. See the image below to see the CNAME records added on GoDaddy.

![Screen Shot 2021-12-10 at 10 57 07 AM](https://user-images.githubusercontent.com/85096820/145537986-07a79e40-8896-46a7-8d3b-6e8001abd697.png)

This can also take a few minutes for the mapping operation to complete. You can test the mapping by visiting the custom domain you selected. Please check your DNS records if the operation doesn’t succeed or reach out to us for help.

## Mapping Naked Domains

A naked domain (a.k.a. apex domain) is a domain without a subdomain. In our example, it’s `emrahsamdan.com`.

Note that `www.emrahsamdan.com` is still a subdomain and you can add it as described above.

You can map naked domains to your Serverless Cloud instance, but your DNS provider must support this as well. Your DNS provider should support adding `ALIAS` records (also known as `A ALIAS` or `A NAME`). See the below list of DNS providers that support `ALIAS` records.

- [AWS Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html)
- [ClouDNS](https://www.cloudns.net/wiki/article/18/)
- [DNSimple](https://support.dnsimple.com/articles/alias-record/)
- [NameCheap](https://www.namecheap.com/support/knowledgebase/article.aspx/9646/2237/how-to-create-a-cname-record-for-your-domain/)
- [NS1](https://help.ns1.com/hc/en-us/articles/360020248973)
