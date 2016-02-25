var PledgeGroup = React.createClass({
    render: function() {
		var pledgeNodes = this.props.pledges.map(function(pledge) {
			return ( <PledgeThumbnail pledge={pledge} key={pledge._id} /> );
		});
        return ( <div>{pledgeNodes}</div> );
	}
});
