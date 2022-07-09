const isDev = process.env.NODE_ENV === ('development' || 'dev') ? true : false;
const MCEP = require('mini-css-extract-plugin');

module.exports = { isDev, MCEP };
