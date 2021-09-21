# Simple Clipboard Logger

Implements logging for clipboard data such as copy and paste.

## Usage


There is a minified javascript file in the js folder. `simpleClipboardLogger.min.js` must be included on the page and is called with javascript:

```js
const logger = SimpleClipboardLogger( [options] )
```

## API Documentation

- methods
  - `addMetadata`: object or function. If an object the keys will be merged into the metadata object which is logged. If a function the function will be called with the clipboard event and the returned object will be merged into the metadata object.  
  - `addEventFilter`: function. Takes a function. The function takes a clipboard event and returns true if the event should be logged.
  - `addEventLogger`: Takes a function. The function provides a data object which can be logged.
