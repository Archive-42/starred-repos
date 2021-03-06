
// ---------------------------------------------------------------------------------------------------------------------
// EditorViewFactory
// ---------------------------------------------------------------------------------------------------------------------

this.EditorViewFactory = {

	//VIEWS
	docListView: _docListView,
	 editorView: _editorView,

	//TEST-VIEWS
	docListTestView: _docListTestView

}//EditorViewFactory

// ---------------------------------------------------------------------------------------------------------------------
// VIEW FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

function _docListView(classes) {

	var WIDTH = 220;
	var classes = classes || [];

	// -----------------------------------------------------------------------------------------------------------------

	var layout = new famous.views.SequentialLayout({
	    direction: famous.utilities.Utility.Direction.Y,
	    //itemSpacing: 20
	});

	var surfaces = [];
	layout.sequenceFrom(surfaces);

	// -----------------------------------------------------------------------------------------------------------------

	var docListAdd = new library.meteor.core.Surface({
		template: Template.docListAdd,
		size: [WIDTH, 47],
		classes: classes,
		properties: {
			marginTop: '10px', 
			marginLeft: '5px',
			overflow: 'hidden',
			backgroundColor: 'white'
		}
	});

	var docList = new library.meteor.core.Surface({
		template: Template.docList,
		size: [WIDTH, 600],
		classes: classes,
		properties: {
			overflow: 'scroll',
			backgroundColor: 'white'
		}
	});

	// Template.docList.rendered = function() {
	// 	console.log('docList.rendered')
	// 	//element = contentSurface._currTarget;
	// 	var list = $('.div-docList');
	// 	//docList.setSize([WIDTH,list.offsetHeight]);
	// 	console.log(list.height());
	// }

	// -----------------------------------------------------------------------------------------------------------------

	surfaces.push(docListAdd);
	surfaces.push(docList);

	// -----------------------------------------------------------------------------------------------------------------

	return layout;

}//_docListView

// ---------------------------------------------------------------------------------------------------------------------

function _editorView() {

	var editor = new library.meteor.core.Surface({
        template: Template.editor,
        size: [undefined, undefined],
        properties: {
            backgroundColor: 'white'
        }
    });

    return editor;
}

// ---------------------------------------------------------------------------------------------------------------------
// TEST VIEW FUNCTIONS
// ---------------------------------------------------------------------------------------------------------------------

function _docListTestView() {

	var view = new famous.core.View();

    var mod = new famous.core.Modifier({
        origin: [.5, 0],
        size: [300, 300]
    });
	
	var docList = this.docListView(['div-docList-test']);

	view.add(mod).add(docList);

	return view;
}

// ---------------------------------------------------------------------------------------------------------------------
// END
// ---------------------------------------------------------------------------------------------------------------------