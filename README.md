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
  // check to see if simpleClipboardLogger was included in the page
  if (typeof simpleClipboardLogger !== "undefined") {
    //   create an instance of the logger with throttling enabled (333ms)
    var logger = new simpleClipboardLogger.SimpleClipboardLogger({ throttleWait: 333 });
    // add the event listeners to the entire document
    logger.addEventTarget(document);
    // add the date to the recorded metadata
    logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.dateMetadataProvider);
    // add the url to the recorded metadata
    logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.hrefMetadataProvider);
    // log the data to the console
    logger.addEventLogger(simpleClipboardLogger.eventLoggers.consoleEventLogger);
    // post the data to a remote server
    logger.addEventLogger(simpleClipboardLogger.eventLoggers.xhrEventLogger(postEvent));

    function postEvent(metadata) {
      return {
        config: {
          // the url to post to
          url: "https://httpbin.org/post",
          // the method to use
          method: "post",
          // the body. We will post all metadata in a json object {metadata: <event metadata>}
          body: JSON.stringify({ metadata: metadata }),
          // the headers to use
          headers: {
            "Content-Type": "application/json",
          },
        },
      };
    }
  }
</script>
```

This example sends the following json to the server.

```json
{
  "metadata": {
    "eventType": "copy",
    "data": { "text/plain": "Lorem ipsum dolor sit amet" },
    "date": "2021-10-15T18:29:56.453Z",
    "href": "http://localhost:3000/example/"
  }
}
```

The example logs the following json to the console.

```json
{
  "eventType": "copy",
  "data": {
    "text/plain": "Lorem ipsum dolor sit amet"
  },
  "date": "2021-10-15T18:29:56.453Z",
  "href": "http://localhost:3000/example/"
}
```

If we paste the text we would get the html as well.

```json
{
  "eventType": "paste",
  "data": {
    "text/html": "<meta charset='utf-8'><span style=\"color: rgb(0, 0, 0); font-family: Times; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;\">Lorem ipsum dolor sit amet</span>",
    "text/plain": "Lorem ipsum dolor sit amet"
  },
  "date": "2021-10-15T18:31:15.448Z",
  "href": "http://localhost:3000/example/"
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
