// function to generate 3 ltr sting
function generateRandomString() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';

    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * letters.length);
        randomString += letters[randomIndex];
    }

    return randomString;
}

function encrypt(str){
    let encryptedString = '';
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        const encryptedCharCode = charCode + 3;
        encryptedString += String.fromCharCode(encryptedCharCode);
    }
    return encryptedString;
}

module.exports = {
    generateRandomString,
    encrypt
};
