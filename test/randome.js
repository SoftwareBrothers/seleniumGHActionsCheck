// e2e/runWithSelenium.ts
const webdriver = require("selenium-webdriver");
const assert = require("assert");
const path = require("path");

let driver = webdriver.WebDriver;

describe('my test', () => {
    before(async () => {
        let capabilities = webdriver.Capabilities;
        switch ('firefox') {
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
                const driverPath = path.join(
                    __dirname,
                    "../Selenium.WebDriver.GeckoDriver.3.150.0/driver/"
                );
                process.env.PATH = `${process.env.PATH};${driverPath};`;
                capabilities = webdriver.Capabilities.firefox();
                break;
            }
            case "chrome": {
                require("chromedriver");
                capabilities = webdriver.Capabilities.chrome();
                capabilities.set("chromeOptions", {
                    args: [
                        "--headless",
                        "--no-sandbox",
                        "--disable-gpu",
                        "--window-size=1980,1200"
                    ]
                });
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

    it("Google", async () => {
        await driver.get('http://google.com');
        assert.equal(await driver.getTitle(), "Google");
    });
});