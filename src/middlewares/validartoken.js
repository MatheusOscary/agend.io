const jwt = require('jsonwebtoken');

function validartoken(req, res, next) {
    var token = req.headers.authorization;
console.log('Token:', token);

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }
    token = token.split(' ')[1];
    jwt.verify(token, '492931728282288659980832861449837', (err, decoded) => {
        if (err) {
            console.error('Erro ao verificar token:', err);
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expirado' });
            } else {
                return res.status(401).json({ error: 'Token inválido' });
            }
        }
        req.usuario = decoded;
        next();
    });
}


module.exports = validartoken;