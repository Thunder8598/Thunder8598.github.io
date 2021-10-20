class Pessoa {
    setNome = (nome) => {
        if (!Pessoa.requiredCheck(nome))
            throw "Preencha o campo de nome";

        this.nome = nome;
    }
    setCPF = (CPF) => {

        if (!Pessoa.requiredCheck(CPF))
            throw "Preencha o campo de CPF";
        else if (CPF.length < 14 || !Pessoa.validarCPF(CPF))
            throw "CPF inválido";

        this.CPF = CPF;
    }
    setDataNasc = (dataNasc) => {
        if (!Pessoa.requiredCheck(dataNasc))
            throw "Preencha o campo de data de nascimento";
        else if (dataNasc.length < 10)
            throw "Data inválida";

        this.dataNasc = dataNasc;
    };
    setEmail = (email) => {
        if (!Pessoa.requiredCheck(email))
            throw "Preencha o campo de e-mail";
        else if (!email.match(/(\@{1})/gmi) || !email.match(/(\.com{1})/gmi))
            throw "E-Mail inválido";

        this.email = email;
    };
    setFone = (fone) => {
        if (!Pessoa.requiredCheck(fone))
            throw "Preencha o campo de telefone";
        else if (fone.length < 14)
            throw "Telefone inválido";

        this.fone = fone;
    }
    setCEP = (CEP) => {
        if (!Pessoa.requiredCheck(CEP))
            throw "Preencha o campo de CEP";
        else if (CEP.length < 8)
            throw "CEP inválido";

        this.CEP = CEP;
    }

    enviar = async (urlPost) => {
        try {
            const response = await (await fetch(urlPost, { method: "POST" })).json();

            /* 
                Fazer coisas com a resposta
            */
        } catch (error) {
            /* 
                Fazer coisas com o erro
            */
        }
    }

    /* 
        Código encontrado em http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
    */
    static validarCPF = (strCPF) => {
        let Soma = 0;
        let Resto = 0;

        strCPF = strCPF.replace(/\D/g, "");

        if (strCPF.match(/(0{11})|(1{11})|(2{11})|(3{11})|(4{11})|(5{11})|(6{11})|(7{11})|(8{11})|(9{11})/))
            return false;

        for (let i = 1; i <= 9; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))
            Resto = 0;

        if (Resto != parseInt(strCPF.substring(9, 10)))
            return false;

        Soma = 0;

        for (let i = 1; i <= 10; i++)
            Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);

        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11))
            Resto = 0;

        if (Resto != parseInt(strCPF.substring(10, 11)))
            return false;

        return true;
    }

    static requiredCheck = (value) => value.trim().length != 0;
}

export default Pessoa;