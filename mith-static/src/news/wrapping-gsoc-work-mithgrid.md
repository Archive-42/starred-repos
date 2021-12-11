[Google Summer of Code](https://developers.google.com/open-source/soc/?csw=1) 2013 (GSoC 2013) has successfully come to an end. I would like to thank [James Smith](http://mith.umd.edu/people/person/james-smith/) for his patient mentoring. His conceptions on professionalism and pragmatic problem solving approach were highly useful. It was a pleasure working with the MITH team.

The [MITHgrid](http://mith.umd.edu/mithgrid-demonstration-development/) library is a data-centric, event-driven, responsibility-based library. In the past three months, we have tried to make use of the library to build cool data-driven applications. Our objective for building these applications were three-fold:

1. to add more components (presentations and controllers) to MITHgrid;
2. to demonstrate the perks of using MITHgrid in terms of modularity and scalability;
3. to drive public interest in MITHgrid.

MITHgrid builds on [the data storage model](http://web.archive.org/web/20131112221650/http://simile.mit.edu/wiki/Exhibit/Understanding_Exhibit_Database) from [MIT’s Exhibit project](http://simile-widgets.org/exhibit/). The model provides some benefits over a relational database. MITHgrid is different than more commonly available MVC JavaScript frameworks and is aligned to scale with the requirements of future graph-based web applications.

**What we accomplished**

The primary objective of GSoC 2013 was to learn and contribute to open source endeavors, learn programming ethics, and collaborate with team members. We are satisfied with the results, and I hope to internalize the lessons from this endeavor.

Over the summer, we managed to create two MITHgrid applications of varying complexities and a skeleton application template for use with Yeoman (available [here](https://github.com/selvam1991/mithgrid-demos/tree/master/demo) and [here](https://github.com/selvam1991/generator-mithgrid)):

**A Data Visualizer**: This is a simple application which allows data imports, visualizations of those imports using available plots, and live editing of values. The modified data may be exported for use later. For the visualizer, we created graphs, spreadsheet, editable table, and tab presentations (comparable to [Backbone.js](http://backbonejs.org/) views). These presentations can now be used for any other MITHgrid application.

**ToDo App**: Very simple to-do list for your day. The reason why we wanted to build such an easy application was to get listed on [todomvc.com](http://todomvc.com/), a site that allows you to compare JavaScript frameworks by showing the same application implemented in all of them. As part of this application, we created custom mouse controllers for capturing browser events. Now they can be used with any MITHgrid application.

**Problems we faced**

Well, you do face problems whenever you start using a new library, but we would like to mention some notable difficulties that we came across:

1. There is no memory of the order in which the data was loaded;
2. The absence of global (within the scope of MITHgrid) namespace in which to save and access variables. Because a web page might have multiple instances of an application, we employ a more roundabout approach: we pass the application object reference to components that need central management of some piece of information.

**Future plans**

We have a good head start, thanks to GSoC. Our focus henceforth will be to streamline and build reusable components for MITHgrid. For users to truly appreciate the usability of the library, they should have access to a comprehensive toolkit. Similar libraries such as backbone.js offer an extensive toolkit that MITHgrid currently lacks. Another focus will be to build more complex scalable applications using third party APIs. In today's world, inter-operable systems are everywhere, and a library that wishes to be widely accepted needs to embrace it.