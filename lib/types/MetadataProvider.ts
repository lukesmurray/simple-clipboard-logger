type MetadataFunctionProvider = (e: ClipboardEvent) => Record<string, any>;
type MetadataObjectProvider = Record<string, any>;
export type MetadataProvider = MetadataFunctionProvider | MetadataObjectProvider;
