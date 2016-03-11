var Header = React.createClass({
    getInitialState: function() {
	    $("document").ready(function () {
			// cancel the post-login redirect if the user cancels out of the login modal
			$('#login-modal').on('hide.bs.modal', function () {
	        	$.removeCookie("pageBeforeLogin", { path: '/' });
			});
			
			// pressing enter in the search text input will invoke it 
			$('#q').keypress(function(e){
	        	if(e.keyCode == 13) { $('#search-submit').click(); }
    		});
		});
	    
    	var user;
        $.ajax({
    		url: window.location.origin + '/api/:id',
    		cache : false,
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
					<li><a href={"/mypledges/" + this.state.user.id}>MY PLEDGES</a></li>
					<li><a href="/logout">SIGN OUT</a></li>
				</ul>
			);
		}
		else {
			return ( 
				<ul className="nav navbar-nav navbar-right">
					<li><a onClick={this.showLogin}>SIGN IN</a></li>
				</ul>
			);
		}
	},
	showLogin: function() {
		var url = window.location.href.replace(window.location.protocol, "").replace("//", "").replace(window.location.host, "");
		$.cookie("pageBeforeLogin", url, { path: '/' });
        $('#login-modal').modal('show');	
	},
	searchPledges: function() {
		this.props.updateUrl('/search?q=' + $('#q').val());
		$('#q').val("");
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
    					<a className="logo-link" href="/" title="Home">
    						<img className="logo-img" src="/public/images/Logo.jpg"/>
	    					<span className="logo-text">PLEDGES</span>
	    				</a>
    				</div>
    				<div className="collapse navbar-collapse" id="navbar-collapse">
    					{this.userMenu()}
						<ul className="nav navbar-nav navbar-right">
							<div className="navbar-form">
								<div className="input-group">
									<input type="text" id="q" className="form-control" placeholder="Search pledges..."/>
									<span className="input-group-btn">
										<button id="search-submit" className="btn btn-default" onClick={this.searchPledges}>
											<span className="glyphicon glyphicon-search"></span>
										</button>
									</span>
								</div>
							</div>
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
