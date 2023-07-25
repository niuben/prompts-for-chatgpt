import React from 'react';
// import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';

import Options from './Options';
import './index.css';

const container = document.getElementById('app-container');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
ReactDOM.render(<Options title={'Settings'} />, container);
