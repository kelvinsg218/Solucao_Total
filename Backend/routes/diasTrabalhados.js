const express = require("express");
const router = express.Router();
const db = require("../db");
const calcularPagamento = require("../utils/calcularPagamento");

// ===============================
// REGISTRAR DIA TRABALHADO
// ===============================
router.post("/", (req, res) => {
    const { colaborador_id, data, armazem } = req.body;

    db.get(
        "SELECT * FROM colaboradores WHERE id=?",
        [colaborador_id],
        (err, colaborador) => {
            if (err || !colaborador)
                return res.status(404).json({ error: "Colaborador não encontrado" });

            const dia = new Date(data).getDay();
            const tipo_dia = (dia === 0 || dia === 6) ? "fds" : "semana";
            const valor = calcularPagamento(colaborador, data);

            db.run(`
        INSERT INTO dias_trabalhados
        (colaborador_id, data, tipo_dia, valor, armazem)
        VALUES (?, ?, ?, ?, ?)
      `, [colaborador_id, data, tipo_dia, valor, armazem]);

            // atualiza última atividade
            db.run(`
        UPDATE colaboradores
        SET ultima_atividade = ?
        WHERE id = ?
      `, [data, colaborador_id]);

            res.json({ sucesso: true, valor });
        }
    );
});

module.exports = router;
