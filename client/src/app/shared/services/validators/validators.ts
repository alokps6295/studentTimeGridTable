export const onlyNum = (event) => {
  // if event is undefined do nothing
  if(event === undefined) return;
  // Allow: backspace, delete, tab, escape, enter and .
  if ([46, 8, 9, 27, 13, 110].includes(event.keyCode) ||
       // Allow: Ctrl+A, Command+A
      (event.keyCode === 65 && (event.ctrlKey === true || event.metaKey === true)) || 
       // Allow: home, end, left, right, down, up
      (event.keyCode >= 35 && event.keyCode <= 40)) {
           // let it happen, don't do anything
           return;
  }

  // Ensure that it is a number and stop the keypress
  if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
  }
}

export const maxLength = (event, length) => {
  // if event is undefined do nothing
  if(event === undefined) return;
  // Allow: backspace, delete, tab, escape, enter and .
  if ([46, 8, 9, 27, 13, 110].includes(event.keyCode) ||
       // Allow: Ctrl+A, Command+A
      (event.keyCode === 65 && (event.ctrlKey === true || event.metaKey === true)) || 
       // Allow: home, end, left, right, down, up
      (event.keyCode >= 35 && event.keyCode <= 40)) {
           // let it happen, don't do anything
           return true;
  }
  
  if(event.target.value.length >= length)
    event.preventDefault();
    return false;
}

export const regex = {
  // email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  mobile: /^[56789]\d{9}$/,
  ifsc: /^[A-Za-z]{4}\d{7}$/,
  alphaNumeric: /^[a-zA-Z0-9]*$/,
  alphaName: /^[ A-Za-z.]+$/,
  passport: /^[a-zA-Z]{1}\d{6}[1-9]$/,
  pan: /^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/,
  drivingLiscence: /^[a-zA-Z]{2}\d{13}$/,
  voterId: /^[a-zA-Z]{3}\d{7}$/,
  weight:/(\d+\.\d+)|(\d+)/,
//   weight:/(?<=^| )\d+(\.\d+)?(?=$| )/,
  startWith1:/^1[\d]+/,
  onlyNum:/^\d+$/,
  otp:/^\d{4}$/,
}
//[^\d^\s]+[a-zA-Z. ]+$

export const onlyAlphaNum = (event) => {
  // if event is undefined do nothing
  if(event === undefined) return;
  // Allow: backspace, delete, tab, escape, enter, . and space
  if ([8, 46, 9, 27, 13, 32].includes(event.keyCode) ||
       // Allow: Ctrl+A, Command+A
      (event.keyCode === 65 && (event.ctrlKey === true || event.metaKey === true)) || 
       // Allow: home, end, left, right, down, up
      (event.keyCode >= 35 && event.keyCode <= 40) || 
      // allow alphabets a-z A-Z
      (event.keyCode >= 65 && event.keyCode <= 90)) {
           // let it happen, don't do anything
           return;
  }
  
  // if((event.keyCode === 86 && (event.ctrlKey === true || event.metaKey === true))) {
  //   event.preventDefault();
  // }
    // Ensure that it is a number and stop the keypress
  if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
  }
}