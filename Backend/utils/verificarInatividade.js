const db = require("../db");

function verificarInatividade() {
    db.run(`
    UPDATE colaboradores
    SET status = 'Inativo'
    WHERE ultima_atividade IS NOT NULL
    AND ultima_atividade < date('now', '-30 days')
  `);
}

module.exports = verificarInatividade;
