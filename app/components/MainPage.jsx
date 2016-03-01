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
				<div className="pledge-link col-lg-3 col-md-4 col-sm-6" key={category.title}>
					<a href={"/category/" + category.title}>
						<img src={category.imageUrl}/>
						<h4 className="pledge-thumb-title">
						    <span>{category.title.charAt(0).toUpperCase() + category.title.substr(1)}</span>
						</h4>
					</a>
				</div>
			);
		});
		return (
            <div>
                <Header />
        		<div>
                    {categories}
        		</div>
    		</div>
		);
	}
});
