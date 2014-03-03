# jquery.event.pointertouch

## Loading jquery.event.pointertouch

Pointertouch can be included with your scripts at the end of the body,
but Pointertouch supports AMD for javascript module love.

With script tags:

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
<script src="/js/plugins/jquery.event.pointertouch.js"></script>
```

With AMD loader in an anonymous module:

```js
define([ "jquery", "plugins/jquery.event.pointertouch" ], function( $, eventNames ) {
  $('.target').on('pointerdown mousedown touchstart', function(e) {
    console.log(e.pageX, e.pageY);
  });
});
```

## Usage Examples

```js
// Bind to events as usual
$elem.on('pointerdown', function(e) {
	// These properties will be available on the jQuery object
	console.log(e.touches, e.pageX, e.pageY, e.clientX, e.clientY);
});
// Harness the pointertouch feature detection
// to know to which events to bind
// See "The pointertouch export" below for more info on `"names"`
define(['jquery', 'plugins/jquery.event.pointertouch'], function($, names) {
	$elem.on(events.down, function(e) {
		console.log(e.type);
	});
});
```

### The pointertouch export

### `names`
Type: *Object*  
This is a convenience object for binding your own pointer/touch/mouse events.

**Properties:**
```js
define(['jquery', 'plugins/jquery.event.pointertouch'], function($, names) {
	// May equal "mousedown touchstart" or "pointerdown" depending on PointerEvent support
	names.down;
	// "mouseup touchend" or "pointerup"
	names.up;
	// "mousemove touchmove" or "pointermove"
	names.move;
});

// Note that the events export is available at...
$.pointertouch;
// => { down: '...', up: '...', move: '...' };
```

## Contributing
Follow the same coding style present in the repo and add tests for any bug fix or feature addition.

See the [CONTRIBUTING.md](https://github.com/timmywil/jquery.event.pointertouch/blob/master/CONTRIBUTING.md) for more info.

## Release History

**0.0.6** (*2/27/14*) Expose event names object on jQuery
**0.0.5** (*2/27/14*) First real release

## License
Copyright (c) 2014 Timmy Willison. Licensed under the MIT license.
