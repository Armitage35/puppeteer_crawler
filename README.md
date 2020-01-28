# Puppeteer 
[![Total alerts](https://img.shields.io/lgtm/alerts/g/Armitage35/puppeteer_crawler.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Armitage35/puppeteer_crawler/alerts/)
[![CodeFactor](https://www.codefactor.io/repository/github/armitage35/puppeteer_crawler/badge/master)](https://www.codefactor.io/repository/github/armitage35/puppeteer_crawler/overview/master)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Armitage35/fuzzy-roadmap/blob/dev/LICENSE)


This repo provide its users with a script that enables them to crawl and take screenshots of as many pages as they want to.

## How to use

1. Upload the list of URLs you want to parse in the `pages.json` file
2. Run `yarn start` or `npm start`
3. Once complete, your screenshots will be available within a "screenshots" folder 

## Options

- You can change the parallelism parameter in `crawler.js`. This will enable your machine to load more tabs at once but will consume more ressources.

*Note:* if you are looking for a tool that will crawl a site on its own, you may be better off using [Pappet](https://getpocket.com/redirect?url=https%3A%2F%2Fgithub.com%2Fpatrickschur%2Fpappet).
