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
let eyes;

describe('my test', () => {
    before(async () => {
        runner = new ClassicRunner();
        eyes = new Eyes(runner);
        eyes.setApiKey('L7FtaWHGMkDYVj111K6pD101qPr0RaFb8sYADTANemhrHdQ110');
        let capabilities = webdriver.Capabilities;
        switch (process.env.BROWSER || "chrome") {
            case "ie": {
                // HACK: include IEDriver path by nuget
                const driverPath = path.join(
                    __dirname,
                    "../Selenium.WebDriver.IEDriver.3.150.0/driver/"
                );
                process.env.PATH = `${process.env.PATH};${driverPath};`;
                capabilities = webdriver.Capabilities.ie();
                capabilities.set("ignoreProtectedModeSettings", true);
                capabilities.set("ignoreZoomSetting", true);
                break;
            }
            case "safari": {
                capabilities = webdriver.Capabilities.safari();
                break;
            }
            case "firefox": {
                const driverPath = path.join(`${__dirname}/node_modules/geckodriver/bin`);
                process.env.PATH = `${process.env.PATH}:${driverPath}:`;
                capabilities = webdriver.Capabilities.firefox();
                driver = await new webdriver.Builder()
                    .withCapabilities(capabilities)
                    .setFirefoxOptions(new firefox.Options().addArguments('--headless'))
                    .build();
                return;
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
        await eyes.closeAsync();
        await driver.quit();
        await eyes.abortIfNotClosed();
        const allTestResults = await runner.getAllTestResults();
        console.log(allTestResults);
    });

    it('Just testing flow for selenium in SB company', async () => {
        await eyes.open(driver, 'Demo', 'Sample test');
        await driver.manage().window().maximize();
        await driver.get('https://softwarebrothers.co/');
        await eyes.check("Window", Target.window())
        await driver.findElement(By.linkText("Services")).click();
        await driver.sleep(2000);
        await eyes.check("Login Window", Target.window())
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//a[@aria-label= 'dismiss cookie message' and @role='button']")))).click();
        await driver.sleep(2000);
        await driver.findElement(By.className(("webdev"))).click();
        await eyes.check("Window", Target.window())
        await driver.sleep(2000);
        const title = await (await driver.findElement(By.xpath("//*[text()='Web Design and Development']"))).getText();
        expect(title.toUpperCase()).to.have.string('WEB DESIGN AND DEVELOPMENT');
    });
});