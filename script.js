const form = document.querySelector("form");
const email = document.getElementById("email");
const emailError = document.querySelector("#email + span.error");
const password = document.getElementById("password");
const passwordError = document.querySelector("#password + span.error");
const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.querySelector("#confirm-password + span.error");
const zipCode = document.getElementById("zip-code");

email.addEventListener("input", () => {
    validateEmail();
});

zipCode.addEventListener("input", () => {
    checkZipCode();
});

password.addEventListener("input", () => {
    validatePassword();
    confirmPasswords(); // Validate confirm password whenever the password changes
});

confirmPassword.addEventListener("input", () => {
    confirmPasswords(); // Validate confirm password whenever its value changes
});

form.addEventListener("submit", (event) => {
    let isValid = true;

    if (!validateEmail()) {
        isValid = false;
    }

    if (!validatePassword()) {
        isValid = false;
    }

    if (!confirmPasswords()) {
        isValid = false;
    }

    // If any validation fails, prevent form submission
    if (!isValid) {
        event.preventDefault();
    }
});

function validateEmail() {
    if (email.validity.valid) {
        emailError.textContent = "";
        emailError.className = "error";
        return true;
    } else {
        showEmailError();
        return false;
    }
}

function showEmailError() {
    if (email.validity.valueMissing) {
        emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "Entered value needs to be an email address.";
    } else if (email.validity.tooShort) {
        emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    }
    emailError.className = "error active";
}

function validatePassword() {
    if (password.validity.valid) {
        passwordError.textContent = "";
        passwordError.className = "error";
        return true;
    } else {
        showPasswordError();
        return false;
    }
}

function showPasswordError() {
    if (password.validity.valueMissing) {
        passwordError.textContent = "You need to enter a password.";
    } else if (password.validity.tooShort) {
        passwordError.textContent = `Password should be at least ${password.minLength} characters; you entered ${password.value.length}.`;
    }
    passwordError.className = "error active";
}

function confirmPasswords() {
    if (password.value !== confirmPassword.value) {
        showConfirmPasswordError();
        return false;
    }
    confirmPasswordError.textContent = "";
    confirmPasswordError.className = "error";
    return true;
}

function showConfirmPasswordError() {
    confirmPasswordError.textContent = "Please double-check your passwords, they need to match.";
    confirmPasswordError.className = "error active";
}

function checkZipCode() {
    const constraints = {
        ch: ["^(CH-)?\\d{4}$", "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950"],
        fr: ["^(F-)?\\d{5}$", "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012"],
        de: ["^(D-)?\\d{5}$", "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345"],
        nl: ["^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$", "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS"],
    };

    const country = document.getElementById("country").value;
    const constraint = new RegExp(constraints[country][0]);
    zipCode.setCustomValidity(constraint.test(zipCode.value) ? "" : constraints[country][1]);
}

window.onload = () => {
    document.getElementById("country").onchange = checkZipCode;
    document.getElementById("zip-code").oninput = checkZipCode;
};
