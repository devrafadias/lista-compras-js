let produtos = []
let countProdutos = produtos.length

const buscar = () => {
    produtos = JSON.parse(localStorage.getItem("produtos"))
    if(produtos != null)
        consultarProdutos(produtos)
}

const salvar = () => {
    if(verificaCamposNaoPreenchidos()){
        Swal.fire('Campos obrigatórios não preenchidos!')
        return
    }
    let itemProduto = {
        id: ++countProdutos,
        produto: document.querySelector('#produto').value,
        valor: document.querySelector('#valor').value,
        qtde: document.querySelector('#qtde').value
    }

    if(document.querySelector('#idProduto').value !== ""){
        editar(itemProduto, document.querySelector('#idProduto').value)
    }else{
        cadastrar(itemProduto)
    }
    
}

const cadastrar = (produto) => {
    if(produtos == null) {
        produtos = []
    }
    produtos.push(produto)
    localStorage.setItem("produtos", JSON.stringify(produtos))
    buscar()
    limparCamposCadastro()
    Swal.fire('Produto adicionado com sucesso!')
}

const consultarProdutos = (produtos) => {
    let mostrarLinhaProduto = ''
    if(produtos.length === 0){
        Swal.fire('Produto não encontrado!')
        document.querySelector('#listaProdutos').innerHTML = `<tr><td colspan="5" class="text-center">NENHUM REGISTRO ENCONTRADO</td></tr>`
        return
    }
    produtos.forEach(produto => mostrarLinhaProduto += construirLinha(produto))
    document.querySelector('#listaProdutos').innerHTML = mostrarLinhaProduto
}

const construirLinha = (produto) => {
    return `<tr>
                <td>${produto.id}</td>
                <td>${produto.produto}</td>
                <td>${produto.valor}</td>
                <td>${produto.qtde}</td>
                <td>${produto.valor * produto.qtde}</td>
            </tr>`
}

const filtrar = () => {
    
    if(document.querySelector('#pesquisar').value === ''){
        consultarProdutos(produtos)
        return
    }
    let pesquisa = document.querySelector('#pesquisar').value
    
    let dadoFiltrado = produtos.filter((produto) => {
        let filterProduto = produto.produto.toLowerCase().includes(pesquisa.toLowerCase())
                        || produto.valor.includes(pesquisa)
                        || produto.qtde.includes(pesquisa)
  
        if(document.querySelector('#pesquisar').value !== '') {
            return filterProduto
        }
    })
    consultarProdutos(dadoFiltrado)
}

const limparCamposPesquisa = () => {
    document.querySelector('#pesquisar').value = ""
    document.querySelector('#pesquisar').focus()
}

const verificaCamposNaoPreenchidos = () => {
    return document.querySelector('#produto').value == "" ||
     document.querySelector('#valor').value == "" ||
     document.querySelector('#qtde').value == ""
 }
 
 const limparCamposCadastro = () => {
     document.querySelector('#produto').value = ""
     document.querySelector('#valor').value = ""
     document.querySelector('#qtde').value = ""
     document.querySelector('#idProduto').value = ""
     document.querySelector("#boxCadastro h2").textContent = "Cadastrar produto"
     document.querySelector("#novo").innerHTML = `<i class="fas fa-plus-square"></i> Novo Produto`
     document.querySelector('#produto').focus()
 }

 const limparListaProdutos = () => {
    if(produtos == null || produtos.length == 0) {
        Swal.fire( 'Lista de compras está vazia!')
        return;
    }
    Swal.fire({
        title: 'Deseja limpar a lista de compras?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SIM!',
        cancelButtonText: 'NÃO!',
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("produtos")
            produtos = []
            consultarProdutos(produtos)
            Swal.fire(
                'REMOVIDO!',
                'Lista de compras removida com sucesso!',
                'success'
            )
        }
    })
 }

window.addEventListener("load", buscar)
novo.addEventListener("click", salvar)
pesquisar.addEventListener("keyup", filtrar)
limparLista.addEventListener("click", limparListaProdutos)