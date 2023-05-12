import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import TasksContextProvider from './store/tasks-context';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <TasksContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TasksContextProvider>
);
