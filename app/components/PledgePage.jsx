var PledgePage = React.createClass({
	pledgeId: "",
	getInitialState: function() {
		var path = window.location.pathname;
		this.pledgeId = path.slice(path.lastIndexOf("/") + 1);

		// If the user was prompted to login when pledging, then we should automatically add them to that pledge
		if($.cookie("pledgeToAdd") == this.pledgeId && this.props.user) {
			this.addMe("afterLogin");
		}
		$.removeCookie("pledgeToAdd", { path: '/' });

		var pledge, self = this;
		$.ajax({
			url: window.location.origin + '/api/pledge/' + self.pledgeId,
			cache : false,
			async: false,
			type: "get",
			success: function(result) {
				pledge = result;
			}
		});

		// Populate the header breadcrumbs with details from this pledge
		this.props.setPledge(pledge);
		document.title = pledge.title + " - 1to1 Movement Pledges";
		return {pledge: pledge};
	},
	componentDidMount: function() {
		var self = this;
		$(window).on("load", function() {
			// Preload the image for the next pledge, for better performance when the user clicks through to it
			var next = new Image();
			next.src = self.state.pledge.imageUrl;
		});
	},
	impactPerWeek: function() {
		return (
			<p className="pledge-para">
				Pledge to save <i><b>
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

		// Only show the social sharing buttons if the pledge has pledged users, and one of those users is me
		var thisUserOnly = function(user) {return user.id == self.props.user.id;};
		if (this.props.user && this.state.pledge.users && this.state.pledge.users.filter(thisUserOnly).length > 0) {
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
					<p>
					<a className="pledge-btn" target="_blank" title="Share it"
							href={"https://www.facebook.com/sharer/sharer.php?u=" + window.location.href}>
						<i className="fa fa-facebook"></i>
					</a>
					<a className="pledge-btn" target="_blank" title="Tweet it"
							href={"https://twitter.com/intent/tweet?tw_p=tweetbutton&url=" + window.location.href + "&text=" + myPledge}>
						<i className="fa fa-twitter"></i>
					</a>
					&nbsp;
					<a className="pledge-btn" target="_blank" title="Pin it"
							href={"https://www.pinterest.com/pin/create/button/?url=" + window.location.href + "&description=" + myPledge +
							"&media=" + window.location.origin + this.state.pledge.imageUrl}>
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
					</p>
				</div>
			);
		}
		else {
			return (
				<div className="pledge-col col-md-6">
					{this.impactPerWeek()}
					<p>
						<button className="btn btn-social btn-lg btn-default" onClick={this.addMe} id="submit-button">
							<i className="fa fa-check"></i> I pledge to do this
						</button>
					</p>
				</div>
			);
		}
	},
	addMe: function(afterLogin) {
		if(afterLogin != "afterLogin" && !this.props.user) {
			$.cookie("pledgeToAdd", this.pledgeId, { path: '/' });
			$('#login-modal').modal('show');
			return;
		}

		$("#submit-button").prop("disabled", true);
		var self = this;
		$.ajax({
			url: "/api/my/pledge/" + self.pledgeId,
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
				<a className="arr-up" href={"/category/" + this.state.pledge.category} title="Back to category">^</a>
				<p className="pledge-title"><i>{this.state.pledge.title}</i></p>
				<div className="row pledge-row">
					<div className="pledge-col col-md-6">
						<p className="pledge-para">{this.state.pledge.explanation}</p>
						<p className="pledge-para">
							{this.state.pledge.userCount} {this.state.pledge.userCount == 1 ? "person has " : "people have "} saved a total of 
							<i><b> {this.state.pledge.impactSoFar + " " +  this.state.pledge.impactUnits}</b></i> so&nbsp;far&hellip;
						</p>
					</div>
					{this.myImpactAndButtons()}
				</div>
			</div>
		);
	}
});
