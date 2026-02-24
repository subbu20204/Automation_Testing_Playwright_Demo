class PIMPage {
  constructor(page) {
    this.page = page;
    this.employeeListHeading = page.getByRole('heading', { name: 'Employee Information' });
    this.addEmployeeTab = page.getByRole('link', { name: 'Add Employee' });
    this.addEmployeeHeading = page.getByRole('heading', { name: 'Add Employee' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.employeeIdInput = page.locator('input.oxd-input').nth(4);
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.successToast = page.locator('.oxd-toast--success');
    this.employeeListTab = page.getByRole('link', { name: 'Employee List' });
    this.searchEmployeeIdInput = page.locator('div.oxd-table-filter').getByRole('textbox').nth(1);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.tableBody = page.locator('.oxd-table-body');
  }

  async validateEmployeeListPage() {
    await this.page.waitForURL('**/pim/viewEmployeeList**', { timeout: 30000 });
    await this.employeeListHeading.waitFor({ state: 'visible', timeout: 20000 });
  }

  async clickAddEmployee() {
    await this.addEmployeeTab.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForURL('**/pim/addEmployee**', { timeout: 30000 });
  }

  async validateAddEmployeePage() {
    await this.addEmployeeHeading.waitFor({ state: 'visible', timeout: 20000 });
  }

  async addEmployee(first, middle, last) {
    await this.firstNameInput.fill(first);
    await this.middleNameInput.fill(middle);
    await this.lastNameInput.fill(last);
  }

  async captureEmployeeId() {
    await this.employeeIdInput.waitFor({ state: 'visible', timeout: 15000 });
    return await this.employeeIdInput.inputValue();
  }

  async saveEmployee() {
    await this.saveButton.click();
    await this.successToast.waitFor({ state: 'visible', timeout: 30000 });
    await this.successToast.waitFor({ state: 'hidden', timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }

  async goToEmployeeList() {
    await this.employeeListTab.click();
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForURL('**/pim/viewEmployeeList**', { timeout: 30000 });
  }

  async searchEmployeeById(id) {
    await this.searchEmployeeIdInput.waitFor({ state: 'visible', timeout: 20000 });
    await this.searchEmployeeIdInput.fill(id);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
    await this.tableBody.waitFor({ state: 'visible', timeout: 20000 });
  }

  async verifyEmployeeInTable(id, fullName) {
    const row = this.tableBody.locator('.oxd-table-row', {
      has: this.page.locator(`.oxd-table-cell:has-text("${id}")`),
    });
    await row.waitFor({ state: 'visible', timeout: 15000 });
    await row.locator(`.oxd-table-cell:has-text("${id}")`).first().isVisible();
    await row.locator(`.oxd-table-cell:has-text("${fullName}")`).first().isVisible();
    return row;
  }
}

module.exports = { PIMPage };
