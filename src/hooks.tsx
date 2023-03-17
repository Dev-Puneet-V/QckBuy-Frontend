import BigPromise from "./bigPromise";
import { createBrowserHistory, History } from 'history';
import Cookies from 'js-cookie';
enum REQUEST_TYPE {
    POST,
    PATCH,
    GET,
    DELETE,
    PUT
}

interface JSONDataType {
    [key: string]: any;
}
const history: History = createBrowserHistory();
const request = BigPromise(async (request_type: REQUEST_TYPE, request_url: URL, bearer_token?: String, bodyData?: Object, fileData?: any ) => {
    
    const formData = new FormData();
    if(fileData){
      fileData.forEach((file: File, index: number) => {
        formData.append(`photos`, file, file.name);
      });
    }
    if(bodyData){
      Object.keys(bodyData).forEach(function(key) {
        formData.append(key, bodyData[key]);
      });
    }
    const parameters = {
      method: REQUEST_TYPE[request_type],
      headers: {
          Authorization: `Bearer ${bearer_token}`
      }
    }
    if(request_type !== REQUEST_TYPE.GET){
      parameters['body'] = formData;
    }
    if (!Cookies.get('reloadFlag')) {
      let response = await fetch(request_url, parameters);
      if(response.status === 429){
        const retryAfter = response.headers.get('Retry-After');
        console.log(retryAfter, 'retry after')
        // if (!getCookie('reloadFlag')) {
            const expires = new Date(Date.now() + parseInt(retryAfter || '0') * 1000);
            Cookies.set('reloadFlag', 'true', { expires });
            // document.cookie = `reloadFlag=true;expires=${expires.toUTCString()};path=/`;
            console.log(Cookies.get('reloadFlag'))
            history.push('/too-many-requests');
            window.location.reload();
        // }
        return;
      }else{
        document.cookie = 'reloadFlag=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;'; // remove the cookie
      }
      
      let data = await response.json();
      return data;
    }else{
      history.push('/too-many-requests');
        window.location.reload();
    }
});

const updateCart = BigPromise(async (increment: boolean, productId: String, next: any) => {
    let data = await request(
        increment ? REQUEST_TYPE.POST : REQUEST_TYPE.PATCH, 
        `https://qckbuy-production.up.railway.app/api/v1/user/cart/${productId}`, 
        process.env.REACT_APP_USER_TOKEN
    );
    next();
    return data?.success;
});
const deleteCart = BigPromise(async (a?: any, b?: any, c?: any) => {
    let data = await request(
        REQUEST_TYPE.DELETE, 
        `https://qckbuy-production.up.railway.app/api/v1/user/cart/`,
        process.env.REACT_APP_USER_TOKEN
    );
    return data?.success;
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

      

function filterData(text: string, data: JSONDataType) {
    const results: JSONDataType = [];

  for (const key in data) {
    if(JSON.stringify(data[key]).includes(text)){
      results.push(data[key])
    }
  }
  return results;
}

function jsonToArray(jsonData: JSONDataType) {
  return Object.keys(jsonData).map((key) => jsonData[key]);
}

function nameValidator(value: string) {
  if (!value) {
    return 'Name is required';
  }
  if (value.length < 3) {
    return 'Name must be at least 3 characters long';
  }
  return undefined;
}

function getCookie(name: string) {
  const cookieStr = decodeURIComponent(document.cookie);
  const cookieArr = cookieStr.split(';');
  
  for(let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].trim().split('=');
    if (cookiePair[0] === name) {
      return cookiePair[1];
    }
  }
  
  return null;
}

const setCookie = (name, value, expires, path) => {
  document.cookie = `${name}=${value}; expires=${expires}; path=${path}`;
};

export {
    updateCart,
    REQUEST_TYPE,
    request,
    deleteCart,
    isDate,
    isNumeric,
    filterData, 
    jsonToArray,
    getCookie,
    setCookie
};