var MainPage = React.createClass({
    getInitialState: function() {
        if($.cookie("pledgeToAdd")) {
            this.props.updateUrl('/pledge/' + $.cookie("pledgeToAdd"), true);
            return null;
        }
		else if ($.cookie("pageBeforeLogin")) {
	        this.props.updateUrl($.cookie("pageBeforeLogin"), true);
	        $.removeCookie("pageBeforeLogin");
	        return null;
        }

    	var categories;
        $.ajax({
    		url: window.location.origin + '/api/all/categories',
    		cache : false,
    		async: false,
    		type: "get",
    		success: function(results) {
                categories = results;
    		}
        });
        document.title = "1to1 Movement Pledges";
        return {categories: categories};
    },
    render: function() {
    	if(this.state) {
			var categories = this.state.categories.map(function(category) {
				return (
					<div className="pledge-link col-lg-2 col-md-4 col-sm-6" key={category.title}>
						<a href={"/category/" + category.title}>
							<img src={category.imageUrl}/>
							<h4 className="pledge-thumb-title">
							    <span>{category.title.charAt(0).toUpperCase() + category.title.substr(1)}</span>
							</h4>
							<h4 className="pledge-info">
								{category.userCount} {category.userCount == 1 ? "person has " : "people have "}
								made a total of {category.pledgedCount} {category.title} related pledges so far&hellip;
							</h4>
						</a>
					</div>
				);
			});
			return (
	            <div>
					<div className="body-text">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
						Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
						Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
						Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					</div>
	        		<div className="row">
	        			<div className="col-lg-1"/>
	                    {categories}
	        		</div>
	    		</div>
			);
    	}
    	else {
    		return(<div/>);
    	}
	}
});
