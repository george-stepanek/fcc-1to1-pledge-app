var MainPage = React.createClass({
    getInitialState: function() {
        if($.cookie("pledgeToAdd")) {
            window.location.replace(window.location.origin + '/pledge/' + $.cookie("pledgeToAdd"));
            return null;
        }
        else if ($.cookie("pageBeforeLogin")) {
	        window.location.replace($.cookie("pageBeforeLogin"));
	        $.removeCookie("pageBeforeLogin");
	        return null;
        }
        
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
        		<div>
                    <PledgeGroup pledges={this.state.pledges} />
        		</div>
    		</div>
		);
	}
});
