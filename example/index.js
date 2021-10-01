var logger = new simpleClipboardLogger.SimpleClipboardLogger({ throttleWait: 333 });
logger.addEventTarget(document);
logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.dateMetadataProvider);
logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.hrefMetadataProvider);
logger.addMetadataProvider(simpleClipboardLogger.metadataProviders.selectionIdMetadataProvider());
logger.addEventLogger(simpleClipboardLogger.eventLoggers.consoleEventLogger);
logger.addEventLogger(simpleClipboardLogger.eventLoggers.xhrEventLogger(postEvent));

function postEvent(metadata) {
  return {
    url: "https://httpbin.org/post",
    method: "post",
    data: metadata,
  };
}
