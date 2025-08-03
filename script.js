function adicionarTarefa(){
    let valorDoInput = document.querySelector("input").value

    let li = document.createElement("li")
    li.innerHTML = valorDoInput + '<span onclick="excluirTarefa(this)">❌</span>'

    document.querySelector("ul").appendChild(li)

    document.querySelector("input").value = ""
}

function excluirTarefa(li){
    li.parentElement.remove()
}