const { DashboardPage } = require('../pages/DashboardPage');
const { PIMPage } = require('../pages/PIMPage');

class PIMActions {
  constructor(page) {
    this.page = page;
    this.dashboardPage = new DashboardPage(page);
    this.pimPage = new PIMPage(page);
  }

  async createEmployeeAndValidate(employeeData) {
    await this.dashboardPage.clickPIM();
    await this.pimPage.validateEmployeeListPage();

    await this.pimPage.clickAddEmployee();
    await this.pimPage.validateAddEmployeePage();

    await this.pimPage.addEmployee(
      employeeData.firstName,
      employeeData.middleName,
      employeeData.lastName
    );

    const employeeId = await this.pimPage.captureEmployeeId();
    await this.pimPage.saveEmployee();

    await this.pimPage.goToEmployeeList();
    await this.pimPage.searchEmployeeById(employeeId);

    const fullName = `${employeeData.firstName} ${employeeData.lastName}`;
    const row = await this.pimPage.verifyEmployeeInTable(employeeId, fullName);

    return { employeeId, row };
  }
}

module.exports = { PIMActions };
