const loginPO = require('../pageObjects/LoginPageObject.json');

class LoginPage {
  constructor(page) {
    const sel = loginPO.selectors;
    
    this.page = page;
    this.usernameInput = page.getByRole(sel.usernameInput.role, { name: sel.usernameInput.name });
    this.passwordInput = page.getByRole(sel.passwordInput.role, { name: sel.passwordInput.name });
    this.loginButton   = page.getByRole(sel.loginButton.role,   { name: sel.loginButton.name   });
  }

  async navigate() {
    await this.page.goto(loginPO.url);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username, password, screenshotPath) {
    const { element: timeout } = loginPO.timeouts;
    await this.usernameInput.waitFor({ state: 'visible', timeout });
    await this.passwordInput.waitFor({ state: 'visible', timeout });
    await this.loginButton.waitFor({   state: 'visible', timeout });
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
