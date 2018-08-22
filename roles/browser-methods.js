const puppeteer = require('puppeteer');

const siteUrl = 'https://yazilim.aykutasil.com';

(async() => {
    const browser = await puppeteer.launch({headless: false});

    //- Chromium is closed or crashed
    //- The browser.disconnect method was called
    browser.on('disconnected', (handler) => {
        console.log('====================================');
        console.log('disconnected');
        console.log('====================================');
    });

    // Emitted when a target is created, for example when a new page is opened by
    // window.open or browser.newPage.
    browser.on('targetcreated', (target) => {
        console.log('====================================');
        console.log('targetcreated');
        console.log('====================================');
    })

    const page = await browser.newPage();
    await page.goto(siteUrl);

    // Returns an array of all open browser contexts. In a newly created browser,
    // this will return a single instance of BrowserContext.
    let browserContext = browser.browserContexts();
    console.log(browserContext);

    // Creates a new incognito browser context. This won't share cookies/cache with
    // other browser contexts. Create a new incognito browser context.
    const context = await browser.createIncognitoBrowserContext();
    // Create a new page in a pristine context.
    const incognitoPage = await context.newPage();
    await incognitoPage.goto(siteUrl);
    await incognitoPage.pdf({path: 'result.pdf', format: 'A4'});

    browser.close();
})();