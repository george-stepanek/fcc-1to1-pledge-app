var MyPledgesPage = React.createClass({
    getInitialState: function() {
    	var pledges;
        $.ajax({
    		url: window.location.origin + '/api/my/pledges',
    		async: false,
    		type: "get",
    		success: function(result) {
                pledges = result;
    		}
        });
        return {pledges: pledges};
    },
    pledgeGroup: function() {
        if(this.state.pledges.length > 0) {
            return ( <PledgeGroup pledges={this.state.pledges} /> );
        }
        else {
            return ( <span>You don't appear to have made any pledges yet.</span> );
        }
    },
    render: function() {
        return (
            <div>
                <Header />
        		<div className="container">
                    {this.pledgeGroup()}
        		</div>
        	    <Footer />
    		</div>
		);
	}
});
