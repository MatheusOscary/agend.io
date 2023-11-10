const Validator = require('jsonschema').Validator;
const v = new Validator();

module.exports = (schema) => {
    return (req, res, next) => {
        const Resultado = v.validate(req.body, schema);

        if (Resultado.valid) {
        next();
        } else {
        const errors = Resultado.errors.map(error => error.stack);
        res.status(400).json({ error: 'Invalid JSON schema', details: errors });
        }
    };
};