import { BrowserRouter, Routes, Route } from 'react-router';
import { GlobalStyles } from 'tss-react';

import { About, Home } from '@/pages';
import { Footer, Header } from '@/components';
import { globalStyles } from '@/styles';

const RoutedApp = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:name" element={<About />} />
			</Routes>
			<Footer />
		</>
	);
};

const App = () => {
	return (
		<>
			<GlobalStyles styles={globalStyles} />
			<BrowserRouter>
				<RoutedApp />
			</BrowserRouter>
		</>
	);
};

export default App;
