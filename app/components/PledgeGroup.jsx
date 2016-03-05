var PledgeGroup = React.createClass({
    componentDidMount: function() {
    	// preload the images for the pledges in this group, for better performance
    	for(var i = 0; i < this.props.pledges.length; i++) {
		    var img = new Image();
		    img.src = this.props.pledges[i].imageUrl;
    	}
    },
    render: function() {
		var pledges = this.props.pledges.map(function(pledge) {
			return (
				<div className="pledge-link col-lg-3 col-md-4 col-sm-6" key={pledge._id}>
					<a href={"/pledge/" + pledge.title.toLowerCase().replace(/\s/g, "-")}>
						<img src={pledge.thumbnailUrl}/>
						<h4 className="pledge-thumb-title"><span>{pledge.title}</span></h4>
						<h4 className="pledge-info">{pledge.explanation.slice(0, 100)}&hellip;</h4>
					</a>
				</div>
			);
		});
        return (
        	<div className="row">
        		{pledges}
        	</div>
        );
	}
});
