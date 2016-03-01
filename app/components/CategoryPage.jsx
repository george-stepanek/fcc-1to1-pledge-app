var CategoryPage = React.createClass({
    getInitialState: function() {
    	var path = window.location.pathname;
    	var category = path.slice(path.lastIndexOf("/") + 1);
    	
    	var pledges;
        $.ajax({
    		url: window.location.origin + '/api/category/pledges/' + category,
    		async: false,
    		type: "get",
    		success: function(result) {
                pledges = result;
    		}
        });
        return {pledges: pledges};
    },
    render: function() {
        return (
            <div>
                <Header />
        		<div>
                    <PledgeGroup pledges={this.state.pledges} />
        		</div>
    		</div>
		);
	}
});
