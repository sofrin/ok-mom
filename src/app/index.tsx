import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import '../index.css';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import store from './store.js';

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
