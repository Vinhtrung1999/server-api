const axios = require('axios')

let http = async (option) => {
    let result = await axios(option)
    return result
}

module.exports = http