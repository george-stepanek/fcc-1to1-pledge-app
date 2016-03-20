var PageRouter = React.createClass({
    getInitialState: function() {
        // Fix for IE 10 and below
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + 
				(window.location.port ? ':' + window.location.port: '');
		}
		
        var self = this;
        $( document ).ready(function() {
            self.updateLinks();
            window.onpopstate = function(e) { self.setState({url: location.pathname}); };
        });
        return {url: window.location.href};
    },
    updateLinks: function() {
        var self = this;
        $('a').click(function(e) {
            var href = $(this).attr("href");
            if (!e.ctrlKey && href && href.indexOf("logout") < 0 && href.indexOf("/auth/") < 0) {
                self.updateUrl(href);
                e.preventDefault();
         	}
        });
    },
    updateUrl: function(href, replace) {
        if(replace || href != window.location.pathname) {
            if(window.history.replaceState) {
                if(replace) {
                    window.history.replaceState('', 'New URL: ' + href, href);
                }
                else {
                    window.history.pushState('', 'New URL: ' + href, href);
                }
                this.setState({url: href});
                this.updateLinks();
            }
            else {
                window.location.href = href;
            }
        }
    },
    getPage: function() {
        if(this.state.url.indexOf('/pledge/') > -1) {
            return ( <PledgePage key={this.state.url} /> );
        }
        else if(this.state.url.indexOf('/category/') > -1) {
            return ( <CategoryPage key={this.state.url} /> );
        } 
        else if(this.state.url.indexOf('/mypledges') > -1) {
            return ( <MyPledgesPage key={this.state.url} /> );
        } 
        else if(this.state.url.indexOf('/search') > -1) {
            return ( <SearchPage key={this.state.url} updateUrl={this.updateUrl} /> );
        } 
        else {
            return ( <MainPage key={this.state.url} updateUrl={this.updateUrl} /> );
        }
    },
    render: function() {
        return ( 
            <div>
                <Header updateUrl={this.updateUrl} />
                {this.getPage()}
            </div>
        );
    }
});

$("document").ready(function() {
	ReactDOM.render(<PageRouter/>, document.getElementById('content'));
});
