const pimPO = require('../pageObjects/PIMPageObject.json');

class PIMPage {
  constructor(page) {
    const sel = pimPO.selectors;
    
    this.page = page;
    this.employeeListHeading   = page.getByRole(sel.employeeListHeading.role,  { name: sel.employeeListHeading.name  });
    this.addEmployeeTab        = page.getByRole(sel.addEmployeeTab.role,       { name: sel.addEmployeeTab.name       });
    this.addEmployeeHeading    = page.getByRole(sel.addEmployeeHeading.role,   { name: sel.addEmployeeHeading.name   });
    this.firstNameInput        = page.getByRole(sel.firstNameInput.role,       { name: sel.firstNameInput.name       });
    this.middleNameInput       = page.getByRole(sel.middleNameInput.role,      { name: sel.middleNameInput.name      });
    this.lastNameInput         = page.getByRole(sel.lastNameInput.role,        { name: sel.lastNameInput.name        });
    this.employeeIdInput       = page.locator(sel.employeeIdInput.locator).nth(sel.employeeIdInput.nth);
    this.saveButton            = page.getByRole(sel.saveButton.role,           { name: sel.saveButton.name           });
    this.successToast          = page.locator(sel.successToast);
    this.employeeListTab       = page.getByRole(sel.employeeListTab.role,      { name: sel.employeeListTab.name      });
    this.searchEmployeeIdInput = page.locator(sel.searchEmployeeIdInput.locator).getByRole(sel.searchEmployeeIdInput.role).nth(sel.searchEmployeeIdInput.nth);
    this.searchButton          = page.getByRole(sel.searchButton.role,         { name: sel.searchButton.name         });
    this.tableBody             = page.locator(sel.tableBody);
  }

  async validateEmployeeListPage() {
    await this.page.waitForURL(pimPO.urls.employeeList, { timeout: pimPO.timeouts.url });
    await this.employeeListHeading.waitFor({ state: 'visible', timeout: pimPO.timeouts.heading });
  }

  async clickAddEmployee() {
    await this.addEmployeeTab.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForURL(pimPO.urls.addEmployee, { timeout: pimPO.timeouts.url });
  }

  async validateAddEmployeePage() {
    await this.addEmployeeHeading.waitFor({ state: 'visible', timeout: pimPO.timeouts.heading });
  }

  async addEmployee(first, middle, last) {
    await this.firstNameInput.fill(first);
    await this.middleNameInput.fill(middle);
    await this.lastNameInput.fill(last);
  }

  async captureEmployeeId() {
    await this.employeeIdInput.waitFor({ state: 'visible', timeout: pimPO.timeouts.element });
    return await this.employeeIdInput.inputValue();
  }

  async saveEmployee() {
    await this.saveButton.click();
    await this.successToast.waitFor({ state: 'visible', timeout: pimPO.timeouts.toastVisible });
    await this.successToast.waitFor({ state: 'hidden',  timeout: pimPO.timeouts.toastHidden  });
    await this.page.waitForLoadState('networkidle');
  }

  async goToEmployeeList() {
    await this.employeeListTab.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForURL(pimPO.urls.employeeList, { timeout: pimPO.timeouts.url });
  }

  async searchEmployeeById(id) {
    await this.searchEmployeeIdInput.waitFor({ state: 'visible', timeout: pimPO.timeouts.search });
    await this.searchEmployeeIdInput.fill(id);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.tableBody.waitFor({ state: 'visible', timeout: pimPO.timeouts.search });
  }

  async verifyEmployeeInTable(id, fullName) {
    const { tableRow, tableCell } = pimPO.selectors;
    const row = this.tableBody.locator(tableRow, {
      has: this.page.locator(`${tableCell}:has-text("${id}")`),
    });
    await row.waitFor({ state: 'visible', timeout: pimPO.timeouts.row });
    await row.locator(`${tableCell}:has-text("${id}")`).first().isVisible();
    await row.locator(`${tableCell}:has-text("${fullName}")`).first().isVisible();
    return row;
  }
}

module.exports = { PIMPage };
