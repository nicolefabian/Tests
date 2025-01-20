//This is where all the functions are defined
var { By } = require("selenium-webdriver");
const chai = require("chai").should();
var fs = require("fs"); //file system module

//read data from the json
//match the key for testname
var readData = async function (tcName) {
  const content = fs.readFileSync("./data.json");
  const obj = JSON.parse(content); //holding all the json data
  //loop through the json data
  for (let index = 0; index < obj.length; index++) {
    if (tcName == obj[index]["testName"]) {
      return obj[index];
    }
  }
};
// var myData = readData("tc002"); //returns the data for tc001 because it matches the if "testName"
// console.log(myData);

var login = async function (driver, username, password) {
  globalData = await readData("global");
  console.log(`Going to ${globalData.data.url}`);
  // 1. Navigate to the login page.
  await driver.get(globalData.data.url);
  // 2. Enter valid username and password.
  await driver
    .findElement(By.xpath("//input[@name='login_email']"))
    .sendKeys(username);
  await driver
    .findElement(By.xpath("//input[@name='login_password']"))
    .sendKeys(password);
  //3.  Click on the login button.
  await driver.findElement(By.xpath("//input[@value='Login']")).click();
};

var sanityCheckPageLoad = async function (driver, expectedText) {
  //verify the text -> Hello, Student
  var actualText = await driver
    .findElement(By.xpath("//h2[contains(text(),'Hello')]"))
    .getText();
  actualText.should.equal(expectedText);
};

var sanityCheckInvalidLogin = async function (driver, expectedText) {
  var actualText = await driver
    .findElement(
      By.xpath(
        "//h3[normalize-space()='Your Login Name or Password is invalid']"
      )
    )
    .getText();
  actualText.should.equal(expectedText);
};

module.exports = {
    login, sanityCheckPageLoad, sanityCheckInvalidLogin, readData
}
