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
        
        if($.cookie("pledgeToAdd") == this.pledgeId && user) {
		    this.addMe("afterLogin");
        }
	    $.removeCookie("pledgeToAdd");
	    
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
		var thisUserOnly = function(user) {return user.id == self.state.user.id;};
		if (this.state.user && this.state.pledge.users && this.state.pledge.users.filter(thisUserOnly).length > 0) {
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

		// If the pledge has pledged users AND one of those users is me
		var thisUserOnly = function(user) {return user.id == self.state.user.id;};
		if (this.state.user && this.state.pledge.users && this.state.pledge.users.filter(thisUserOnly).length > 0) {
			return ( 
				<button className="btn btn-social btn-danger" onClick={this.removeMe} id="submit-button">
					<i className="fa fa-times"></i> I've changed my mind
				</button> 
			);
		}
		else {
			return ( 
				<button className="btn btn-social btn-success" onClick={this.addMe} id="submit-button">
					<i className="fa fa-check"></i> I pledge to do this
				</button> 
			);
		}
	},
    addMe: function(afterLogin) {
		if(afterLogin != "afterLogin" && !this.state.user) {
		    $.cookie("pledgeToAdd", this.pledgeId);
		    $('#login-modal').modal('show');
		    return;
		}

		$("#submit-button").prop("disabled", true);
		var self = this;
		$.ajax({
			url: "/api/my/pledge/" + self.pledgeId,
    		async: false,
    		type: "post",
			success: function(result) {
	            self.refreshPledge();
		    }
		});
    },
    removeMe: function() {
		$("#submit-button").prop("disabled", true);
		var self = this;
		$.ajax({
			url: "/api/my/pledge/" + self.pledgeId,
			type: "delete",
			success: function(result) {
		        self.refreshPledge();
		    }
		});
    },
    refreshPledge: function() {
    	var self = this;
        $.ajax({
    		url: window.location.origin + '/api/pledge/' + self.pledgeId,
    		type: "get",
    		success: function(result) {
		        $("#submit-button").prop("disabled", false);
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
