import BigPromise from "./bigPromise";
const util = require('util')
enum REQUEST_TYPE {
    POST,
    PATCH,
    GET,
    DELETE
}


const request = BigPromise(async (request_type: REQUEST_TYPE, request_url: URL, bearer_token?: String, bodyData?: Object) => {
    console.log(bodyData, 'bodyData')
    let response = await fetch(request_url, {
        method: REQUEST_TYPE[request_type],
        headers: {
            Authorization: `Bearer ${bearer_token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });
      let data = await response.json();
      return data;
});

const updateCart = BigPromise(async (increment: boolean, productId: String, next: any) => {
    let data = await request(
        increment ? REQUEST_TYPE.POST : REQUEST_TYPE.PATCH, 
        `http://localhost:4000/api/v1/user/cart/${productId}`, 
        process.env.REACT_APP_USER_TOKEN
    );
    next();
    return data.success;
});
const deleteCart = BigPromise(async (a: any, b: any, c: any) => {
    let data = await request(
        REQUEST_TYPE.DELETE, 
        `http://localhost:4000/api/v1/user/cart/`,
        process.env.REACT_APP_USER_TOKEN
    );
    return data.success;
});

function isDate(sDate: any) {  
    if(sDate.toString() == parseInt(sDate).toString()) return false; 
    var tryDate = new Date(sDate);
    return (tryDate && tryDate.toString() != "NaN" && tryDate.toString() != "Invalid Date");  
  }

  function isNumeric(str: any) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

export {
    updateCart,
    REQUEST_TYPE,
    request,
    deleteCart,
    isDate,
    isNumeric
};