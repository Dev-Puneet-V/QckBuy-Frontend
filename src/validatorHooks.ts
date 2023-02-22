function checkNameValidation(value: string |  undefined) {
    const regex = /^[a-zA-Z\s]+$/;
    if (!value) {
      return 'Input is required';
    }
    if (value.length < 3) {
      return 'Input must be at least 3 characters long';
    }
    if(value.length > 25){
        return 'Input must be maximum of 25 characters'
    }
    if(!regex.test(value)){
        return 'Input must contain only alphabets and spaces'
    }
    return undefined;
}

function checkPasswordValidation(value: string |  undefined) {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@_])(?!.*\s).*$/;
    if(!value) {
        return 'Password is required';
    }
    if(value.length < 5){
        return 'Passworrd must be at least 5 characters long';
    }
    if(!regex.test(value)){
        return 'Password must contain atleast 1 digit, atleast 1 special character from @ and _, atleast one alphabet both in lower and uppercase'
    }
    return undefined;
}

function checkNumberValidation(value: string |  undefined | number) {
    if(!value || (value + "").length < 0){
        return 'Input is required';
    }
    const isNumber = !isNaN(Number(value));
    if(!isNumber){
        return 'Input must contain only digits';
    }
    return undefined;
}

function checkEmailValidation(value: string |  undefined){
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!value || value.length < 1){
        return 'Email is required';
    }
    if(value.length < 4){
        return 'Email must be atleast 4 characters long';
    }
    if(!regex.test(value)){
        return 'Invalid email format';
    }
    return undefined;
}

function checkPhoneNumberValidation(value: string |  undefined | number) {
    if(!value || (value + "").length < 0){
        return 'Phone Number is required';
    }
    if(isNaN(Number(value))){
        return 'Phone Number must contain only digits';
    }
    if((""+value).length !== 10){
        return 'Phone number must be 10 digits number';
    }
    return undefined;
}
  
export {
    checkNameValidation,
    checkPasswordValidation,
    checkNumberValidation,
    checkEmailValidation,
    checkPhoneNumberValidation
};