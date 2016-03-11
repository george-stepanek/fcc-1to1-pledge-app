var SearchPage = React.createClass({
    searchTerm: "",
    getInitialState: function() {
        this.searchTerm = window.location.search.replace("?", "").split("=")[1];
    	var pledges, self = this;
        $.ajax({
    		url: window.location.origin + '/api/search/pledges?q=' + self.searchTerm,
    		async: false,
    		cache : false,
    		type: "get",
    		success: function(result) {
                pledges = result;
    		}
        });
        
        if(pledges.length == 1) {
            this.props.updateUrl('/pledge/' + pledges[0].title.toLowerCase().replace(/\s/g, "-"), true);
            return null;
        }
        
        document.title = "Search Results - 1to1 Movement Pledges";
        return {pledges: pledges};
    },
    pledgeGroup: function() {
        if(this.state && this.state.pledges) {
            if(this.state && this.state.pledges && this.state.pledges.length > 0) {
                return ( <PledgeGroup pledges={this.state.pledges} /> );
            }
            else {
                return ( <div className="body-text">No pledges found for this search term: "{this.searchTerm}"</div> );
            }
        }
        else {
            return ("");
        }
    },
    render: function() {
        return ( <div>{this.pledgeGroup()}</div> );
	}
});
