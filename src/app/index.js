
//Modal Section
var modal = document.getElementById("myModal")
var modalSpan = document.getElementsByClassName("close")[0]

modalSpan.onclick = function () {
    modal.style.display = "none"
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}

let data = { nome: "", cpf: "", dataNascimento: "", idade: "", cep: "", estado: "", cidade: "", bairro: "", rua: "", numero: "", hobbies: [] }

const form = document.getElementById('form')
const nome = document.getElementById('nome')
const cpf = document.getElementById('cpf')
const dataNascimento = document.getElementById('dataNascimento')
const idade = document.getElementById('idade')
const cep = document.getElementById('cep')
const estado = document.getElementById('estado')
const cidade = document.getElementById('cidade')
const bairro = document.getElementById('bairro')
const rua = document.getElementById('rua')
const numero = document.getElementById('numero')
const hobby = document.getElementsByClassName('hobby')
const plus = document.getElementById('plus')
const minus = document.getElementById('minus')
const aceiteLGPD = document.getElementById('aceiteLGPD')

//add and remove hobbies section
let hobbyClones = []

plus.addEventListener('click', (event) => {
    event.preventDefault()
    const clone = hobby[0].cloneNode(true);
    document.getElementById('form-control-hobby').appendChild(clone)
    hobbyClones.push(clone)
})

minus.addEventListener('click', (event) => {
    event.preventDefault()
    if (hobbyClones.length > 0) hobbyClones.pop().remove()

})

//handle submit section
form.addEventListener('submit', (event) => {
    event.preventDefault()

    let isNomeValid = checkNomeInput()
    let isCpfValid = checkCpfInput()
    let isDataNascimentoValid = checkDataNascimentoInput()
    let isNumeroValid = checkNumeroInput()
    let isCepValid = checkCepInput()
    let isAceiteLGPDValid = checkAceiteLGPDInput()

    let isFormValid = isNomeValid &&
        isCpfValid &&
        isDataNascimentoValid &&
        isNumeroValid &&
        isCepValid && isAceiteLGPDValid

    if (isFormValid) {
        modal.style.display = "block"
        fillData()
    }
})

const fillData = () => {
    data.nome = nome.value
    data.cpf = cpf.value
    data.dataNascimento = dataNascimento.value
    data.idade = idade.value
    data.cep = cep.value
    data.estado = estado.value
    data.cidade = cidade.value
    data.bairro = bairro.value
    data.rua = rua.value
    data.numero = numero.value
    for (let i = 0; i < hobby.length; i++) {
        data.hobbies.push(hobby[i].value)
    }

    const myJSON = JSON.stringify(data);
    const formJson = document.getElementById('form-json')
    formJson.innerText = myJSON
}

//validations section
const checkNomeInput = () => {
    let errorMessage = ''
    if (nome.value.trim() === '') {
        errorMessage += 'Preencha o campo nome por favor\n'
        setErrorFor(nome, errorMessage)
    } else if (nome.value.trim().length < 3) {
        errorMessage += 'O nome precisa ser maior que 2 characteres'
        setErrorFor(nome, errorMessage)
    } else {
        setSuccessFor(nome)
        return true
    }
    return false
}

const checkCpfInput = () => {
    let errorMessage = ''
    if (validarCPF(cpf.value) == false) {
        errorMessage += 'Digite o CPF corretamente'
        setErrorFor(cpf, errorMessage)
    } else {
        setSuccessFor(cpf)
        return true
    }
    return false
}

const checkDataNascimentoInput = () => {
    let errorMessage = ''
    if (dataNascimento.value.trim() === '') {
        errorMessage += 'Preencha o campo data de nascimento por favor\n'
        setErrorFor(dataNascimento, errorMessage)
    } else {
        setSuccessFor(dataNascimento)
        setIdadeValue()
        return true
    }
    return false
}

const checkNumeroInput = () => {
    let errorMessage = ''
    if (numero.value.trim() === '') {
        errorMessage += 'Preencha o campo número por favor\n'
        setErrorFor(numero, errorMessage)
    } else if (numero.value > 10000) {
        errorMessage += 'O número não pode ser maior que 10000'
        setErrorFor(numero, errorMessage)
    } else {
        setSuccessFor(numero)
        return true
    }
    return false
}

const checkCepInput = () => {
    const formControl = cep.parentElement
    return formControl.className == 'form-control success' ? true : false
}

const checkAceiteLGPDInput = () => {
    return aceiteLGPD.checked ? true : false
}

const setErrorFor = (input, message) => {
    const formControl = input.parentElement
    const invalidFeedback = formControl.querySelector('small')
    formControl.className = 'form-control error'
    invalidFeedback.innerText = message
}

const setSuccessFor = (input) => {
    const formControl = input.parentElement
    formControl.className = 'form-control success'
}

//auxiliar functions section
const setIdadeValue = () => {
    let dob = new Date(dataNascimento.value)
    let month_diff = Date.now() - dob.getTime()
    let age_datetime = new Date(month_diff)
    let year = age_datetime.getUTCFullYear()

    idade.value = Math.abs(year - 1970)
}

const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf == '') return false
    // Elimina CPFs invalidos conhecidos	
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false
    // Valida 1o digito	
    add = 0
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i)
    rev = 11 - (add % 11)
    if (rev == 10 || rev == 11)
        rev = 0
    if (rev != parseInt(cpf.charAt(9)))
        return false
    // Valida 2o digito	
    add = 0
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i)
    rev = 11 - (add % 11)
    if (rev == 10 || rev == 11)
        rev = 0
    if (rev != parseInt(cpf.charAt(10)))
        return false
    return true
}


