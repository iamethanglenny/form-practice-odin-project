const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");

email.addEventListener("input", (event) => {

    if (email.validity.valid) {
        emailError.textContent = "";
        emailError.className = "error";
    } else {
        showEmailError();
    }
});

form.addEventListener("submit", (event) => {

    if (!email.validity.valid) {

        showEmailError();
        event.preventDefault();
    } else if (!password.validity.valid) {

        showPasswordError();
        event.preventDefault();
    } else if (confirmPasswords(false)) {
        
        showConfirmPasswordError();
        event.preventDefault();
    }
})

function showEmailError() {
    if (email.validity.valueMissing) {
        emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "Entered value needs to be an email address.";
    } else if (email.validity.tooShort) {
        emailError.textContent = `Email should be at least ${email.minLength} characters;
         you entered ${email.value.length}.`;
    }

    emailError.className = "error active";
}

function checkZipCode() {
    // For each country, defines the pattern that the postal code has to follow
    const constraints = {
      ch: [
        "^(CH-)?\\d{4}$",
        "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
      ],
      fr: [
        "^(F-)?\\d{5}$",
        "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
      ],
      de: [
        "^(D-)?\\d{5}$",
        "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
      ],
      nl: [
        "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
      ],
    };

    const country = document.getElementById("country").value;
    const zipCode = document.getElementById("zip-code");

    const constraint = new RegExp(constraints[country][0], "");
    console.log(constraint);

    if (constraint.test(zipCode.value)) {
        
        zipCode.setCustomValidity("");
      } else {

        zipCode.setCustomValidity(constraints[country][1]);
      }
}

window.onload = () => {
    document.getElementById("country").onchange = checkZipCode;
    document.getElementById("zip-code").oninput = checkZipCode;
};

const password = document.getElementById("password");
const passwordError = document.querySelector("#password + span.error");

password.addEventListener("input", (event) => {

    if (password.validity.valid) {
        passwordError.textContent = "";
        passwordError.className = "error";
    } else {
        showPasswordError();
    }
});

function showPasswordError() {
    if (password.validity.valueMissing) {
        passwordError.textContent = "You need to enter an email address.";
    } else if (password.validity.tooShort) {
        passwordError.textContent = `Password should be at least ${password.minLength} characters;
         you entered ${password.value.length}.`;
    }

    passwordError.className = "error active";
}

const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.querySelector("#confirm-password + span.error");

function confirmPasswords() {
    if (password === confirmPassword) {
        return true;
    } else {
        return false;
    }
}

function showConfirmPasswordError() {
    if (confirmPasswords === false) {
        confirmPasswordError.textContent = "Please double-check your passwords, they need to match.";
    }
}