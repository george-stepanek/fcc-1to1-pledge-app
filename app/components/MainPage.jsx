var MainPage = React.createClass({
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
    
    	var user, pledges;
        $.ajax({
    		url: window.location.origin + '/api/:id',
    		async: false,
    		type: "get",
    		success: function(result) {
                user = result;
    		}
        });
        $.ajax({
    		url: window.location.origin + '/api/all/pledges',
    		async: false,
    		type: "get",
    		success: function(result) {
                pledges = result;
    		}
        });
        return {user: user, pledges: pledges};
    },
    refreshPledges: function(id) {
    	var self = this;
        $.ajax({
    		url: window.location.origin + '/api/all/pledges',
    		type: "get",
    		success: function(result) {
		        $("#" + id).prop("disabled", false);
		        self.setState({pledges: result});
		    }
        });    	
    },
    addMe: function(e) {
		$("#" + e.target.id).prop("disabled", true);
		var id = e.target.id.replace("btn", "");
		var self = this;
		
		$.ajax({
			url: "/api/my/pledge/" + id,
			type: "post",
			success: function(result) {
		        self.refreshPledges(e.target.id);
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
		        self.refreshPledges(e.target.id);
		    }
		});
    },
    render: function() {
    	var self = this;
        var user = this.state.user;
		var pledgeNodes = this.state.pledges.map(function(pledge) {
			return ( <Pledge pledge={pledge} user={user} removeMe={self.removeMe} addMe={self.addMe} key={pledge._id} /> );
		});
				
        return (
            <div>
                <Header />
        		<div className="container">
                    {pledgeNodes}
        		</div>
        	    <Footer />
    		</div>
		);
	}
});
