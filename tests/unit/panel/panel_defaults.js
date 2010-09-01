/*
 * panel_defaults.js
 */

var panel_defaults = {
	disabled: false,
	event: "click",
	collapsible: true,
    collapsed: false,
    collapseType: 'up',
    collapseSpeed: 'fast',
    draggable: false,
    stackable: true,
    controls: false,
    accordionGroupClass: false,
    cookie: null,
	icons: {
		header : 'ui-icon-triangle-1-e',
		headerSelected : 'ui-icon-triangle-1-s',
		headerRight : 'ui-icon-arrowthickstop-1-n',
		headerRightSelected : 'ui-icon-arrowthickstop-1-e',
		headerLeft : 'ui-icon-arrowthickstop-1-s',
		headerLeftSelected : 'ui-icon-arrowthickstop-1-w'
	}
	
};

commonWidgetTests('panel', { defaults: panel_defaults });
