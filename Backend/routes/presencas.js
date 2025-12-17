const express = require("express");
const router = express.Router();
const db = require("../db");

/**
 * REGISTRAR PRESENÇA
 * POST /presencas
 */
router.post("/", (req, res) => {
    const { colaborador_id, data, presente, comentario } = req.body;

    if (
        colaborador_id === undefined ||
        !data ||
        presente === undefined
    ) {
        return res.status(400).json({
            erro: "colaborador_id, data e presente são obrigatórios"
        });
    }

    // Verifica se já existe presença para o colaborador na data
    const checkSql = `
        SELECT id FROM presencas
        WHERE colaborador_id = ? AND data = ?
    `;

    db.get(checkSql, [colaborador_id, data], (err, row) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }

        if (row) {
            return res.status(409).json({
                erro: "Presença já registrada para este colaborador nesta data"
            });
        }

        const insertSql = `
            INSERT INTO presencas (colaborador_id, data, presente, comentario)
            VALUES (?, ?, ?, ?)
        `;

        db.run(
            insertSql,
            [colaborador_id, data, presente, comentario || null],
            function (err) {
                if (err) {
                    return res.status(500).json({ erro: err.message });
                }

                res.status(201).json({
                    mensagem: "Presença registrada com sucesso",
                    id: this.lastID
                });
            }
        );
    });
});

/**
 * LISTAR PRESENÇAS POR COLABORADOR
 * GET /presencas/:colaborador_id
 */
router.get("/:colaborador_id", (req, res) => {
    const { colaborador_id } = req.params;

    const sql = `
        SELECT p.*, c.nome
        FROM presencas p
        JOIN colaboradores c ON c.id = p.colaborador_id
        WHERE colaborador_id = ?
        ORDER BY data DESC
    `;

    db.all(sql, [colaborador_id], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }

        res.json(rows);
    });
});

/**
 * ATUALIZAR PRESENÇA
 * PUT /presencas/:id
 */
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { presente, comentario } = req.body;

    if (presente === undefined) {
        return res.status(400).json({
            erro: "O campo 'presente' é obrigatório"
        });
    }

    const sql = `
        UPDATE presencas
        SET presente = ?, comentario = ?
        WHERE id = ?
    `;

    db.run(sql, [presente, comentario || null, id], function (err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                erro: "Presença não encontrada"
            });
        }

        res.json({ mensagem: "Presença atualizada com sucesso" });
    });
});

/**
 * DELETAR PRESENÇA
 * DELETE /presencas/:id
 */
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM presencas WHERE id = ?`;

    db.run(sql, [id], function (err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({
                erro: "Presença não encontrada"
            });
        }

        res.json({ mensagem: "Presença removida com sucesso" });
    });
});

module.exports = router;
