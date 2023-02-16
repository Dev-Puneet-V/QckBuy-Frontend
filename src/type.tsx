
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

export {
    STATUS,
    REQUEST_TYPE,
    TABLE_COLUMN_TYPE
};
export type {
    ReviewType,
    ProductType
};
