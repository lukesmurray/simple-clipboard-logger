export type DefaultMetadata = {
  eventType: "cut" | "copy" | "paste";
  data?: {
    "text/plain"?: string;
    "text/html"?: string;
  };
};
