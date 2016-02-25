var PledgeThumbnail = React.createClass({
	render: function() {
		return (
			<div className="pledgeLink">
				<a href={"/pledge?id=" + this.props.pledge._id}>
					<img src={this.props.pledge.thumbnailUrl}/>
					<h4 className="pledgeTitle"><span>{this.props.pledge.title.toUpperCase()}</span></h4>
				</a>
			</div>
		);
	}
});
