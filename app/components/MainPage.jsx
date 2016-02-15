var MainPage = React.createClass({
    getInitialState: function() {
        var user, pledges;
        $.ajax({
    		url: window.location.origin + '/api/:id',
    		async: false,
    		type: "get",
    		success: function(result) {
                user = result;
    		}
        });
        $.ajax({
    		url: window.location.origin + '/api/all/pledges',
    		async: false,
    		type: "get",
    		success: function(result) {
                pledges = result;
    		}
        });
        return {user: user, pledges: pledges};
    },
    addMeToPledge: function() {
    	
    },
    removeMeFromPledge: function() {
    	
    },
    render: function() {
        var user = this.state.user;
		var pledgeNodes = this.state.pledges.map(function(pledge) {
			var method = "post"; // Default type
			var pledged = "I pledge to do this"; // Default button text
			var btnClass = "btn-success"; // Default button class
			// If the pledge has pledged users
			if (pledge.users) {
				// Check if loggedin user has already pledged
				if (pledge.users.filter(function(val) {return val.id == user.id;}).length > 0) {
					btnClass = "btn-danger";
					pledged = "I've changed my mind";
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
				        $("#btn" + pledge._id).text(pledged == "I pledge to do this" ? "I've changed my mind" : "I pledge to do this");
				        // Change class (color)
				        $("#btn" + pledge._id).toggleClass("btn-success btn-danger");
				        // Enable button
				        $("#btn" + pledge._id).prop("disabled", false);
				    }
				});
			}
			// Return pseudo-form
			return (
				<div key={pledge._id}>
					<input type="hidden" id={"method" + pledge._id} value={method}/>
					<div className="pledgeLink" data-toggle="modal" data-target={"#modal" + pledge._id}>
						<img src={pledge.thumbnailUrl}/>
						<h4 className="pledgeTitle"><span>{pledge.title}</span></h4>
					</div>
					<div className="modal fade" id={"modal" + pledge._id} role="dialog" aria-labelledby="modalLabel">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
									<h4 className="modal-title" id="modalLabel">{pledge.title}</h4>
								</div>
								<div className="modal-body">
									<p>
										<img src={pledge.thumbnailUrl}/>
									</p>
									<p>
										{pledge.explanation}
									</p>
									<p>
										Pledge to save <b>{pledge.impactPerWeek + " " + pledge.impactUnits}</b> per week.
									</p>
									<p>
										<b>{pledge.impactSoFar + " " +  pledge.impactUnits}</b> saved already!
									</p>
									<cite>
										Source: <a href={pledge.citation} target="_blank">{pledge.source}</a>
									</cite>
								</div>
								<div className="modal-footer">
									<button className={"btn " + btnClass} onClick={submitForm} id={"btn" + pledge._id}>
										{pledged}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		});
				
        return (
            <div>
                <Header />
        		<div className="container">
                    {pledgeNodes}
        		</div>
        	    <Footer />
    		</div>
		);
	}
});
