// e2e/runWithSelenium.ts
const webdriver = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const assert = require("assert");
const path = require("path");

let driver = webdriver.WebDriver;

describe('my test', () => {
    before(async () => {
        let capabilities = webdriver.Capabilities;
        switch (process.env.BROWSER || "firefox") {
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
