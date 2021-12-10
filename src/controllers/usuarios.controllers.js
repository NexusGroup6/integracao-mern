const Usuario = require('../models/usuario.model');

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

       const user = await Usuario.findOneAndUpdate({_id},data,{new:true});
       res.json(user);
    }
}