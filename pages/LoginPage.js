class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async navigate() {
    await this.page.goto('/web/index.php/auth/login');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password, screenshotPath) {
    await this.usernameInput.waitFor({ state: 'visible', timeout: 30000 });
    await this.passwordInput.waitFor({ state: 'visible', timeout: 30000 });
    await this.loginButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    if (screenshotPath) {
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
    }
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { LoginPage };
