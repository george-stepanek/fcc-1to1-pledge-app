var CategoryPage = React.createClass({
	category: "",
	getInitialState: function() {
		var path = window.location.pathname;
		this.category = path.slice(path.lastIndexOf("/") + 1);

		var pledges, self = this;
		$.ajax({
			url: window.location.origin + '/api/category/pledges/' + self.category,
			cache : false,
			async: false,
			type: "get",
			success: function(result) {
				pledges = result;
			}
		});
		document.title = this.category[0].toUpperCase() + this.category.substring(1) + " Pledges - 1to1 Movement Pledges";
		return {pledges: pledges};
	},
	pledgeGroup: function() {
		if(this.state && this.state.pledges && this.state.pledges.length > 0) {
			return ( <PledgeGroup pledges={this.state.pledges} /> );
		}
		else {
			return ( <div className="body-text">No pledges found for this category: "{this.category}"</div> );
		}
	},
	render: function() {
		return ( <div>{this.pledgeGroup()}</div> );
	}
});
