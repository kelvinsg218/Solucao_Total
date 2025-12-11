const express = require("express");
const router = express.Router();
const db = require("../db");

// ===============================
// FECHAMENTO
// ===============================
router.get("/:id/:inicio/:fim", (req, res) => {
    const { id, inicio, fim } = req.params;

    db.get(`
    SELECT COUNT(*) as dias, SUM(valor) as total
    FROM dias_trabalhados
    WHERE colaborador_id = ?
    AND data BETWEEN ? AND ?
  `, [id, inicio, fim], (err, row) => {
        if (err) return res.status(500).json(err);
        res.json(row);
    });
});

module.exports = router;
