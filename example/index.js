if (typeof simpleClipboardLogger !== "undefined") {
  var logger = new simpleClipboardLogger.SimpleClipboardLogger({ throttleWait: 333 });
  logger.addEventTarget(document);
  logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.dateMetadataProvider);
  logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.hrefMetadataProvider);
  logger.addEventLogger(simpleClipboardLogger.eventLoggers.consoleEventLogger);
  logger.addEventLogger(simpleClipboardLogger.eventLoggers.xhrEventLogger(postEvent));

  function postEvent(metadata) {
    return {
      config: {
        url: "https://httpbin.org/post",
        method: "post",
        body: JSON.stringify({ metadata: metadata }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    };
  }
}
