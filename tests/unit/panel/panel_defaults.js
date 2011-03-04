var panel_defaults = {
	disabled: false,
	event: "click",
	collapsible: true,
    expanded: true,
    expandType: 'down',
    expandSpeed: 'fast',
    draggable: false,
    resizable: false,
    stackable: true,
    controls: false,
    accordionGroupName: false,
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