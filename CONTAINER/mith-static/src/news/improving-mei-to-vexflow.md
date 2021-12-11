_MEI to VexFlow_ is a JavaScript library used to render music notation encoded according to the [Music Encoding Initiative](http://music-encoding.org/) (MEI) format. MEI is a community-driven effort to create a commonly-accepted, digital, symbolic representation of music notation documents, while keeping in mind the needs of textual scholars and the Digital Humanities.

The three-month project supported by Google Summer of Code is at its mid-term milestone, and on this occasion it’s worth to have a look what has been achieved and what is coming up for the rest of the project.

During our first month and a half, I’ve been busy revising the existing code and adding new features. The main objective was extending the repertoire and the range of MEI features that _MEI to VexFlow_ can support. In order to achieve that, I first focused on **improving the handling of “lines” such as slurs, ties and hairpins**. This work is very much an under-the-hood improvement, but it is important, because it paves the way for dealing with the quite common phenomenon of hairpins and slurs that do not begin and end precisely with a note on the staff.

![Introduction and Allegro by Maurice Ravel](http://mith.umd.edu/wp-content/uploads/2013/08/Screen-Shot-2013-08-05-at-09.52.03.png "Introduction and Allegro by Maurice Ravel")

MEI provides two ways of describing where a line begins and where it ends. The most straightforward way is to specify that a crescendo, for instance, ‘starts at note one in measure two and ends at note two in measure two’, as in the example below:

On the other hand there are instances when the line doesn’t exactly correspond to the start of notes. For these cases MEI allows the encoder to specify two points in time expressed as beats. For example the diminuendo in the second bar of the Ravel example (Figure 1) starts roughly on the third beat, hence one can describe it as a ‘_diminuendo starting at beat three and ending at beat “five”—that is at the very end of the measure_’. Or indeed, in the fourth measure the crescendo ‘_starts at beat one and ends at beat three_’.

I’ve made _MEI to VexFlow_ capable of dealing with such encodings, in other words, it is now possible to display lines that are described with beats in the MEI file. Although, VexFlow is only capable of drawing lines that start and end with a note, so my solution was to find the closest notes of two given beats and to draw the lines as if they were attached to such notes. This is a very important step towards more advanced support for these objects. In the future it will be possible to render the lines between the correct locations by calculating offsets from the closest notes.

![Second measure from Introduction and Allegro by Maurice Ravel](http://mith.umd.edu/wp-content/uploads/2013/08/Screen-Shot-2013-08-05-at-17.20.55.png "Second measure from Introduction and Allegro by Maurice Ravel")

Several other features have been introduced. **Now it’s possible to display changing time signature, meter or clef**. For instance, in the harp part of the Sonata for Flute Viola and Harp by Debussy all three occur at once:

![Excerpt from Sonata for Flute Viola and Harp by Debussy](http://mith.umd.edu/wp-content/uploads/2013/08/Screen-Shot-2013-08-05-at-15.33.19.png "Excerpt from Sonata for Flute Viola and Harp by Debussy")

**System breaks are also now supported** (Figure 4), and staff connectors are now rendered on the left of each system. Different staff connectors are supported in order to render different symbols connecting different groups of staves (for example, a brace for the piano right left hand, or a bracket for a group of instruments in an orchestral score).

![C Major Prelude from The Well Tempered Clavier by J. S. Bach](../images/2013-08-Screen-Shot-2013-08-07-at-15.38.15-980x304.png "C Major Prelude from The Well Tempered Clavier by J. S. Bach")

![Multi-staff system with instrument groups](../images/2013-08-Screen-Shot-2013-08-05-at-11.02.40-200x172.png "Multi-staff system with instrument groups")

These are important steps towards the usability of the scores in real-life use cases such as performance or practice.

For more information about the project, visit our [project page](http://tei-music-sig.github.io/MEItoVexFlow/) and to see _MEI to VexFlow_ in action (scores rendered directly in your browser) try out the [demo page](http://tei-music-sig.github.io/MEItoVexFlow/demo.html)!

**In our next milestone we are turning our attention towards variant handling**. Historical musical pieces make their way to us through multiple documents and it often happens that multiple sources introduce differences and variants in the music. We are designing a sample web application that will be able to display 15–16th century music and provide a dynamic mechanism for the user to select which variant they want to see.

To achieve this, we are adding new parsing interface to _MEI to VexFlow_ in order to expose the set of variants encoded in the input file. A web application will be able to display this information to the user and allow them to make their choices before rendering, and to see multiple variants at the same time.