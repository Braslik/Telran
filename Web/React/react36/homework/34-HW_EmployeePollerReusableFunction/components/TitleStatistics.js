import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import subscribeEffect from "../../hw12_EmployeesAuth/utils/subscriber";
export default function TitleStatistics(props) {
    const employeesService = props.employeesService;
    const [employees, setEmployees] =
        subscribeEffect(employeesService, employeesService.getEmployees);
    const statisticsObj = _.countBy(employees, 'title');
    const statisticsRecords = Object.entries(statisticsObj)
        .map(e => {
            return <tr key={e[0]}>
                <td>
                    {e[0]}
                </td>
                <td>
                    {e[1]}
                </td>
            </tr>
        });

    return <div className="card">
        <header className="card-header">
           <h3>Statistics of the Employee Titles</h3>
        </header>
        <div className="card-body">
            <table>
                <thead>
                <tr>
                    <th>title</th>
                    <th>count</th>
                </tr>
                </thead>
                <tbody>
                {statisticsRecords}
                </tbody>
            </table>
        </div>
        </div>
}