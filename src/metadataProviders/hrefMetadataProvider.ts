import { MetadataProvider } from "../types/MetadataProvider";

export const hrefMetadataProvider: MetadataProvider = (e, prev) => {
  return {
    [`${prev.eventType}Href`]: window.location.href,
  };
};
