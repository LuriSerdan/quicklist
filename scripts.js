// Obtendo os elementos do formulário
const form = document.querySelector("form")
const addItem = document.getElementById("addItem")
const itemList = document.querySelector("#itemList")

// Capturando o evento de submit do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    // Obtendo o valor do input
    const value = addItem.value

    if (value !== ""){
        // Salvando no localStorage
        saveItem(value)
        // Criação e exibição do item na interface
        addItemToList(value)
        // Limpar o campo de entrada
        addItem.value = ""
    }
}

// Fução para salvar items no localStoge
function saveItem(item) {
    //Recuperando os items
    const items = JSON.parse(localStorage.getItem("items")) || []

    //Adiciona o novo item ao array
    items.push(item)

    //Salva o array atualizando no LocalStorage
    localStorage.setItem("items", JSON.stringify(items))
}

// Função para adicionar o item a lista
function addItemToList(item){
    try {
        //Criar elemento li
        const li = document.createElement("li")

        //Criar input
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"

        checkbox.onclick = () => {
            selectItem(item)
        }

        //Cria o texto do item
        const textContent = document.createTextNode(`${item}`)

        //Criar botão de deletar
        const button = document.createElement("button")
        const img = document.createElement("img")
        img.src = "./images/icon delete.svg"
        img.alt = "Deletar";
        button.appendChild(img)

        button.onclick = () => {
            deleteItem(item)
        }

        //Adicionar todos os elementos ao li
        li.appendChild(checkbox)
        li.appendChild(textContent)
        li.appendChild(button)

        //Adicionar o li na lista
        itemList.appendChild(li)

    } catch (error) {
        console.log(error)
        alert("Não foi posível adicionar tarefa, tente novamente mais tarde.")
    }
}

// Deletar um elemento
function deleteItem(value) {
    const items = JSON.parse(localStorage.getItem("items"))
    const result = items.filter((item) => item != value)
    const li = document.querySelector("li")

    // Atualizar a lista
    localStorage.setItem("items", JSON.stringify(result))
    
    // Remover do html
    itemList.removeChild(li)
}

// strikethrough
function selectItem(value) {
    const list = document.querySelectorAll('li')
    // const result = list.filter((item) => item == value)
    console.log(list)
}

// Carregar itens existentes no localStorage ao carregar a página
window.onload = () => {
    const storedItems = JSON.parse(localStorage.getItem("items")) || []
    
    storedItems.forEach((item) => {
        addItemToList(item);
    })
}