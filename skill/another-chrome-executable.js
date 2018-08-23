const puppeteer = require('puppeteer');

const urlSite = 'https://yazilim.aykutasil.com';
(async() => {
    // Chrome Path
    const browser = await puppeteer.launch({executablePath: '/path/to/Chrome'});
    const page = await browser.newPage();
    await page.goto(urlSite);

    // Get the "viewport" of the page, as reported by the page.
    const dimensions = await page.evaluate(() => {
        return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight, deviceScaleFactor: window.devicePixelRatio};
    });

    console.log('Dimensions:', dimensions);

    await browser.close();
})();