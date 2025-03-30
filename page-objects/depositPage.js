class DepositPage {
    constructor(page) {
        this.page = page;
        this.depositTab = page.getByRole('button', { name: 'Deposit' }).first();
        this.amountInput = page.locator('input[ng-model="amount"]');
        this.depositSubmitButton = page.getByRole('button', { name: 'Deposit' }).nth(1);
        this.accountInfo = page.locator('body');
    }

    async navigateToDepositTab() {
        await this.depositTab.click();
    }

    async depositAmount(amount) {
        await this.amountInput.focus();
        await this.amountInput.fill(amount);
        await this.depositSubmitButton.click();
    }

    async getAccountInfoText() {
        return await this.accountInfo.textContent();
    }
}

module.exports = DepositPage;
