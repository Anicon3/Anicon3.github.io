const contact_scriptURL = 'https://script.google.com/macros/s/AKfycbzCZOOsb2sCdoAcSuxolpcDv2MT5XfoQtcsOkwqiVjlT2FYjLAM7yn6gt1q1_ljMlA/exec'
//replace the url with your apps script url for the contact form/////////////////////////////////////////////////


const contact_form = document.forms['contactForm']

contact_form.addEventListener('submit', e => {
  
  e.preventDefault();

  submit_contact_form();

})

function submit_contact_form () {

  alert("Your details are processing. Please wait");

  fetch(contact_scriptURL, { method: 'POST', mode:'cors', body: new FormData(contact_form)})
  .then(x => x.text())
  .then(y => check_submit(y, "Soon we will contact you.\nPlease check your spam also."))//the check_submit fuction is in the registration_form.js
  .catch(error => console.error('Error!', error.message))
  
}