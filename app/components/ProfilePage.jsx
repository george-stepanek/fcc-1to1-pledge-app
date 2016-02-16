var ProfilePage = React.createClass({
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
	render: function() {
        return (
            <div>
                <Header />
        		<div className="container">
        			<User name={this.state.user.displayName} />
        			<a href="/logout">Logout</a>
        		</div>
        	    <Footer />
    		</div>
		);
	}
});
