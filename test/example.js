const {
    Builder,
    By,
    Key,
    until
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

describe('DefaultTest', () => {

    let driver;
    let eyes;

    beforeEach(async () => {
        //let capabilities = webdriver.Capabilities.safari();
        driver = await new Builder().forBrowser('safari').build();
        //   runner = new ClassicRunner();
        //  eyes = new Eyes(runner);
        //  eyes.setApiKey('L7FtaWHGMkDYVj111K6pD101qPr0RaFb8sYADTANemhrHdQ110');
    })

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
    // it('should go to nehalist.io and check the title', async () => {
    //     await driver.manage().window().maximize();
    //     await driver.get('https://softwarebrothers.co/');
    //     await driver.findElement(By.linkText("Services")).click();
    //     await driver.sleep(2000);
    //     await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//a[@aria-label= 'dismiss cookie message' and @role='button']")))).click();
    //     await driver.sleep(2000);
    //     await driver.findElement(By.className(("webdev"))).click();
    //     await driver.sleep(2000);
    //     const title = await (await driver.findElement(By.xpath("//*[text()='Web Design and Development']"))).getText();
    //     expect(title.toUpperCase()).to.have.string('WEB DESIGN AND DEVELOPMENT');
    //     await driver.sleep(2000);
    // });

    // it('should go to nehalist.io and check the title', async () => {
    //     await driver.manage().window().maximize();
    //     await driver.get('https://softwarebrothers.co/');
    //     await driver.findElement(By.linkText("Services")).click();
    //     await driver.sleep(2000);
    //     await driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//a[@aria-label= 'dismiss cookie message' and @role='button']")))).click();
    //     await driver.sleep(2000);
    //     await driver.findElement(By.className(("webdev"))).click();
    //     await driver.sleep(2000);
    //     const title = await (await driver.findElement(By.xpath("//*[text()='Web Design and Development']"))).getText();
    //     expect(title.toUpperCase()).to.have.string('WEB DESIGN AND DEVELOPMENT');
    //     await driver.sleep(2000);
    // });

    afterEach(async () => {
        //     await eyes.closeAsync();
        await driver.quit();
        //   await eyes.abortIfNotClosed();
        // const allTestResults = await runner.getAllTestResults();
        //  console.log(allTestResults);
    });

});