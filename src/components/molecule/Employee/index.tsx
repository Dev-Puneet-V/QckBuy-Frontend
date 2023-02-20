import TableContainer from '../TableContainer';
import {
    Button
} from '@mui/material';

const Component = (props: any) => {
    const {
        employees,
        employeeDetailsHandler,
        employeeType
    } = props;
    let columns =[
        {
            name: 'Employee Name'
        },
        {
            name: 'Email Id'
        },
        {
            name: ''
        }
    ];
    let rows: {
        value: React.ReactNode | string
    }[][] = [];

    if(employees && employees?.length > 0){
        rows = employees?.filter((emp: any) => {
            if(employeeType === 'applicant'){
                return Boolean(emp.applicationFor);
            }
            return emp.role === employeeType;
        }).map((currEmployee: any, index: number) =>{
            const currInfo: typeof rows[0] = Object.keys(currEmployee).filter(key => {
                return key === 'name' || key === 'email'
            }).map(curr => {
                return {
                    value: currEmployee[curr]
                }
            });
            currInfo.push({
                value: <Button variant='contained' onClick={() => {employeeDetailsHandler(currEmployee)}}>Detailed View</Button>
            });
            return currInfo;
        });
    }
    
    return (
        <TableContainer columns={columns} rows={rows} />
    )
}

export default Component;