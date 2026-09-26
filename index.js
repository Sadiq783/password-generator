const upperCaseLetters = 
["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
const lowercaseLetters = 
["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
const numbers = 
["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const symbols = 
["~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"]


const generatePasswordBtn = document.querySelector("#generate-password-btn")
const passwordOutputOne = document.querySelector("#password-output-one")
const passwordOutputTwo = document.querySelector("#password-output-two")
const outputContainer = document.querySelector("#output-container")
const optionsError = document.querySelector("#options-error")

const uppercaseLettersToggle = document.querySelector("#uppercase-letters-toggle")
const lowercaseLettersToggle = document.querySelector("#lowercase-letters-toggle")
const numbersToggle = document.querySelector("#numbers-toggle")
const symbolsToggle = document.querySelector("#symbols-toggle")
const passwordLengthRange = document.querySelector("#password-len-range")

// Set the password length
let passwordLength = 8
passwordLengthRange.addEventListener("input", () => {
    passwordLength = passwordLengthRange.value
    document.querySelector("#password-len-value").textContent = passwordLengthRange.value
})

// Generate passwords
generatePasswordBtn.addEventListener("click", handleGenerateClick)

function handleGenerateClick() {
    const selectedCharacterSets = getSelectedCharacterSets()

    if (!selectedCharacterSets.some(characterSet => characterSet.length)) {
        passwordOutputOne.textContent = ""
        passwordOutputTwo.textContent = ""
        optionsError.hidden = false
        document.querySelectorAll(".copy-button").forEach(copyButton => {
            copyButton.style.display = "none"
        })
        return
    }

    optionsError.hidden = true

    renderPasswords(
        generatePassword(passwordLength, ...selectedCharacterSets),
        generatePassword(passwordLength, ...selectedCharacterSets)
    )

    // Show the copy buttons
    if (passwordOutputOne.textContent && passwordOutputTwo.textContent) {
        document.querySelectorAll(".copy-button").forEach(copyButton => {
            copyButton.style.display = "inline-block"
        })
    } else {
        document.querySelectorAll(".copy-button").forEach(copyButton => {
            copyButton.style.display = "none"
        })
    }
}

function getSelectedCharacterSets() {
    return [
        uppercaseLettersToggle.checked ? upperCaseLetters : [],
        lowercaseLettersToggle.checked ? lowercaseLetters : [],
        numbersToggle.checked ? numbers : [],
        symbolsToggle.checked ? symbols : []
    ]
}

// Generate a random password with a specified length
function generatePassword(passwordLen, uppercase = [], lowercase = [], numbers = [], symbols = []) {
    let password = ""
    const arr = [...uppercase, ...lowercase, ...numbers, ...symbols]

    if (!arr.length)
        return password

    for (let i = 0; i < passwordLen; i++) {
        password += arr[Math.floor((Math.random() * arr.length))]
    }
    
    return password
}

function renderPasswords(passwordOne, passwordTwo) {
    passwordOutputOne.textContent = passwordOne
    passwordOutputTwo.textContent = passwordTwo
}

// Copy password to the clipboard
outputContainer.addEventListener("click", handleOutputClick)

function handleOutputClick(e) {
    const copyButton = e.target.closest(".copy-button")
    const outputEl = e.target.closest(".password-output")

    if (copyButton) {
        copyPassword(document.querySelector(`#${copyButton.dataset.copyTarget}`), copyButton)
    } else if (outputEl) {
        const relatedCopyButton = document.querySelector(`[data-copy-target="${outputEl.id}"]`)
        copyPassword(outputEl, relatedCopyButton)
    }
}

function copyPassword(outputEl, copyButton) {
    navigator.clipboard.writeText(outputEl.textContent).then(() => {
        // Change the tooltip text
        document.querySelector(".tooltip").textContent = "Copied"

        copyButton.classList.add("is-copied")
        copyButton.querySelector("i").classList.remove("fa-regular", "fa-copy")
        copyButton.querySelector("i").classList.add("fa-solid", "fa-check")
        copyButton.setAttribute("aria-label", "Password copied")

        setTimeout(() => {
            copyButton.classList.remove("is-copied")
            copyButton.querySelector("i").classList.remove("fa-solid", "fa-check")
            copyButton.querySelector("i").classList.add("fa-regular", "fa-copy")
            copyButton.setAttribute("aria-label", `Copy generated password ${outputEl.id.endsWith("one") ? "1" : "2"}`)
        }, 2000)
    })
}


document.addEventListener("DOMContentLoaded", () => {
    showCopyTooltip()
})

// Copy Tooltip
function showCopyTooltip() {
    const targets = document.querySelectorAll("[class='copy-button']")

    // Create the actual tooltip
    const tooltip = document.createElement("div")
    tooltip.classList.add("tooltip")
    document.body.appendChild(tooltip)

    targets.forEach(target => {
        target.addEventListener("mouseenter", () => {
            // Show tooltip
            tooltip.textContent = "Copy"
            tooltip.classList.add("visible")

            // Position the tooltip
            positionTooltip(target, tooltip)
        })

        // Remove tooltip
        target.addEventListener("mouseleave", () => {
            tooltip.classList.remove("visible")
        })
    })
}

function positionTooltip(target, tooltip) {
    const targetRect = target.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()

    let positionTop = (targetRect.top + window.scrollY) - (targetRect.height + 20)
    const positionLeft = (targetRect.left + window.scrollX) + (targetRect.width - tooltipRect.width) / 2

    if (target.dataset.copyTarget === "password-output-two") {
        positionTop = (targetRect.top + window.scrollY) + (targetRect.height + 8)
    }

    tooltip.style.top = `${positionTop}px`
    tooltip.style.left = `${positionLeft}px`
}