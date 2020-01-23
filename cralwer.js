const puppeteer = require("puppeteer");
const pages = fs.readFileSync;

console.log("Crawling 🚀");

console.log(pages);

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
