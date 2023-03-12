const passwdLength = document.querySelector('.passwd-length input')
const inputCheck = document.querySelectorAll('.criteres .critere input')
const passwdInput = document.querySelector('.input-container input')
const generatePasswdBtn = document.querySelector('.btn-container .btn')
const copyIcon = document.querySelector('.input-container i')
const toolTip = document.querySelector('.input-container .tooltip')

const alertContainer = document.querySelector('.alert-container')
const alertDanger = alertContainer.querySelector('.danger')
const alertText = alertContainer.querySelector('.icon-text .text')
const alertCloseBtn = alertContainer.querySelector('.alert .close')

passwdInput.value = ''
passwdLength.value = '1'

copyIcon.addEventListener('click', () => {
    navigator.clipboard.writeText(passwdInput.value)
    toolTip.classList.add('active')
    setTimeout(() => toolTip.classList.remove('active'), 2000);
})
passwdLength.addEventListener('keyup', toggleStateButton)

generatePasswdBtn.addEventListener('click', () => {
    let checkCount = Array
                        .from(inputCheck)
                        .filter(element => element.checked)
                        .length
    
    let length = Number(passwdLength.value)

    if (!checkPasswordLength(length))
        return

    if (checkCount == 0) {
        showErrorAlert('Erreur ! Veuillez séléctionner un critère')
    } else if(checkCount > length) {
        showErrorAlert('La longueur du mot de passe ne doit pas être inférieure au nombre de case coché !!!')
    } else {
        passwdInput.value = generatePassword(length)
    }
})

function generatePassword(length) {
    let passwordGenerated = "", i = 0
    const upperChecked = inputCheck[0].checked
    const lowerChecked = inputCheck[1].checked
    const numberChecked = inputCheck[2].checked
    const specialChecked = inputCheck[3].checked

    while (i < length) {
        if (upperChecked && i < length) {
            passwordGenerated += generateUpper()
            passwordGenerated = shufflePassword(passwordGenerated)
            i++
        }
        if(lowerChecked && i < length) {
            passwordGenerated += generateLower()
            passwordGenerated = shufflePassword(passwordGenerated)
            i++
        }
        if (numberChecked && i < length) {
            passwordGenerated += generateNumber()
            passwordGenerated = shufflePassword(passwordGenerated)
            i++
        }
        if (specialChecked && i < length) {
            passwordGenerated += generateSpecial()
            passwordGenerated = shufflePassword(passwordGenerated)
            i++
        }
    }
    return passwordGenerated
}

function shufflePassword(passwd) {
    return Array.from(passwd).sort(char => Math.random() - 0.5).join('')
}

function generateLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function generateUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function generateNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function generateSpecial() {
    let special = "(#£$*%{-@_>~&|:=+},<?;!)"
    return special[Math.floor(Math.random() * special.length)]
}

function toggleStateButton() {
    if (Number(passwdLength.value) < 1 || Number(passwdLength.value) > 20) {
        generatePasswdBtn.disabled = true
        generatePasswdBtn.classList.remove('active')
    } else {
        generatePasswdBtn.disabled = false
        generatePasswdBtn.classList.add('active')
    }
}

function checkPasswordLength(length) {
    if (isNaN(length)) {
        showErrorAlert('Erreur ! veuillez saisir un nombre ')
        return false
    } else if (length < 1 || length > 20) {
        showErrorAlert('Erreur ! La longeur du mot doit être compris entre 1 et 20')
        return false
    }
    return true
}

function showErrorAlert(errorMessage) {
    alertText.textContent = errorMessage
    setTime()
    passwdInput.value = ''
}

function removeAlert() {
    alertDanger.classList.remove('active')
    alertDanger.classList.add('inactive')
}

function activeAlert() {
    alertDanger.classList.remove('inactive')
    alertDanger.classList.add('active')
}

function setTime() {
    activeAlert()
    alertCloseBtn.addEventListener('click', removeAlert)
    setTimeout(removeAlert, 3000)
}