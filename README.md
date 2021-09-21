# Simple Clipboard Logger

Implements logging for clipboard data and provides mechanisms to extend the captured data for each event.

## Example Usage

```html
<!-- include the clipboard logger iife -->
<script type="text/javascript" src="../dist/simple-clipboard-logger.iife.js"></script>
<script type="text/javascript">
  // create a new logger instance
  var logger = new simpleClipboardLogger.SimpleClipboardLogger();
  // make the logger listen to all clipboard events on the document
  logger.addEventTarget(document);
  // track data info
  logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.dateMetadataProvider);
  // track url info
  logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.hrefMetadataProvider);
  // provide a unique id across copy/paste events
  logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.selectionIdMetadataProvider());
  // log when the event happens using all the captured data
  logger.addEventLogger(simpleClipboardLogger.eventLoggers.consoleEventLogger);
  window.clipboardLogger = logger;
</script>
```

## Concepts

- `SimpleClipboardLogger`: The main class which implements logging functionality. Does not add event listeners to anything by default.
- `EventTarget`: A DOM element which the `SimpleClipboardLogger` will add event listeners to if you call `logger.addEventTarget(DOM_ELEMENT)`.
- `MetadataProvider`: Metadata providers can be used to add metadata to the logged event. A metadata provider is a function that returns an object or an object. The returned object will be merged with the metadata from the previous provider. The metadata provider function receives the event data as well as the previous metadata. It is best practice to return an object with new metadata rather than modifying the previous metadata. The previous metadata is simply provided to allow for conditional data capture.
- `EventLogger`: Event loggers receive the final metadata and can do whatever they want with it. You could post the data to a server or you can simply log it to the console.
- `EventFilter`: Event filters take the clipboard event and return a boolean indicating whether the event should be filtered. This is simple to javascript filters where anything which is true is passed through and anything which is false is filtered out.
