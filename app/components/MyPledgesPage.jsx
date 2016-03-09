var MyPledgesPage = React.createClass({
    getInitialState: function() {
    	var pledges;
        $.ajax({
    		url: window.location.origin + '/api/my/pledges',
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
            return ( <PledgeGroup pledges={this.state.pledges} /> );
        }
        else {
            return ( <div className="none-found">You don't appear to have made any pledges yet.</div> );
        }
    },
    render: function() {
        return ( <div>{this.pledgeGroup()}</div> );
	}
});
