const { handleRequest } = require("../handleRequest.js")
const { Headers } = require('whatwg-fetch')

const assert = require('assert')

function fakeReq(ip) {
    let fake = new Headers()
    fake.append("CF-Connecting-IP", ip)
    fake.append("Referer", "mocha.test")

    let init = {
        method: "GET",
        headers: fake,
        mode: "cors"
    }

    return new Request("example.com", init)
}

describe('Worker Test', function() {
    it('Returns Stanford for Stanford IP Request', async function () {
        let req = fakeReq("128.12.122.154")
        let res = await handleRequest(req)
        let body = await res.text()
        assert.equal(body, 'Stanford University')
    })

})
