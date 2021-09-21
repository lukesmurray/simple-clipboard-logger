import { nanoid } from "nanoid";
import { DefaultMetadata } from "./types/DefaultMetadata";
import { EventFilter } from "./types/EventFilter";
import { EventLogger } from "./types/EventLogger";
import { MetadataProvider } from "./types/MetadataProvider";

export default class SimpleClipboardLogger {
  private metadataProviders: MetadataProvider[] = [];
  private eventFilters: EventFilter[] = [];
  private eventLoggers: EventLogger[] = [];

  constructor() {
    this.onCopy = this.onCopy.bind(this);
    this.onCut = this.onCut.bind(this);
    this.onPaste = this.onPaste.bind(this);
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
    // add event listeners
    if (copy) {
      target.addEventListener("copy", this.onCopy as any);
    }

    if (cut) {
      target.addEventListener("cut", this.onCut as any);
    }

    if (paste) {
      target.addEventListener("paste", this.onPaste as any);
    }

    // create unsubscribe func
    const unsubscribe = () => {
      if (copy) {
        target.removeEventListener("copy", this.onCopy as any);
      }
      if (cut) {
        target.removeEventListener("cut", this.onCut as any);
      }
      if (paste) {
        target.removeEventListener("paste", this.onPaste as any);
      }
    };

    // return the unsubscribe func
    return unsubscribe;
  }

  private onCopy(e: ClipboardEvent) {
    if (this.isFiltered(e)) {
      return;
    }
    const selectionId = nanoid();
    const defaultMetadata: DefaultMetadata = {
      eventType: "copy",
      data: {
        "text/html": e.clipboardData?.getData("text/html") ?? undefined,
        "text/plain": e.clipboardData?.getData("text/plain") ?? undefined,
      },
      selectionId,
    };

    e.clipboardData?.setData("application/simpleClipboardLogger", selectionId);

    const metadata = this.getMetadata(e);

    this.logEvent({ ...defaultMetadata, ...metadata });
  }

  private onCut(e: ClipboardEvent) {
    if (this.isFiltered(e)) {
      return;
    }

    const selectionId = nanoid();
    const defaultMetadata: DefaultMetadata = {
      eventType: "cut",
      data: {
        "text/html": e.clipboardData?.getData("text/html") ?? undefined,
        "text/plain": e.clipboardData?.getData("text/plain") ?? undefined,
      },
      selectionId,
    };

    e.clipboardData?.setData("application/simpleClipboardLogger", selectionId);

    const metadata = this.getMetadata(e);

    this.logEvent({ ...defaultMetadata, ...metadata });
  }

  private onPaste(e: ClipboardEvent) {
    if (this.isFiltered(e)) {
      return;
    }
    const defaultMetadata: DefaultMetadata = {
      eventType: "paste",
      data: {
        "text/html": e.clipboardData?.getData("text/html"),
        "text/plain": e.clipboardData?.getData("text/plain"),
      },
      selectionId: e.clipboardData?.getData("application/simpleClipboardLogger"),
    };

    const metadata = this.getMetadata(e);

    this.logEvent({ ...defaultMetadata, ...metadata });
  }

  private isFiltered(e: ClipboardEvent) {
    return !this.eventFilters.every((f) => f(e));
  }

  private getMetadata(e: ClipboardEvent) {
    return this.metadataProviders
      .map((provider) => (typeof provider === "function" ? provider(e) : provider))
      .reduce((prev, curr) => ({ ...prev, ...curr }), {});
  }

  private logEvent(metadata: any) {
    this.eventLoggers.forEach((logger) => logger(metadata));
  }
}
