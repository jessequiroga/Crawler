const puppeteer = require('puppeteer');
const VIN_SELECTOR = '#page > div > div.pane-content-constrain > main > div > div > div > div > sectio' +
        'n.side > aside > p.extra-info > span:nth-child(3)';

let vins = [];

async function run() {
    let browser = await puppeteer.launch({headless: false});

    let pages = await browser.pages();

    // ilk tab da belirtilen siteye gitmesini söylüyoruz
    await pages[0].goto('https://tesla.com/used');

    let carHandles = await pages[0].$$('.list-container__item');

    for (let i = 0; i < carHandles.length; i++) {
        await pages[0].waitForSelector('.list-container__item');
        carHandles[i].click();
    }
    console.log('Finished clicking.');

    let count = 0;

    while (count < carHandles.length) {
        pages = await browser.pages();
        count = pages.length;
    }

    for (let i = 1; i < carHandles.length; i++) {
        let vin = await pages[i].evaluate((sel) => {
            return document
                .querySelector(sel)
                .innerHTML;
        }, VIN_SELECTOR);

        vins.push(vin);
        await pages[i].close();
    }

    for (let i = 0; i < vins.length; i++) {
        console.log(`${i + 1}: ${vins[i]}`);
    }

    browser.close();
}
run();