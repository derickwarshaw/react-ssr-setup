const config = require('./client.base');

module.exports = {
    ...config,
    mode: 'production',
    devtool: 'source-map',
};
