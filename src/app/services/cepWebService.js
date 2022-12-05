const cepElement = document.getElementById('cep')

const estadoElement = document.getElementById('estado')
const cidadeElement = document.getElementById('cidade')
const bairroElement = document.getElementById('bairro')
const ruaElement = document.getElementById('rua')

const cleanFormCep = () => {
    estadoElement.value=("")
    cidadeElement.value=("")
    bairroElement.value=("")
    ruaElement.value=("")
}

const myCallback = (content) => {
    if (!("erro" in content)) {
        ruaElement.value=(content.logradouro)
        bairroElement.value=(content.bairro)
        cidadeElement.value=(content.localidade)
        estadoElement.value=(content.uf)
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
            ruaElement.value="..."
            bairroElement.value="..."
            cidadeElement.value="..."
            estadoElement.value="..."
           
            var script = document.createElement('script')

            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=myCallback'

            document.body.appendChild(script)
            
            const formControl = cepElement.parentElement
            formControl.className = 'form-control success'
        }
        else {
            cleanFormCep()
            setErrorForCep('Preencha o campo CEP corretamente\n')
        }
    }
    else {
        cleanFormCep()
        setErrorForCep('Preencha o campo CEP por favor\n')
    }
}

const setErrorForCep = (message) => {
    const formControl = cepElement.parentElement
    const invalidFeedback = formControl.querySelector('small')
    formControl.className = 'form-control error'
    invalidFeedback.innerText = message
}