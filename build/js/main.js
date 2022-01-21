'use strict';
const navToggle = document.querySelector('.main-nav__toggle');
const navMain = document.querySelector('.main-nav');
const pageBody = document.querySelector('body');
const navlinks = document.querySelectorAll('.main-nav__link');

navMain.classList.remove('main-nav--nojs');
navMain.classList.add('main-nav--closed');

const openMenu = () => {
  navMain.classList.remove('main-nav--closed');
  navMain.classList.add('main-nav--opened');
  pageBody.classList.add('block');
};

const closeMenu = () => {
  navMain.classList.add('main-nav--closed');
  navMain.classList.remove('main-nav--opened');
  pageBody.classList.remove('block');
};

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    openMenu();
  } else {
    closeMenu();
  }
});

for (let link of navlinks) {
  link.addEventListener('click', () => {
    closeMenu();
  });
}

const phoneField = document.querySelector('#phone');

const isPhoneValid = () => {
  phoneField.setCustomValidity('');
  let phoneNumber = phoneField.value;
  let phoneRegExp = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  let isphone = phoneRegExp.test(phoneNumber);
  if (!isphone && (phoneField.value.length > 1)) {
    phoneField.setCustomValidity('Проверте правильность введенного номера');
  }
  phoneField.reportValidity();
};

const checkphoneField = () => {
  phoneField.addEventListener('input', () => {
    isPhoneValid();
  });
};

const nameField = document.querySelector('#name');

const isNameValid = () => {
  nameField.setCustomValidity('');
  let nameValue = nameField.value;
  let nameRegExp = /^[А-Яа-яA-Za-z0-9 -]+$/;
  let isname = nameRegExp.test(nameValue);
  if (!isname && (nameField.value.length > 1)) {
    nameField.setCustomValidity('Недопустимый символ');
  }
  nameField.reportValidity();
};

const checknameField = () => {
  nameField.addEventListener('input', () => {
    isNameValid();
  });
};

checknameField();
checkphoneField();
