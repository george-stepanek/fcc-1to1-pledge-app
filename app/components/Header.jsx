var Header = React.createClass({
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
	userMenu: function() {
		if (this.state.user) {
			return ( 
				<ul className="dropdown-menu">
					<li><a href="/profile">Profile</a></li>
					<li><a href="/mypledges">My Pledges</a></li>
					<li role="separator" className="divider"></li>
					<li><a href="/logout">Logout</a></li>
				</ul>
			);
		}
		else {
			return ( 
				<ul className="dropdown-menu">
					<li><a href="#" data-toggle="modal" data-target="#login-modal">Login</a></li>
				</ul>
			);
		}
	},
	render: function() {
        return (
    		<nav className="navbar navbar-default">
    			<div className="container-fluid">
    				<div className="navbar-header">
    					<a className="navbar-brand" href="/">1to1 Movement <i>Pledges</i></a>
    				</div>
					<ul className="nav navbar-nav navbar-right">
						<form className="navbar-form navbar-left" role="search" action="/search" method="get">
							<div className="input-group">
								<input type="text" name="q" className="form-control" placeholder="Search pledges..."/>
								<span className="input-group-btn">
									<button type="submit" className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
								</span>
							</div>
						</form>
						<li className="dropdown">
							<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
								<span className="glyphicon glyphicon-menu-hamburger"></span>
							</a>
							{this.userMenu()}
						</li>
					</ul>
    			</div>
				<div className="modal fade" id="login-modal" role="dialog" aria-labelledby="modalLabel">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" id="modalLabel">Login</h4>
							</div>
							<div className="modal-body">
								<a className="btn btn-social btn-facebook" href="/auth/facebook">
			        		    	<i className="fa fa-facebook"></i> Login with Facebook
			        		  	</a>
			        		  	&nbsp;
			        		  	<a className="btn btn-social btn-google" href="/auth/google">
			        		    	<i className="fa fa-google"></i> Login with Google
			        		  	</a>
							</div>
						</div>
					</div>
				</div>
    			
    		</nav>
		);
	}
});
