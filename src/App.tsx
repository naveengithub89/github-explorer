import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, useTheme } from 'context/ThemeContext';
import { AuthProvider } from 'context/AuthContext';
import RepoFetcher from 'containers/RepoFetcher';
import ErrorBoundary from 'components/ErrorBoundary';
import './styles/App.css';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">GitHub Repository Explorer</h1>
          <div className="space-x-2">
            <button onClick={toggleTheme} className="p-2 bg-blue-500 text-white rounded">
              Toggle Theme for fun
            </button>
          </div>
        </div>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<RepoFetcher />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <ErrorBoundary>
              <AppContent />
            </ErrorBoundary>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;