const contact_scriptURL = ''
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
  .then(y => check_submit(y, "Soon we will contact you."))//the check_submit fuction is in the registration_form.js
  .catch(error => console.error('Error!', error.message))
  
}