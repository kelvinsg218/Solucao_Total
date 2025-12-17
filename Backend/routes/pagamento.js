const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * FECHAR PAGAMENTO DO DIARISTA
 * POST /pagamentos/fechar
 */
router.post("/fechar", (req, res) => {
    const { colaborador_id, inicio, fim } = req.body;

    if (!colaborador_id || !inicio || !fim) {
        return res.status(400).json({ erro: "Dados incompletos" });
    }

    const sql = `
        SELECT 
            COUNT(*) as total_dias,
            c.valor_diaria
        FROM presencas p
        JOIN colaboradores c ON c.id = p.colaborador_id
        WHERE 
            p.colaborador_id = ?
            AND p.presente = 1
            AND p.data BETWEEN ? AND ?
    `;

    db.get(sql, [colaborador_id, inicio, fim], (err, row) => {
        if (err) return res.status(500).json(err);

        if (row.total_dias === 0) {
            return res.status(400).json({ erro: "Nenhum dia trabalhado" });
        }

        const totalPago = row.total_dias * row.valor_diaria;

        db.run(`
            INSERT INTO pagamentos
            (colaborador_id, periodo_inicio, periodo_fim, total_dias, valor_diaria, total_pago)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            colaborador_id,
            inicio,
            fim,
            row.total_dias,
            row.valor_diaria,
            totalPago
        ], function (err) {
            if (err) return res.status(500).json(err);

            res.json({
                pagamento_id: this.lastID,
                colaborador_id,
                periodo: { inicio, fim },
                total_dias: row.total_dias,
                valor_diaria: row.valor_diaria,
                total_pago: totalPago
            });
        });
    });
});

module.exports = router;
