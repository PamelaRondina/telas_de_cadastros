//declarar variáveis
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')

//declarar variáveis dentro do CRUD
const sNome = document.querySelector('#m-nome')
const sCpf= document.querySelector('#m-cpf')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const sAniversario = document.querySelector('#m-aniversario')
const sTelefone = document.querySelector('#m-telefone')
const btnSalvar = document.querySelector('#btnSalvar')

// declarar variável que armazena os itens dos bancos
let itens

// declarar variável que armazena o index para a ação de edição
let id


//Função: openModal, quando clicar no botão de incluir, não será passado nenhum parâmetro
// ao abrir a modal, será chamada a classe active (no css) para ficar visível em tela
// cada clique fora da modal será removida a classe active

//condição if (edit) em openModal: vai carregar para os itens do modal os itens criados (nome, sobrenome, idade, etc)
// vai atribuir para a variável id o index do funcionário
// caso não seja uma edição, vai carregar com os valores em branco.

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
          modal.classList.remove('active')  
        } 
    }

    if (edit) {
        sNome.value = itens[index].nome
        sCpf.value = itens[index].cpf
        sFuncao.value = itens[index].funcao
        sSalario.value = itens[index].salario
        sAniversario.value = itens[index].aniversario
        sTelefone.value = itens[index].telefone

        id = index
    } else {
        sNome.value = ''
        sCpf.value = ''
        sFuncao.value = ''
        sSalario.value = ''
        sAniversario.value = ''
        sTelefone.value = ''
        
    }

}

//Função: editITem que puxará a função openModal
function editItem(index) {
    openModal(true, index)
}

//Função: deleteItem vai passar o index do item e no array vai ser feito um splice removendo um item.
// Em seguida, com o array atualizado será carregado novamente os dados em tela
function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}


//Função: "insertItem": passar o item e o index do banco
// Dentro da função, criado o elemento tr
// Para informação com dinheiro = <td>R$ ${item.salário}</td>
// Conforme cada item for carregado no insetItem vai para dentro do tbody e será apresentado em tela
function insertItem(item, index) {
    let tr = document.createElement('tr')

    //altera a ordem da tabela 
    tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.cpf}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td>${item.aniversario}</td>
    <td>${item.telefone}</td>  
    <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
   `
    tbody.appendChild(tr)
}


// Botão salvar dentro da modal
// Se os dados vem de uma edição vai atualizar o array com os valores de tela , caso contrário, fará um push, incluindo o novo item no banco.
// ao fechar o modal vai remover a classe active e atualizar o grid
btnSalvar.onclick = e => {
    if (sNome.value == '' || sCpf.value == '' || sFuncao.value == '' || sSalario.value == '' || sAniversario.value == '' || sTelefone.value == '') {
        return
    }
    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value
        itens[id].cpf = sCpf.value
        itens[id].funcao = sFuncao.value
        itens[id].salario = sSalario.value
        itens[id].aniversario = sAniversario.value
        itens[id].telefone = sTelefone.value
    } else {
        itens.push({'nome': sNome.value, 'cpf': sCpf.value, 'funcao': sFuncao.value, 'salario': sSalario.value, 'aniversario': sAniversario.value, 'telefone': sTelefone.value})
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}


//Função: executada assim que a tela é carregada "LoadItens"
// Puxa os dados do banco e realiza um form em cada dado para que seja criada cada linha através do "insertItem"

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
        })
}

// função: pegar os itens do banco através do "getItem" 
// ?? caso não tenha informação, [] um array vazio

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []

//Função: setar os itens para dentro do banco 
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()



