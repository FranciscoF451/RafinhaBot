const respostas = ['Sim', 'Não', 'Nunca na life', 'Vai para o Colégio Atlântico', 'Não respondo', 'Por aí por aí', 'É só pão alentejano', 
 'Fecha a boca senão engasgaste', 'YEEEE', 'É lidar com a situação'];

module.exports = {
    name: 'pergunta',
    description: 'Pergunta command',
    execute(message){
        let index = Math.round(Math.random() * respostas.length);
        message.channel.send(respostas[index]);
    }
}