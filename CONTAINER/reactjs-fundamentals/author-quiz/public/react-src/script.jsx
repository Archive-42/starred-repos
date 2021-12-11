(function () {

	'use strict';

	var Quiz = React.createClass({
		getInitialState: function() {
			return {
				author: this.props.data[0],
				books: this.props.data[0].books
			};
		},
		propTypes: {
			data: React.PropTypes.array.isRequired
		},
		render: function() {
			return (
				<div>
					<div className="row">
						<div className="col-md-4">
							<img src={this.state.author.imageUrl} className="authorimage col-md-3" />
						</div>
						<div className="col-md-7">
							{this.state.books.map(function(book) {
								return <Book title={book} />
							}, this)}
						</div>
						<div className="col-md-1"></div>
					</div>
				</div>
			);
		}
	});

	var books = [
		'The Lord of the Rings',
		'The Iliad',
		'The Adventures of Huckleberry Finn',
		'The Scarlet Letter'
	]

	var data = [
		{
			name: 'Mark Twain',
			imageUrl: 'public/images/authors/marktwain.jpg',
			books: ['The Adventures of Huckleberry Finn']
		},
		{
			name: 'Joseph Conrad',
			imageUrl: 'public/images/authors/josephconrad.png',
			books: ['Heart of Darkness']
		},
		{
			name: 'J.K. Rowling',
			imageUrl: 'public/images/authors/jkrowling.jpg',
			imageSource: 'Wikimedia Commons',
			imageAttribution: 'Daniel Ogren',
			books: ['Harry Potter and the Sorcerers Stone']
		},
		{
			name: 'Stephen King',
			imageUrl: 'public/images/authors/stephenking.jpg',
			imageSource: 'Wikimedia Commons',
			imageAttribution: 'Pinguino',
			books: ['The Shining','IT']
		},
		{
			name: 'Charles Dickens',
			imageUrl: 'public/images/authors/charlesdickens.jpg',
			imageSource: 'Wikimedia Commons',
			books: ['David Copperfield', 'A Tale of Two Cities']
		},
		{
			name: 'William Shakespeare',
			imageUrl: 'public/images/authors/williamshakespeare.jpg',
			imageSource: 'Wikimedia Commons',
			books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
		}
	];

	var Book = React.createClass({
		propTypes: {
			title: React.PropTypes.string.isRequired
		},
		render: function() {
			return (
				<div>
					<h4>{this.props.title}</h4>
				</div>
			);
		}
	});

	React.render(<Quiz data={data} />, document.getElementById("app") );

})();