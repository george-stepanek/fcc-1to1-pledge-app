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
            // Override the default behaviour for clicking the back & forwards browser buttons, because it's a single page app
            window.onpopstate = function(e) { self.setState({url: location.pathname}); };
        });
        return {url: window.location.href};
    },
    updateLinks: function() {
        var self = this;
        // For most links we want to override the default click behaviour, so we can keep it as a slick & fast single-page application
        $('a').click(function(e) {
            var href = $(this).attr("href");
            // However, control-clicking should not override the default behaviour, i.e. opening the new page in a new tab
            if (!e.ctrlKey && href && href.indexOf("logout") < 0 && href.indexOf("/auth/") < 0) {
                self.updateUrl(href);
                e.preventDefault();
         	}
        });
    },
    updateUrl: function(href, replace) {
        // Chrome sometimes makes duplicate page requests, so we need to make sure we don't add spurious history entries
        if(replace || href != window.location.pathname) {
            // Browsers like Opera and IE9 don't support the History API, so we need to ckeck that
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
                // Our fallback is working as a multi-page application
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
            // We don't have a specific 404 page, so any unrecognised URLs will simply display the main page
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
