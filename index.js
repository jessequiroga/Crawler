const puppeteer = require('puppeteer');
const CREDS = require('./creds');

(async() => {
    const browser = await puppeteer.launch({
        headless: false, // false -> Chrome UI açar
        devtools: false, // açılan sayfada devtools u otomatik olarak açar
        timeout: 90000,
        executablePath: ''
    });
    const page = await browser.newPage();

    var LOGIN_URL = 'https://medium.com/m/signin?redirect=https%3A%2F%2Fmedium.com%2F&operation=login';
    LOGIN_URL = 'https://www.facebook.com/login.php?skip_api_login=1&api_key=542599432471018&sign' +
            'ed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv2.7%2Fdialog%2Foauth%3Fredirect' +
            '_uri%3Dhttps%253A%252F%252Fmedium.com%252Fm%252Fcallback%252Ffacebook%26state%3D' +
            'hatmt0cuyagw%257Chttps%253A%252F%252Fmedium.com%252F%257Clogin%257C%257Ced16abe3' +
            'd665dcdb090ed3cf76b5a2df%26scope%3Dpublic_profile%252Cemail%26response_type%3Dto' +
            'ken%26client_id%3D542599432471018%26ret%3Dlogin%26logger_id%3D8fcd74e7-f318-fde1' +
            '-bbbe-09a55cf6637f&cancel_url=https%3A%2F%2Fmedium.com%2Fm%2Fcallback%2Ffacebook' +
            '%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2B' +
            'error%26error_reason%3Duser_denied%26state%3Dhatmt0cuyagw%257Chttps%253A%252F%25' +
            '2Fmedium.com%252F%257Clogin%257C%257Ced16abe3d665dcdb090ed3cf76b5a2df%23_%3D_&di' +
            'splay=page&locale=tr_TR&logger_id=8fcd74e7-f318-fde1-bbbe-09a55cf6637f';

    await page.goto(LOGIN_URL);

    const USERNAME_SELECTOR = '#email';
    const PASSWORD_SELECTOR = '#pass';
    const FB_LOGIN_BUTTON_SELECTOR = '#loginbutton';

    await page.click(USERNAME_SELECTOR);
    await page
        .keyboard
        .type(CREDS.username);

    await page.click(PASSWORD_SELECTOR);
    await page
        .keyboard
        .type(CREDS.password);

    await page.click(FB_LOGIN_BUTTON_SELECTOR);

    await page.waitForNavigation();

    const page_bookmarks = await browser.newPage();
    await page_bookmarks.goto('https://medium.com/me/list/bookmarks');

    var LENGTH_SELECTOR_CLASS = 'streamItem streamItem--readingListPostItem js-streamItem';
    let listLength = await page_bookmarks.evaluate((sel) => {
        return document
            .getElementsByClassName(sel)
            .length;
    }, LENGTH_SELECTOR_CLASS);

    console.log('====================================');
    console.log('List Item Length: ' + listLength);
    console.log('====================================');

    for (let i = 0; i <= listLength; i++) {
        let title = await page_bookmarks.evaluate((i) => {
            return document
                .getElementsByClassName('streamItem streamItem--readingListPostItem js-streamItem')[i]
                .querySelector('div > div > a > h3')
                .innerText
        }, i);

        let content = await page_bookmarks.evaluate((i) => {
            return document
                .getElementsByClassName('streamItem streamItem--readingListPostItem js-streamItem')[i]
                .querySelector('div > div > a > p')
                .innerText
        }, i);

        console.log('====================================');
        console.log(title, ' -> ', content);
        console.log('====================================');
    }

    browser.close();
})()