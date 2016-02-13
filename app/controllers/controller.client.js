$("document").ready(function() {
	// Probably not the best way to go about this but works for now 
	if (window.location.pathname == "/") {
		$.get(window.location.origin + '/api/all/pledges', function (pledges) {
			var pledgeNodes = pledges.map(function(pledge) {
				return (
					<div key={pledge._id}>
						<p>
							<img src={pledge.smallImageUrl}/>
							<br/>
							{pledge.title}
						</p>
						<hr/>
					</div>
				);
			});
			
			ReactDOM.render(
				<div>
					{pledgeNodes}
					<a href="/logout">Logout</a>
				</div>,
				document.getElementById('content')
			);
		})
	}
	else if (window.location.pathname == "/profile") {
		$.get(window.location.origin + '/api/:id', function (user) {
			var name = (user.displayName !== null ? user.displayName : user.username);
			ReactDOM.render(
				<div>
					<User name={name}/>
					<a href="/logout">Logout</a>
				</div>,
				document.getElementById('content')
			);
		})
	}
});
