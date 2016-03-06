var PledgePage = React.createClass({
    pledgeId: "",
    getInitialState: function() {
    	var path = window.location.pathname;
    	this.pledgeId = path.slice(path.lastIndexOf("/") + 1);

    	var user, pledge, self = this;
        $.ajax({
    		url: window.location.origin + '/api/:id',
    		cache : false,
    		async: false,
    		type: "get",
    		success: function(result) {
                user = result;
    		}
        });

		if($.cookie("pledgeToAdd") == this.pledgeId && user) {
	    	this.addMe("afterLogin");
        }
	    $.removeCookie("pledgeToAdd", { path: '/' });

        $.ajax({
    		url: window.location.origin + '/api/pledge/' + self.pledgeId,
    		cache : false,
    		async: false,
    		type: "get",
    		success: function(result) {
                pledge = result;
    		}
        });
        return {user: user, pledge: pledge};
    },
    componentDidMount: function() {
    	// preload the images for the next/prev pledges, for better performance
	    var next = new Image();
	    next.src = this.state.pledge.imageUrl;
	    var prev = new Image();
	    prev.src = this.state.pledge.imageUrl;	
    },
    impactPerWeek: function() {
    	return (
			<p className="pledge-para">Pledge to save <i><b>
				{this.state.pledge.impactPerWeek + " " + this.state.pledge.impactUnits}
				</b></i> per week.
				<a href={this.state.pledge.citation} target="_blank" className="pledge-btn" title={"Source: " + this.state.pledge.source}>
					&nbsp;<i className="fa fa-external-link"></i>
				</a>
			</p>
		);
    },
	myImpactAndButtons: function() {
		var self = this;

		// If the pledge has pledged users AND one of those users is me
		var thisUserOnly = function(user) {return user.id == self.state.user.id;};
		if (this.state.user && this.state.pledge.users && this.state.pledge.users.filter(thisUserOnly).length > 0) {
			var myPledge = "I've pledged to save " + this.state.pledge.impactPerWeek + " " + this.state.pledge.impactUnits + " per week.";
			return (
				<div className="pledge-col col-md-6">
					{this.impactPerWeek()}
					<p className="pledge-para">
						Thank you for pledging!
						<br/>
						Your contribution has been <i><b>
							{this.state.pledge.myImpactSoFar + " " +  this.state.pledge.impactUnits}
						</b></i> so far.<br/>(Check back here for your progress!)
					</p>
	    		  	<a className="pledge-btn" target="_blank" title="Tweet it"
	    		  		href={"https://twitter.com/intent/tweet?tw_p=tweetbutton&url=" + window.location.href + "&text=" + myPledge}>
	    		    	<i className="fa fa-twitter"></i>
	    		  	</a>
	    		  	&nbsp;
	    		  	<a className="pledge-btn" target="_blank" title="Pin it"
	    		  		href={"https://www.pinterest.com/pin/create/button/?url=" + window.location.href + "&description=" + myPledge +	"&media=" + this.state.pledge.imageUrl}>
	    		    	<i className="fa fa-pinterest"></i>
	    		  	</a>
	    		  	&nbsp;
					<a className="pledge-btn" target="_blank" title="Share it"
						href={"https://www.tumblr.com/widgets/share/tool?canonicalUrl=" + window.location.href + "&title=" + myPledge}>
	    		    	<i className="fa fa-tumblr"></i>
	    		  	</a>
	    		  	&nbsp;
		    		<a className="pledge-btn" onClick={this.removeMe} id="submit-button" title="I've changed my mind">
						<i className="fa fa-times-circle-o"></i>
					</a>
				</div>
			);
		}
		else {
			return (
				<div className="pledge-col col-md-6">
					{this.impactPerWeek()}
					<button className="btn btn-social btn-lg btn-default" onClick={this.addMe} id="submit-button">
						<i className="fa fa-check"></i> I pledge to do this
					</button>
				</div>
			);
		}
	},
    addMe: function(afterLogin) {
		if(afterLogin != "afterLogin" && !this.state.user) {
		    $.cookie("pledgeToAdd", this.pledgeId, { path: '/' });
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
    		cache : false,
    		type: "get",
    		success: function(result) {
		        $("#submit-button").prop("disabled", false);
		        self.setState({pledge: result});
		    }
        });
    },
    render: function() {
        return (
    		<div className="pledge-page">
        <span className="pledge-img pledge-span"></span>
				<img className="pledge-img" src={this.state.pledge.imageUrl}/>
				<a className="arr-btn arr-prev" href={"/pledge/" + this.state.pledge.prevPledge} title="Previous pledge">&nbsp;</a>
				<a className="arr-btn arr-next" href={"/pledge/" + this.state.pledge.nextPledge} title="Next pledge">&nbsp;</a>
				<p className="pledge-title"><i>{this.state.pledge.title}</i></p>
				<div className="row">
					<div className="pledge-col col-md-6">
						<p className="pledge-para">{this.state.pledge.explanation}</p>
						<p className="pledge-para">A total of <i><b>
							{this.state.pledge.impactSoFar + " " +  this.state.pledge.impactUnits}
						</b></i> have been saved already!</p>
					</div>
					{this.myImpactAndButtons()}
				</div>
			</div>
		);
	}
});
