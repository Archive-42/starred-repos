After a long but pleasant flight, a shorter but even more pleasant train ride, and a scenic bus ride from the train station, I am finally at the University of Wuerzburg at the Interedition conference. It's exciting to be here with so many other professionals from annotation and linking projects.

Interedition was originally set up to get domain experts for text analysis tools together and ask them how to make their tools interoperable. A by-product of this action was a creation of a Java suite called CollateX. However, this is not the only reason for the conference. It is founded on the desire to create common goals and networks between DH programmers.

This Bootcamp will last from Friday, October 7th to Tuesday, October 11th. It has a lot of the same people who were present from the last Bootcamp in March, which I attended, plus some new faces. To see what happened in the previous Bootcamps, check out the Interedition wiki: <http://www.interedition.eu/wiki/index.php/Main_Page>

[Joris Van Zundert](http://alfalablog.huygensinstituut.nl/?page_id=122 "Joris Van Zundert"), the head organizer for Interedition, had the same train as me, so we were able to have a great discussion on the train about the Interedition conference. Joris feels that so long as we come out of the conference with a clear understanding on how to make the various tools collaborators bring interoperable, the weekend will be successful. We'll see if that goal is met or exceeded.

What this Bootcamp has done well so far is provide a lot of examples of interesting projects that involve markup and text. The following is a list of the presentations, where I've tried my best to write down what each person is doing and their University/research affiliation. Honestly, there is so much here that I'm just trying to keep up!

**University of Madrid** - A project is focusing on developing an open collaborative annotator for Google Books. The developers have ambitions to utilize the Hathi Trust into their reader. This opened up a discussion on how to gain access to these large libraries, e.g. working around the Hathi API, dealing with Google Books licenses, etc.

**Gregor Middell (middell.net) - Faust Edition project**: creation of a large metadata and self-transcription tool library. This tool uses the CKEditor to create linkages between authority files in their Library's database and marked up transcriptions of documents.

**Typewrite: Nineteenth-century Scholarship Online** - taking low-quality OCR scans and improving their quality. This is done through an interface that automatically outlines OCR regions gleaned from their TEI-A documents that describe the OCR and displays the output text from the OCR. Users can then edit the output text to correct machine errors, thus making a good crowd-sourcing application for transcription and OCR. Those who complete correcting a transcription receive as their reward a copy of that transcription from the repository. Having users contribute corrections also allows for a live feedback of common errors and bugs from the OCR process.

**TextLab: Melville Electronic Library** - a tool that produces XML markup that displays sequences of editorial decisions within a manuscript. This is done through a user interface that displays the image of the manuscript

**Elaborate - Hyugens Institute - http://www.e-laborate.nl/en/** which is similar to the TILE project I worked on, where annotations are made on text transcriptions. Users have the option to attach metadata and annotations to the text they transcribe. They then publish the data to a XML database, which is then exported to other formats.

**CATMA: University of Hamburg http://www.catma.de **- a large desktop-based application written in Java that allows for easy markup of text using color-coded highlighters. This creates an overlapping hierarchy of annotations within a text. These annotations are stored in memory and can then later be queried against and used in word searches of the marked-up text. This allows for some beautiful graphs and charts of statistical analysis within any text. What's coolest to me about this tool is that it allows for overlapping of annotations within a text and yet keeps the output XML (mostly) TEI-compliant.

**University of Muenster** - building tools to help scholars look through a large paper-based database of witnesses of the New Testament of the Bible. This includes incorporating demographic metadata into text and images. They also set as their goals transcription and indexing of the text. They are currently prototyping using OpenSocial applications to publish images and annotations through pubsub. Honestly, this looks to be the most promising

[**University of Saint Louis, TPEN project**](http://digital-editor.blogspot.com/2010/10/jon.html) - Developed an interface for paleographical documents that supports collaborative tagging and transcribing of manuscript images. This also shares a lot of the same philosophy in exporting XML and technical features as [TILE](http://mith.umd.edu/tile/).

What has emerged thus far as a common definition of interoperability is the ability to visually set up tools next to one another. It also means creating chains of tools that take over the simple, individual tasks associated with OCR, text mining, transcription, and annotation and make them more accessible and standardized. Whatever I said during my presentation has created a spark and there will definitely be a workshop/group focused on the OAC specs and common pathways forward with using that model for interoperability.

I think that's enough for one blog post - stay tuned for updates and, eventually, pictures...

Grant