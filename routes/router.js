const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');

router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
        req.body.username
      )});`,
        (err, result) => {
            if (result.length) {
                return res.status(409).send({
                    msg: 'Este nombre de usuario ya se encuentra en uso actualmente'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {
                        db.query(
                            `INSERT INTO users (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                  req.body.username
                )}, ${db.escape(hash)}, now())`,
                            (err, result) => {
                                if (err) {
                                    throw err;
                                    return res.status(400).send({
                                        msg: err
                                    });
                                }
                                return res.status(201).send({
                                    msg: 'Registro completado con exito'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

router.post('/proyecto_programacion_web', (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
            if (err) {
                throw err;
                return res.status(400).send({
                    msg: err
                });
            }

            if (!result.length) {
                return res.status(401).send({
                    msg: '¡¡ERROR!! NOMBRE DE USUARIO O CONTRASEÑA INCORRECTA'
                });
            }

            bcrypt.compare(
                req.body.password,
                result[0]['password'],
                (bErr, bResult) => {
                    if (bErr) {
                        throw bErr;
                        return res.status(401).send({
                            msg: '¡¡ERROR!! NOMBRE DE USUARIO O CONTRASEÑA INCORRECTA'
                        });
                    }

                    if (bResult) {
                        const token = jwt.sign({
                                username: result[0].username,
                                userId: result[0].id
                            },
                            'SECRETKEY', {
                                expiresIn: '7d'
                            }
                        );

                        db.query(
                            `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
                        );
                        return res.status(200).send({
                            msg: 'Logiado',
                            token,
                            user: result[0]
                        });
                    }
                    return res.status(401).send({
                        msg: '¡¡ERROR!! NOMBRE DE USUARIO O CONTRASEÑA INCORRECTA'
                    });
                }
            );
        }
    );
});

router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('¡¡ATENCION!!. Intenta acceder a informacion clasificada SOLO PARA USUARIOS REGISTRADOS');
});

module.exports = router;