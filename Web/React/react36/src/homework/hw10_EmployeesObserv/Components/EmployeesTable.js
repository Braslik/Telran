import React, {useEffect, useState} from 'react';
export default function EmployeesTable(props) {
    const [employees, setEmployees] = useState([]);
    let subscription;
    const getEmployees = () => {
        subscription =
            props.employeesView
                .subscribe(employeesFromServer => {
                    setEmployees(employeesFromServer)
                }, error => {
                    alert(JSON.stringify(error))
                })
    }
    useEffect(
        () => {
            setEmployees(employees);
            getEmployees();
            return () => {
                if(subscription && !subscription.closed) {
                    subscription.unsubscribe();
                }
            }
        }, [employees]
    )
    function remove(id) {
        if(window.confirm('you are going to remove Employee ' +
            'with id=' + id)) {
            props.removeFn(id);
        }
    }
    const employeeTableRecords = employees.map (
        (employee) => {
            return <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.emailAddress}</td>
                <td>{employee.name}</td>
                <td>{employee.gender}</td>
                <td>{employee.salary}</td>
                <td>{employee.title}</td>
                {props.removeFn? <td>
                    <i className="fa fa-trash" style={{cursor: 'pointer'}}
                    onClick={remove.bind(this,employee.id)}/>
                </td>:null}
            </tr>
        }
        )
    return <div style={{"margin":"40px"}}><table className="table">
        <thead>
        <tr>
            <th>Id</th>
            <th>Email</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Title</th>
            {props.removeFn? <th>Delete</th> :null}
        </tr>
        </thead>
        <tbody>
        {employeeTableRecords}
        </tbody>
    </table>
    </div>
}
