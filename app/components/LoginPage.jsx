var LoginPage = React.createClass({
	render: function() {
        return (
            <div>
                <Header />
        		<div className="container">
        		 	<a className="btn btn-social btn-github" href="/auth/github">
        		    	<i className="fa fa-github"></i> Login with GitHub
        		  	</a>
        		  	&nbsp;
        		  	<a className="btn btn-social btn-google" href="/auth/google">
        		    	<i className="fa fa-google"></i> Login with Google
        		  	</a>
        		</div>
        	    <Footer />
    		</div>
		);
	}
});
