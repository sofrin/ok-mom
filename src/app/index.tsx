import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import '../index.css';
import store from '../shared/redux/store.js';
import App from './App.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<SnackbarProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</SnackbarProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
