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
        		<div className="pledge-page">
					<img className="pledge-img" src={this.state.pledge.imageUrl}/>
					<p className="pledge-title"><i>{this.state.pledge.title}</i></p>
					<div className="container-fluid pledge">
						<p>{this.state.pledge.explanation}</p>
						<p>Pledge to save <b>{this.state.pledge.impactPerWeek + " " + this.state.pledge.impactUnits}</b> per week.</p>
						<p><cite>(Source: <a href={this.state.pledge.citation} target="_blank">{this.state.pledge.source}</a>)</cite></p>
						<p><b>{this.state.pledge.impactSoFar + " " +  this.state.pledge.impactUnits}</b> saved already!</p>
						{this.myImpact()}
						{this.submitButton()}
					</div>
				</div>
    		</div>
		);
	}
});

/*
???    https://www.tumblr.com/widgets/share/tool?canonicalUrl=http://testkitchen.huffingtonpost.com/tumblr-porn/
Share  https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Ftestkitchen.huffingtonpost.com%2F482583%2F&display=popup&ref=plugin&src=like&app_id=113869198637480
Tweet  https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fabout.twitter.com%2Fresources%2Fbuttons&ref_src=twsrc%5Etfw&text=Inside%20the%20Surprisingly%20Sexy%20World%20of%20Tumblr%20Porn&tw_p=tweetbutton&url=http%3A%2F%2Ftestkitchen.huffingtonpost.com%2Ftumblr-porn%2F
Pin it https://www.pinterest.com/pin/create/button/?url=http%3A%2F%2Ftestkitchen.huffingtonpost.com%2Ftumblr-porn&media=https%3A%2F%2Frm-content.s3.amazonaws.com%2Freadymag%2Fupload-4ca89e30-d57f-11e5-87f8-5f96c7c39296.jpg&description=Inside%20The%20Surprising%20World%20of%20Tumblr%20Porn

http://testkitchen.github.io/social_share.jpg
*/