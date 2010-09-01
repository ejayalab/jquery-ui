/*
 * jQuery UI Panel @VERSION
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 */
(function($, undefined) {

	$.widget(
		"ui.panel",
		{
			options : {
				event : "click",
				collapsible : true,
				collapsed : false,
				collapseType : 'up', // up, left, right
				collapseSpeed : 'fast',
				draggable : false,
				stackable : true, // automatically create special
									// stack area (navigation window
									// emulation)
				controls : false,
				accordionGroupClass : false,
				cookie : null, // accepts jQuery cookie Plugin
								// options, e.g. { name: 'myPanel',
								// expires: 7, path: '/', domain:
								// 'jquery.com', secure: true }
				icons : {
					header : 'ui-icon-triangle-1-e',
					headerSelected : 'ui-icon-triangle-1-s',
					headerRight : 'ui-icon-arrowthickstop-1-n',
					headerRightSelected : 'ui-icon-arrowthickstop-1-e',
					headerLeft : 'ui-icon-arrowthickstop-1-s',
					headerLeftSelected : 'ui-icon-arrowthickstop-1-w'
				}
			},
	
			_create : function() {
				var self = this, 
					options = self.options;
				
				// common classes
				self.classWidget = "ui-panel ui-widget ui-helper-reset";
				self.classWidgetVertical = "ui-widget-vertical";
	
				panelBox = self.element;
				self.id = panelBox.attr('id');
				panelBox.addClass(self.classWidget);
	
				// header
				self.header = panelBox
					.children(':first')
					.addClass("ui-panel-header ui-panel-header-active ui-helper-reset ui-state-default ui-state-active ui-corner-top")
					.bind("mouseenter.panel", function() {
						if (options.disabled) {
							return;
						}
						$(this).addClass("ui-state-hover");
					}).bind("mouseleave.panel", function() {
						if (options.disabled) {
							return;
						}
						$(this).removeClass("ui-state-hover");
					}).bind("focus.panel", function() {
						$(this).addClass("ui-state-focus");
					}).bind("blur.panel", function() {
						$(this).removeClass("ui-state-focus");
					});
				
				// content
				self.header
					.next()
					.addClass("ui-panel-content ui-panel-content-active ui-helper-reset ui-widget-content ui-corner-bottom");
	
				// ist-ui-panel backward compatibility
				if (options.collapseType == "slide-left") {
					options.collapseType = "left";
				}
				if (options.collapseType == "slide-right") {
					options.collapseType = "right";
				}
				if (options.collapseType == "default") {
					options.collapseType = "top";
				}
	
				panelBox.attr("role", "panel");
	
				if (options.collapsible) {
					if (options.event) {
						self.header
							.bind(options.event + ".panel", function(event) {
								return self._clickHandler.call(self, event, this);
							});
					}
					
					// restore state from cookie
					if (options.cookie) {
						if (self._cookie()==0) {
							options.collapsed = false;
						} else {
							options.collapsed = true;
						}
					}
					
					
					if (options.collapsed) {
						self.toggle(0, true);
					}
					
				} else {
					// change options if not collapsible
					options.collapsed = false;
					options.icons = false;
				}
	
				self._createIcons();
				// store original width to restore later
				self.originalWidth = panelBox.css('width');
	
				// swap title's display property to calculate title width
				if (options.collapseType != "up") {
					title = self.header.find("a:first");
					title.css('display', 'inline-block');
					self.titleWidth = parseInt(title.css('width').replace('px', '')) + 50;
					title.css('display', 'block');
				}
	
			},
	
			_cookie: function() {
				var cookie = this.cookie || 
					(this.cookie = this.options.cookie.name || 'ui-panel-'+this.id);
			    return $.cookie.apply(null, [cookie].concat($.makeArray(arguments)));
			},
			
			_createIcons : function() {
				var self = this, options = self.options;
	
				self.iconHeader = false;
				self.iconHeaderSelected = false;
	
				if (options.icons) {
					self.iconHeader = options.icons.header,
					self.iconHeaderSelected = options.icons.headerSelected;
	
					// calculate icons for left and right sliding panels
					switch (options.collapseType) {
						case "left":
							self.iconHeader = options.icons.headerLeft;
							self.iconHeaderSelected = options.icons.headerLeftSelected;
							break;
						case "right":
							self.iconHeader = options.icons.headerRight;
							self.iconHeaderSelected = options.icons.headerRightSelected;
							break;
					};
	
					$("<span></span>")
						.addClass("ui-icon " + self.iconHeader)
						.prependTo(self.header);
	
					self.header
						.filter(".ui-state-active")
						.find(".ui-icon")
						.removeClass(self.iconHeader)
						.addClass(self.iconHeaderSelected);
	
					self.element.addClass("ui-panel-icons");
				}
			},
	
			_destroyIcons : function() {
				var self = this;
				self.header.children(".ui-icon").remove();
				self.element.removeClass("ui-panel-icons");
				self.iconHeader = false;
				self.iconHeaderSelected = false;
			},
	
			_setOption : function(key, value) {
				var self = this;
				$.Widget.prototype._setOption.apply(this, arguments);
	
				switch (key) {
					case "icons":
						self._destroyIcons();
						if (value) {
							self._createIcons();
						}
						break;
				}
	
			},
	
			_keydown : function(event) {
				if (this.options.disabled || event.altKey || event.ctrlKey) {
					return;
				}
				return true;
			},
	
			_clickHandler : function(event, target) {
				var options = this.options;
				if (options.disabled) {
					return;
				}
	
				this.toggle(options.collapseSpeed);
	
				return;
			},
	
			destroy : function() {
				var self = this;
	
				self.element
					.removeClass(self.classWidget)
					.removeAttr("role");
	
				self.header
					.unbind(".panel")
					.removeClass("ui-panel-header ui-panel-header-active ui-panel-disabled ui-helper-reset ui-corner-top ui-corner-all ui-state-default ui-state-active ui-state-disabled");
	
				self.header
					.next()
					.css("display", "")
					.removeClass("ui-panel-content ui-panel-content-active ui-panel-disabled ui-helper-reset ui-corner-bottom ui-state-disabled ui-widget-content");
	
				self._destroyIcons();
				
				if (self.options.cookie ) {
					this._cookie( null, self.options.cookie );
				}
				
				return $.Widget.prototype.destroy.call(this);
			},
	
			toggle : function(collapseSpeed, innerCall) {
				var self = this, 
					options = self.options;
	
				self.header
					.toggleClass("ui-state-active ui-corner-top ui-corner-all ui-panel-header-active")
					.find(".ui-icon")
						.toggleClass(self.iconHeader)
						.toggleClass(self.iconHeaderSelected)
					.end()
					.next()
						.toggleClass("ui-panel-content-active");
	
				if (options.collapseType != "up") {
					if (self.element.hasClass(self.classWidgetVertical)) {
						css = {
							'width' : self.originalWidth,
							'margin-top' : 'auto'
						};
					} else {
						css = {
							'width' : self.titleWidth,
							'margin-top' : self.titleWidth
						};
					}
					self.element.css(css).toggleClass(self.classWidgetVertical);
				}
				
	            if (!innerCall) {
	                if (options.cookie) {
	                    self._cookie(Number(options.collapsed), options.cookie);
	                }
	            }
	
			}
	
		});

	$.extend($.ui.panel, {
		version : "@VERSION"
	});

})(jQuery);
