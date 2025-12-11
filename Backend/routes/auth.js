const express = require("express");
const router = express.Router();
const db = require("../db");
const crypto = require("crypto");

// sessões simples em memória
const sessoes = {};

// ===============================
// LOGIN
// ===============================
router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    db.get(
        "SELECT * FROM usuarios WHERE email=? AND senha=?",
        [email, senha],
        (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Erro no servidor." });
            }

            if (!user) {
                return res.status(401).json({ error: "Email ou senha inválidos." });
            }

            // gera token simples
            const token = crypto.randomBytes(24).toString("hex");

            // salva sessão
            sessoes[token] = {
                id: user.id,
                email: user.email,
                nivel: user.nivel,
                nome: user.nome
            };

            return res.json({
                token,
                usuario: {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    nivel: user.nivel
                }
            });
        }
    );
});

// ===============================
// MIDDLEWARE DE AUTENTICAÇÃO
// ===============================
router.use((req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !sessoes[token]) {
        return res.status(401).json({ error: "Não autorizado." });
    }

    req.usuario = sessoes[token];
    next();
});

// ===============================
// LOGOUT
// ===============================
router.post("/logout", (req, res) => {
    const token = req.headers.authorization;

    if (token && sessoes[token]) {
        delete sessoes[token];
    }

    return res.json({ sucesso: true });
});

module.exports = router;
