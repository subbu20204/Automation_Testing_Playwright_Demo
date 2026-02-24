class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.pimMenuItem = page.getByRole('link', { name: 'PIM' });
  }

  async waitForDashboard() {
    await this.dashboardHeading.waitFor({ state: 'visible', timeout: 30000 });
    await this.page.waitForLoadState('networkidle');
  }

  async clickPIM() {
    await this.pimMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { DashboardPage };
