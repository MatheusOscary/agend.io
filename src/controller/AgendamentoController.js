const Agendamento = require('../model/Agendamento');

class AgendamentoController {
    async disponivel(data, hora) {
        const agendamento = await Agendamento.findOne({ where: { data, hora } });
        if(agendamento){
            return false;
        }else{
            return true;
        }
    }

    async insert(data, hora, descricao, id_cliente) {
        return await Agendamento.create({ data, hora, descricao, id_cliente });
    }

    async update(id_agendamento, data, hora, descricao, id_cliente) {
        const agendamento = await Agendamento.findByPk(id_agendamento);
        
        if (agendamento) {
        await agendamento.update({ data, hora, descricao, id_cliente });
        }
    }
}

module.exports = new AgendamentoController();
