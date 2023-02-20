import * as React from 'react';
import EmployeeContext from './context';
import {
    request,
    REQUEST_TYPE
} from '../../hooks';

const EmployeeState = (props: any) => {
    const [employees, setEmployees] = React.useState<any>();
    const updateEmployeesData: Function = () => {
        request(
            REQUEST_TYPE.POST,
            `${process.env.REACT_APP_API_BASE_URL}/user/admin/users`,
            process.env.REACT_APP_ADMIN_TOKEN,
            {
                role:  JSON.stringify(['ex-employee', 'employee', 'manager', 'ex-manager']),
                isApplicant: true
            }
        ).then(data => {
            if(data && data.success){
                setEmployees(data.users);
            }
        })    
    }
    
    React.useEffect(() => {
        updateEmployeesData();
    }, []);
    return (
        <EmployeeContext.Provider value={{employees: employees, updateEmployeesData, setEmployees}}>
            {props.children}
        </EmployeeContext.Provider>
    )
} 


export default EmployeeState;