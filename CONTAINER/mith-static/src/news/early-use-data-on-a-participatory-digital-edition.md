![A list of the most-used annotations tags on the InfinteUlysses.com site](../images/2015-04-screenshot_325.png)

[_Infinite Ulysses_](http://www.InfiniteUlysses.com), the participatory digital edition of James Joyce's challenging novel _Ulysses_, is now about one month into its open beta-testing period. In this post, I'll describe how I went about user-testing the edition, and share some early statistics about the edition's use.

On April 4, 2015—about one month into the open beta—the site had 356 members. Site users other than me authored 159 annotations on the novel; combined with my 247 annotations, the total number of annotations on the novel was 406. 137 unique tags on annotations were in use, helping filter annotations to readers' interests and needs. Although the site had a fair number of visitors during the first weeks of the open beta, only a very few readers also added annotations to the site. There were two fairly active users on the site (adding 60 and 19 annotations), with 9 users authoring 5 or more annotations, 19 users authoring 2 or more annotations, and 27 site users authoring at least 1 annotation.

I used a variety of tactics to understand the experience of the edition's users:

1. Informal (hallway testing, tweeted questions)
2. Talk-aloud observation (single or paired)
3. Participatory design (sketching ideal layouts)
4. Site contact form feedback & emailed feedback
5. GitHub issue queue
6. Open beta soft launch survey (March 5th, 16 participants from non-academic/non-DH backgrounds)
7. Open beta survey responses (March 9-30, 16 participants, many from academic and/or DH backgrounds)
8. Google Analytics
9. Aggregated mapping (heatmaps, scrollmaps, clickmaps; e.g. the highlighting over the word "Chrysostomos" on the first page of the book was clicked 111 times between March 7-21)
10. Drupal statistics on frequency and authorship of annotations

![Charts showing number of visitors and geographic locations of InfiniteUlysses.com visitors](../images/2015-04-1.png)

I used Google Analytics to capture anonymous, aggregated data about the edition's user experience. Note that the following figures represent the period from January 1, 2015 through March 21. Only the front page of the site and "about" pages were accessible to anyone (except a small group of invited early beta-testers) until the beginning of the open public beta on March 9th, so **most of the site activity described here comes from the two-week period from March 9th to the 21st, 2015**, as you can see from the "Visits" timeline. I'm continuing to gather site analytic data as the site sees more readers and begins to be used in classrooms; the stats here can give us a sense of the first weeks of a new public and participatory humanities project.

The spike on March 9th in the "Visits" chart shows how initial open beta publicity brought hundreds of people the site (with 1,579 unique site visitors during this two-week period), but only a relatively small number of readers stayed to make repeated use of the site during the first two weeks of the open beta. Visitors were mostly from the United States (857), followed by Great Britain (162), Canada (85), Ireland (66), and Brazil (60), with smaller counts from other countries. I discussed the site via email with one reader in Korea, and I discussed the site's predecessor _UlyssesUlysses_ via Twitter with a reader from Norway in the past. More work will need to be done to reach readers in other countries and make the site accessible to those who don't speak English as their first language.

![Charts showing exit count from most popular book pages, total time spent on most book pages, pageviews by site page, and pageviews on the most popular book pages. Regrettably presented as screenshots of Google Analytics visualizations instead of HTML tables.](../images/2015-04-2.png)

There were 2,056 total sessions of site use, with 7,616 total pageviews (pageviews are the total number of pages viewed; repeat viewings of the same page are included). Sessions are individual visits to the site; for example, if James Joyce visits the site at 1pm today and reads 3 pages of the site before doing something else, and then visits the site tomorrow and views one page before leaving the site, those count as two distinct sessions.

79.86% of site sessions were referred from a social media site (i.e. clicked a link that took them to [_Infinite Ulysses_](http://www.InfiniteUlysses.com)). In particular, Twitter was responsible for 487 site sessions and Facebook for 350. These numbers speak to the usefulness of social media for getting the word out about academic projects. The Facebook number is interesting in that I don't have an account on that site; my only publicity activities were on Twitter, my [LiteratureGeek.com](http://www.LiteratureGeek.com) blog, the MITH blog (responsible for 42 sessions), and my older prototype UlyssesUlysses.com (45 sessions), but mentions of the project ended up on that network as well.

![chart showing number of site visitors by number of returning visits to the site.](../images/2015-04-3.png)

New visitors made up 88.3% of site users, with only 11.7% of users returning for a second or further visit. Unfortunately, the data doesn't capture what percent of non-return visitors were potential _Ulysses_ readers who decided not to use the site, versus people interested in the project but not interested in reading _Ulysses_ at the current time. The "Number of visitors by number of returning visits" chart shows how many sessions were from users who visited the site 1, 2, or more times (see the "Count of Sessions" column); we can see, for example, that 72 users returned to the site twice, and that 22 users each visited the site 5 separate times.

Filtering the statistics to just the pages of the book lets us see where users were reading; "Users on most popular book pages" shows the number of times a page of the book was viewed (pageviews) and how many users saw that page (users; note one user might view a page multiple times). From the popularity of pages 3 (the first page of the print book were the novel begins, and correspondingly the first page of the book on the digital edition), 4, 5, and 6, we suspect that most visitors began the novel at the beginning. Pages 24 and 25 (the first and second pages of the second episode of the novel) were also popular; perhaps returning readers jumped to the second episode to see what a page would look like that hadn't been most people's first choice to read and annotate. "Total time spent on most popular book pages" shows the cumulative attention (in time spent on a page) from site users on book pages. Page 3 (the first page of the novel) shows a considerably higher time, probably not because of its difficulty as a reading page but because it was the first page many readers encountered, where they would still have been learning to use the site's features. "Exit count from most popular book pages" (above) shows for how many users a given book page was the last page they viewed before leaving the site. We see that page 3 was a point where many users left the site (though not necessarily after spending significant time reading and testing features on that page).

![Visualization showing the user flow on InfiniteUlysses.com (e.g. people who entered the site on x page went on to y and z pages)](../images/2015-04-UserFlowbySocialNetwork.png)

Additional information such as user flows (the above image is an example) will help add nuance to these statistics; information from the other forms of user testing will also round out my understanding of user motivations and experiences on the site. All this information helps me know what features of the site are useful and should receive refinement (e.g. the sorting and filtering feature pictured below was often praised on user surveys) and which I should remove from the site or redesign (e.g. the old, buggy site tour was replaced by a slideshow, and user surveys indicated that the site interface was intuitive enough that they didn't seek a tour of the site). If you're interested in more statistics about edition testing or a more nuanced discussion of these statistics, I'll be sharing a white paper about the project in a few weeks which contains a discussion of these results.

![The current filtering and sorting features on InfiniteUlysses.com](../images/2015-04-filterscurrent.png)

_Amanda Visconti is the 2014-2015 [Winnemore Digital Dissertation Fellow](http://mith.umd.edu/community/fellowships/winnemore-fellows/) at MITH._