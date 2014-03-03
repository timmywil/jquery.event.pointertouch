(function () {
	'use strict';
	describe('Lifts properties', function() {
		var event;
		var $clicker = $('#clicker');
		var list = 'over out down up move enter leave cancel'.split(' ');
		var touchReplace = { down: 'start', up: 'end' };

		/**
		 * Create a native event for firing
		 * @param {string} type
		 */
		function createEvent(type) {
			var e = { type: type };
			$.each($.event.mouseHooks.props.concat(
				['touches', 'changedTouches', 'targetTouches', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey']
			), function(i, prop) {
				e[prop] = 1;
			});
			return e;
		}

		/**
		 * Ensure the event has all of the appropriate mouse properties
		 * @param {jQuery.Event} event
		 */
		function testMouseProps(event) {
			it('should lift the pageX/pageY properties', function() {
				expect(event).to.have.property('pageX');
				expect(event).to.have.property('pageY');
			});
			it('should lift the clientX/clientY properties', function() {
				expect(event).to.have.property('clientX');
				expect(event).to.have.property('clientY');
			});
			it('should lift the offsetX/offsetY properties', function() {
				expect(event).to.have.property('offsetX');
				expect(event).to.have.property('offsetY');
			});
			it('should lift the screenX/screenY properties', function() {
				expect(event).to.have.property('screenX');
				expect(event).to.have.property('screenY');
			});
		}

		// Pointer events
		if (window.PointerEvent) {
			$.each(list, function(i, name) {
				name = 'pointer' + name;
				describe(name, function() {
					var pointerEvent = $.event.fix(createEvent(name));
					testMouseProps(pointerEvent);
				});
			});
		} else {
			// Touch events
			$.each(list.slice(2), function(i, name) {
				name = 'touch' + (touchReplace[name] || name);
				describe(name, function() {
					var touchEvent = $.event.fix(createEvent(name));
					testMouseProps(touchEvent);
					it('should lift the touches properties', function() {
						expect(touchEvent).to.have.property('touches');
						expect(touchEvent).to.have.property('changedTouches');
						expect(touchEvent).to.have.property('targetTouches');
					});
					it('should lift the key properties', function() {
						expect(touchEvent).to.have.property('altKey');
						expect(touchEvent).to.have.property('ctrlKey');
						expect(touchEvent).to.have.property('metaKey');
						expect(touchEvent).to.have.property('shiftKey');
					});
				});
			});
		}

		describe('Pointertouch export', function() {
			$.each(list, function(i, prop) {
				it('should have the ' + prop + ' property', function() {
					expect($.pointertouch).to.have.property(prop);
				});
			});
		});
	});
})();
