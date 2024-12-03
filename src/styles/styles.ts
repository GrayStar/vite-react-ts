import { createTss } from 'tss-react';

const useContext = () => {
	const theme = {
		primaryColor: '#32CD32',
	};

	return { theme };
};

export const { tss } = createTss({ useContext });
