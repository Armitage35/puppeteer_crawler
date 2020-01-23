const puppeteer = require("puppeteer");

console.log("Crawling 🚀");

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto("https://example.com");
	await page.screenshot({path: "screenshots/example.png"});

	await browser.close();
})();
