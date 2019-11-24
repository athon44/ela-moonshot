const { getPeople } = require("../data/people");
const { getDebt } = require("../data/debts");
const { getProduct } = require("../data/products");
const { createFile } = require("../controllers/TextToSpeechController");

module.exports = {
  getAnswers(text) {
    const person = getPeople("Gabriel");
    const debt = getDebt();
    const product = getProduct();
    const reducer = (accumulator, { value }) =>
      accumulator + Number.parseInt(value.slice(1));
    const media = product.reduce(reducer, 0) / product.length;

    const acceptedAnswers = {
      say_hi() {
        return `Olá, ${person.first_name}!`;
      },
      say_good_afternoon() {
        return "Boa tarde a todos!";
      },
      say_bank_balance() {
        return `O seu saldo atual é de ${person.balance}`;
      },
      say_confirm_payment() {
        return `Há um novo pagamento pendente com data para ${debt.due_to}, deseja que eu o pague?`;
      },
      say_history_products() {
        return `Você tem ${
          product.length
        } produtos no seu histórico, com uma média de preço ${Math.floor(
          media * 100
        ) / 100}`;
      },
      say_new_debt() {
        return `Vocẽ tem um novo débito no valor de ${debt.value}`;
      },
      say_predict_debit() {
        return `Baseado no seu histórico de compras, as previsões para o próximo mês são de que você não irá fechar com as contas em dia`;
      }
    };

    const opcoesInput = {
      opcaoSaudacao: {
        entradas: ["boa tarde ela", "oi ela boa tarde", "oi ela", "ola ela"],
        saidas: ["boa tarde gabriel."]
      }
    };

    function inAndOut(text) {
      for (const opcao of opcoesInput) {
        if (opcao.entrada.includes(text)) createFile(opcao.saidas[0]);
      }
    }

    function getOverlaps(arrTranscript, arrText) {
      arrText = arrText.split(" ");
      const result = arrTranscript.filter(arrTranscript =>
        arrText.some(arrText => arrText === arrTranscript)
      );
      return result;
    }

    let transcript = text;
    transcript = transcript.split(" ");

    let returnObject = {};
    for (let i = 0; i < idealSentences.length; i++) {
      if (getOverlaps(transcript, idealSentences[i]).length !== 0) {
        let objectKeys = Object.keys(acceptedAnswers);
        returnObject["answer" + 1] = acceptedAnswers[objectKeys[i]];
      }
    }
  }
};
