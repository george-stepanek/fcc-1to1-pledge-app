var MainPage = React.createClass({
    getInitialState: function() {
        if($.cookie("pledgeToAdd")) {
            window.location.replace(window.location.origin + '/pledge/' + $.cookie("pledgeToAdd"));
            return null;
        }
        else if ($.cookie("pageBeforeLogin")) {
	        window.location.replace($.cookie("pageBeforeLogin"));
	        $.removeCookie("pageBeforeLogin");
	        return null;
        }
        
    	var categories;
        $.ajax({
    		url: window.location.origin + '/api/all/categories',
    		async: false,
    		type: "get",
    		success: function(results) {
                categories = results;
    		}
        });
        return {categories: categories};
    },
    render: function() {
		var categories = this.state.categories.map(function(category) {
			return (
				<div className="pledge-link col-lg-2 col-md-4 col-sm-6" key={category.title}>
					<a href={"/category/" + category.title}>
						<img src={category.imageUrl}/>
						<h4 className="pledge-thumb-title">
						    <span>{category.title.charAt(0).toUpperCase() + category.title.substr(1)}</span>
						</h4>
						<h4 className="pledge-info">Click to see the {category.title}&#8209;related pledges&hellip;</h4>
					</a>
				</div>
			);
		});
		return (
            <div>
                <Header />
				<div className="none-found">
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
});
