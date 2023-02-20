import * as React from 'react';
import { Button, Box } from '@mui/material';
import {

} from '@mui/icons-material';
import { EMPLOYEE_TAB_DATA, REQUEST_TYPE } from '../../../type';
import Tabs from '../../molecule/Tabs';
import {
    Modal
 } from '../../molecule';
import EmployeeInfo from '../../molecule/EmployeeInfo';
import Employee from '../../molecule/Employee';
import {useContext} from 'react';
import {
    EmployeeContext
} from '../../../contexts/Employee';
const Component = (props: any) => {
    const {
        employeeType = 'employee'
    } = props;
    const employeesContext = useContext(EmployeeContext);
    const [tabState, setTabState] = React.useState(EMPLOYEE_TAB_DATA[0].value);
    const [detailedViewModalStatus, setDetailedViewModalStatus] = React.useState(false);
    const [currSelectedEmployeeInfo, setCurrSelectedEmployeeInfo] = React.useState<any>();

    const handleState = (tabState: string) => {
        setTabState(tabState);
    }

    const employeeDetailsHandler = (employeeData: any) => {
        setDetailedViewModalStatus(true);
        setCurrSelectedEmployeeInfo(employeeData);
    }
    const modalCloseHandler = () => {
        setDetailedViewModalStatus(false);
        setCurrSelectedEmployeeInfo(undefined);
    }

    const negateCurrentEmployeeHandler = () => {
       const negatedEmployeesData = employeesContext?.employees.map((currEmployee: any) => {
        if(currEmployee?._id === currSelectedEmployeeInfo?._id){
            currEmployee.role = 'ex-' + employeeType
        };
        return currEmployee;
       });
        employeesContext?.setEmployees([...negatedEmployeesData]);
    }

    const verificationHandler = () => {
        const postVerificationEmployeesData = employeesContext?.employees.map((currEmployee: any) => {
            if(currEmployee?._id === currSelectedEmployeeInfo?._id){
                currEmployee.role = employeeType
                currEmployee.applicationFor = undefined;
            };
            return currEmployee;
        });
        employeesContext?.setEmployees([...postVerificationEmployeesData]);
    }

    const EMPLOYEE_TYPE = [
        employeeType,
        'applicant',
        'ex-' + employeeType
    ]

    return (
        <>
            <Tabs tabData={EMPLOYEE_TAB_DATA} stateHandler={handleState} />
            {
                tabState === EMPLOYEE_TAB_DATA[0].value
                &&
                <Employee employeeDetailsHandler={employeeDetailsHandler} employees={employeesContext?.employees} employeeType={EMPLOYEE_TYPE[0]}/>
            }
            {
                tabState === EMPLOYEE_TAB_DATA[1].value
                &&
                <Employee employeeDetailsHandler={employeeDetailsHandler} employees={employeesContext?.employees} employeeType={EMPLOYEE_TYPE[1]} />
            }
            {
                tabState === EMPLOYEE_TAB_DATA[2].value
                &&   
                <Employee employeeDetailsHandler={employeeDetailsHandler} employees={employeesContext?.employees} employeeType={EMPLOYEE_TYPE[2]}/>
            }
            <Modal 
                open={detailedViewModalStatus} 
                children={(currSelectedEmployeeInfo && 
                    <EmployeeInfo 
                        employee={currSelectedEmployeeInfo} 
                        negateEmployee={negateCurrentEmployeeHandler} 
                        handleClose={modalCloseHandler} 
                        employeeType={(tabState === EMPLOYEE_TAB_DATA[0].value && EMPLOYEE_TYPE[0]) || (tabState === EMPLOYEE_TAB_DATA[1].value && EMPLOYEE_TYPE[1]) || (tabState === EMPLOYEE_TAB_DATA[2].value && EMPLOYEE_TYPE[2])}
                        verifyEmployee={verificationHandler}
                    />) || (<></>)}
                 handleClose={modalCloseHandler} />
        </>
    )
}

export default Component;