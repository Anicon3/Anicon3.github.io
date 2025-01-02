const registration_scriptURL = 'https://script.google.com/macros/s/AKfycbyGpgDr-daqgwNnxVPG7bYcTmRAc1RCJO_nKTaEU8Vp7iLGG0upBiHTmG0zhQsWsOxnEg/exec'
//replace the url with your appscript url for the registration/////////////////////////////////////////////////////////



const registration_form = document.forms['registrationForm']


function is_iiserk (bool) {
	let email_input = registration_form['email'];
	let institute = registration_form['institute'];
	check_iiserk_email(email_input);
	check_price(registration_form['wanted_item']);
	if (bool === "yes") {
		email_input.placeholder = "IISER-K Email";
		institute.value = "IISER K";
	} else {
		email_input.placeholder = "Email";
		institute.value = "";
	}
}

function check_iiserk_email (email_input) {
	if (registration_form['is_iiser_k'].value === "yes" && Boolean(email_input.value)) {
		let domain = email_input.value.split("@");
		domain = domain[domain.length - 1];
		if (domain != "iiserkol.ac.in") {
			alert("Please enter a valid IISER-K Email.");
			email_input.value = "";
		}
	}
}


function check_price (item_ele) {
	let item = item_ele.value;
	let is_iiser_k = registration_form['is_iiser_k'].value;
	let src_0 = "";
	let src_24 = "";
	let src_29 = "";
	let src_49 = "";
	let src_69 = "";
	let price = 24;
	img_src = src_24;
	if (is_iiser_k === "yes") {
		if (item === "registration + poster + manga panel + anime bookmark") {
			price = 49;
			img_src = src_49;
		} else if (item === "registration + poster") {
			price = 29;
			img_src = src_29;
		} else if (item === "registration") {
			price = 0;
			img_src = src_0;
		}
	} else {
		if (item === "registration + poster + manga panel + anime bookmark") {
			price = 69;
			img_src = src_69;
		} else if (item === "registration + poster") {
			price = 49;
			img_src = src_49;
		} else if (item === "registration") {
			price = 24;
			img_src = src_24;
		}
	}
	document.getElementById('fee_label').innerHTML = "You have to pay " + String(price) + " rupees.";
	registration_form['fee'].value = price;
	document.getElementById('fee_img').src = img_src;
	let trans = registration_form['transaction'];
	let trans_div = trans.parentElement;
	if (price === 0) {
		trans.required = false;
		trans_div.style.display = "none";
	} else {
		trans.required = true;
		trans_div.style.display = "block"
	}
}

//this funciton is for changing the required attribute of the checkbox so that user must have choose atleast one.
//And if the user selected on checkbox then to change the other checkbox to be optional.
function check_require () {
	//if you added any option, add that input element to this array. Also add some code below. There also a comment.
	let option_array = [registration_form['amv'], registration_form['cc'], registration_form['reel'], registration_form['audi']];
	for (let i = 0; i < option_array.length; i++) {
	  	if (option_array[i].checked) {
	  		option_array[i].required = true;
		} else {
			option_array[i].required = false;
		}
	}
	if (!option_array[0].checked && !option_array[1].checked && !option_array[2].checked && !option_array[3].checked) {//here add an and operator and not operator and the element.checked as before
		for (let i = 0; i < option_array.length; i++) {
		  	option_array[i].required = true;
		}
	}
}

function check_audi (ele) {
	let option_array = [registration_form['amv'], registration_form['cc'], registration_form['reel'], registration_form['audi']];
	if (ele.value == "Audience" && ele.checked == true) {
		for (let i = 0; i < 3; i++) {
			option_array[i].checked = false;
			option_array[i].parentElement.style.display = "none"
		}
	} else {
		for (let i = 0; i < 3; i++) {
			option_array[i].parentElement.style.display = "flex";
		}
	}
}

let submit_or_alert = false;

//this function is for change the above variable to its initial condition when the registration form is changed.
//you should check the registration form's form element and also the part in the submit event listener of the registration form.
function csoa () {
	submit_or_alert = false;
}

registration_form.addEventListener('submit', e => {
  
  e.preventDefault()

  check_iiserk_email(registration_form['email']);
  check_price(registration_form['wanted_item']);

  //this part is for an alert message to say "check the transaction id"
  if (submit_or_alert) {
  	submit_or_alert = false;
  	submit_registration_form();
  } else {
  	submit_or_alert = true;
  	if (Number(registration_form['fee'].value) != 0) {
  		alert("Please double check the transaction Id.");
  	} else if (Number(registration_form['fee'].value) == 0) {
  		submit_registration_form();
  	}
  }
  ////////////////////////////////////////////////////////////////////
})

function submit_registration_form () {
  //this section is for adding the checkbox input into single string and put that string in a text input element which is hidden.
  let preferred_value = "";
  let option_array = [registration_form['amv'], registration_form['cc'], registration_form['reel'], registration_form['audi']];//if you added any option, add that input element to this array
  for (let i = 0; i < option_array.length; i++) {
  	if (option_array[i].checked) {
  		preferred_value = preferred_value + option_array[i].value;
  	}
  	preferred_value = preferred_value + ", ";
  }
  preferred_value = preferred_value.slice(0, preferred_value.length - 2);
  registration_form['preferred'].value = preferred_value;
  //////////////////////////////////////////////////////////////////////////////////////////

  alert("Your details are processing. Please wait");

  fetch(registration_scriptURL, { method: 'POST', mode:'cors', body: new FormData(registration_form)})
  .then(x => x.text())
  .then(y => check_submit(y, "Soon you will get a confirmation email.\nPlease check your spam also."))
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