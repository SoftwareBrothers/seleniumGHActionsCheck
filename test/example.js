const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');
const {
    expect
} = require('chai');
const fs = require('fs')

describe('DefaultTest', () => {
    let driver;
    beforeEach(async () => {
        driver = await new Builder().forBrowser('chrome').build()
        return driver
    })

    it('should go to nehalist.io and check the title', async () => {

        await driver.manage().window().maximize();
        await driver.get('https://softwarebrothers.co/');
        await driver.findElement(By.linkText("Services")).click();
        await driver.sleep(2000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//a[@aria-label= 'dismiss cookie message' and @role='button']")))).click();
        await driver.sleep(2000);
        await driver.findElement(By.className(("webdev"))).click();
        await driver.sleep(2000);
        const title = await (await driver.findElement(By.xpath("//*[text()='Web Design and Development']"))).getText();
        expect(title.toUpperCase()).to.have.string('WEB DESIGN AND DEVELOPMENT');
        await driver.sleep(2000);

    });
    it('should go to nehalist.io and check the title', async () => {

        await driver.manage().window().maximize();
        await driver.get('https://softwarebrothers.co/');
        await driver.findElement(By.linkText("Services")).click();
        await driver.sleep(2000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//a[@aria-label= 'dismiss cookie message' and @role='button']")))).click();
        await driver.sleep(2000);
        await driver.findElement(By.className(("webdev"))).click();
        await driver.sleep(2000);
        const title = await (await driver.findElement(By.xpath("//*[text()='Web Design and Development']"))).getText();
        expect(title.toUpperCase()).to.have.string('WEB DESIGN AND DEVELOPMENT');
        await driver.sleep(2000);

    });
    it('should go to nehalist.io and check the title', async () => {

        await driver.manage().window().maximize();
        await driver.get('https://softwarebrothers.co/');
        await driver.findElement(By.linkText("Services")).click();
        await driver.sleep(2000);
        await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//a[@aria-label= 'dismiss cookie message' and @role='button']")))).click();
        await driver.sleep(2000);
        await driver.findElement(By.className(("webdev"))).click();
        await driver.sleep(2000);
        const title = await (await driver.findElement(By.xpath("//*[text()='Web Design and Development']"))).getText();
        expect(title.toUpperCase()).to.have.string('WEB DESIGN AND DEVELOPMENT');
        await driver.sleep(2000);

    });

    afterEach(async () => {
        await driver.close()
        await driver.quit()
    });
});