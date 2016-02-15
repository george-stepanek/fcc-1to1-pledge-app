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
	    var name = (this.state.user.displayName !== null ? this.state.user.displayName : this.state.user.username);
        return (
            <div>
                <Header />
        		<div className="container">
        			<User name={name} />
        			<a href="/logout">Logout</a>
        		</div>
        	    <Footer />
    		</div>
		);
	}
});
