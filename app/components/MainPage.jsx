var MainPage = React.createClass({
    getInitialState: function() {
    	var pledges;
        $.ajax({
    		url: window.location.origin + '/api/all/pledges',
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
        		<div className="container">
                    <PledgeGroup pledges={this.state.pledges} />
        		</div>
        	    <Footer />
    		</div>
		);
	}
});
