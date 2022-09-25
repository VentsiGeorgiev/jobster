import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { AppProvider } from './context/appContext';
import { JobsProvider } from './context/jobsContext/jobsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppProvider>
            <JobsProvider>
                <App />
            </JobsProvider>
        </AppProvider>
    </React.StrictMode>
); 