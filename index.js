// const exp = require('constants');
// const {Builder, Browser, By} = require('selenium-webdriver'); //node .\index.js to run the script
// //const assert = require('assert'); -> in build in node.js
// const chai = require('chai').should(); //npm install chai -> chai library for assertion

// var tc001 = async function() {
//     //initiate the browser
//     let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

//     try {
//         //navigate to the website
//         await driver.get("https://bookstore.qacurry.com");
//         //enter username and password
//         await driver.findElement(By.xpath("//input[@id='email']")).sendKeys("student@qacurry.com");
//         await driver.findElement(By.xpath("//input[@id='password']")).sendKeys("Q@curry");
//         //click on login button
//         await driver.findElement(By.xpath("//input[@value='Login']")).click();
//         //verify the text -> Hello, Student
//         var actualText = await driver.findElement(By.xpath("//h2[contains(text(),'Hello')]")).getText();
//         var expectedText = "Hello Student";
//         //assert.equal(actualText, expectedText, "Validation for login text"); //comparing the actual and expected text
//         //verify the login
//        //console.log("TC001:Login successful");
//        actualText.should.equal(expectedText);
//     }
//     catch (err) {
//         console.error(err);
//     }   
//     finally {
//         await driver.quit();
//         //
//         console.log("TC001:Test case execution completed");
//     }
// }
// //execute the test case
// tc001();

//TC001 -> HAPPY PATH   
const exp = require('constants');
const {Builder, Browser, By} = require('selenium-webdriver'); //node .\index.js to run the script
var {login, sanityCheckPageLoad,sanityCheckInvalidLogin} = require('./function'); //importing the login function from function.js

var tc001 = async function() {
    //initiate the browser
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

    try {
        //login function -> pass driver
        console.log("TC001:Login started");
        await login(driver,"student@qacurry.com","Q@curry");
        //verify the text -> Hello, Student
        await sanityCheckPageLoad(driver, "Hello Student");
        //verify the login
       console.log("TC001:Login successful");
    }
    catch (err) {
        console.log(err);
    }   
    finally {
        await driver.quit();
        //
        console.log("TC001:Test case execution completed");
    }
}
//execute the test case
//tc001();


var tc002 = async function() {
    //initiate the browser
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();

    try {
        //login function -> pass driver
        console.log("TC002:Login started");
        await login(driver,"not-student@qacurry.com","not-Q@curry");
        await sanityCheckInvalidLogin(driver, "Your Login Name or Password is invalid");
        //verify the login
         console.log("TC002:Login successful");
    }
    catch (err) {
        console.log(err); 
    }   
    finally {
        await driver.quit();
        //
        console.log("TC002:Test case execution completed");
    }
    
}
//tc002();

//executing multiple test cases without mocha
var testsuite = async function() {
    await tc001();
    await tc002();
}();