import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
    return (
        <div role="alert" className="p-4 bg-red-100 border border-red-400 rounded">
            <h2 className="text-lg font-semibold text-red-800">Something went wrong:</h2>
            <pre className="mt-2 text-sm text-red-600">{error.message}</pre>
            <button
                onClick={resetErrorBoundary}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
                Try again
            </button>
        </div>
    );
};

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
    const handleReset = () => {
        // You can add any reset logic here if needed
        console.log('Error boundary reset');
    };

    return (
        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={handleReset}
        >
            {children}
        </ReactErrorBoundary>
    );
};

export default ErrorBoundary;