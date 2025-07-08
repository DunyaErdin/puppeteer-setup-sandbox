import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

puppeteer.use(StealthPlugin())
const fpPromise = FingerprintJS.load({
  apiKey: "ZxqlsA3ynf94AaQAXgoU",
  region: "eu"
})
fpPromise.then(fp => fp.get()).then(result => console.log(result.visitorId))

const delay = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const main = async ()=>{
    const browser = await puppeteer.launch({headless: false
          ,devtools: false,
          defaultViewport: {
            width: 1366,
            height: 768
        },
          args: [
            '--disable-dev-tools',
            '--disable-extensions',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars'
        ]
    });
    const page =await browser.newPage();
    await page.evaluateOnNewDocument(() => {
    Object.defineProperty(window, 'outerHeight', {
      get: () => window.innerHeight + 100,
    });
   Object.defineProperty(window, 'outerWidth', {
      get: () => window.innerWidth + 100,
      });
  });

    await page.evaluate(() => {
  // window.outerHeight hilesini düzelt
       Object.defineProperty(window, 'outerHeight', {
       get: () => window.innerHeight + 100
      })

  // console.debug tuzağını kır
      const originalDebug = console.debug
      console.debug = function () {
        if (arguments.length === 1 && typeof arguments[0] === 'string' && arguments[0].includes('%c')) {
          return
        }
        return originalDebug.apply(this, arguments)
      }
    })

    await page.goto("https://pixelscan.net/fingerprint-check");

    
    await new Promise(resolve => setTimeout(resolve, delay(3000,4000))); // 3 saniye bekler 

    await page.evaluate(() => {
    const button = document.evaluate("/html/body/pxlscn-root/pxlscn-scanner/div/header/pxlscn-header/div/nav/div/div[2]/ul/li[4]/pxlscn-anchor/a/span[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (button) {
    button.click();
    } else {
    }
    });
    await new Promise(resolve => setTimeout(resolve, delay(3000,4000))); // 3 saniye bekler 
    await page.screenshot({ path: 'clicked-page.png' });


    
}
main()