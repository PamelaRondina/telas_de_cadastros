
//criar variáveis
const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

//spam de entradas, saídas e total geral
const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

//variável para armazenar os itens
let items;

btnNew.onclick = () => {
    if (descItem.value === "" || amount.value === "" || type.value === "") {
        return alert("Preencha todos os campos!");
    }

    items.push({
        desc: descItem.value,
        amount: Math.abs(amount.value).toFixed(2),
        type: type.value,
    });
    
    setItensBD();

    loadItens();

    descItem.value = "";
    amount.value = "";
};

function deleteItem(index) {
    //excluir o item desejado em 1 posição para não optar por mais de 1 item
    items.splice(index, 1);
    //atualizar o banco chamando a função
    setItensBD();
    // e carregar, em tela, as informações
    loadItens();    
}

function insertItem(item, index) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${item.desc}</td>
    <td>R$ ${item.amount}</td>
    <td class="columnType">${
        item.type === "Entrada"
        //ícone de entrada, saída e delet
        ? '<i class="bx bxs-chevron-up-square"></i>'
        : '<i class="bx bxs-chevron-down-square"></i>'
    }</td>
    <td class="columnAction"> 
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
    `;

    tbody.appendChild(tr);
}

//função inicializada assim que carrega o documento
function loadItens(){
    items = getItensBD();
    //carregar o tbody para não ter itens duplicados na tela
    tbody.innerHTML = "";
    items.forEach((item, index) => {
        insertItem(item, index);
    });

    getTotals();
}

// função de pagar 
function getTotals() {
    const amountIncomes = items
        .filter((item) => item.type === "Entrada")
        .map((transaction) => Number(transaction.amount));

    const amountExpenses = items
        .filter((item) => item.type === "Saída")
        .map((transaction) => Number(transaction.amount));

    const totalIncomes = amountIncomes
        .reduce((acc, cur) => acc + cur, 0)
        .toFixed(2);

    const totalExpenses = Math.abs(
        amountExpenses.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);

    const totalItems = (totalIncomes - totalExpenses).toFixed(2);

    incomes.innerHTML = totalIncomes;
    expenses.innerHTML = totalExpenses;
    total.innerHTML = totalItems;
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItensBD = () =>
    localStorage.setItem("db_items", JSON.stringify(items));

loadItens();
