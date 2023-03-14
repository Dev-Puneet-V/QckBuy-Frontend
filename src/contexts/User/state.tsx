import * as React from 'react';
import UserContext from './context';
import {
    request,
    REQUEST_TYPE
} from '../../hooks';

const UserState = (props: any) => {
    const [user, setUser] = React.useState<any>();
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
} 


export default UserState;