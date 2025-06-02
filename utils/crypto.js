const crypto = require('crypto');
const sss = require('shamirs-secret-sharing');

// AES Encryption
const encryptData = (data, key) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), data: encrypted };
};

// AES Decryption
const decryptData = (encrypted, key) => {
  const iv = Buffer.from(encrypted.iv, 'hex');
  const encryptedData = Buffer.from(encrypted.data, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Split AES Key
const splitKey = (key, totalShares, threshold) => {
  const shares = sss.split(key, { shares: totalShares, threshold });
  return shares.map(share => share.toString('hex'));
};

// Combine Key Shares
const combineKey = (shares) => {
  const buffers = shares.map(share => Buffer.from(share, 'hex'));
  return sss.combine(buffers);
};


module.exports = { encryptData, decryptData, splitKey, combineKey };
