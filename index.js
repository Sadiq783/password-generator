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

const uppercaseLettersToggle = document.querySelector("#uppercase-letters-toggle")
const lowercaseLettersToggle = document.querySelector("#lowercase-letters-toggle")
const numbersToggle = document.querySelector("#numbers-toggle")
const symbolsToggle = document.querySelector("#symbols-toggle")


const passwordLength = 10

// Generate passwords
generatePasswordBtn.addEventListener("click", () => {

    // Password one
    passwordOutputOne.textContent = generatePassword(
        passwordLength, 
        uppercaseLettersToggle.checked? upperCaseLetters : [], 
        lowercaseLettersToggle.checked? lowercaseLetters : [], 
        numbersToggle.checked? numbers : [], 
        symbolsToggle.checked? symbols : [])

    // Password two
    passwordOutputTwo.textContent = generatePassword(
        passwordLength, 
        uppercaseLettersToggle.checked? upperCaseLetters : [], 
        lowercaseLettersToggle.checked? lowercaseLetters : [], 
        numbersToggle.checked? numbers : [], 
        symbolsToggle.checked? symbols : [])
    
    
})

// Generate a random password with a specified length
function generatePassword(passwordLen, uppercase = [], lowercase = [], numbers = [], symbols = []) {
    let password = ""
    const arr = [...uppercase, ...lowercase, ...numbers, ...symbols]
    console.log(arr)

    if (!arr.length)
        return password

    for (let i = 0; i < passwordLen; i++) {
        password += arr[Math.floor((Math.random() * arr.length))]
    }
    
    return password
}

// Copy password to the clipboard
outputContainer.addEventListener("click", (e) => {
    let outputEl = e.target

    if (outputEl.classList.contains("password-output")) {
        navigator.clipboard.writeText(outputEl.value)
    }
})