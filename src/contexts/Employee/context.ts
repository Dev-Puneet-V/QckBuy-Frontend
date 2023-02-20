import React, {createContext} from 'react';

type EmployeeContextType = {
    employees: any;
    updateEmployeesData: Function;
    setEmployees: React.Dispatch<any>;    
}


const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export default EmployeeContext;