const request = require("request");

function createEtherscanClient(url, key) {

    return Object.assign({}, {
        invoke: function (params) {

            return new Promise((resolve, reject) => {
                console.log(url, params);
                request
                    .get({
                        url,
                        qs: params,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }, (err, res, body) => {
                        if (err) reject(err);
                        else {
                            const parsed_res = JSON.parse(body);
                            console.log(parsed_res);
                            if (parsed_res.result)
                                resolve(parsed_res.result);
                            else if (parsed_res.error)
                                reject(parsed_res.error);
                            else
                                reject("Something goes wrong while Etherscan method calling.");
                        }
                    })
            })
        },
        txlist: function (address, page = 1, offset = 10, startblock = 0, endblock = 99999999, sort = "desc") {
            return this.invoke({
                module: "account",
                action: "txlist",
                address, page, offset, startblock, endblock, sort,
                apikey: key
            })
        }
    })
}

module.exports = createEtherscanClient;
