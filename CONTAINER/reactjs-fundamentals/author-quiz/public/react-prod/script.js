"use strict";

(function () {

	'use strict';

	var Quiz = React.createClass({
		displayName: "Quiz",

		getInitialState: function getInitialState() {
			return {
				author: this.props.data[0],
				books: this.props.data[0].books
			};
		},
		propTypes: {
			data: React.PropTypes.array.isRequired
		},
		render: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ className: "row" },
					React.createElement(
						"div",
						{ className: "col-md-4" },
						React.createElement("img", { src: this.state.author.imageUrl, className: "authorimage col-md-3" })
					),
					React.createElement(
						"div",
						{ className: "col-md-7" },
						this.state.books.map(function (book) {
							return React.createElement(Book, { title: book });
						}, this)
					),
					React.createElement("div", { className: "col-md-1" })
				)
			);
		}
	});

	var books = ['The Lord of the Rings', 'The Iliad', 'The Adventures of Huckleberry Finn', 'The Scarlet Letter'];

	var data = [{
		name: 'Mark Twain',
		imageUrl: 'public/images/authors/marktwain.jpg',
		books: ['The Adventures of Huckleberry Finn']
	}, {
		name: 'Joseph Conrad',
		imageUrl: 'public/images/authors/josephconrad.png',
		books: ['Heart of Darkness']
	}, {
		name: 'J.K. Rowling',
		imageUrl: 'public/images/authors/jkrowling.jpg',
		imageSource: 'Wikimedia Commons',
		imageAttribution: 'Daniel Ogren',
		books: ['Harry Potter and the Sorcerers Stone']
	}, {
		name: 'Stephen King',
		imageUrl: 'public/images/authors/stephenking.jpg',
		imageSource: 'Wikimedia Commons',
		imageAttribution: 'Pinguino',
		books: ['The Shining', 'IT']
	}, {
		name: 'Charles Dickens',
		imageUrl: 'public/images/authors/charlesdickens.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['David Copperfield', 'A Tale of Two Cities']
	}, {
		name: 'William Shakespeare',
		imageUrl: 'public/images/authors/williamshakespeare.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
	}];

	var Book = React.createClass({
		displayName: "Book",

		propTypes: {
			title: React.PropTypes.string.isRequired
		},
		render: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"h4",
					null,
					this.props.title
				)
			);
		}
	});

	React.render(React.createElement(Quiz, { data: data }), document.getElementById("app"));
})();
//# sourceMappingURL=script.js.map
