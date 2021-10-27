import Mask from "./modules/helpers/Mask.js";
import Form from "./modules/Form.js";

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
    const formCep = new Form();

    inputs?.forEach((input) => {
        try {
            switch (input.id) {
                case "cep":
                    formCep.setCEP(input.value);
                    break;
            }
        } catch (error) {

            console.error(error);

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

    formCep.enviar();
});