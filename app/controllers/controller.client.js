$("document").ready(function() {
	// Probably not the best way to go about this but works for now 
	if (window.location.pathname == "/") {
		$.get(window.location.origin + '/api/all/pledges', function (pledges) {
			$.get(window.location.origin + '/api/:id', function (user) {
				var pledgeNodes = pledges.map(function(pledge) {
					var method = "post"; // Default type
					var pledged = "Pledge!"; // Default button text
					// If the pledge has pledged users
					if (pledge.users) {
						// Check if loggedin user has already pledged
						if (pledge.users.filter(function(val) {return val.id == user.id;}).length > 0) {
							pledged = "Remove Pledge";
							method = "delete";
						}
					}
					var action = "/api/my/pledge/" + pledge._id; // Set url
					// Button click function
					function submitForm() {
						// Get the pledge method (post/delete) and text
						var method = $("#method" + pledge._id).val();
						var pledged = $("#btn" + pledge._id).text();
						// Disable button
						$("#btn" + pledge._id).prop("disabled", true);
						// Send ajax call
						$.ajax({
							url: action,
							type: method,
							success: function(result) {
								// On success, change method and btn text
								$("#method" + pledge._id).val(method == "post" ? "delete" : "post");
						        $("#btn" + pledge._id).text(pledged == "Pledge!" ? "Remove Pledge" : "Pledge!");
						        // Enable button
						        $("#btn" + pledge._id).prop("disabled", false);
						    }
						})
					}
					// Return pseudo-form
					return (
						<div key={pledge._id}>
							<input type="hidden" id={"method" + pledge._id} value={method}/>
							<p>
								<img src={pledge.thumbnailUrl}/>
								<br/>
								{pledge.title}
							</p>
							<button className="btn btn-primary" onClick={submitForm} id={"btn" + pledge._id}>{pledged}</button>
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
			});
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
