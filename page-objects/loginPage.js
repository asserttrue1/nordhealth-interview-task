class LoginPage {
    constructor(page) {
        this.page = page;
        this.customerLoginButton = page.getByRole('button', { name: 'Customer Login' });
        this.bankManagerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
        this.userSelect = page.locator('#userSelect');
        this.loginSubmitButton = page.getByRole('button', { name: 'Login' });
    }

    async login(loginType, userOption) {
        let loginButton;

        if (loginType === 'Customer') {
            loginButton = this.customerLoginButton;
        } else if (loginType === 'Manager') {
            loginButton = this.bankManagerLoginButton;
        } else {
            throw new Error('Invalid login');
        }
        
        await loginButton.click();
        if (loginType === 'Customer') {
            await this.userSelect.selectOption(userOption);
            await this.loginSubmitButton.click();
        }
    }
}

module.exports = LoginPage;
