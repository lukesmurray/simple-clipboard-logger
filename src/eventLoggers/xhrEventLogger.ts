import { EventLogger } from "../types/EventLogger";

export type xhrRequestResponseType = "json" | "text";

export interface xhrRequestConfig {
  url: string;
  method: "get" | "post";
  body?: Document | BodyInit | null;
  headers?: { [key: string]: string };
  responseType?: xhrRequestResponseType; // comes from XMLHttpRequestResponseType
}

export interface xhrResponse<Return> {
  ok: boolean;
  response: Return;
  responseText: XMLHttpRequest["responseText"];
  responseType: XMLHttpRequest["responseType"];
  status: XMLHttpRequest["status"];
  statusText: XMLHttpRequest["statusText"];
}

export type XhrSuccessCallback<Return = any> = (result: xhrResponse<Return>) => void;
export type XhrErrorCallback = (error: Error) => void;

export type XhrRequestConfigProvider<Return = any> = (metadata: any) => {
  config: xhrRequestConfig;
  onSuccess?: XhrSuccessCallback<Return>;
  onError?: XhrErrorCallback;
};

export const xhrRequest = <Return = any>(
  config: xhrRequestConfig,
  onSuccess?: XhrSuccessCallback<Return>,
  onError?: XhrErrorCallback,
): void => {
  const xhr = new XMLHttpRequest();

  // Setup our listener to process completed requests
  xhr.onreadystatechange = function () {
    // Only run if the request is complete
    if (xhr.readyState !== 4) {
      return;
    }

    // ok if the status is in range 200
    const ok = xhr.status >= 200 && xhr.status < 300;

    // handle success
    if (ok) {
      // parse json responses
      let response: any = xhr.response;
      if ((config.responseType ?? "json") === "json") {
        try {
          response = JSON.parse(xhr.response);
        } catch (e) {
          onError?.(
            new Error(
              `${xhr.status}: ${xhr.statusText}\nrequested: ${config.url}\nFailed to parse json. Received...\n${xhr.responseText}`,
            ),
          );
        }
      }

      // no error yay!
      onSuccess?.({
        ok,
        response,
        responseText: xhr.responseText,
        responseType: xhr.responseType,
        status: xhr.status,
        statusText: xhr.statusText,
      });
    } else {
      // reject with an error message
      onError?.(new Error(`${xhr.status}: ${xhr.statusText}\nrequested: ${config.url}\n\n${xhr.responseText}`));
    }
  };

  xhr.open(config.method, config.url, true);
  if (config.headers !== undefined) {
    for (const key of Object.keys(config.headers)) {
      xhr.setRequestHeader(key, config.headers[key]);
    }
  }
  xhr.send((config.body ?? null) as any);
};

export const xhrEventLogger: (xhrConfigProvider: XhrRequestConfigProvider) => EventLogger =
  (xhrConfigProvider) => (metadata) => {
    const { config, onError, onSuccess } = xhrConfigProvider(metadata);
    xhrRequest(config, onSuccess, onError);
  };
