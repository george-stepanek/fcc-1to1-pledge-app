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
	        
			// cancel the post-login redirect if the user cancels out of the login modal
			$('#login-modal').on('hide.bs.modal', function () {
	        	$.removeCookie("pageBeforeLogin");
			});
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
				<ul className="nav navbar-nav navbar-right">
					<li><a href="/mypledges">MY PLEDGES</a></li>
					<li><a href="/logout">SIGN OUT</a></li>
				</ul>
			);
		}
		else {
			return ( 
				<ul className="nav navbar-nav navbar-right">
					<li><a href="#" onClick={this.showLogin}>SIGN IN</a></li>
				</ul>
			);
		}
	},
	showLogin: function() {
	    $.cookie("pageBeforeLogin", window.location.href, { path: '/' });
        $('#login-modal').modal('show');	
	},
	render: function() {
        return (
    		<nav className="navbar navbar-default">
    			<div className="container-fluid">
    				<div className="navbar-header">
	    				<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
    					<a className="logo-link" href="/">
    						<img className="logo-img" src="/public/images/Logo.jpg"/>
    					</a>
    				</div>
    				<div className="collapse navbar-collapse" id="navbar-collapse">
	    				<a className="logo-link" href="/">
	    					<span className="logo-text">PLEDGES</span>
	    				</a>
    					{this.userMenu()}
						<ul className="nav navbar-nav navbar-right">
							<form className="navbar-form" role="search" action="/search" method="get">
								<div className="input-group">
									<input type="text" name="q" className="form-control" placeholder="Search pledges..."/>
									<span className="input-group-btn">
										<button type="submit" className="btn btn-default"><span className="glyphicon glyphicon-search"></span></button>
									</span>
								</div>
							</form>
						</ul>
					</div>
				</div>
				<div className="modal fade" id="login-modal" role="dialog" aria-labelledby="modalLabel">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" id="modalLabel">Please sign in using the same service each time:</h4>
							</div>
							<div className="modal-body login-buttons">
								<a className="btn btn-social btn-lg btn-facebook login-btn" href="/auth/facebook">
			        		    	<i className="fa fa-facebook"></i> Sign in with Facebook
			        		  	</a>
			        		  	&nbsp;
			        		  	<a className="btn btn-social btn-lg btn-google login-btn" href="/auth/google">
			        		    	<i className="fa fa-google"></i> Sign in with Google
			        		  	</a>
							</div>
						</div>
					</div>
				</div>
    		</nav>
		);
	}
});
