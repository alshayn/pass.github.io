/* 
TODO:
- Select all of important elements.
- Get all control buttons 
- Create a function for Random Password .
- Work with copy button function
- Create Handle Error Function 
*/

/* step 1 - select important elements  */
const passwordField = document.getElementById("password-field");
const generateBtn = document.getElementById("generate-btn");
const lengthField = document.getElementById("lengthOfPassword");
const allButtons = document.querySelectorAll(".pwd-control .field");
let mixes = [];

/* step 2 - get all control buttons */
allButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.contains('active') ? button.classList.remove('active') : button.classList.add('active');
        const activeButtons = document.querySelectorAll('.pwd-control .field.active');
        let newStrings = '';
        activeButtons.forEach(activeBtn => {
            let activeBtnAttr = activeBtn.getAttribute('data-control');
            newStrings = newStrings + activeBtnAttr;
        })
        mixes = newStrings.split('');
    })
})

/* step 3 - create a function for random password  */

const randomPassword = () => {
    passwordField.value = '';
    const lengthPassword = parseInt(lengthField.value);
    if (mixes.length == 0) {
        handleError(`Выбери тип пароля`);
    } else {
        for (let i = 0; i < mixes.length; i++) {
            let rand = Math.round(Math.random() * (mixes.length - 1));
            if (lengthPassword > 25 || lengthPassword < 8) {
                handleError(`Пароль должен содержать от 8 до 25 символов`)
            } else {
                if (i < lengthPassword) {
                    passwordField.value += mixes[rand];
                    passwordField.classList.remove('error');
                }
            }
        }
    }
}
generateBtn.addEventListener('click', randomPassword);

/* 4. work with copy button  */
document.querySelector(".copyBtn").addEventListener('click', () => {
    let getPasswordText = passwordField.value;
    if (getPasswordText === '') {
        handleError('Password not define!');
    } else {
        window.navigator.clipboard.writeText(getPasswordText);
        passwordField.value = 'Пароль Скопирован'
    }
})
/* 5. Handle Error  function */
function handleError(msg) {
    passwordField.value = msg;
    passwordField.classList.add('error');
}