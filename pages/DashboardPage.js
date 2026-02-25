const dashboardPO = require('../pageObjects/DashboardPageObject.json');

class DashboardPage {
  constructor(page) {
    const sel = dashboardPO.selectors;
    
    this.page = page;
    this.dashboardHeading = page.getByRole(sel.dashboardHeading.role, { name: sel.dashboardHeading.name });
    this.pimMenuItem      = page.getByRole(sel.pimMenuItem.role,      { name: sel.pimMenuItem.name      });
  }

  async waitForDashboard() {
    await this.dashboardHeading.waitFor({ state: 'visible', timeout: dashboardPO.timeouts.heading });
    await this.page.waitForLoadState('networkidle');
  }

  async clickPIM() {
    await this.pimMenuItem.click();
    await this.page.waitForLoadState('networkidle');
  }
}

module.exports = { DashboardPage };
