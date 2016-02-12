var User = React.createClass({displayName: "User",
	render: function() {
		return (React.createElement("p", null, "Welcome, ", this.props.name, "!"));
	}
});

$("document").ready(
	$.get(window.location.origin + '/api/:id', function (user) {
		var name = (user.displayName !== null ? user.displayName : user.username);
		
		$.get(window.location.origin + '/api/pledges/all', function (pledges) {
			var pledgeNodes = pledges.map(function(pledge) {
				return (
					React.createElement("p", {key: pledge._id}, 
						React.createElement("img", {src: pledge.smallImageUrl}), 
						React.createElement("br", null), 
						pledge.title
					)
				);
			});
			
			ReactDOM.render(
				React.createElement("div", null, 
					React.createElement(User, {name: name}), 
					pledgeNodes, 
					React.createElement("a", {href: "/logout"}, "Logout")
				),
				document.getElementById('content')
			);
		});
	})
);
