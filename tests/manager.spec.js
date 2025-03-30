const { test, expect } = require('@playwright/test');

const LoginPage = require('../page-objects/loginPage');
const CustomersPage = require('../page-objects/customersPage');

let page;
let context;
let loginPage;
let customersPage;


test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    customersPage = new CustomersPage(page);

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    await loginPage.login('Manager', '3');
});

test('searchCustomerTest', async () => {
    const firstName = 'Ron';

    await customersPage.navigateToCustomersTab();

    await customersPage.searchForCustomer(firstName);

    const customerDetails = await customersPage.getCustomerDetails();

    expect(customerDetails.firstName).toBe('Ron');
    expect(customerDetails.lastName).toBe('Weasly');
    expect(customerDetails.postCode).toBe('E55555');
});

test('deleteCustomerTest', async () => {
    await customersPage.deleteCustomer();

    const deletedCustomer = await customersPage.getCustomerDetails('Ron');
    expect(deletedCustomer).toBeFalsy();
});
