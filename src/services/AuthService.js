const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    console.log(password);
    return bcrypt.hash(password, 10);
}
const generateToken = (id) => {
    const payload = { id };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
}

const extractInforFromToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
    generateToken,
    extractInforFromToken,
    hashPassword
}