var Footer = React.createClass({
	render: function() {
        return (
    		<footer className="footer">
    			<div className="container">
    				<p className="text-muted">&copy; Copyright {new Date().getFullYear()}</p>
    			</div>
    		</footer>
		);
	}
});
