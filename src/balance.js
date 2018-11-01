const Web3 = require("web3");
const config = require("config");
const Decimal = require("decimal.js");
const createEtherscanClient = require("./etherscan");

const url = config.get('web3provider.url');
const client = new Web3();
client.setProvider(new Web3.providers.HttpProvider(url));

module.exports = {
    async index(req, res) {
        let error = null,
            balance = null,
            transactions = null,
            address = "";

        if (req.query && req.query.ethaddress) {
            address = req.query.ethaddress;
            const etherscan = createEtherscanClient(config.get('etherscan.url'), config.get('etherscan.key'));

            if (!Web3.utils.isAddress(address)) {
                error = "Please enter valid address";
            }

            balance = await client.eth.getBalance(address);
            transactions = await etherscan.txlist(address);
            console.log(transactions);
        }

        res.render('index.hbs', {address, error, balance, transactions});
    }
};