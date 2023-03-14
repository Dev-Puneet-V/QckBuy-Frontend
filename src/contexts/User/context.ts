import React, {createContext} from 'react';

type UserContextType = {
    user: any;
    setUser: React.Dispatch<any>;    
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;