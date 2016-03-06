var PageRouter = React.createClass({
    getInitialState: function() {
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
            if (href && href.indexOf("logout") < 0 && href.indexOf("/auth/") < 0) {
                self.updateUrl(href);
                e.preventDefault();
         	}
        });
    },
    updateUrl: function(href, replace) {
        if(replace) {
            history.replaceState('', 'New URL: ' + href, href);
        }
        else {
            history.pushState('', 'New URL: ' + href, href);
        }
        this.setState({url: href});
        this.updateLinks();        
    },
    getPage: function() {
        if(this.state.url.indexOf('/category/') > -1) {
            return ( <CategoryPage key={this.state.url} /> );
        } else if(this.state.url.indexOf('/pledge/') > -1) {
            return ( <PledgePage key={this.state.url} /> );
        } else if(this.state.url.indexOf('/mypledges') > -1) {
            return ( <MyPledgesPage key={this.state.url} /> );
        } else if(this.state.url.indexOf('/search') > -1) {
            return ( <SearchPage key={this.state.url} updateUrl={this.updateUrl} /> );
        } else {
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
