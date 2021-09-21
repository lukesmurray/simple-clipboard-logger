import { MetadataProvider } from "../types/MetadataProvider";

export const dateMetadataProvider: MetadataProvider = () => {
  return { date: new Date().toISOString() };
};
