$("document").ready($.get(window.location.origin + '/api/:id', function (user) {
	var name = (user.displayName !== null ? user.displayName : user.username);
	
	ReactDOM.render(
		<div>
			<User name={name}/>
			<a href="/logout">Logout</a>
		</div>,
		document.getElementById('content')
	);
}));
