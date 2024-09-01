function shuffle(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function getRandomChar(text) {
    return text[Math.floor(Math.random() * text.length)];
}

export function generatePassword(config) {
    let result = "";
    let charToSkip = 1;

    const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const NUMBERS = "0123456789";
    const SPECIALS = "!@#$%^&*()_+-=[]{}|;:'\",.<>?/\\";
    
    let alphabet = LOWERCASE;
    result += getRandomChar(LOWERCASE);

    if (config.uppercase) {
        alphabet += UPPERCASE;
        result += getRandomChar(UPPERCASE);
        charToSkip++;
    }
    if (config.numbers) {
        alphabet += NUMBERS;
        result += getRandomChar(NUMBERS);
        charToSkip++;
    }
    if (config.specials) {
        alphabet += SPECIALS;
        result += getRandomChar(SPECIALS);
        charToSkip++;
    }

    for (let i = charToSkip; i < Number(config.size); i++) {
        result += getRandomChar(alphabet);
    }
    
    result = shuffle(result.split('')).join('');
    console.log("***", result);
    return result;
}