var path = require( "path" );

function resolveCss( context, file, common ) {
	var absolute = path.resolve( appConfig.root, ( common ? "node_modules/@lk/web-common-ui/src/" : "client/" ) + "less/" + file + ".less" );
	var relative = path.relative( context, absolute );
	return {
		absolute: absolute,
		relative: relative
	};
}

module.exports = function( input ) {
	this.cacheable();
	var themeName = appConfig.theme;

	var themeBase = resolveCss( this.context, "themes/base.theme.variables", true );
	var theme = resolveCss( this.context, "themes/" + themeName + ".theme", true );
	var appThemeBase = resolveCss( this.context, "themes/base.theme.variables" );
	var appTheme = resolveCss( this.context, "themes/" + themeName + ".theme" );

	this.addDependency( themeBase.absolute );
	this.addDependency( theme.absolute );
	this.addDependency( appThemeBase.absolute );
	this.addDependency( appTheme.absolute );

	var themeBaseImport = "@import \"" + themeBase.relative + "\";\n";
	var themeImport = "@import \"" + theme.relative + "\";\n";
	var appThemeBaseImport = "@import \"" + appThemeBase.relative + "\";\n";
	var appThemeImport = "@import \"" + appTheme.relative + "\";\n";

	return themeBaseImport + themeImport + appThemeBaseImport + appThemeImport + input;
};
