const Employee = require("./models/Employee");
const User = require("./models/User");
const fDbData = require("./data.json");

class FakeDb {
  constructor() {
    this.employees = fDbData.employees;
    this.users = fDbData.users;
  }

  async cleanDb() {
    await User.deleteMany();
    await Employee.deleteMany();
  }
  pushDataToDb() {
    const user = new User(this.users[0]);
    const user2 = new User(this.users[1]);

    this.employees.forEach(employee => {
      const newEmployee = new Employee(employee);
      newEmployee.user = user;

      user.employees.push(newEmployee);
      newEmployee.save();
    });
    user.save();
    user2.save();
  }

  async seedDb() {
    await this.cleanDb();
    this.pushDataToDb();
  }
}

module.exports = FakeDb;
