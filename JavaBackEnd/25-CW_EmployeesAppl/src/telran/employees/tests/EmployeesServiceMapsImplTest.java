package telran.employees.tests;

import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.time.LocalDate;

import org.junit.jupiter.api.Test;

import telran.employees.dto.Employee;
import telran.employees.dto.ReturnCodes;
import telran.employees.services.impl.EmployeesServiceMapsImpl;

class EmployeesServiceMapsImplTest {
Employee first = new Employee(1, "Ivan", LocalDate.parse("1982-05-20"), "QA", 5000);
Employee second = new Employee(2, "Alex", LocalDate.parse("1980-05-20"), "Developer", 6000);
Employee third= new Employee(3, "Viktor", LocalDate.parse("1970-05-20"), "Developer", 10000);
Employee fourth = new Employee(4, "Sergei", LocalDate.parse("1990-05-20"), "QA", 8000);

EmployeesServiceMapsImpl empl = new EmployeesServiceMapsImpl();
	@Test
	void test() {
		empl.addEmployee(first);
		empl.addEmployee(second);
		empl.addEmployee(third);
		empl.addEmployee(fourth);
		assertEquals(ReturnCodes.EMPLOYEE_ALREADY_EXIST, empl.addEmployee(first));
		assertEquals(first, empl.getEmployee(1));
		assertEquals(ReturnCodes.OK, empl.removeEmployee(2));
		assertEquals(null, empl.getEmployee(2));
		Employee firstNew = new Employee(1, "Ivan", LocalDate.parse("1982-05-20"), "QA", 10000);
		empl.updateEmployee(1, firstNew);
		assertEquals(10000, empl.getEmployee(1).getSalary());
//		empl.getEmployeesByAge(30, 40).forEach(System.out :: println);
//		empl.getEmployeesByDepartment("QA").forEach(System.out :: println);
//		empl.getEmployeesBySalary(5000,6000).forEach(System.out :: println);
		Iterable<Employee> emplByAge = empl.getEmployeesByAge(30, 40);
		for (Employee empl : emplByAge) {
			assertTrue(30<=LocalDate.now().getYear() - empl.getBirthDate().getYear()&&
					LocalDate.now().getYear() - empl.getBirthDate().getYear()<=40);
		}
		Iterable<Employee> emplByDept = empl.getEmployeesByDepartment("QA");
		for (Employee empl : emplByDept) {
			assertEquals("QA", empl.getDepartment());
		
		}
		
		Iterable<Employee> emplBySalary = empl.getEmployeesBySalary(5000, 6000);
		for (Employee empl : emplBySalary) {
			assertTrue(empl.getSalary() >= 5000 && empl.getSalary() <= 6000);
		}
		
	}

}