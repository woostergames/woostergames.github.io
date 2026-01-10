// decryptmethod.js

const SECRET_KEY = 731; // arbitrary internal key

function encrypt(input) {
  let key = SECRET_KEY;
  let out = [];

  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    const encrypted = (code ^ (key + i)) + (key % 97);
    out.push(encrypted);
    key = (key * 13 + encrypted) % 10000;
  }

  return out;
}

function compareEncrypted(input, encryptedTarget) {
  const encryptedInput = encrypt(input);

  if (encryptedInput.length !== encryptedTarget.length) return false;

  for (let i = 0; i < encryptedTarget.length; i++) {
    if (encryptedInput[i] !== encryptedTarget[i]) return false;
  }

  return true;
}
