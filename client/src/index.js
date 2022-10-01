import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { AppProvider } from './context/appContext';
import { JobsProvider } from './context/jobsContext/jobsContext';
import FormProvider from './context/formContext/formContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AppProvider>
            <JobsProvider>
                <FormProvider>
                    <App />
                </FormProvider>
            </JobsProvider>
        </AppProvider>
    </React.StrictMode>
); 