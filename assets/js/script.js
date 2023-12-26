/*

Principais Objetivos
====================
// 01 - Capturar os dados do input.
// 02 - Tratar Campos vazios e Número Máximo de Parcelas em 12.
// 03 - Exibir calculo e o valor de cada parcela com FOR.

*/

// Declarações de variáveis globais.

const form = document.querySelector("form");
const valor = document.querySelector("#valor");
const parcela = document.querySelector("#parcelas");
const resultado = document.querySelector(".resultado");
const inputs = document.querySelectorAll("input");
let campoVazio = false; //Declara variável do tipo boleano.
let formataReal; //Declara variável Global do tipo indefinida.

//Formata moeda em Real ao digitar.
function formatarMoeda(e) {
  let v = e.target.value.replace(/\D/g, "");
  v = (v / 100).toFixed(2) + "";
  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
  e.target.value = v;
}

//Chama a função "formatarMoeda".
valor.addEventListener("keyup", formatarMoeda);

//Permite que apenas números sejam digitados no input de parcelas.
parcela.addEventListener("keyup", () => {
  parcela.value = parcela.value.replace(/[^0-9]/gi, "");
});

form.addEventListener("submit", (e) => {
  //Evita o envio nativo do formulário
  e.preventDefault();

  //Verifica de o número é abaixo ou maior do que 1.000 e faz a devida formatação para o cálculo.
  if (valor.value.length <= 4) {
    formataReal = valor.value.replace(",", ".");
  } else if (valor.value.length >= 4 && valor.value.length <= 6) {
    formataReal = valor.value.replace(",", ".");
  } else {
    formataReal = valor.value.replace(",", ".").replace(".", "");
  }

  //Percorre todos os inputs, emitindo um alerta e colocando o foco no último vazio.
  for (let i of inputs) {
    if (i.value === "") {
      alerta(`Campo ${i.name} não pode ser vazio`);
      i.focus();
      campoVazio = true;
    } else {
      campoVazio = false;
    }
  }
  //Verifica se a quantidade de Parcelas é maior do que 12.
  if (parcela.value >= 13) {
    alerta(`Máximo de Parcelas é 12x`);
    campoVazio = true;
  } else {
    campoVazio = false;
  }
  //Verifica se o valor mínimo da compra é R$100,00
  if (formataReal < 100) {
    alerta(`Valor mínimo da compra R$100,00`);
    campoVazio = true;
  } else {
    campoVazio = false;
  }

  //Função para exibir alertas de erro.
  function alerta(erro) {
    const alertPopUp = document.querySelector("#alertErro");
    alertPopUp.style.display = "block";
    alertPopUp.classList.add("animate__fadeInDown");
    alertPopUp.innerHTML = erro;
    setTimeout(() => {
      alertPopUp.style.display = "none";
    }, 2000);
  }

  //Verifica se ainda existe campo vazio, caso não, executa o cálculo das Parcelas.
  if (campoVazio === false) {
    //Limpa qualquer valor já exibido antes.
    resultado.innerHTML = "";
    //Usa um For para exibir os valores da parcela, usando LocaleString para formatar.
    for (let i = 1; i <= parcela.value; i++) {
      let valorParcela = parseFloat(formataReal) / parseInt(i);
      let newP = document.createElement("p");
      newP.classList.add("listagem-parcelas");
      newP.innerHTML = `Em até ${i}x <br><span class='sem-juros'>sem juros</span><br>de ${valorParcela.toLocaleString(
        "pt-BR",
        { style: "currency", currency: "BRL" }
      )}`;
      resultado.appendChild(newP);
    }
  }
});
