
enum STATUS {
    NOT_STARTED,
    PROCESSING,
    SUCCESS,
    FAILED
}
enum REQUEST_TYPE {
    POST,
    PATCH,
    GET,
    DELETE,
    PUT
}
enum TABLE_COLUMN_TYPE {
    BUTTON,
    TEXT
}

type ReviewType = {
    _id: string;
    user: string;
    name: string;
    rating: number;
    comment: string;    
}

type ProductType = {
    _id: string;
    user: string;
    name: string;
    description: string;
    price: number;
    catergory: string;
    numberOfReviews: number;
    quantity: number;
    ratings: number;
    brand: string;
    reviews: ReviewType[];
}

const EMPLOYEE_TAB_DATA = [
    { 
        'value': 'cu-employee',
        'label': 'Current',
    },
    {
        'value': 'jo-employee',
        'label': 'Requests'
    },
    {
        'value': 'ex-employee',
        'label': 'Past'
    }
]

const USER_AUTHENTICATION_TAB_DATA = [
    {
        'value': 'login',
        'label': 'Sign in to Continue'
    },
    {
        'value': 'signup',
        'label': 'Create an Account'
    }
]

const USER_ORDER_TYPE_TAB_DATA = [
    {
        'value': 'undelivered',
        'label': 'Not delivered'
    },
    {
        'value': 'delivered',
        'label': 'Delivered'
    }
]

export {
    STATUS,
    REQUEST_TYPE,
    TABLE_COLUMN_TYPE,
    EMPLOYEE_TAB_DATA,
    USER_AUTHENTICATION_TAB_DATA,
    USER_ORDER_TYPE_TAB_DATA
};
export type {
    ReviewType,
    ProductType
};
