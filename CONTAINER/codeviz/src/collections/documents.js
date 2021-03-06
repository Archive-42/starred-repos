
// -------------------------------------------------------------------------------------------------
// COLLECTIONS
// -------------------------------------------------------------------------------------------------

Documents = new Meteor.Collection('documents');

// -------------------------------------------------------------------------------------------------
// METEOR METHODS
// -------------------------------------------------------------------------------------------------

Meteor.methods({
	
	deleteDocument: function(id) {
		Documents.remove(id);
		if (!this.isSimulation)
			ShareJS.model.delete(id);
	}

});//Meteor.methods

// -------------------------------------------------------------------------------------------------
// END
// -------------------------------------------------------------------------------------------------