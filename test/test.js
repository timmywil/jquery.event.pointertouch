(function () {
	'use strict';
	describe('Lifts properties', function() {
		var event;
		var $clicker = $('#clicker');

		/**
		 * Create a native event for firing
		 * @param {string} type
		 */
		function createEvent(type) {
			var e = { type: type };
			$.each(['pageX', 'pageY', 'clientX', 'clientY', 'touches'], function(i, prop) {
				e[prop] = 1;
			});
			return e;
		}

		$.each(['pointerdown', 'pointermove', 'pointerup'], function(i, name) {
			describe(name, function() {
				var pointerEvent;
				before(function() {
					pointerEvent = $.event.fix(createEvent(name));
				});
				it('should lift the pageX/pageY properties', function() {
					expect(pointerEvent).to.have.property('pageX');
					expect(pointerEvent).to.have.property('pageY');
				});
				it('should lift the clientX/clientY properties', function() {
					expect(pointerEvent).to.have.property('clientX');
					expect(pointerEvent).to.have.property('clientY');
				});
			});
		});

		$.each(['touchstart', 'touchmove', 'touchend'], function(i, name) {
			describe(name, function() {
				var touchEvent;
				before(function() {
					touchEvent = $.event.fix(createEvent(name));;
				});
				it('should lift the touches property', function() {
					expect(touchEvent).to.have.property('touches');
				});
				it('should lift the pageX/pageY properties', function() {
					expect(touchEvent).to.have.property('pageX');
					expect(touchEvent).to.have.property('pageY');
				});
				it('should lift the clientX/clientY properties', function() {
					expect(touchEvent).to.have.property('clientX');
					expect(touchEvent).to.have.property('clientY');
				});
			});
		});
	});
})();
