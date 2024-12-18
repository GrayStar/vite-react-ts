import { FormattedError, HttpRequest } from '@/lib/http-client/http-client';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface AsyncComponentProps<T> {
	httpRequest: HttpRequest<T>;
	children(data: T): React.ReactNode;
}

export function AsyncComponent<T>({ httpRequest, children }: AsyncComponentProps<T>) {
	const memoizedHttpRequest = useMemo(() => httpRequest, [httpRequest]);
	const [data, setData] = useState<T>();
	const [error, setError] = useState<FormattedError>();

	const fetchData = useCallback(async () => {
		try {
			setData(undefined);
			setError(undefined);

			const response = await memoizedHttpRequest.fetch();

			setData(response);
			setError(undefined);
		} catch (error) {
			setData(undefined);
			setError(error as FormattedError);
		}
	}, [memoizedHttpRequest]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	useEffect(() => {
		return () => {
			memoizedHttpRequest.abort();
		};
	}, [memoizedHttpRequest]);

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	if (data) {
		return <>{children(data)}</>;
	}

	return <p>Loading...</p>;
}
