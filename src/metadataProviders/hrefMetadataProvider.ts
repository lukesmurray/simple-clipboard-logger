import { MetadataProvider } from "../types/MetadataProvider";

export const hrefMetadataProvider: MetadataProvider = () => {
  return {
    href: window.location.href,
  };
};
