class Form {
    setCEP = (CEP) => {
        if (!Form.requiredCheck(CEP))
            throw "Preencha o campo de CEP";
        else if (CEP.length < 8)
            throw "CEP inválido";

        this.CEP = CEP.replace("-", "");
    }

    enviar = async () => {
        try {
            const endereco = await (await fetch(`https://viacep.com.br/ws/${this.CEP}/json`)).json();
            const dataCovid = await (await fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${endereco.uf}`)).json();

            if (dataCovid.error)
                throw "Estado não encontrado";

            document.getElementById("resultado").innerHTML = `
                <h3>Resultado</h3>
                <div>Casos: ${dataCovid.cases}</div>
                <div>Mortes: ${dataCovid.deaths}</div>
                <div>Suspeitos: ${dataCovid.suspects}</div>
            `;

            console.log(dataCovid);
        } catch (error) {
            console.error(error);
            document.getElementById("resultado").innerText = error;
        }
    }

    static requiredCheck = (value) => value.trim().length != 0;
}

export default Form;