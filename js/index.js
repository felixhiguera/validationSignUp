const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const password = document.querySelector('#password');
const email = document.querySelector('#email');
const form = document.querySelector('#form');
const errorFirstName = document.querySelector('#errorFirstName')
const errorLastName = document.querySelector('#errorLastName')
const errorEmail = document.querySelector('#errorEmail')
const errorPassword = document.querySelector('#errorPassword')
const btnSend = document.querySelector('#send');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', startingApp);
    email.addEventListener('blur', validateForm);
    firstName.addEventListener('blur', validateForm);
    lastName.addEventListener('blur', validateForm);
    password.addEventListener('blur', validateForm);
    form.addEventListener('submit', sendEmail);

}

function startingApp() {
    btnSend.disabled = true;
    btnSend.classList.add('cursor-not-allowed', 'opacity-50');

}

function validateForm(e) {
    if (e.target.value.length > 0) {

        if (e.target.type === 'email') {
            // in case that the validation are  right just for EMAIL it means do not have a @ or domain
            if (er.test(e.target.value)) {
                e.target.style.borderColor = 'green';
                errorEmail.textContent = null;

            }
            // in case that the validation are not right  just for EMAIL      
            else {
                errorEmail.textContent = 'looks like this is not a email';
                errorEmail.classList.add('errorColor');
            }

        }
        // in case that the elements have content 
        else {
            e.target.style.borderColor = 'green';
            if (e.target.id === 'password') {
                // in case that there are message error it will be deleted
                errorPassword.textContent = null;

            } else if (e.target.id === 'firstName') {
                errorFirstName.textContent = null;

            } else if (e.target.id === 'lastName') {
                errorLastName.textContent = null;

            } else if (e.target.id === 'email') {
                errorEmail.textContent = null;

            }
        }
    } else {
        // if the element is empty 
        e.target.style.borderColor = 'red';
        showError(e);
        console.log(e.target.id);
    }
    if (er.test(email.value) && firstName.value !== '' && lastName.value !== '' && password.value !== '') {
        btnSend.disabled = false;
        btnSend.classList.remove('cursor-not-allowed', 'opacity-50');
    } else {
        btnSend.disabled = true;
        btnSend.classList.add('cursor-not-allowed', 'opacity-50');
    }
}

function showError(e) {
    if (e.target.id === 'password') {
        errorPassword.textContent = 'password cannot be empty';
        errorPassword.classList.add('errorColor')
    } else if (e.target.id === 'firstName') {
        errorFirstName.textContent = ' first name cannot be empty';
        errorFirstName.classList.add('errorColor');
    } else if (e.target.id === 'lastName') {
        errorLastName.textContent = 'last name cannot be empty';
        errorLastName.classList.add('errorColor');
    } else if (e.target.id === 'email') {
        errorEmail.textContent = 'email cannot be empty'
        errorEmail.classList.add('errorColor');
    }

}

function sendEmail(e) {
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout(() => {
        spinner.style.display = 'none';
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Account created';
        paragraph.classList.add('sent')

        // insert the paragraph before of the spinner
        form.insertBefore(paragraph, spinner);
        setTimeout(() => {
            paragraph.remove(); //  delete the message of account created
            resetForm();
        }, 5000);
    }, 3000);
}


// for reseting the form
function resetForm() {
    form.reset();

    startingApp();
}