before(async function () {
   Object.assign(global, new (require('@dollarshaveclub/cloudworker'))(require('fs').readFileSync('worker.js', 'utf8')).context);
});

// You will replace worker.js with the relative path to your worker

const assert = require('assert')

function fakeReq(ip) {
    let fake = new Headers()
    fake.append("CF-Connecting-IP", ip)
    fake.append("Referer", "thisisatest")

    let init = {
        method: "GET",
        headers: fake,
        mode: "cors"
    }

    return new Request("example.com", init)
}

describe('Worker Test', function() {

    it('returns stanford for stanford request', async function () {
        let req = fakeReq("128.12.122.154")
        let res = await handleRequest(req)
        let body = await res.text()
        assert.equal(body, 'Stanford University')
    })

})
