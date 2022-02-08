'use strict';

const pageBody = document.querySelector('body');
const accordionItems = document.querySelectorAll('.accordion__item');

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const saveLocalStorage = (dataName, dataContent) => {
  if (dataName !== 'permission') {
    localStorage.setItem(dataName, dataContent);
  }
};

const cutNewContent = (cutContentElement, signCount, windowSize) => {
  if (localStorage.getItem('initText') === null) {
    localStorage.setItem('initText', cutContentElement.innerHTML.toString());
  }
  if (window.innerWidth < windowSize) {
    cutContentElement.innerHTML = localStorage.getItem('initText').toString().slice(0, signCount) + '..';
  } else {
    cutContentElement.innerHTML = localStorage.getItem('initText').toString();
  }
};

const aboutContent = document.querySelector('.about__content div');

window.addEventListener('resize', () => {
  cutNewContent(aboutContent, 410, 1023);
});

window.onload = () => {
  cutNewContent(aboutContent, 410, 1023);
};

const checkPhoneValid = () => {
  const phoneFields = document.querySelectorAll('input[type="tel"]');
  phoneFields.forEach((phoneField) => {
    phoneField.addEventListener('focus', () => {
      if (phoneField.value.length === 0) {
        phoneField.value = '+7(';
      }
    });
    phoneField.addEventListener('keyup', (evt) => {
      if (evt.code !== 'Backspace' && evt.code !== 'delete') {
        if (phoneField.value.length === 6) {
          phoneField.value = phoneField.value + ')';
        }
      }
      if (phoneField.value.length < 3) {
        phoneField.value = '+7(';
      }
    });
  });
};
checkPhoneValid();

const closeAllItems = () => {
  accordionItems.forEach((item) => {
    item.classList.add('accordion__item--closed');
  });
};

const accordionItemClick = (accordionItemindex) => {
  localStorage.setItem('accordionItemState', accordionItems[accordionItemindex].classList.contains('accordion__item--closed').toString());
  closeAllItems();
  if (localStorage.getItem('accordionItemState').toString() === 'true') {
    accordionItems[accordionItemindex].classList.toggle('accordion__item--closed');
  }
};

accordionItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    accordionItemClick(index);
  });
});

closeAllItems();

const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    closePopup();
  }
};

const openPopup = () => {
  popup.classList.add('popup--open');
  pageBody.classList.add('block');
  document.addEventListener('keydown', onPopupEscKeydown);
  const nameField = popup.querySelector('input[name="name"]');
  nameField.focus();
};

const closePopup = () => {
  if (popup.classList.contains('popup--open')) {
    popup.classList.remove('popup--open');
    pageBody.classList.remove('block');
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const callbackButton = document.querySelector('.page-header__callback-button');

callbackButton.addEventListener('click', (evt)=> {
  evt.preventDefault();
  evt.stopPropagation();
  openPopup();
});

popupCloseButton.addEventListener('click', ()=> {
  closePopup();
});


pageBody.addEventListener('click', (evt)=> {
  if (evt.target !== popup && !popup.contains(evt.target)) {
    closePopup();
  }
});

const allInputFields = document.querySelectorAll('input');
const allTextareaFields = document.querySelectorAll('textarea');

allInputFields.forEach((inputfield) => {
  inputfield.addEventListener('keyup', (evt) => {
    saveLocalStorage(evt.target.name, evt.target.value);
  });
});

allTextareaFields.forEach((textareaField) => {
  textareaField.addEventListener('keyup', (evt) => {
    saveLocalStorage(evt.target.name, evt.target.value);
  });
});

const nameFields = document.querySelectorAll('input[name="name"]');

const isNameValid = (evt) => {
  evt.target.setCustomValidity('');
  let nameValue = evt.target.value;
  let nameRegExp = /^[А-Яа-яA-Za-z0-9 -]+$/;
  let isname = nameRegExp.test(nameValue);
  if (!isname && (evt.target.value.length > 1)) {
    evt.target.setCustomValidity('Недопустимый символ');
  }
  evt.target.reportValidity();
};

const checknameField = () => {
  nameFields.forEach((nameField) => {
    nameField.addEventListener('input', (evt) => {
      isNameValid(evt);
    });
  });
};

checknameField();
