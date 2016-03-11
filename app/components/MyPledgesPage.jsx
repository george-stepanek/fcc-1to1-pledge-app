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
        var myPledges = "These are " + this.state.user.displayName + "'s pledges...";
        if(this.state.user.isCurrentUser) {
            return (
                <br>
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
                </br>
		    );
        }
	    else {
	        return "";
	    }
    },
    pledgeGroup: function() {
        if(this.state.pledges.length > 0) {
            return (
                <div>
                    <div className="none-found">
                        These are {this.state.user.displayName}'s pledges...
                        {this.socialSharing()}
		    		</div>
                    <PledgeGroup pledges={this.state.pledges} />
                </div>
            );
        }
        else {
            return ( <div className="none-found">You don't appear to have made any pledges yet.</div> );
        }
    },
    render: function() {
        return ( <div>{this.pledgeGroup()}</div> );
	}
});
