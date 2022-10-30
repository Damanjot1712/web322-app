const file = require('fs');  
var departments = [];
var employees = [];


exports.initialize = () =>
{
    return new Promise ((resolve, reject) =>{
        file.readFile('./data/departments.json', (err,data)=> {
            if (err) {
                reject ('unable to read file');
            }
            else {
                departments = JSON.parse(data);
            }
        });
        file.readFile('./data/employees.json', (err,data) =>
        {
            if (err)
             {
                reject ('unable to read file');
            }
            else
             {
                employees = JSON.parse(data);
            }
        })       
        resolve();
    })
};

exports.getAllEmployees = () =>{
    return new Promise ((resolve,reject) => {
        if (employees.length == 0) {
            reject('unable to read file');
        }
        else {
            resolve(employees);
        }
    })
};

exports.getDepartments = () => {
    return new Promise((resolve,reject) => {
        if (departments.length == 0) {
            reject ('no result');
        }
        else {
            resolve (departments);
        }
    })
};
exports.getManagers = () => {
    return new Promise ((resolve, reject) => {
        var managers = employees.filter(employee => employee.isManager == true);
        if (managers.length == 0) {
            reject('no result');
        }
        resolve(managers);
    })
};


exports.addEmployee = (employeeData) => 
{
    employeeData.isManager== false ? employeeData.isManager = undefined : employeeData.isManager = true;
    employeeData.employeeNum = employees.length + 1;
    employees.push(employeeData);
}

exports.getEmployeesByManager = (manager) => {
    return new Promise ((resolve,reject) => {
        var employee_manager = employees.filter(employee => employee.employeeManagerNum == manager);
        if (employee_manager.length == 0) {
            reject('This Manager Does not Exist!!');
        }
        resolve(employee_manager);
    })
};

exports.getEmployeeByStatus=(status) => {
    return new Promise((resolve,reject) => {
        var employee_status = employees.filter(employee => employee.status == status);
        if (employee_status.length == 0) {
            reject('Results Not Found ! 404');
        }
        resolve(employee_status);
    })
};
    
exports.getEmployeesByDepartment = (department) => {
    return new Promise ((resolve,reject) => {
        var emp_department = employees.filter(employee => employee.department == department);        
        if (emp_department.length == 0) {
            reject ('Department Does not exist');
        }
        resolve(emp_department);
    })
};

