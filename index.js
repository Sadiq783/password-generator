const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];


const generatePasswordBtn = document.querySelector("#generate-password-btn")
const passwordOutputOne = document.querySelector("#password-output-one")
const passwordOutputTwo = document.querySelector("#password-output-two")
const outputContainer = document.querySelector("#output-container")

const passwordLength = 16

// Generate passwords
generatePasswordBtn.addEventListener("click", () => {
    // Password one
    passwordOutputOne.value = generatePassword(passwordLength)

    // Password Two
    passwordOutputTwo.value = generatePassword(passwordLength)
})

// Generate a random password with a specified length
function generatePassword(passwordLen) {
    let password = ""
    for (let i = 0; i < passwordLen; i++) {
        password += characters[Math.floor((Math.random() * characters.length))]
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