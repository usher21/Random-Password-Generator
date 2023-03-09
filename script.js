const passwdLength = document.querySelector('.passwd-length input')
const inputCheck = document.querySelectorAll('.criteres .critere input')
const passwdInput = document.querySelector('.input-container input')
const generatePasswdBtn = document.querySelector('.btn-container .btn')
const copyIcon = document.querySelector('.input-container i')
const toolTip = document.querySelector('.input-container .tooltip')

const alertContainer = document.querySelector('.alert-container')

passwdInput.value = ''
passwdLength.value = '15'

copyIcon.addEventListener('click', () => {
    navigator.clipboard.writeText(passwdInput.value)
    toolTip.classList.add('active')
    setTimeout(() => toolTip.classList.remove('active'), 2000);
})
passwdLength.addEventListener('keyup', () => toggleStateButton())

generatePasswdBtn.addEventListener('click', () => {
    let checkedElements = Array.from(inputCheck).filter(element => element.checked)
    let checkCount = checkedElements.length
    
    let length = Number(passwdLength.value)

    if (length < 15 || length > 20) {
        const alertDanger = createAlert('alert danger', 'fa-solid fa-circle-exclamation', 'Erreur ! La longeur du mot doit être compris entre 15 et 20')
        alertContainer.append(alertDanger)
        setTime(alertDanger)
        passwdInput.value = ''
        return        
    }

    if (checkCount == 0) {
        const alertDanger = createAlert('alert danger', 'fa-solid fa-circle-exclamation', 'Erreur ! Veuillez séléctionner un critère')
        alertContainer.append(alertDanger)
        setTime(alertDanger)
        passwdInput.value = ''
    } else {
        passwdInput.value = generatePassword(length, checkedElements, checkCount)
    }
})

function generatePassword(length, checkedElements, checkCount) {
    let passwordGenerated = ""
    let index = 0
    
    for (let i = 0; i < length; i++) {
        index = Math.floor(Math.random() * checkCount)
        const element = checkedElements[index]
        
        if (element.getAttribute('name') === 'upper') {
            passwordGenerated += generateUpper()
        } else if (element.getAttribute('name') === 'lower') {
            passwordGenerated += generateLower()
        } else if (element.getAttribute('name') === 'number') {
            passwordGenerated += generateNumber()
        } else if (element.getAttribute('name') === 'special') {
            passwordGenerated += generateSpecial()
        }
    }

    return passwordGenerated
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

function createElement(tagName, attributs = {}, content = '') {
    const element = document.createElement(tagName)
    for (const attribut in attributs) {
        element.setAttribute(attribut, attributs[attribut])
    }
    element.textContent = content
    return element
}

function createAlert(alertClassName, iconName, alertText) {
    const alert = createElement('div', { class: alertClassName })

    const textIcon = createElement('div', { class: 'icon-text' })
    const icon = createElement('i', { class: iconName })
    const text = createElement('span', { class: 'text' }, alertText)
    textIcon.append(icon)
    textIcon.append(text)
    alert.append(textIcon)

    return alert
}

function removeAlert(alert) {
    alertContainer.removeChild(alert)
}

function toggleAlertState(alert) {
    if (alert.classList.contains('active')) {
        alert.classList.add('inactive')
        alert.classList.remove('active')
    } else {
        alert.classList.add('active')
        alert.classList.remove('inactive')
    }
}

function toggleStateButton() {
    if (Number(passwdLength.value) < 15 || Number(passwdLength.value) > 20) {
        generatePasswdBtn.disabled = true
        generatePasswdBtn.classList.remove('active')
    } else {
        generatePasswdBtn.disabled = false
        generatePasswdBtn.classList.add('active')
    }
}

function setTime(alertDanger) {
    toggleAlertState(alertDanger)
    setTimeout(() => {
        toggleAlertState(alertDanger)
        setTimeout(() => {
            removeAlert(alertDanger)
        }, 500);
    } , 3000)
}