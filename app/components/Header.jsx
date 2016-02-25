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
	    return null;
    },
    render: function() {
        return (
    		<nav className="navbar navbar-default">
    			<div className="container-fluid">
    				{/* Brand and toggle get grouped for better mobile display */}
    				<div className="navbar-header">
    					<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
    					<span className="sr-only">Toggle navigation</span>
    					<span className="icon-bar"></span>
    					<span className="icon-bar"></span>
    					<span className="icon-bar"></span>
    					</button>
    					<a className="navbar-brand" href="/">1to1</a>
    				</div>
    				
    				{/* Collect the nav links, forms, and other content for toggling */}
    				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
    					<ul className="nav navbar-nav">
    						<li className="active"><a href="/">Home</a></li>
    						<li><a href="/mypledges">My Pledges</a></li>
    					</ul>
    					<ul className="nav navbar-nav navbar-right">
    						<form className="navbar-form navbar-left" role="search" action="/search" method="get">
    							<div className="input-group">
    								<input type="text" name="q" className="form-control" placeholder="Search pledges..."/>
    								<span className="input-group-btn">
    									<button type="submit" className="btn btn-default">Search</button>
    								</span>
    							</div>
    						</form>
    						<li className="dropdown">
    							<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">User <span className="caret"></span></a>
    							<ul className="dropdown-menu">
    								<li><a href="/profile">Profile</a></li>
    								<li role="separator" className="divider"></li>
    								<li><a href="/logout">Logout</a></li>
    							</ul>
    						</li>
    					</ul>
    				</div>
    			</div>
    		</nav>
		);
	}
});
