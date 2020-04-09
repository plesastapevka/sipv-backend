const crypto = require('crypto');

const aesWrapper = {};
/*
// get list of supportable encryption algorithms
aesWrapper.getAlgorithmList = () => {
    console.log(crypto.getCiphers());
};
*/

const IV_SIZE = 16;

aesWrapper.generateKey = () => {
    return crypto.randomBytes(32);
};

aesWrapper.encrypt = (plainText, keyString) => {
    const iv = crypto.randomBytes(IV_SIZE);
    const cipher = crypto.createCipheriv("aes-256-cbc", keyString, iv);
    let cipherText = cipher.update(Buffer.from(plainText, "utf8"));
    cipherText = Buffer.concat([cipherText, cipher.final()]);
    const combinedData = Buffer.concat([iv, cipherText]);
    const combinedString = combinedData.toString("base64");
    return combinedString;
};

aesWrapper.decrypt = (combinedString, keyString) => {
    const combinedData = Buffer.from(combinedString, "base64");
    const iv = Buffer.alloc(IV_SIZE);
    const cipherText = Buffer.alloc(combinedData.length - iv.length);
    combinedData.copy(iv, 0, 0, iv.length);
    combinedData.copy(cipherText, 0, iv.length);
    const decipher = crypto.createDecipheriv("aes-256-cbc", keyString, iv);
    let plainText = decipher.update(cipherText, "utf8");
    plainText += decipher.final("utf8");
    return plainText;
};
    /*
aesWrapper.generateIv = () => {
    return crypto.randomBytes(16);
};

// separate initialization vector from message
aesWrapper.separateVectorFromData = (data) =>  {
    console.log(data);
    console.log('data');
    var iv = data.slice(-24);
    var message = data.substring(0, data.length - 24)

    return{
        iv: iv,
        message: message
    };
}

aesWrapper.encrypt = (key, iv, text) => {
    let encrypted = '';
    let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    encrypted += cipher.update(Buffer.from(text), 'utf8', 'base64');
    encrypted += cipher.final('base64');

    return encrypted;
};

aesWrapper.decrypt = (key, text) => {
    let dec = '';
    let data = aesWrapper.separateVectorFromData(text);
    let cipher = crypto.createDecipheriv('aes-256-cbc', key,  Buffer.from(data.iv, 'base64'));
    dec += cipher.update(Buffer.from(data.message, 'base64'), 'base64', 'utf8');
    dec += cipher.final('utf8');

    return dec;
};

// add initialization vector to message
aesWrapper.addIvToBody = (iv, encryptedBase64) => {
    encryptedBase64 += iv.toString('base64');
    console.log(iv.toString('base64'));

    return encryptedBase64;
};

aesWrapper.createAesMessage = (aesKey, message) => {
    let aesIv = aesWrapper.generateIv();
    let encryptedMessage = aesWrapper.encrypt(aesKey, aesIv, message);
    encryptedMessage = aesWrapper.addIvToBody(aesIv, encryptedMessage);

    return encryptedMessage;
};*/

module.exports = aesWrapper;