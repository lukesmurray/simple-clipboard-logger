import { EventLogger } from "../types/EventLogger";

export const consoleLogger: EventLogger = (metadata) => {
  console.log(metadata);
};
