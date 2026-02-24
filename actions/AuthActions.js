const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

class AuthActions {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.dashboardPage = new DashboardPage(page);
  }

  async performLogin(screenshotPath) {
    await this.loginPage.navigate();
    await this.loginPage.login('Admin', 'admin123', screenshotPath);
    await this.dashboardPage.waitForDashboard();
  }
}

module.exports = { AuthActions };
