const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

const authSec = process.env.authSecret || authSecret

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Dados incompletos')
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).send()
                }

                const payload = { id: user.id }
                res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authSec)
                })
            })
        } else {
            res.status(400).send('Usuário não cadastrado!')
        }
    }

    const initial = (req, res) => {
        res.status(200).send('Working!!')
        //     () =>{
        //     return () {
        //         <h1>Task API - Node js</h1><br/>
        //             <a href="/api-docs">Documentation</a>
        //     }
        // })
    }

    return { signin, initial }
}