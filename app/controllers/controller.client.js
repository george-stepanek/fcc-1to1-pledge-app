$("document").ready(
	$.get(window.location.origin + '/api/:id', function (user) {
		var name = (user.displayName !== null ? user.displayName : user.username);
		
		$.get(window.location.origin + '/api/pledges/all', function (pledges) {
			var pledgeNodes = pledges.map(function(pledge) {
				return (
					<p key={pledge._id}>
						<img src={pledge.smallImageUrl}/>
						<br/>
						{pledge.title}
					</p>
				);
			});
			
			ReactDOM.render(
				<div>
					<User name={name}/>
					{pledgeNodes}
					<a href="/logout">Logout</a>
				</div>,
				document.getElementById('content')
			);
		});
	})
);
