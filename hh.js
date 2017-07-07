const crypto = require('crypto');
// ==============================
const cipher = crypto.createCipher('aes192', 'a password');

let encrypted = cipher.update('lorem ipsum dolor sit amet', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted);
// Prints: e2f041e5b62277070557724a6bd585451ef736d36fa27ee3f27d73409e160430
// ==============================
const decipher = crypto.createDecipher('aes192', 'a password');

let decrypted = '';
decipher.on('readable', () => {
	const data = decipher.read();
	if (data)
		decrypted += data.toString('utf8');
});
decipher.on('end', () => {
	console.log(decrypted);
	// Prints: lorem ipsum dolor sit amet
});

const encrypted_ = 'e2f041e5b62277070557724a6bd585451ef736d36fa27ee3f27d73409e160430';
decipher.write(encrypted_, 'hex');
decipher.end();
console.log(Date.now());