const express = require("express");
const cors = require("cors");

// ROTAS
const colaboradores = require("./routes/colaboradores");
const presencas = require("./routes/presencas");
const diasTrabalhados = require("./routes/diasTrabalhados");
const pagamentos = require("./routes/pagamento");

// UTILS
const verificarInatividade = require("./utils/verificarInatividade");

// =========================
// APP
// =========================
const app = express();
app.use(cors());
app.use(express.json());

// =========================
// ROTAS
// =========================
app.use("/colaboradores", colaboradores);
app.use("/presencas", presencas);
app.use("/dias", diasTrabalhados);
app.use("/pagamentos", pagamentos);

// =========================
// VERIFICAÇÃO AUTOMÁTICA
// =========================
verificarInatividade();

// =========================
// START SERVER
// =========================
app.listen(3000, () => {
    console.log("🚀 Backend rodando em http://localhost:3000");
});
