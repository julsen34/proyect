import express from 'express';
import { createElement } from 'react';
import { render } from 'react-dom';
import App from './server/app';
import './style.css';

// Crear una instancia de Express
const app = express();

// Renderizar la aplicación de React
render(createElement(App), document.getElementById('root'));

export default app;
