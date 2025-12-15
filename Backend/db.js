const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Caminho onde o banco ficará salvo
const dbPath = path.join(__dirname, "database.db");

// Cria/abre o banco
const db = new sqlite3.Database(dbPath);

// ======================================
// CRIA TODAS AS TABELAS NECESSÁRIAS
// ======================================
db.serialize(() => {

    // -------------------------------
    // COLABORADORES
    // -------------------------------
    db.run(`
        CREATE TABLE IF NOT EXISTS colaboradores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            cpf TEXT UNIQUE,
            telefone TEXT,
            cidade TEXT,
            estado TEXT,
            armazem TEXT,
            setor TEXT,
            contratacao TEXT,
            carga TEXT,
            status TEXT DEFAULT 'Ativo',
            ultima_atividade DATE,
            criado_em DATE DEFAULT CURRENT_DATE
        )
    `);

    // -------------------------------
    // DIAS TRABALHADOS
    // -------------------------------
    db.run(`
        CREATE TABLE IF NOT EXISTS dias_trabalhados (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            colaborador_id INTEGER,
            data DATE,
            tipo_dia TEXT,
            valor REAL,
            armazem TEXT,
            comentario TEXT,
            FOREIGN KEY(colaborador_id) REFERENCES colaboradores(id)
        )
    `);

    // -------------------------------
    // PAGAMENTOS
    // -------------------------------
    db.run(`
        CREATE TABLE IF NOT EXISTS pagamentos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            colaborador_id INTEGER,
            periodo TEXT,
            total_dias INTEGER,
            total_valor REAL,
            data_fechamento DATE,
            FOREIGN KEY(colaborador_id) REFERENCES colaboradores(id)
        )
    `);

    // -------------------------------
    // USUÁRIOS DO SISTEMA (LOGIN)
    // -------------------------------
    db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT UNIQUE,
            senha TEXT,
            nivel TEXT DEFAULT 'admin'
        )
    `);

    // ===========================================
    // CRIA USUÁRIO PADRÃO CASO TABELA ESTEJA VAZIA
    // ===========================================
    db.get("SELECT COUNT(*) AS total FROM usuarios", (err, row) => {
        if (!err && row.total === 0) {

            console.log("🔑 Nenhum usuário encontrado. Criando administrador padrão...");

            db.run(
                `INSERT INTO usuarios (nome, email, senha, nivel)
                 VALUES (?, ?, ?, ?)`,
                ["Administrador", "admin@totalfoods.com", "1234", "admin"],
                (erro) => {
                    if (erro) {
                        console.error("Erro ao criar admin padrão:", erro);
                    } else {
                        console.log("✅ Usuário admin criado: admin@totalfoods.com / 1234");
                    }
                }
            );
        }
    });
});

module.exports = db;
