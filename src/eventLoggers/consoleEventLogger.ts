import { EventLogger } from "../types/EventLogger";

export const consoleEventLogger: EventLogger = (metadata) => {
  console.log(metadata);
};
