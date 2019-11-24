const { getPeople } = require('../data/people');
const { getDebt } = require('../data/debts');
const { getProduct } = require('../data/products');

module.exports = {
    getAnswers(req, res) {
        const person = getPeople(req.params.user);
        const debt = getDebt();
        const product = getProduct();
        const reducer = (accumulator, { value }) => accumulator + Number.parseInt(value.slice(1));
        const media = product.reduce(reducer, 0) / product.length;

        const acceptedAnswers = {
            'say_hi': `Olá, ${person.first_name}!`,
            'say_good_afternoon': 'Boa tarde a todos!',
            'say_happy_to_oblige': 'Ficarei muito contente em atendê-los',
            'say_bank_balance': `O seu saldo atual é de ${person.balance}`,
            'say_confirm_payment': `Há um novo pagamento pendente com data para ${debt.due_to}, deseja que eu o pague?`,
            'say_history_products': `Você tem ${product.length} produtos, no seu histórico, com uma média de preço ${Math.floor(media * 100) / 100}`,
            'say_new_debt': `Vocẽ tem um novo débito no valor de ${debt.value}`,
            'say_predict_debit': `Baseado no seu histórico de compras, as previsões para o próximo mês são de que você não irá fechar com as contas em dia`,
        };


        if (req.params.command) {
            let responseObject = {};
            if(debt > person.value / 2) {
                response['answer'+Object.keys(responseObject).length+1] = acceptedAnswers['say_predict_debit']   
            }
            responseObject['answer'+Object.keys(responseObject).length+1] = acceptedAnswers[req.params.command];
            return res.json(responseObject);
        }
    } 
} 