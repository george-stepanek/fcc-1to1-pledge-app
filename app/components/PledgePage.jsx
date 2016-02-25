var PledgePage = React.createClass({
    pledgeId: "",
    getInitialState: function() {
        this.pledgeId = window.location.search.replace("?", "").split("=")[1];
    	var user, pledge, self = this;
        $.ajax({
    		url: window.location.origin + '/api/:id',
    		async: false,
    		type: "get",
    		success: function(result) {
                user = result;
    		}
        });
        $.ajax({
    		url: window.location.origin + '/api/pledge/' + self.pledgeId,
    		async: false,
    		type: "get",
    		success: function(result) {
                pledge = result;
    		}
        });
        return {user: user, pledge: pledge};
    },
	myImpact: function() {
		var self = this;
		if (this.state.pledge.users && this.state.pledge.users.filter(function(user) {return user.id == self.state.user.id;}).length > 0) {
			return ( 
				<p>Your contribution has been <b>{this.state.pledge.myImpactSoFar + " " +  this.state.pledge.impactUnits}</b> so far.</p>
			);
		}
		else {
			return "";
		}
	},
	submitButton: function() {
		var self = this;
		var id = "btn" + this.state.pledge._id;

		// If the pledge has pledged users AND one of those users is me
		if (this.state.pledge.users && this.state.pledge.users.filter(function(user) {return user.id == self.state.user.id;}).length > 0) {
			return ( 
				<button className="btn btn-social btn-danger" onClick={this.removeMe} id={id}>
					<i className="fa fa-times"id={id}></i><span id={id}> I've changed my mind</span>
				</button> 
			);
		}
		else {
			return ( 
				<button className="btn btn-social btn-success" onClick={this.addMe} id={id}>
					<i className="fa fa-check" id={id}></i><span id={id}> I pledge to do this</span>
				</button> 
			);
		}
	},
    addMe: function(e) {
		$("#" + e.target.id).prop("disabled", true);
		var id = e.target.id.replace("btn", "");
		var self = this;
		
		$.ajax({
			url: "/api/my/pledge/" + id,
			type: "post",
			success: function(result) {
		        self.refreshPledge(e.target.id);
		    }
		});
    },
    removeMe: function(e) {
		$("#" + e.target.id).prop("disabled", true);
		var id = e.target.id.replace("btn", "");
		var self = this;
		
		$.ajax({
			url: "/api/my/pledge/" + id,
			type: "delete",
			success: function(result) {
		        self.refreshPledge(e.target.id);
		    }
		});
    },
    refreshPledge: function(id) {
    	var self = this;
        $.ajax({
    		url: window.location.origin + '/api/pledge/' + self.pledgeId,
    		type: "get",
    		success: function(result) {
		        $("#" + id).prop("disabled", false);
		        self.setState({pledge: result});
		    }
        });    	
    },
    render: function() {
        return (
            <div>
                <Header />
        		<div className="container">
					<h4>{this.state.pledge.title.toUpperCase()}</h4>
					<p><img src={this.state.pledge.thumbnailUrl}/></p>
					<p>{this.state.pledge.explanation}</p>
					<p>Pledge to save <b>{this.state.pledge.impactPerWeek + " " + this.state.pledge.impactUnits}</b> per week.&nbsp;
					<cite>(Source: <a href={this.state.pledge.citation} target="_blank">{this.state.pledge.source}</a>)</cite></p>
					<p><b>{this.state.pledge.impactSoFar + " " +  this.state.pledge.impactUnits}</b> saved already!</p>
					{this.myImpact()}
					{this.submitButton()}
				</div>
        	    <Footer />
    		</div>
		);
	}
});
