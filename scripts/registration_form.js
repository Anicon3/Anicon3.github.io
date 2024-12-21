const registration_scriptURL = ''
//replace the url with your appscript url for the registration/////////////////////////////////////////////////////////



const registration_form = document.forms['registrationForm']


//this funciton is for changing the required attribute of the checkbox so that user must have choose atleast one.
//And if the user selected on checkbox then to change the other checkbox to be optional.
function check_require () {
	//if you added any option, add that input element to this array. Also add some code below. There also a comment.
	let option_array = [registration_form['cc'], registration_form['awm'];
	for (let i = 0; i < option_array.length; i++) {
	  	if (option_array[i].checked) {
	  		option_array[i].required = true;
		} else {
			option_array[i].required = false;
		}
	}
	if (!option_array[0].checked && !option_array[1].checked) {//here add an and operator and not operator and the element.checked as before
		for (let i = 0; i < option_array.length; i++) {
		  	option_array[i].required = true;
		}
	}
}

let submit_or_alert = false;

//this function is for change the above variable to its initial condition when the registration form is changed.
//you should check the registration form's form element and also the part in the submit event listener of the registration form.
function csao () {
	submit_or_alert = false;
}

registration_form.addEventListener('submit', e => {
  
  e.preventDefault()

  //this part is for an alert message to say "check the transaction id"
  if (submit_or_alert) {
  	submit_or_alert = false;
  	submit_registration_form();
  } else {
  	submit_or_alert = true;
  	alert("Please double check the transaction Id.");
  }
  ////////////////////////////////////////////////////////////////////
})

function submit_registration_form () {
  //this section is for adding the checkbox input into single string and put that string in a text input element which is hidden.
  let preferred_value = "";
  let option_array = [registration_form['cc'], registration_form['awm']];//if you added any option, add that input element to this array
  for (let i = 0; i < option_array.length; i++) {
  	if (option_array[i].checked) {
  		preferred_value = preferred_value + option_array[i].value + ", ";
  	}
  }
  preferred_value = preferred_value.slice(0, preferred_value.length - 2);
  registration_form['preferred'].value = preferred_value;
  //////////////////////////////////////////////////////////////////////////////////////////

  alert("Your details are processing. Please wait");

  fetch(registration_scriptURL, { method: 'POST', mode:'cors', body: new FormData(registration_form)})
  .then(x => x.text())
  .then(y => check_submit(y, "Soon you will get a confirmation email."))
  .catch(error => console.error('Error!', error.message))
  
}

//this function is to check the json output get from the apps script.  May be the name is miss matching.
function check_submit (data, success_message) {
	data = JSON.parse(data);
	if (data.result === "success") {
		alert(success_message);
	  	registration_form.reset();
	} else {
		//uncomment this if you want to check the duplicate transaction id error and reset the transaction id input value. 
		//The string in the quotes is same as the error message in the apps script
		/*if (data.error === "Transaction Id already exist!\nPlease check the transaction Id.") {
			registration_form['transaction'].value = "";
		}*/
	  	alert("Error : " + data.error);
	}
}