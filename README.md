# Simple Clipboard Logger

[![npm](https://img.shields.io/npm/v/simple-clipboard-logger)](https://www.npmjs.com/package/simple-clipboard-logger)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/simple-clipboard-logger)](https://www.npmjs.com/package/simple-clipboard-logger)

This library implements an extensible logger for capturing and analyzing clipboard data.

The majority of the code is in [SimpleClipboardLogger.ts](src/SimpleClipboardLogger.ts). The logger adds event listeners to the `copy`, `cut`, and `paste` events. These event listeners collect metadata from the event as well as user supplied metadata providers and pass the metadata to user supplied loggers.

The library comes with several example `metadataProviders` which can be used to add the date, href, and a unique id to the clipboard data.
the library also comes with a couple of `eventLoggers` which can be used to log data to the console or to a remote server.

The library does not override any default behavior or modify the clipboard, it just calls additional functions when the events are triggered.

## Example Usage

**As a script tag**

```html
<!-- include the clipboard logger minified file -->
<script type="text/javascript" src="simple-clipboard-logger.min.js"></script>
<script type="text/javascript">
  // create a new logger instance
  var logger = new simpleClipboardLogger.SimpleClipboardLogger();
  // make the logger listen to all clipboard events on the document
  logger.addEventTarget(document);
  // track date info
  logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.dateMetadataProvider);
  // track url info
  logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.hrefMetadataProvider);
  // log when the event happens using all the captured data
  logger.addEventLogger(simpleClipboardLogger.eventLoggers.consoleEventLogger);
</script>
```

This would create the following json for a copy and paste event respectively.
Notice how the selection id is the same.
Unfortunately this only is the case when the copy and paste events occur in the same window.
The selection id is not stored in the system clipboard.
The json is logged to the console using the `consoleEventLogger` but could be sent to a server.

```json
// copy
{
    "eventType": "copy",
    "data": {
        "text/plain": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    "date": "2021-09-22T00:49:30.481Z",
    "href": "http://localhost:3000/example",
}

// paste
{
    "eventType": "paste",
    "data": {
        "text/html": "<meta charset='utf-8'><span style=\"color: rgb(0, 0, 0); font-family: Times; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>",
        "text/plain": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    },
    "date": "2021-09-22T00:51:28.224Z",
    "href": "http://localhost:3000/example",
}
```

## Concepts

- `SimpleClipboardLogger`: The main class which implements logging functionality. Does not add event listeners to anything by default.
- `EventTarget`: A DOM element which the `SimpleClipboardLogger` will add event listeners to if you call `logger.addEventTarget(DOM_ELEMENT)`.
- `MetadataProvider`: Metadata providers can be used to add metadata to the logged event. A metadata provider is a function that returns an object or an object. The returned object will be merged with the metadata from the previous provider. The metadata provider function receives the event data as well as the previous metadata. It is best practice to return an object with new metadata rather than modifying the previous metadata. The previous metadata is simply provided to allow for conditional data capture.
- `EventLogger`: Event loggers receive the final metadata and can do whatever they want with it. You could post the data to a server or you can simply log it to the console.
- `EventFilter`: Event filters take the clipboard event and return a boolean indicating whether the event should be filtered. This is simple to javascript filters where anything which is true is passed through and anything which is false is filtered out.

## Testing

There are some cypress tests but they don't do much. Testing copy/paste is difficult do to security restrictions in browsers.
