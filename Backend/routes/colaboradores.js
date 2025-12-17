const express = require("express");
const router = express.Router();
const db = require("../db");


// LISTAR COLABORADORES
router.get("/", (req, res) => {
    db.all("SELECT * FROM colaboradores", [], (err, rows) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(rows);
    });
});

// CADASTRAR COLABORADOR
router.post("/", (req, res) => {
    const { nome, tipo, valor_diaria } = req.body;

    if (!nome || !tipo || !valor_diaria) {
        return res.status(400).json({ error: "Dados incompletos" });
    }

    db.run(
        "INSERT INTO colaboradores (nome, tipo, valor_diaria) VALUES (?, ?, ?)",
        [nome, tipo, valor_diaria],
        function (err) {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({ id: this.lastID });
        }
    );
});

module.exports = router;
