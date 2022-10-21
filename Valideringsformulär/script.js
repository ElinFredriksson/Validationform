const form = document.querySelector('#validationForm');
const btn = document.querySelector('#btn');
const errorMessage = document.querySelector('#errorMessage');

const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const repeatPassword = document.querySelector('#repeatPassword');


const validateText = (id) => {    // för både fistname och lastname
    const input = document.querySelector(id)

    if(input.value.trim() === '') {
      console.log('Not a valid name');
        return error(input);
    }
    else if (input.value.match(/[0-9]/)) {
      console.log('Namnet får ej innehålla siffror');
      return error(input);
    }
    else if (input.value.length < 2) {
      console.log('Namnet kan inte vara kortare än 2 karaktärer');
        return error(input);
      }
      else {
        return success(input);
      }

}

const validateEmail = (id) => {
    const email = document.querySelector(id)
  
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/
  
    if(email.value === '') {
      console.log('Not a valid email');
      return error(email);
    }
    else if(!regEx.test(email.value)) {
      console.log('Not a valid email');
      return error(email);
    }
    else {
      return success(email);
    }
  
  }

  const validatePassword = (id) => {
    const password = document.querySelector(id)

    if(password.value === ''){
      console.log('Skriv in ett lösenord');
        return error(password);
    }
    else if(password.value.length < 6 || password.value.length > 12) {
        console.log('Ditt lösenord måste vara mellan 6-12 tecken');
        return error(password);
    }
    else {
        return success(password);
    }
  }

  const validateRepeatPassword = (id) => {
    const password = document.querySelector('#password');
    const repeatPassword = document.querySelector(id);
   
    if(repeatPassword.value === ''){
        console.log('Upprepa ditt lösenord');
        return error(repeatPassword);
    }
    else if (password.value !== repeatPassword.value) {
      console.log('Lösenorden matchar inte varandra');
      return error(repeatPassword);
    }
    else {
        return success(repeatPassword);
    }
  }
  
  const validateCheck = (id) => {
    const checkbox = document.querySelector(id)
  
    if(!checkbox.checked) {
      console.log('Accept terms and conditions');
      return error(checkbox);
    }
    else {
      return success(checkbox);
    }
  
  
  }

const success = (input) => {
    input.classList.remove('error');
    input.classList.add('success');
    return true;
}

const error = (input) => {
    input.classList.remove('success');
    input.classList.add('error');
    errorMessage.classList.remove('d-none');
    input.focus();
    return false;
}




btn.addEventListener ('click', e => {
    e.preventDefault();
    const errors = [];  // skapar en tom array där vi kan lägga eventuella error

  for(let i = 0; i < form.length; i++) {
   
    const inputId = '#' + form[i].id  // plockar ut id på den aktuella inputen
    // console.log(inputId)

    if(form[i].type === 'text') {     //Kollar om den aktuella inputen är av typen text
      errors[i] = validateText(inputId) // validerar rätt typ av input
    } 
    else if(form[i].type === 'email') {     //Kollar om den aktuella inputen är av typen email
      errors[i] = validateEmail(inputId)
    }
    else if(form[i].id === 'password'){       // byter från type till id för att kunna separera dem båda
        errors[i] = validatePassword(inputId)
    }
    else if(form[i].id === 'repeatPassword'){
        errors[i] = validateRepeatPassword(inputId)
    }
    else if(form[i].type === 'checkbox') {     //Kollar om den aktuella inputen är av typen checkbox
      errors[i] = validateCheck(inputId)
    }
  }

  console.log(errors)

  if(errors.includes(false)) {        // kollar om arrayen errors innehåller ett false värde
    console.log('fel i formuläret! Alla fält måste vara korrekt ifyllda')
    errorMessage.classList.remove("d-none")
  }
  else {
    console.log('Validation complete!')
    errorMessage.classList.add("d-none")
    
    const user = {
      firstname: firstName.value,
      lastname: lastName.value,
      email: email.value,
      password: password.value
    }
    
    console.log(user);
  }

});





