const express = require("express");
// const config = require('config');
const path = require('path');
const hbs = require('hbs');
const _ = require('lodash');
const Web3 = require("web3");

const BalanceController = require("./src/balance");

const app = express();

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));
hbs.registerHelper('truncate', (context, options) => {
    return _.truncate(context, { length: 19});
});
hbs.registerHelper('toNumber', (context, options) => {
    return Web3.utils.fromWei(context, 'ether');
});

app.set('view engine', hbs);

app.listen(process.env.PORT || 4000);
app.use(express.static(path.join(__dirname, 'public')));

console.log(`App listening on port ${process.env.PORT || 4000}`);

app.use((req, res, next) => {
    next();
});

app.get('/', BalanceController.index);
app.get('/balance', BalanceController.index);