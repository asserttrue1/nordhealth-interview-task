
const { test, expect } = require('@playwright/test');

const LoginPage = require('../page-objects/loginPage');
const DepositPage = require('../page-objects/depositPage');
const WithdrawPage = require('../page-objects/withdrawPage');
const TransactionsPage = require('../page-objects/transactionsPage');


let page;
let context;
let loginPage;
let depositPage;
let withdrawPage;
let transactionsPage;

test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    loginPage = new LoginPage(page);
    depositPage = new DepositPage(page);
    withdrawPage = new WithdrawPage(page);
    transactionsPage = new TransactionsPage(page);

    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
    await loginPage.login('Customer', '3');
});

test('customerDepositTest', async () => {
    const amountToDeposit = '100';

    await depositPage.navigateToDepositTab();

    await expect(page.locator('body')).toContainText('Amount to be Deposited');

    await depositPage.depositAmount(amountToDeposit);

    const textAfterDeposit = await depositPage.getAccountInfoText();
    expect(textAfterDeposit).toContain('Balance : 100');
    await expect(page.locator('body')).toContainText('Deposit Successful');
});

test('customerWithdrawalTest', async () => {
    const amountToWithdraw = '50';

    await withdrawPage.navigateToWithdrawTab();

    await expect(page.locator('body')).toContainText('Amount to be Withdrawn :');

    await withdrawPage.withdrawAmount(amountToWithdraw);

    const textAfterWithdrawal = await withdrawPage.getAccountInfoText();
    
    expect(textAfterWithdrawal).toContain('Balance : 50');

    await expect(page.locator('body')).toContainText('Transaction successful');
});

test('customerWithdrawalExceedingBalanceTest', async () => {
    const amountToWithdrawNegative = '1000';

    await withdrawPage.withdrawAmount(amountToWithdrawNegative);

    await expect(page.locator('body')).toContainText('Transaction Failed. You can not withdraw amount more than the balance');
});

test('customerTransactionsTest', async () => {  
    await transactionsPage.navigateToTransactionsTab();

    await expect(page.getByText('Date-Time')).toBeVisible();
    await expect(page.getByText('Amount')).toBeVisible();
    await expect(page.getByText('Transaction Type')).toBeVisible();

    const transactions = await transactionsPage.getTransactions();

    const today = new Date().toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
    
    expect(transactions).toContainEqual(expect.objectContaining({
        date: today,
        amount: '100', 
        type: 'Credit' 
    }));

    expect(transactions).toContainEqual(expect.objectContaining({
        date: today,
        amount: '50', 
        type: 'Debit' 
    }));
});