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
    refreshPledges: function(id) {
    	var self = this;
        $.ajax({
    		url: window.location.origin + '/api/my/pledges',
    		type: "get",
    		success: function(result) {
		        $("#" + id).prop("disabled", false);
		        self.setState({pledges: result});
		    }
        });    	
    },
    render: function() {
        return (
            <div>
                <Header />
        		<div className="container">
                    <PledgeGroup pledges={this.state.pledges} refreshPledges={this.refreshPledges} />
        		</div>
        	    <Footer />
    		</div>
		);
	}
});
