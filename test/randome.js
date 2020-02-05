// e2e/runWithSelenium.ts
const webdriver = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const assert = require("assert");
const path = require("path");
const {
    Builder,
    By,
    Key,
    until,
    WebDriver,
    Capabilities
} = require('selenium-webdriver');
const {
    expect
} = require('chai');
const {
    Eyes,
    ClassicRunner,
    Target,
    RectangleSize
} = require('@applitools/eyes-selenium');

let driver = webdriver.WebDriver;

describe('my test', () => {
    before(async () => {
        let capabilities = webdriver.Capabilities;
        switch (process.env.BROWSER || "chrome") {
            case "edge": {
                // HACK: include IEDriver path by nuget
                require('edgedriver');
                capabilities = webdriver.Capabilities.edge();
                break;
            }
            case "safari": {
                capabilities = webdriver.Capabilities.safari();
                break;
            }
            case "firefox": {
                require("geckodriver");
                capabilities = webdriver.Capabilities.firefox();
                //                 driver = await new webdriver.Builder()
                //                     .withCapabilities(capabilities)
                //     //                .setFirefoxOptions(new firefox.Options().addArguments('--headless'))
                //                     .build();
                break;
            }
            case "chrome": {
                require("chromedriver");
                capabilities = webdriver.Capabilities.chrome();

                break;
            }
        }
        driver = await new webdriver.Builder()
            .withCapabilities(capabilities)
            .build();
    });

    after(async () => {
        await driver.quit()
    });

    it('Just testing flow for selenium in SB company', async () => {
        //    await eyes.open(driver, 'Demo', 'Sample test');
        await driver.manage().window().maximize();
        await driver.get('https://softwarebrothers.co/');
        await driver.findElement(By.linkText("Services")).click();
        await driver.sleep(2000);
        //  await eyes.check("Login Window", Target.window())
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//a[@aria-label= 'dismiss cookie message' and @role='button']")))).click();
        await driver.sleep(2000);
        await driver.findElement(By.className(("webdev"))).click();
        //    await eyes.check("Login Window", Target.window())
        await driver.sleep(2000);
        const title = await (await driver.findElement(By.xpath("//*[text()='Web Design and Development']"))).getText();
        expect(title.toUpperCase()).to.have.string('WEB DESIGN AND DEVELOPMENT');
    });
});
