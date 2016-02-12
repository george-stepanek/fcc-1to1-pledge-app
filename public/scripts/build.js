var User = React.createClass({displayName: "User",
	render: function() {
		return (React.createElement("p", null, "Welcome, ", this.props.name, "!"));
	}
});

$("document").ready(function() {
	// Probably not the best way to go about this but works for now 
	if (window.location.pathname == "/") {
		$.get(window.location.origin + '/api/pledges/all', function (pledges) {
			var pledgeNodes = pledges.map(function(pledge) {
				return (
					React.createElement("div", {key: pledge._id}, 
						React.createElement("p", null, 
							React.createElement("img", {src: pledge.smallImageUrl}), 
							React.createElement("br", null), 
							pledge.title
						), 
						React.createElement("hr", null)
					)
				);
			});
			
			ReactDOM.render(
				React.createElement("div", null, 
					pledgeNodes, 
					React.createElement("a", {href: "/logout"}, "Logout")
				),
				document.getElementById('content')
			);
		})
	}
	else if (window.location.pathname == "/profile") {
		$.get(window.location.origin + '/api/:id', function (user) {
			var name = (user.displayName !== null ? user.displayName : user.username);
			ReactDOM.render(
				React.createElement("div", null, 
					React.createElement(User, {name: name}), 
					React.createElement("a", {href: "/logout"}, "Logout")
				),
				document.getElementById('content')
			);
		})
	}
});
