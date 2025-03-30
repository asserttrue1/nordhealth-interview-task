class CustomersPage {
    constructor(page) {
        this.page = page;
        this.customersTab = page.getByRole('button', { name: 'Customers' }).first();
        this.searchInput = page.getByRole('textbox', { name: 'Search Customer' });
        this.deleteButton = page.getByRole('button', { name: 'Delete' }); 
        this.customerRows = page.locator('tbody tr');
    }

    async navigateToCustomersTab() {
        await this.customersTab.click();
    }

    async searchForCustomer(firstName) {
        await this.searchInput.focus();
        await this.searchInput.fill(firstName);
    }

    async getCustomerDetails(customerName = null) {
        const rowCount = await this.customerRows.count();
        if (rowCount === 0) {
            return null;
        }
    
        for (let i = 0; i < rowCount; i++) {
            const row = this.customerRows.nth(i);
            const firstNameText = await row.locator('td').nth(0).innerText();
            
            if (!customerName || firstNameText.trim() === customerName) {
                const lastName = await row.locator('td').nth(1).innerText();
                const postCode = await row.locator('td').nth(2).innerText();
                
                return { 
                    firstName: firstNameText.trim(), 
                    lastName: lastName.trim(), 
                    postCode: postCode.trim() 
                };
            }
        }
        
        return null;
    }

    async deleteCustomer() {
        await this.deleteButton.click();
    }
}

module.exports = CustomersPage;
