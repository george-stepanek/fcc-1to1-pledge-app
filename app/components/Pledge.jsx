var Pledge = React.createClass({
	submitButton: function() {
		var self = this;
		var id = "btn" + this.props.pledge._id;

		// If the pledge has pledged users AND one of those users is me
		if (this.props.pledge.users && this.props.pledge.users.filter(function(user) {return user.id == self.props.user.id;}).length > 0) {
			return ( <button className="btn-danger" onClick={this.props.removeMe} id={id}>I've changed my mind</button> );
		}
		else {
			return ( <button className="btn-success" onClick={this.props.addMe} id={id}>I pledge to do this</button> );
		}
	},
	render: function() {
		return (
			<div key={this.props.pledge._id}>
				<div className="pledgeLink" data-toggle="modal" data-target={"#modal" + this.props.pledge._id}>
					<img src={this.props.pledge.thumbnailUrl}/>
					<h4 className="pledgeTitle"><span>{this.props.pledge.title}</span></h4>
				</div>
				<div className="modal fade" id={"modal" + this.props.pledge._id} role="dialog" aria-labelledby="modalLabel">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" id="modalLabel">{this.props.pledge.title}</h4>
							</div>
							<div className="modal-body">
								<p><img src={this.props.pledge.thumbnailUrl}/></p>
								<p>{this.props.pledge.explanation}</p>
								<p>Pledge to save <b>{this.props.pledge.impactPerWeek + " " + this.props.pledge.impactUnits}</b> per week.</p>
								<p><b>{this.props.pledge.impactSoFar + " " +  this.props.pledge.impactUnits}</b> saved already!</p>
								<cite>Source: <a href={this.props.pledge.citation} target="_blank">{this.props.pledge.source}</a></cite>
							</div>
							<div className="modal-footer">
								{this.submitButton()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
});
