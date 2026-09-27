const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");

const app = require("./app");

test("GET /api/v1/health should return 200", async () => {
	const server = http.createServer(app);
	await new Promise(res => server.listen(0, res));

	const port = server.address().port;
	const response = await fetch(`http://localhost:${port}/api/v1/health`);
	const body = await response.json();

	assert.strictEqual(response.status, 200);
	assert.deepStrictEqual(body, { status: "ok" });

	server.close();
});
