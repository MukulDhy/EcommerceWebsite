const jsonwebtoken = require('jsonwebtoken');

const gernateToken = (id) => {
    return ( jsonwebtoken.sign({id},process.env.JWT_KEY , {
        expiresIn : '15d'
    }));
}

module.exports = gernateToken;