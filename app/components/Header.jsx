var Header = React.createClass({
	getInitialState: function() {
		$("document").ready(function () {
			// We need to cancel the post-login redirect if the user has cancelled out of the login modal
			$('#login-modal').on('hide.bs.modal', function () {
				$.removeCookie("pageBeforeLogin", { path: '/' });
			});

			// Pressing enter in the search text input should invoke the search
			$('#q').keypress(function(e){
				if(e.keyCode == 13) { $('#search-submit').click(); }
			});
		});
		return {};
	},
	userMenu: function() {
		if (this.props.user) {
			return (
				<ul className="nav navbar-nav navbar-right">
					<li><a href={"/mypledges/" + this.props.user.id}>MY PLEDGES</a></li>
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
		// Save the current location so we can return to it after logging in
		var url = window.location.href.replace(window.location.protocol, "").replace("//", "").replace(window.location.host, "");
		$.cookie("pageBeforeLogin", url, { path: '/' });
		$('#login-modal').modal('show');
	},
	searchPledges: function() {
		this.props.updateUrl('/search?q=' + $('#q').val());
		$('#q').blur();		

		// Resetting the input control causes an issue for IE <= 10, so we check the user agent string for those versions
		var browser = navigator.userAgent.match(/MSIE.(\d+)/i);
		if (!browser || parseInt(browser[1], 10) > 10) {
			$('#q').val("");
		}
	},
	breadcrumbs: function() {
		var spacer = <span className="category-icon"><i className="fa fa-angle-right"></i></span>;
		if(this.props.url.indexOf('/pledge/') > -1 && this.props.pledge) {
			return (
				<span className="breadcrumbs">
					<a className="category-icon" href="/" title="Home"><i className="fa fa-home"></i></a>
					{spacer}
					<a className="category-icon" href={"/category/" + this.props.pledge.category} 
							title={this.props.pledge.category.charAt(0).toUpperCase() + this.props.pledge.category.substr(1) + " Pledges"}>
						<i className={"fa " + icons[this.props.pledge.category]}></i>
					</a>
					{spacer}
					<span className="category-icon" title={this.props.pledge.title}><i className="fa fa-thumbs-o-up"></i></span>
				</span>
			);
		}
		else if(this.props.url.indexOf('/category/') > -1) {
			var category = this.props.url.slice(this.props.url.lastIndexOf("/") + 1);
			return (
				<span className="breadcrumbs">
					<a className="category-icon" href="/" title="Home"><i className="fa fa-home"></i></a>
					{spacer}
					<span className="category-icon" title={category.charAt(0).toUpperCase() + category.substr(1) + " Pledges"}>
						<i className={"fa " + (icons[category] ? icons[category] : "fa-question-circle-o")}></i>
					</span>
				</span>
			);
		} 
		else if(this.props.url.indexOf('/mypledges') > -1) {
			return (
				<span className="breadcrumbs">
					<a className="category-icon" href="/" title="Home"><i className="fa fa-home"></i></a>
					{spacer}
					<span className="category-icon" title="My Pledges"><i className="fa fa-user"></i></span>
				</span>
			);
		} 
		else if(this.props.url.indexOf('/search') > -1) {
			return (
				<span className="breadcrumbs">
					<a className="category-icon" href="/" title="Home"><i className="fa fa-home"></i></a>
					{spacer}
					<span className="category-icon" title="Search"><i className="fa fa-search"></i></span>
				</span>
			);
		} 
		else {
			return (
				<span className="breadcrumbs">
					<a className="category-icon" href="/" title="Home"><i className="fa fa-home"></i></a>
				</span>
			);
		}
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
						<a href="/" target="_blank"  title="Home">
							<img className="logo-img" src="/public/images/Logo.jpg"/>
							<span className="logo-text">PLEDGES</span>
						</a>
						{this.breadcrumbs()}
						<div className="logo-padding">&#8203;</div>
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
								<h4 className="modal-title" id="modalLabel">Please sign in the same way each time:</h4>
							</div>
							<div className="modal-body login-buttons">
								<a className="btn btn-social btn-lg btn-facebook login-btn" href="/auth/facebook">
								<i className="fa fa-facebook"></i> Sign in via Facebook
							</a>
							&nbsp;
							<a className="btn btn-social btn-lg btn-google login-btn" href="/auth/google">
								<i className="fa fa-google"></i> Sign in via Google
							</a>
							</div>
						</div>
					</div>
				</div>
			</nav>
		);
	}
});
