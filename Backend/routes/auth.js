const express = require("express");
const router = express.Router();
const db = require("../db");


// LOGIN
router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    db.get(
        `SELECT id, nome, email FROM usuarios WHERE email=? AND senha=?`,
        [email, senha],
        (err, user) => {
            if (err) return res.status(500).json(err);
            if (!user) return res.status(401).json({ error: "Login inválido" });

            res.json({ success: true, usuario: user });
        }
    );
});

// CADASTRO INICIAL
router.post("/register", (req, res) => {
    const { nome, email, senha } = req.body;

    db.run(
        `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`,
        [nome, email, senha],
        function (err) {
            if (err) return res.status(500).json(err);
            res.json({ id: this.lastID });
        }
    );
});

module.exports = router;
