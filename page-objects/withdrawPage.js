class WithdrawPage { 
    constructor(page) {
        this.page = page;
        this.withdrawTab = page.getByRole('button', { name: 'Withdrawl' });
        this.amountInput = page.locator('input[ng-model="amount"]');
        this.withdrawSubmitButton = page.getByRole('button', { name: 'Withdraw', exact: true });
        this.accountInfo = page.locator('body');
    }

    async navigateToWithdrawTab() {
        await this.withdrawTab.click();
    }

    async withdrawAmount(amount) {
        await this.amountInput.focus();
        await this.amountInput.fill(amount);
        await this.withdrawSubmitButton.click();
    }

    async getAccountInfoText() {
        return await this.accountInfo.textContent();
    }
}

module.exports = WithdrawPage;
