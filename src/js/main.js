import Mask from "./modules/helpers/Mask.js";
import Pessoa from "./modules/Pessoa.js";

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const mask = new Mask();

inputs?.forEach((input) => {
    input.addEventListener("input", (evt) => {
        if (input.dataset?.js && mask[input.dataset.js])
            evt.target.value = mask[input.dataset.js](evt.target.value);
    });
});

form?.addEventListener("submit", (evt) => {
    evt.preventDefault();

    document.querySelectorAll(".alert.alert-danger")?.forEach((alerta) => alerta.remove());

    let erros = [];
    const pessoa = new Pessoa();

    inputs?.forEach((input) => {
        try {
            switch (input.id) {
                case "nome":
                    pessoa.setNome(input.value);
                    break;
                case "cpf":
                    pessoa.setCPF(input.value);
                    break;
                case "dt_nasc":
                    pessoa.setDataNasc(input.value);
                    break;
                case "email":
                    pessoa.setEmail(input.value);
                    break;
                case "fone":
                    pessoa.setFone(input.value);
                    break;
                case "cep":
                    pessoa.setCEP(input.value);
                    break;
            }
        } catch (error) {
            erros.push({
                campo: input.id,
                erro: error
            });
        }
    });

    if (erros.length) {
        erros.forEach(({ campo, erro }) => {
            const avisoErro = document.createElement("p");

            avisoErro.textContent = erro;
            avisoErro.className = "alert alert-danger";

            avisoErro.style.color = "red";
            avisoErro.style.fontSize = "12px";

            const input = document.getElementById(campo);
            input.parentNode.insertBefore(avisoErro, input.nextSibling);
        });

        return;
    }

    pessoa.enviar("");
});