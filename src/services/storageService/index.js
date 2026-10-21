const getState = require('./helpers');
const loadFunctions = require('./loadData');
const saveFunctions = require('./saveData'); 

module.exports = {
    ...loadFunctions,
    ...saveFunctions,
    getState,
};