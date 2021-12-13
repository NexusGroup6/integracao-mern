const Usuario = require('../models/usuario.model');
const jwt = require("jsonwebtoken");
const secret = "mysecret";

module.exports = {
    //Listagem de Usuários
    async index(req, res) {
        const user = await Usuario.find();
        res.json(user);
    },

    async create(req, res) {
        try {
            const { nome_usuario,
                email_usuario,
                tipo_usuario,
                senha_usuario
            } = req.body;
            let data = {};
            let user = await Usuario.findOne({ email_usuario }); // Verificar se já existi o email cadastrado.

            // Se não existir, cadastra o cliente.
            if (!user) {
                data = {
                    nome_usuario,
                    email_usuario,
                    tipo_usuario,
                    senha_usuario
                };

                user = await Usuario.create(data);
                return res.status(200).json(user);
            } else {
                return res.status(500).json(user);
            }
        } catch (error) {
            console.error(error);
        }
    },

    //Detalhes de um Usuário
    async details(req, res) {
        const { _id } = req.params;
        const user = await Usuario.findOne({ _id });
        res.json(user);
    },

    //Deleta um Usuário
    async delete(req, res) {
        const { _id } = req.params;
        const user = await Usuario.findByIdAndDelete({ _id });
        return res.json(user);
    },
    async update(req, res) {
        const { _id, nome_usuario,
            email_usuario,
            senha_usuario,
            tipo_usuario
        } = req.body;

        const data = {
            nome_usuario,
            email_usuario,
            senha_usuario,
            tipo_usuario
        };

        const user = await Usuario.findOneAndUpdate({ _id }, data, { new: true });
        res.json(user);
    },
    async login(req, res) {
        const { email, senha } = req.body;
        Usuario.findOne({ email_usuario: email, tipo_usuario: 1 }, function (err, user) {
            if (err) {
                console.log(err);
                res.status(200).json({ erro: "Erro no servidor. Por favor, tente novamente!" });
            } else if (!user) {
                res.status(200).json({ status: 2, error: 'E-mail não encontrado no banco de dados!' });
            } else {
                user.isCorrectPassword(senha, async function (err, same) {
                    if (err) {
                        res.status(200).json({ error: "Erro no servidor, Por favor, tente novamente" });
                    } else if (!same) {
                        res.status(200).json({ status: 2, error: "A senha está errada!" });
                    } else {
                        const payload = { email };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '24h'
                        });
                        res.cookie('token', token, { httpOnly: true });
                        res.status(200).json({ status: 1, auth: true, token: token, id_client: user._id, user_name: user.nome_usuario });

                    }
                });
            }
        });
    },
   async checkToken(req,res){
       const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-acess-token'];
       if(!token){
           res.json({status:401,msg:'Não autorizado: Token inexistente!'});
       }else {
           jwt.verify(token, secret, function(err, decoded){
               if(err){
                   res.json({status:401,msg:'Não autorizado: Token inválido!'});
               }else {
                   res.json({status:200});
               }
           });
       }
   }
}