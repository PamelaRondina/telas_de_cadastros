//<form id="name-form">
const nameForm = document.querySelector("#name-form")

// <div id="welcome"></div>
const welcomeContainer = document.querySelector("#welcome")

//<button id="logout">Sair</button>
const logoutBtn = document.querySelector("#logout")

//nameForm = formulário | welcome = msg de bem vindo
// block = mostra | none = esconde
//usuário acessou, informar o seu nome
//nome adicionado - esconder o nome da tela
// username aparece
//se else: quando não tem o nome, mostra o formulário e esconde o welcome

function checkUser() {
    const userName = localStorage.getItem("name");

    if (userName) {
        nameForm.style.display = "none";
        welcomeContainer.style.display = "block";

        const userNameElement = document.querySelector("#username");

        userNameElement.textContent = userName;

    } else {
        nameForm.style.display = "block";
        welcomeContainer.style.display = "none";
    }
}

//Submit fazer salvar o nome da LocalStorage
//adicionar evento ao formulário
nameForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.querySelector("#name");

    localStorage.setItem("name", nameInput.value);

    nameInput.value = "";

    checkUser();
});

//Botão de logout
//remover o nome
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("name");

    checkUser();
});


//Começo da aplicação - appication start
checkUser();



