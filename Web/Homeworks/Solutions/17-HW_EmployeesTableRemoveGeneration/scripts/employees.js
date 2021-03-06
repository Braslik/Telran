class Employees {
    constructor() {
        this.employees = {}
    }
    addEmployee(employee) {
        if (this.employees[employee.id]) {
            return false;
        }
        employee.salary = +employee.salary;
        this.employees[employee.id] = employee;
        return true;
    }
    removeEmployee(id) {
        delete this.employees[id];
    }
    computeSalaryBudget() {
        const allEmployees = Object.values(this.employees);
        // return allEmployees.reduce(function(budget, empl) {
        //    return budget + empl.salary ;
        // }, 0)
        if (allEmployees.length != 0) {
            const allSalaries = allEmployees.map(function(e) {
                return e.salary;
            });
            return allSalaries.reduce(function(budget, salary) {
                return budget + salary;
            })
        }
        return 0;
        
    }
}
