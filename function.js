//This is where all the functions are defined
var { By } = require("selenium-webdriver");
const chai = require('chai').should();


var login = async function (driver, username, password) {
  // 1. Navigate to the login page.
  await driver.get("https://bookstore.qacurry.com");
  // 2. Enter valid username and password.
  await driver.findElement(By.xpath("//input[@name='login_email']")).sendKeys(username);
  await driver.findElement(By.xpath("//input[@name='login_password']")).sendKeys(password);
  //3.  Click on the login button.
  await driver.findElement(By.xpath("//input[@value='Login']")).click()
}

var sanityCheckPageLoad = async function (driver, expectedText) {
  //verify the text -> Hello, Student
  var actualText = await driver
    .findElement(By.xpath("//h2[contains(text(),'Hello')]"))
    .getText();
  actualText.should.equal(expectedText);
};

var sanityCheckInvalidLogin = async function (driver, expectedText) {
  var actualText = await driver.findElement(By.xpath("//h3[normalize-space()='Your Login Name or Password is invalid']")).getText(); 
  actualText.should.equal(expectedText);
};

module.exports = {
    login, sanityCheckPageLoad, sanityCheckInvalidLogin
}

