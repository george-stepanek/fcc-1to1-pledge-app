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
            if (href.indexOf("/") > -1 && href.indexOf("logout") < 0) {
                history.pushState('', 'New URL: ' + href, href);
                self.setState({url: href});
                 self.updateLinks();
                 e.preventDefault();
         	}
        });
    },
    getPage: function() {
        if(this.state.url.indexOf('/category/') > -1) {
            return ( <CategoryPage key={this.state.url} /> );
        } else if(this.state.url.indexOf('/pledge/') > -1) {
            return ( <PledgePage key={this.state.url} /> );
        } else if(this.state.url.indexOf('/mypledges') > -1) {
            return ( <MyPledgesPage key={this.state.url} /> );
        } else if(this.state.url.indexOf('/search') > -1) {
            return ( <SearchPage key={this.state.url} /> );
        } else {
            return ( <MainPage key={this.state.url} /> );
        }
    },
    render: function() {
        return ( <div><Header />{this.getPage()}</div> );
    }
});
