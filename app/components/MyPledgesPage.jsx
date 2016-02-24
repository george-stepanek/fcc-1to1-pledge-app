var MyPledgesPage = React.createClass({
    getInitialState: function() {
	    $("document").ready(function () {
	        // recommended fix for facebook authentication bug
	        if (window.location.hash && window.location.hash === "#_=_") {
	            if (window.history && window.history.pushState) {
	                window.history.pushState("", document.title, window.location.pathname);
	            } else {
	                location.hash = "";
	            }
	        }
	    });
    
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
