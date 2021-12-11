var Hello = React.createClass({displayName: "Hello",
	render: function() {
		return (
			React.createElement("div", null, 
				React.createElement("h1", null, "Hello at ", this.props.now, "!")
			)
		);
	}
});

React.renderComponent(React.createElement(Hello, {now: new Date().toString()}), document.getElementById("container"));

