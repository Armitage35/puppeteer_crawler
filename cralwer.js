// Packages
const puppeteer = require("puppeteer");
const fs = require("fs");

// User defined variables
const pages = JSON.parse(fs.readFileSync("pages.json")).pages;

console.log("Crawling 🚀");

for (const page of pages) (
	console.log(page)
);

(async () => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto("https://example.com");
		await page.screenshot({path: "screenshots/example.png"});

		await browser.close();
	} catch (error) {
		console.log(error);
	}
})();

console.log("Crawling complete 👍");
