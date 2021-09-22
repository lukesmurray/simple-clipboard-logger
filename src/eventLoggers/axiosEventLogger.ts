import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { EventLogger } from "../types/EventLogger";

type AxiosRequestConfigProvider = (metadata: any) => AxiosRequestConfig;
type AxiosRequestResolver = (result: Promise<AxiosResponse<any>>) => void;

export const axiosEventLogger: (
  axiosRequestConfigProvider: AxiosRequestConfigProvider,
  axiosRequestResolver?: AxiosRequestResolver,
) => EventLogger = (axiosRequestConfigProvider, axiosRequestResolver) => (metadata) => {
  const config = axiosRequestConfigProvider(metadata);
  const result = axios.request(config);
  axiosRequestResolver?.(result);
};
