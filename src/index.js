import "./styles/style.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const showPassword = (type) => {
  if (type === "original") {
    const passwordInput = document.getElementById("password");
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  }
  if (type === "confirmation") {
    const passwordInput = document.getElementById("password-confirm");
    passwordInput.type =
      passwordInput.type === "password" ? "text" : "password";
  }
};

const MAX_LENGTH_TEXT = 32;
const MIN_LENGTH_PASSWORD = 8;

const addClassesValid = (elements) => {
  elements.forEach((element) => {
    if (element.classList.contains("invalid")) {
      element.classList.remove("invalid");
      element.classList.remove("bg-danger");
    }
    element.classList.add("valid");
  });
};

const addClassesInvalid = (elements) => {
  elements.forEach((element) => {
    if (element.classList.contains("valid")) {
      element.classList.remove("valid");
      element.classList.remove("bg-success");
    }
    element.classList.add("invalid");
    element.classList.add("bg-danger");
  });
};

const removeHint = (id) => {
  const hint = document.getElementById(id);
  hint.classList.replace("d-block", "d-none");
};

const addHint = (id) => {
  const hint = document.getElementById(id);
  hint.classList.replace("d-none", "d-block");
};

const toggle = (status, idElements, tags, operation) => {
  if (operation) {
    if (status == "add") {
      idElements.forEach((element) => {
        removeHint(`${element}__hint`);
      });
      tags.forEach((element) => {
        addClassesValid([element]);
      });
    }
    if (status == "check") {
      return true;
    }
  } else if (!operation) {
    if (status == "add") {
      idElements.forEach((element) => {
        addHint(`${element}__hint`);
      });
      tags.forEach((element) => {
        addClassesInvalid([element]);
      });
    }
    if (status == "check") {
      return false;
    }
  }
};

const validationName = (status) => {
  const idElement = "first-name";
  const name = document.getElementById(idElement);
  const value = name.value.trim();
  const lowerValue = value.toLowerCase();

  if (lowerValue.match(`^[a-zA-Zа-яА-Я-]{2,${MAX_LENGTH_TEXT}}$`))
    return toggle(status, [idElement], [name], true);
  else return toggle(status, [idElement], [name], false);
};

const validationSurname = (status) => {
  const idElement = "last-name";
  const surname = document.getElementById(idElement);
  const value = surname.value.trim();
  const lowerValue = value.toLowerCase();

  if (lowerValue.match(`^[a-zA-Zа-яА-Я-]{3,${MAX_LENGTH_TEXT}}$`))
    return toggle(status, [idElement], [surname], true);
  else return toggle(status, [idElement], [surname], false);
};

const validationEmail = (status) => {
  const idElement = "email";
  const email = document.getElementById(idElement);
  const value = email.value.trim();
  const lowerValue = value.toLowerCase();

  if (lowerValue.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")) {
    return toggle(status, [idElement], [email], true);
  } else return toggle(status, [idElement], [email], false);
};

const validationPassword = (status) => {
  const idElement = "password";
  const idElementSecond = "password-confirm";
  const passwordOriginal = document.getElementById(idElement);
  const passwordConfirm = document.getElementById(idElementSecond);
  const originalValue = passwordOriginal.value;
  const confirmValue = passwordConfirm.value;

  if (
    originalValue === confirmValue &&
    originalValue.match(
      `(?=.*[0-9])(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[!?@#$%^&*])[0-9a-zа-яA-ZА-Я!@#$%^&*]{${MIN_LENGTH_PASSWORD},}`
    )
  )
    return toggle(
      status,
      [idElement, idElementSecond],
      [passwordOriginal, passwordConfirm],
      true
    );
  else
    return toggle(
      status,
      [idElement, idElementSecond],
      [passwordOriginal, passwordConfirm],
      false
    );
};

const validationAge = (status) => {
  const idElement = "birth-day";
  const birthdayDate = document.getElementById(idElement);
  const birthdayValue = new Date(birthdayDate.value);
  const today = new Date();

  if (
    120 >= today.getFullYear() - birthdayValue.getFullYear() &&
    today.getFullYear() - birthdayValue.getFullYear() >= 18
  )
    return toggle(status, [idElement], [birthdayDate], true);
  else return toggle(status, [idElement], [birthdayDate], false);
};

const checkValidation = () => {
  const submitButton = document.getElementById("form-button");
  if (
    validationName("check") &
    validationSurname("check") &
    validationEmail("check") &
    validationPassword("check") &
    validationAge("check")
  ) {
    submitButton.disabled = false;
  } else submitButton.disabled = true;
};

const submitForm = () => {
  const form = document.getElementById("form");
  form.submit();
};

const firstName = document.getElementById("first-name");
firstName.addEventListener("input", () => checkValidation());
firstName.addEventListener("blur", () => validationName("add"));

const lastName = document.getElementById("last-name");
lastName.addEventListener("input", () => checkValidation());
lastName.addEventListener("blur", () => validationSurname("add"));

const email = document.getElementById("email");
email.addEventListener("input", () => checkValidation());
email.addEventListener("blur", () => validationEmail("add"));

const password = document.getElementById("password");
password.addEventListener("input", () => checkValidation());
password.addEventListener("blur", () => validationPassword("add"));

const passwordConfirm = document.getElementById("password-confirm");
passwordConfirm.addEventListener("input", () => checkValidation());
passwordConfirm.addEventListener("blur", () => validationPassword("add"));

const birthDay = document.getElementById("birth-day");
birthDay.addEventListener("input", () => checkValidation());
birthDay.addEventListener("blur", () => validationAge("add"));

const passwordConfirmCheckbox = document.getElementById(
  "password-confirm-checkbox"
);

const passwordCheckbox = document.getElementById("password-checkbox");
passwordCheckbox.addEventListener("click", () => showPassword("original"));
passwordConfirmCheckbox.addEventListener("click", () =>
  showPassword("confirmation")
);
