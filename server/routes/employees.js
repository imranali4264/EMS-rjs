const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const { mongoErrors } = require("../helpers/mongoose");
const UserControl = require("../controllers/user");
const User = require("../models/User");

//get curent user by jwt token
router.get("/secret", UserControl.loginMiddleware, (req, res) => {
  res.json({ secret: true });
});

router.get("/manage", UserControl.loginMiddleware, (req, res) => {
  const user = res.locals.user;
  Employee.where("user", user.userId).exec((err, foundEmployees) => {
    if (err) {
      return res.status(422).send({ errors: mongoErrors(err.errors) });
    }
    return res.json(foundEmployees);
  });
});

//get employee by id
router.get("/:id", (req, res) => {
  const employeeId = req.params.id;

  Employee.findById(employeeId)
    .populate("user", "username -_id")
    .exec((err, foundEmployee) => {
      if (err) {
        return res.status(422).send({
          errors: [
            { title: "Employees Error!", detail: "Counld not find employee!" }
          ]
        });
      }
      return res.json(foundEmployee);
    });
});

router.delete("/:id", UserControl.loginMiddleware, (req, res) => {
  const user = res.locals.user;
  Employee.findById(req.params.id)
    .populate("user", "_id")
    .exec((err, foundEmployee) => {
      if (err) {
        return res.status(422).send({ errors: mongoErrors(err.errors) });
      }
      if (user.userId !== foundEmployee.user.id) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid User!",
              detail: "You are not authenticated this employee!"
            }
          ]
        });
      }
      foundEmployee.remove(err => {
        if (err) {
          res.status(422).send({ errors: mongoErrors(err.errors) });
        }
        return res.json({ status: "deleted" });
      });
    });
});

router.post("", UserControl.loginMiddleware, (req, res) => {
  const { empName, designation, salary, description, image } = req.body;
  const user = res.locals.user;

  const employee = new Employee({
    empName,
    designation,
    salary,
    description,
    image
  });
  employee.user = user.userId;
  Employee.create(employee, (err, newEmployee) => {
    if (err) {
      res.status(422).send({ errors: mongoErrors(err.errors) });
    }
    User.updateOne(
      { _id: user.userId },
      { $push: { employees: newEmployee } },
      () => {}
    );
    return res.json(newEmployee);
  });
});

//get all employees and search employees with query for employee name
router.get("", (req, res) => {
  const empName = req.query.empName;
  const query = empName ? { empName: empName.toLowerCase() } : {};

  Employee.find(query).exec((err, foundEmployees) => {
    if (err) {
      return res.status(422).send({ errors: mongoErrors(err.errors) });
    }
    if (empName && foundEmployees.length === 0) {
      return res.status(404).send({
        errors: [
          {
            title: "No employee found",
            detail: `There is no employee for this Name ${empName}`
          }
        ]
      });
    }
    res.json(foundEmployees);
  });
});
// const minSalary = req.query.salary;
// const maxSalary = req.query.salary;
// const query2 = salary ? { salary } : {};
// const salary = req.query.salary;

module.exports = router;
