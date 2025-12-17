const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// =========================
// CAMINHO DO BANCO
// =========================
// Arquivo físico do banco (NÃO é .js)
const dbPath = path.join(__dirname, "database.sqlite");

// =========================
// CONEXÃO
// =========================
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Erro ao conectar no banco:", err.message);
    } else {
        console.log("✅ Banco conectado com sucesso");
    }
});

// =========================
// CRIAÇÃO DAS TABELAS
// =========================
db.serialize(() => {

    // =========================
    // COLABORADORES
    // =========================
    db.run(`
        CREATE TABLE IF NOT EXISTS colaboradores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            tipo TEXT NOT NULL, -- diarista | funcionario
            valor_diaria REAL NOT NULL,
            ativo INTEGER DEFAULT 1
        )
    `);

    // =========================
    // PRESENÇAS
    // =========================
    db.run(`
        CREATE TABLE IF NOT EXISTS presencas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            colaborador_id INTEGER NOT NULL,
            data TEXT NOT NULL,
            presente INTEGER NOT NULL, -- 1 = presente | 0 = faltou
            comentario TEXT,
            FOREIGN KEY (colaborador_id) REFERENCES colaboradores(id)
        )
    `);

    // =========================
    // PAGAMENTOS (HISTÓRICO)
    // =========================
    db.run(`
        CREATE TABLE IF NOT EXISTS pagamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            colaborador_id INTEGER NOT NULL,
            periodo_inicio TEXT NOT NULL,
            periodo_fim TEXT NOT NULL,
            total_dias INTEGER NOT NULL,
            valor_diaria REAL NOT NULL,
            total_pago REAL NOT NULL,
            criado_em TEXT DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (colaborador_id) REFERENCES colaboradores(id)
        )
    `);

});

module.exports = db;
