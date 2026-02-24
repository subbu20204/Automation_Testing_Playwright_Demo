const { test, expect } = require('@playwright/test');
const { AuthActions } = require('../actions/AuthActions');
const { PIMActions } = require('../actions/PIMActions');
const { PIMPage } = require('../pages/PIMPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { getScreenshotPath, loadTestData } = require('../utils/helper');

const employeeData = loadTestData('./testdata/employeeData.json');

test.describe('OrangeHRM - Add Employee', () => {
  let authActions;
  let pimActions;
  let pimPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    authActions = new AuthActions(page);
    pimActions = new PIMActions(page);
    pimPage = new PIMPage(page);
    dashboardPage = new DashboardPage(page);

    await authActions.performLogin(getScreenshotPath('login-page'));
  });

  test('Add new employee and validate in Employee List', async ({ page }) => {
    await dashboardPage.clickPIM();
    await pimPage.validateEmployeeListPage();

    await pimPage.clickAddEmployee();
    await pimPage.validateAddEmployeePage();

    await pimPage.addEmployee(
      employeeData.firstName,
      employeeData.middleName,
      employeeData.lastName
    );

    const employeeId = await pimPage.captureEmployeeId();
    expect(employeeId).toBeTruthy();

    await pimPage.saveEmployee();

    await pimPage.goToEmployeeList();
    await pimPage.searchEmployeeById(employeeId);

    const fullName = `${employeeData.firstName} ${employeeData.lastName}`;
    const row = await pimPage.verifyEmployeeInTable(employeeId, fullName);

    await expect(row).toBeVisible();
  });
});
