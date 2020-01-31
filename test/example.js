const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');
const {
    expect
} = require('chai');

describe('DefaultTest', () => {
    let driver;
    before(() => {
        driver = new Builder().forBrowser('chrome').build()
    })

    it('should go to nehalist.io and check the title', async () => {

        await driver.manage().window().maximize();
        await driver.get('https://softwarebrothers.co/');
        await driver.sleep(10000);

        await driver.findElement(By.linkText("Services")).click();
        await driver.sleep(2000);
        await driver.findElement(By.className(("webdev"))).click();
        await driver.sleep(2000);
        const title = await (await driver.findElement(By.xpath("//*[text()='Web Design and Development']"))).getText();
        expect(title.toUpperCase()).to.have.string('WEB DESIGN AND DEVELOPMENT');
        await driver.sleep(2000);

    });

    after(async () => {
        driver.close()
        driver.quit()
    });
});