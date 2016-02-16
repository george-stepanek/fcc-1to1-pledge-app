var LoginPage = React.createClass({
	render: function() {
        return (
            <div>
                <Header />
        		<div className="container">
        		 	<a className="btn btn-social btn-facebook" href="/auth/facebook">
        		    	<i className="fa fa-facebook"></i> Login with Facebook
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
