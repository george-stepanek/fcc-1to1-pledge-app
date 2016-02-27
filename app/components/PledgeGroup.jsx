var PledgeGroup = React.createClass({
    render: function() {
		var pledges = this.props.pledges.map(function(pledge) {
			return (
				<div className="pledge-link" key={pledge._id}>
					<a href={"/pledge/" + pledge.title.toLowerCase().replace(/\s/g, "-")} >
						<img src={pledge.thumbnailUrl}/>
						<h4 className="pledge-thumb-title"><span>{pledge.title}</span></h4>
						<h4 className="pledge-info">{pledge.explanation.slice(0, 100)}...</h4>
					</a>
				</div>
			);
		});
        return ( <div>{pledges}</div> );
	}
});
