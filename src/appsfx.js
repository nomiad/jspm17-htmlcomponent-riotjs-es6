define(["app/static", "htmlcomponent", "app/app"], function(staticComp, htmlcomponent, main) {
	htmlcomponent.setStaticLoader(staticComp);
	main.default();
});
