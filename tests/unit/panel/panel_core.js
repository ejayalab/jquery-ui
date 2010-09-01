/*
 * panel_core.js
 */


(function($) {

module("panel: core");

test("accessibility", function () {
	expect(1);
	var ac = $('#panel1').panel();

	equals( ac.attr("role"), "panel", "main role");
});

})(jQuery);
