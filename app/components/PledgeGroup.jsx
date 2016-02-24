var PledgeGroup = React.createClass({
    getInitialState: function() {
    	var user;
        $.ajax({
    		url: window.location.origin + '/api/:id',
    		async: false,
    		type: "get",
    		success: function(result) {
                user = result;
    		}
        });
        return {user: user};
    },
    addMe: function(e) {
		$("#" + e.target.id).prop("disabled", true);
		var id = e.target.id.replace("btn", "");
		var self = this;
		
		$.ajax({
			url: "/api/my/pledge/" + id,
			type: "post",
			success: function(result) {
		        self.props.refreshPledges(e.target.id);
		    }
		});
    },
    removeMe: function(e) {
		$("#" + e.target.id).prop("disabled", true);
		var id = e.target.id.replace("btn", "");
		var self = this;
		
		$.ajax({
			url: "/api/my/pledge/" + id,
			type: "delete",
			success: function(result) {
		        self.props.refreshPledges(e.target.id);
		    }
		});
    },
    render: function() {
    	var self = this;
        var user = this.state.user;
		var pledgeNodes = this.props.pledges.map(function(pledge) {
			return ( <Pledge pledge={pledge} user={user} removeMe={self.removeMe} addMe={self.addMe} key={pledge._id} /> );
		});
				
        return (
    		<div>
                {pledgeNodes}
    		</div>
		);
	}
});
