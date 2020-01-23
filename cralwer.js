const puppeteer = require('puppeteer');
const fs = require('fs');
const rimraf = require('rimraf');

const parallel = 4;
const pages = JSON.parse(fs.readFileSync('pages.json')).pages;


if (!fs.existsSync('screenshots')){
    fs.mkdirSync('screenshots');
} else {
	rimraf('screenshots', function () {
		fs.mkdirSync('screenshots');
	});
};

const screenshotPages = async (pages, parallel) => {

	console.log('Crawling launched 🚀');
	console.log('');

	const parallelBatches = Math.ceil(pages.length / parallel)

	console.log('\nI have gotten the task of taking screenshots of ' + pages.length + ' pages and will take ' + parallel + ' of them in paralell.')

	console.log(' This will result in ' + parallelBatches + ' batches.')

	// Split up the Array of pages
	let k = 0

	for (let i = 0; i < pages.length; i += parallel) {
	  k++
	  console.log('\nBatch ' + k + ' of ' + parallelBatches)
	  // Launch and Setup Chromium
	  const browser = await puppeteer.launch();
	  // Fun with puppeteer
	  const context = await browser.createIncognitoBrowserContext();
	  const page = await context.newPage();
	  page.setJavaScriptEnabled(false)

	  const promises = []
	  for (let j = 0; j < parallel; j++) {
		let elem = i + j
		// only proceed if there is an element
		if (pages[elem] != undefined) {
		  // Promise to take Screenshots

		  console.log('🖖 I promise to screenshot: ' + pages[elem])
		  promises.push(browser.newPage().then(async page => {
			await page.setViewport({ width: 1280, height: 800 })
			try {
				// Only create screenshot if page.goto get's no error
				await page.goto(pages[elem])
				const pageTitle = await page.title();

			  await page.screenshot({ path: 'screenshots/' + elem + ' ' + pageTitle +'.png' }).then(console.log('🤞 I have kept my promise to screenshot ' + pages[elem]))
			} catch (err) {
			  console.log('❌ Sorry! I couldn\'t keep my promise to screenshot ' + pages[elem])
			}
		  }))
		}
	  }

	  // await promise all and close browser
	  await Promise.all(promises)
	  await browser.close()

	  console.log('\nI finished this batch. I\'m ready for the next batch');
	}

	console.log('');
	console.log('Crawling completed 👍');
  }

  screenshotPages(pages, parallel)
