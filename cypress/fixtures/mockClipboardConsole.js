var logger = new simpleClipboardLogger.SimpleClipboardLogger({ throttleWait: 333 });
logger.addEventTarget(document);
logger.addEventLogger(simpleClipboardLogger.eventLoggers.consoleEventLogger);
