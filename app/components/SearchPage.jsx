var SearchPage = React.createClass({
    searchTerm: "",
    getInitialState: function() {
        this.searchTerm = window.location.search.replace("?", "").split("=")[1];
    	var pledges, self = this;
        $.ajax({
    		url: window.location.origin + '/api/search/pledges?q=' + self.searchTerm,
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
    		url: window.location.origin + '/api/search/pledges?q=' + self.searchTerm,
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
