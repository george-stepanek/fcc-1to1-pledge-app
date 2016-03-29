var PledgeGroup = React.createClass({
	componentDidMount: function() {
		// Preload the main images for the pledges in this group, for better performance when the user clicks through to them
		for(var i = 0; i < this.props.pledges.length; i++) {
			var img = new Image();
			img.src = this.props.pledges[i].imageUrl;
		}
	},
	render: function() {
		var pledges = this.props.pledges.map(function(pledge) {
			// Bootstrap will arrange it in rows of four, three, two or one depending on how wide the display is
			return (
				<div className="pledge-link col-lg-3 col-md-4 col-sm-6" key={pledge._id}>
					<a href={"/pledge/" + pledge.title.toLowerCase().replace(/\s/g, "-")}>
						<img src={pledge.thumbnailUrl}/>
						<h4 className="pledge-thumb-title"><span>{pledge.title}</span></h4>
						<h4 className="pledge-info">
							{pledge.userCount} {pledge.userCount == 1 ? "person has " : "people have "} saved a total
							of {pledge.impactSoFar + " " +  pledge.impactUnits} so&nbsp;far&hellip;
						</h4>
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
