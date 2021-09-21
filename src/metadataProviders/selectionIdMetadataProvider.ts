import "../utils/cryptoPolyfill";
import { nanoid } from "nanoid";
import { MetadataProvider } from "../types/MetadataProvider";

export const selectionIdMetadataProvider: () => MetadataProvider = () => {
  let selectionId: string | undefined;

  return (e, prev) => {
    if (prev.eventType === "copy" || prev.eventType === "cut") {
      selectionId = nanoid();
    }
    return {
      selectionId,
    };
  };
};
