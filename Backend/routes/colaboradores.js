const express = require("express");
const router = express.Router();
const db = require("../db");

// ===============================
// LISTAR TODOS
// ===============================
router.get("/", (req, res) => {
    db.all("SELECT * FROM colaboradores", [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

// ===============================
// CADASTRAR
// ===============================
router.post("/", (req, res) => {
    const c = req.body;

    db.run(`
        INSERT INTO colaboradores
        (nome, email, cpf, telefone, cidade, estado, armazem, setor, contratacao, carga, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Ativo')
    `, [
        c.nome, c.email, c.cpf, c.telefone,
        c.cidade, c.estado, c.armazem,
        c.setor, c.contratacao, c.carga
    ], function (err) {
        if (err) return res.status(500).json(err);
        res.json({ id: this.lastID });
    });
});

// ===============================
// LISTAR POR DATA (PRESENÇA)
// ===============================
router.get("/por-data", (req, res) => {
    const data = req.query.data;
    if (!data) return res.status(400).json({ erro: "Data não informada" });

    const diaSemana = new Date(data).getDay();
    const fimDeSemana = diaSemana === 0 || diaSemana === 6;

    let sql = `
        SELECT * FROM colaboradores
        WHERE status='Ativo'
        AND contratacao='Diarista'
    `;

    if (fimDeSemana) {
        sql = `
            SELECT * FROM colaboradores
            WHERE status='Ativo'
            AND (contratacao='Diarista' OR contratacao='Funcionario')
        `;
    }

    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

// ===============================
// ATUALIZAR
// ===============================
router.put("/:id", (req, res) => {
    const c = req.body;

    db.run(`
        UPDATE colaboradores SET
        nome=?, email=?, telefone=?, cidade=?, estado=?,
        armazem=?, setor=?, contratacao=?, carga=?
        WHERE id=?
    `, [
        c.nome, c.email, c.telefone, c.cidade,
        c.estado, c.armazem, c.setor,
        c.contratacao, c.carga, req.params.id
    ], err => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// ===============================
// EXCLUIR
// ===============================
router.delete("/:id", (req, res) => {
    db.run("DELETE FROM colaboradores WHERE id=?", [req.params.id], err => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

module.exports = router;
