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
        
        if(pledges.length == 1) {
            this.props.updateUrl('/pledge/' + pledges[0].title.toLowerCase().replace(/\s/g, "-"), true);
            return null;
        }
        
        return {pledges: pledges};
    },
    pledgeGroup: function() {
        if(this.state && this.state.pledges && this.state.pledges.length > 0) {
            return ( <PledgeGroup pledges={this.state.pledges} /> );
        }
        else {
            return ( <div className="none-found">No pledges found for this search term: "{this.searchTerm}"</div> );
        }
    },
    render: function() {
        return ( <div>{this.pledgeGroup()}</div> );
	}
});
