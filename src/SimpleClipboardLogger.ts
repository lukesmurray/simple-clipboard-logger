import throttle from "lodash.throttle";
import { DefaultMetadata } from "./types/DefaultMetadata";
import { EventFilter } from "./types/EventFilter";
import { EventLogger } from "./types/EventLogger";
import { MetadataProvider } from "./types/MetadataProvider";

export type SimpleClipboardLoggerOptions = {
  throttleWait?: number;
};

export class SimpleClipboardLogger {
  private metadataProviders: MetadataProvider[] = [];
  private eventFilters: EventFilter[] = [];
  private eventLoggers: EventLogger[] = [];
  private options: SimpleClipboardLoggerOptions | undefined;

  constructor(options?: SimpleClipboardLoggerOptions) {
    this.onCopy = this.onCopy.bind(this);
    this.onCut = this.onCut.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.options = options;
  }

  addMetadataProvider(metadataProvider: MetadataProvider) {
    this.metadataProviders.push(metadataProvider);
  }

  removeMetadataProvider(metadataProvider: MetadataProvider) {
    const index = this.metadataProviders.indexOf(metadataProvider);
    if (index > -1) {
      this.metadataProviders.splice(index, 1);
    }
  }

  addEventFilter(eventFilter: EventFilter) {
    this.eventFilters.push(eventFilter);
  }

  removeEventFilter(eventFilter: EventFilter) {
    const index = this.eventFilters.indexOf(eventFilter);
    if (index > -1) {
      this.eventFilters.splice(index, 1);
    }
  }

  addEventLogger(eventLogger: EventLogger) {
    this.eventLoggers.push(eventLogger);
  }

  removeEventLogger(eventLogger: EventLogger) {
    const index = this.eventLoggers.indexOf(eventLogger);
    if (index > -1) {
      this.eventLoggers.splice(index, 1);
    }
  }

  addEventTarget(
    target: EventTarget,
    {
      copy = true,
      cut = true,
      paste = true,
    }: {
      copy?: boolean;
      cut?: boolean;
      paste?: boolean;
    } = {},
  ) {
    const throttleWait = this.options?.throttleWait;
    // add event listeners

    const copyFunc = throttleWait !== undefined ? (throttle(this.onCopy, throttleWait) as any) : (this.onCopy as any);
    if (copy) {
      target.addEventListener("copy", copyFunc);
    }

    const cutFunc = throttleWait !== undefined ? (throttle(this.onCut, throttleWait) as any) : (this.onCut as any);
    if (cut) {
      target.addEventListener("cut", cutFunc);
    }

    const pasteFunc =
      throttleWait !== undefined ? (throttle(this.onPaste, throttleWait) as any) : (this.onPaste as any);
    if (paste) {
      target.addEventListener("paste", pasteFunc);
    }

    // create unsubscribe func
    const unsubscribe = () => {
      if (copy) {
        target.removeEventListener("copy", copyFunc);
      }
      if (cut) {
        target.removeEventListener("cut", cutFunc);
      }
      if (paste) {
        target.removeEventListener("paste", pasteFunc);
      }
    };

    // return the unsubscribe func
    return unsubscribe;
  }

  private handleCopyOrCut(e: ClipboardEvent, eventType: "copy" | "cut") {
    try {
      if (this.isFiltered(e)) {
        return;
      }
      const defaultMetadata: DefaultMetadata = {
        eventType: eventType,
        data: {
          "text/plain": window.getSelection()?.toString(),
        },
      };

      const metadata = this.getMetadata(e, defaultMetadata);

      this.logEvent({ ...defaultMetadata, ...metadata });
    } catch (e) {
      console.error(e);
    }
  }

  private onCopy(e: ClipboardEvent) {
    this.handleCopyOrCut(e, "copy");
  }

  private onCut(e: ClipboardEvent) {
    this.handleCopyOrCut(e, "copy");
  }

  private onPaste(e: ClipboardEvent) {
    try {
      if (this.isFiltered(e)) {
        return;
      }
      const defaultMetadata: DefaultMetadata = {
        eventType: "paste",
        data: {
          "text/html": e.clipboardData?.getData("text/html"),
          "text/plain": e.clipboardData?.getData("text/plain"),
        },
      };

      const metadata = this.getMetadata(e, defaultMetadata);

      this.logEvent({ ...defaultMetadata, ...metadata });
    } catch (e) {
      console.error(e);
    }
  }

  private isFiltered(e: ClipboardEvent) {
    return !this.eventFilters.every((f) => f(e));
  }

  private getMetadata(e: ClipboardEvent, defaultMetadata: DefaultMetadata) {
    return this.metadataProviders.reduce(
      (prev, provider) =>
        typeof provider === "function" ? { ...prev, ...provider(e, prev as any) } : { ...prev, ...provider },
      defaultMetadata,
    );
  }

  private logEvent(metadata: any) {
    this.eventLoggers.forEach((logger) => logger(metadata));
  }
}
