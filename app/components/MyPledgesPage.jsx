var MyPledgesPage = React.createClass({
    userId: "",
    getInitialState: function() {
    	var path = window.location.pathname;
    	this.userId = path.slice(path.lastIndexOf("/") + 1);
    	
    	var user, pledges;
        $.ajax({
    		url: window.location.origin + '/api/user/' + this.userId,
    		cache : false,
    		async: false,
    		type: "get",
    		success: function(result) {
                user = result;
    		}
        });
        
        $.ajax({
    		url: window.location.origin + '/api/my/pledges/' + this.userId,
    		cache : false,
    		async: false,
    		type: "get",
    		success: function(result) {
                pledges = result;
    		}
        });
        document.title = user.displayName + "'s Pledges - 1to1 Movement Pledges";
        return {user: user, pledges: pledges};
    },
    socialSharing: function() {
        var myPledges = "Here's my pledge achievements so far…";
        if(this.state.user.isCurrentUser) {
            return (
                <div className="body-text">
					<a className="share-btn" target="_blank" title="Share it"
							href={"https://www.facebook.com/sharer/sharer.php?u=" + window.location.href}>
						<i className="fa fa-facebook"></i>
					</a>
                    <a className="share-btn" target="_blank" title="Tweet this"
                            href={"https://twitter.com/intent/tweet?tw_p=tweetbutton&url=" + window.location.href + "&text=" + myPledges}>
                        <i className="fa fa-twitter"></i>
                    </a>
                    &nbsp;
                    <a className="share-btn" target="_blank" title="Pin this"
                            href={"https://www.pinterest.com/pin/create/button/?url=" + window.location.href + "&description=" + myPledges +	
                                "&media=" + window.location.origin + this.state.pledges[0].imageUrl}>
                        <i className="fa fa-pinterest"></i>
                    </a>
                    &nbsp;
                    <a className="share-btn" target="_blank" title="Share this"
                            href={"https://www.tumblr.com/widgets/share/tool?canonicalUrl=" + window.location.href + "&title=" + myPledges}>
                        <i className="fa fa-tumblr"></i>
                    </a>
                </div>
		    );
        }
	    else {
	        return "";
	    }
    },
    pledgeGroup: function() {
        if(this.state.pledges.length > 0) {
    		var pledges = this.state.pledges.map(function(pledge) {
    			return (
    				<div className="pledge-link col-lg-3 col-md-4 col-sm-6" key={pledge._id}>
    					<a href={"/pledge/" + pledge.title.toLowerCase().replace(/\s/g, "-")}>
    						<img src={pledge.thumbnailUrl}/>
    						<h4 className="pledge-info results-info">
    						    {pledge.impactSoFar + " " +  pledge.impactUnits} so&nbsp;far
    						</h4>
    						<h4 className="pledge-thumb-title my-pledge-title"><span>{pledge.title}</span></h4>
    					</a>
    				</div>
    			);
    		});
            return (
                <div>
                    <div className="body-text">
                        {this.state.user.displayName} has helped the planet by saving…
		    		</div>
		    		<div className="row">
                        {pledges}
                    </div>
                    {this.socialSharing()}
                </div>
            );
        }
        else {
            return ( <div className="body-text">You don't appear to have made any pledges yet.</div> );
        }
    },
    render: function() {
        return ( <div>{this.pledgeGroup()}</div> );
	}
});
