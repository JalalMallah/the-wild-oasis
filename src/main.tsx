import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ErrorFallback from '@ui/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => window.location.replace('/')}
		>
			<App />
		</ErrorBoundary>
	</StrictMode>,
);
