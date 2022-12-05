const estado = document.getElementById('estado')
const cidade = document.getElementById('cidade')
const bairro = document.getElementById('bairro')
const rua = document.getElementById('rua')

const cleanFormCep = () => {
    estado.value=("")
    cidade.value=("")
    bairro.value=("")
    rua.value=("")
}

const myCallback = (content) => {
    if (!("erro" in content)) {
        rua.value=(content.logradouro)
        bairro.value=(content.bairro)
        cidade.value=(content.localidade)
        estado.value=(content.uf)
    }
    else {
        cleanFormCep()
        alert("CEP não encontrado.")
    }
}

const searchcep = (value) => {
    var cep = value.replace(/\D/g, '')

    if (cep != "") {
        var validacep = /^[0-9]{8}$/

        if(validacep.test(cep)) {
            rua.value="..."
            bairro.value="..."
            cidade.value="..."
            estado.value="..."
           
            var script = document.createElement('script')

            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=myCallback'

            document.body.appendChild(script)
        }
        else {
            cleanFormCep()
            alert("Formato de CEP inválido.")
        }
    }
    else {
        cleanFormCep()
    }
}