const puppeteer = require('puppeteer')
const parallel = 4;
const fs = require("fs");



const pages = JSON.parse(fs.readFileSync("pages.json")).pages;

const screenshotPages = async (pages, parallel) => {
	const parallelBatches = Math.ceil(pages.length / parallel)

	console.log('\nI have gotten the task of taking screenshots of ' + pages.length + ' Wikipedia articles on pages in Cologne and will take ' + parallel + ' of them in paralell.')

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
		  // promises push
		  console.log('🖖 I promise to screenshot: ' + pages[elem].name)
		  promises.push(browser.newPage().then(async page => {
			await page.setViewport({ width: 1280, height: 800 })
			try {
			  // Only create screenshot if page.goto get's no error
			  await page.goto(pages[elem])
			  await page.screenshot({ path: elem + ' ' + pages[elem].name +'.png' }).then(console.log('🤞 I have kept my promise to screenshot ' + pages[elem].name))
			} catch (err) {
			  console.log('❌ Sorry! I couldn\'t keep my promise to screenshot ' + pages[elem].name)
			}
		  }))
		}
	  }

	  // await promise all and close browser
	  await Promise.all(promises)
	  await browser.close()

	  console.log('\nI finished this batch. I\'m ready for the next batch');
	}
  }

  screenshotPages(pages, parallel)

