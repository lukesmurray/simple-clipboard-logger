import { DefaultMetadata } from "./DefaultMetadata";

type MetadataFunctionProvider = (e: ClipboardEvent, currMetadata: DefaultMetadata) => Record<string, any>;
type MetadataObjectProvider = Record<string, any>;
export type MetadataProvider = MetadataFunctionProvider | MetadataObjectProvider;
