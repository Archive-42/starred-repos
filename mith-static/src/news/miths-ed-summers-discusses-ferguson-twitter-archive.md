_Cross-posted and edited from a blog entry on medium.com: _[_On Forgetting and hydration_](https://medium.com/on-archivy/on-forgetting-e01a2b95272)_._

After writing about the [Ferguson Twitter](http://inkdroid.org/journal/2014/08/30/a-ferguson-twitter-archive/) archive a few months ago, I received requests from three people both outside and within University of Maryland, for access to the data. My response to the external academic researchers was to point them to [Twitter’s Terms of Service](https://dev.twitter.com/overview/terms/policy#6._Be_a_Good_Partner_to_Twitter) which says:

> _If you provide Content to third parties, including downloadable datasets of Content or an API that returns Content, you will only distribute or allow download of Tweet IDs and/or User IDs._
>
> _You may, however, provide export via non-automated means (e.g., download of spreadsheets or PDF files, or use of a “save as” button) of up to 50,000 public Tweets and/or User Objects per user of your Service, per day._
>
> _Any Content provided to third parties via non-automated file download remains subject to this Policy._

It’s my understanding that I can share the data with others at the University of Maryland, but I am not able to give it to the external parties. What I can do is give them the Tweet IDs. But there are 13,480,000 of them.

So that’s what I’m doing today: publishing the tweet ids using a CC-BY license. You can download them from the Internet Archive:

> _<https://archive.org/details/ferguson-tweet-ids>_

### **Hydration**

On the one hand, it seems unfair that this portion of the public record is unshareable in its most information rich form. The barrier to entry to using the data seems set artificially high in order to protect Twitter’s business interests. These messages were posted to the public Web, where I was able to collect them. Why are we prevented from re-publishing them since they are already on the Web? Why can’t we have lots of copies to keep stuff safe? More on this in a moment.

Twitter limits users to 180 API requests every 15 minutes. A user is effectively a unique access token. Each request can hydrate up to 100 Tweet IDs using the [statuses/lookup](https://dev.twitter.com/rest/reference/get/statuses/lookup) REST API call. So

```
180 requests * 100 tweets = 18,000 tweets/15 min
                          = 72,000 tweets/hour
```

In order to hydrate all of the 13,480,000 tweets will take about 7.8 days. This is a bit of a pain, but realistically it’s not so bad. I’m sure people doing research have plenty of work to do before running any kind of analysis on the full data set. And they can use a portion of it for testing as it is downloading. But how do you download it?

[Gnip](http://gnip.com/), who were recently acquired by Twitter, offer a rehydration API. Their API is limited to tweets from the last 30 days, and similar to Twitter’s API you can fetch up to 100 tweets at a time. Unlike the Twitter API you can issue a request every second. So this means you could download the results in about 1.5 days. But these Ferguson tweets are more than 30 days old. And a Gnip account costs some indeterminate amount of money, starting at \$500…

I suspect there are other hydration services out there. But I adapted [twarc](http://github.com/edsu/twarc) the tool I used to collect the data, which already handled rate-limiting, to also do hydration. Once you have the tweet IDs in a file you just need to install twarc, and run it. Here’s how you would do that on an Ubuntu instance:

```

sudo apt-get install python-pip
sudo pip install twarc
twarc.py --hydrate ids.txt > tweets.json
</code>
```

### **Archive Fever**

Well, not really. You will have \_most \_of them. But you won’t have the ones that have been deleted. If a user decided to remove a Tweet they made, or decided to remove their account entirely you won’t be able to get their Tweets back from Twitter using their API. I think it’s interesting to consider Twitter’s Terms of Service as what [Katie Shilton](http://ischool.umd.edu/faculty-staff/katie-shilton) would call a [value lever](http://mith.umd.edu/dialogues/katie-shilton-finding-values-levers-building-ethics-into-emerging-technologies/).

The metadata rich JSON data (which often includes geolocation and other behavioral data) wasn’t exactly posted to the Web in the typical way. It was made available through a Web API designed to be used directly by automated agents, not people. A tweet appears on the Web, but it’s in with the other half a trillion tweets out on the Web, all the way back to the [first one](https://twitter.com/biz/status/21). You have to ask for it individually with your Web browser. It’s representation format is HTML which doesn’t lend itself to computer processing in the same way as the highly structured JSON.

Requiring researchers to go back to the Twitter API to get this data and not allowing it to circulate freely in bulk means that users have an opportunity to remove their content. Sure it has already been collected by other people, and it’s pretty unlikely that the NSA are deleting their tweets. But if you squint right, Twitter is taking an ethical position for their publishers to be able to remove their data: to exercise their right to be forgotten, allowing them to remove a teensy bit of what Maciej Cegłowski calls [informational toxic waste](http://idlewords.com/bt14.htm).

As any archivist will tell you, forgetting is an essential and unavoidable part of the archive. Forgetting is the \_why \_of an archive. Negotiating what is to be remembered and by whom is the principal concern of the archive. Ironically it seems it’s the people who deserve it the least, those in positions of power, who are often most able to exercise their right to be forgotten. Maybe putting a value lever back in the hands of the people isn’t such a bad thing. If I were Twitter I’d highlight this in the API documentation. I think we are still learning how the contours of the Web fit into the archive. I know I am.

_If you are interested in learning more about value levers you can download a pre-print of Shilton’s _[_Value Levers: Building Ethics into Design_](http://mith.umd.edu/wp-content/uploads/2014/11/ShiltonSTHVpreprint.pdf)_._