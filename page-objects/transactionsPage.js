class TransactionsPage {
    constructor(page) {
        this.page = page;
        this.transactionTab = page.getByRole('button', { name: 'Transactions' }).first();
        this.transactionsHeader = page.getByText('Transaction Type');
        this.rows = page.locator('table tbody tr'); 
    }

    async navigateToTransactionsTab() {
        await this.page.waitForTimeout(5000); 
        await this.transactionTab.click();
    }

    async getTransactions() {  
        const rowCount = await this.rows.count();
        const transactions = [];

        if (rowCount === 0) {
            throw new Error('No transactions found');
        }
    
        for (let i = 0; i < rowCount; i++) {
            const row = this.rows.nth(i);
            const fullDate = await row.locator('td').nth(0).innerText();
            const amount = await row.locator('td').nth(1).innerText();
            const type = await row.locator('td').nth(2).innerText();

            const formattedDate = this.formatDate(fullDate);

            transactions.push({ date: formattedDate, amount: amount.trim(), type: type.trim() });
        }
        return transactions;
    }

   formatDate(fullDate) {
    const date = new Date(fullDate);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    });
   } 
}
module.exports = TransactionsPage;
