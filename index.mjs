const express = require('express');
const mongoose = require('mongoose');
const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./App');
require('./style.css');

// Crear una instancia de Express
const app = express();

// Renderizar la aplicación de React
ReactDOM.render(React.createElement(App), document.getElementById('root'));

module.exports = app;
