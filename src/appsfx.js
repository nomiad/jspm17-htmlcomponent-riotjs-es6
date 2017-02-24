define(["app/static", "htmlcomponent", "app/app"], function(static, htmlcomponent, main) {
	htmlcomponent.setStaticLoader(static);
	main.default();
});
