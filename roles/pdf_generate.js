const puppeteer = require('puppeteer');

const urlSite = 'https://yazilim.aykutasil.com';

(async() => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(urlSite);
    await page.pdf({path: 'result.pdf', format: 'A4'});

    await browser.close();
})();