import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';

interface HttpClientConfig extends CreateAxiosDefaults {
	tokenKey?: string;
	getToken?(): Promise<string>;
}

export interface HttpRequest<T> {
	requestId: string;
	fetch(): Promise<T>;
	abort(): void;
}

export interface FormattedError {
	message: string;
	axiosError?: AxiosError | axios.Cancel;
	serverError?: unknown;
}

export class HttpClient {
	_axiosInstance: AxiosInstance;
	_requests: Record<string, HttpRequest<unknown>>;

	constructor({ tokenKey, getToken, ...config }: HttpClientConfig) {
		this._axiosInstance = axios.create(config);
		this._requests = {};

		if (tokenKey && getToken) {
			this._axiosInstance.interceptors.request.use(
				async (config) => {
					const token = await getToken();
					config.headers[tokenKey] = token;
					return config;
				},
				(error) => {
					console.error('Error obtaining accessToken:', error);
				}
			);
		}
	}

	createRequest<T>(config: AxiosRequestConfig) {
		const requestId = uuidv4();
		const abortController = new AbortController();

		const request: HttpRequest<T> = {
			requestId,
			fetch: async () => {
				try {
					const { data } = await this._axiosInstance.request({ ...config, signal: abortController.signal });
					return data as T;
				} catch (error) {
					throw this._getFormattedError(error);
				} finally {
					delete this._requests[requestId];
				}
			},
			abort: () => {
				abortController.abort();
				delete this._requests[requestId];
			},
		};

		this._requests[requestId] = request;
		return request;
	}

	_getFormattedError(error: unknown): FormattedError {
		if (axios.isCancel(error)) {
			return {
				message: 'Request has been canceled.',
				axiosError: error,
				serverError: undefined,
			};
		}

		if (axios.isAxiosError(error)) {
			return {
				message: error.message,
				axiosError: error,
				serverError: error.response?.data ?? undefined,
			};
		}

		return {
			message: 'An unknown error has occurred.',
			axiosError: undefined,
			serverError: undefined,
		};
	}
}
