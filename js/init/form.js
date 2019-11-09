var form = document.getElementsByClassName('subscribe-form')[0];
var success = document.getElementById('subscribe-success-notification');
var error = document.getElementById('subscribe-error-notification');
var spinner = document.getElementById('spinner-holder');
var button = document.getElementById('subscribe-form-submit');

form.addEventListener('submit', processForm);

function processForm(e) {
  e.preventDefault();

  spinner.classList.add('spinner-grow');
  spinner.classList.add('spinner-grow-sm');
  button.setAttribute('disabled', 'disabled');

  var formData = new FormData(form);

  if (google_tag_manager) {
  	var cid = google_tag_manager['GTM-WXTT56T'].dataLayer.get('clientId');
  	formData.append("gcid", cid);
  }

  var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  formData.append("tz", tz);

  var xhr = new XMLHttpRequest;
  xhr.open('POST', 'https://hooks.zapier.com/hooks/catch/6043755/o4mjhwa/', true);
  xhr.send(formData);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var response = JSON.parse(xhr.responseText);
      if (xhr.status === 200 && response.status === 'success') {
      	success.classList.add('show');
      } else {
      	error.classList.add('show');
      }
		  spinner.classList.remove('spinner-grow');
		  spinner.classList.remove('spinner-grow-sm');
		  button.removeAttribute('disabled');
    }
  }

  return false;
}

var signups = document.getElementsByClassName('signup');

for (i = 0; i < signups.length; i++) {
  signups[i].addEventListener('click', redirectToForm);
}

function redirectToForm(e) {
  e.preventDefault();	
	var elmnt = document.getElementsByClassName('section-subscribe')[0];
	elmnt.scrollIntoView();
}