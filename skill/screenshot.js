const puppeteer = require('puppeteer');
const fs = require('fs');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://github.com');

    if (!fs.exists('screenshots')) {
        fs.mkdir('screenshots')
    }
    
    await page.screenshot({path: 'screenshots/github.png'});

    browser.close();
})()