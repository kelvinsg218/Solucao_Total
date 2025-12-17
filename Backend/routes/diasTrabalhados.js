const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * LISTAR DIAS TRABALHADOS POR COLABORADOR (SEMANA)
 * GET /dias-trabalhados/:colaborador_id?inicio=YYYY-MM-DD&fim=YYYY-MM-DD
 */
router.get("/:colaborador_id", (req, res) => {
    const { colaborador_id } = req.params;
    const { inicio, fim } = req.query;

    if (!inicio || !fim) {
        return res.status(400).json({
            erro: "Informe a data de início e fim (inicio=YYYY-MM-DD&fim=YYYY-MM-DD)"
        });
    }

    const sql = `
        SELECT 
            p.data,
            p.presente,
            c.nome,
            c.valor_diaria
        FROM presencas p
        JOIN colaboradores c ON c.id = p.colaborador_id
        WHERE 
            p.colaborador_id = ?
            AND p.presente = 1
            AND p.data BETWEEN ? AND ?
        ORDER BY p.data ASC
    `;

    db.all(sql, [colaborador_id, inicio, fim], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }

        res.json({
            colaborador_id,
            periodo: { inicio, fim },
            total_dias_trabalhados: rows.length,
            dias: rows
        });
    });
});

module.exports = router;
