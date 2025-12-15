
const express = require("express");
const cors = require("cors");

const colaboradores = require("./routes/colaboradores");
const diasTrabalhados = require("./routes/diasTrabalhados");
const pagamentos = require("./routes/pagamento");
const auth = require("./routes/auth"); // <-- ADICIONADO

const verificarInatividade = require("./utils/verificarInatividade");

const app = express();
app.use(cors());
app.use(express.json());

// ROTAS
app.use("/auth", auth);              // <-- ADICIONADO
app.use("/colaboradores", colaboradores);
app.use("/dias", diasTrabalhados);
app.use("/pagamentos", pagamentos);

app.use(express.static(__dirname + "/dashboard"));
app.use(express.static(__dirname + "/lista"));
app.use(express.static(__dirname + "/login"));
app.use(express.static(__dirname + "/pagina-registro"));
app.use(express.static(__dirname + "/presenca"));
app.use(express.static(__dirname));


// roda verificação de inatividade sempre que o servidor sobe
verificarInatividade();

app.listen(3000, () => {
    console.log(" Backend rodando em http://localhost:3000");
});
