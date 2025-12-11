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
