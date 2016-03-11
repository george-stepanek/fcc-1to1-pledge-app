var MyPledgesPage = React.createClass({
    userId: "",
    getInitialState: function() {
    	var path = window.location.pathname;
    	this.userId = path.slice(path.lastIndexOf("/") + 1);
    	var pledges;
        $.ajax({
    		url: window.location.origin + '/api/my/pledges/' + this.userId,
    		cache : false,
    		async: false,
    		type: "get",
    		success: function(result) {
                pledges = result;
    		}
        });
        
        document.title = "My Pledges - 1to1 Movement Pledges";
        return {pledges: pledges};
    },
    pledgeGroup: function() {
        if(this.state.pledges.length > 0) {
            var myPledges = "These are my pledges...";
            return (
                <div>
                    <div className="none-found">
                        These are &lt;name&gt;'s pledges...
                        <br/>
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
