const db = require("../db");

// Quantidade de dias sem presença para inativar
const LIMITE_DIAS = 30;

function verificarInatividade() {

    console.log("🔍 Verificando diaristas inativos...");

    // Busca todos os diaristas ATIVOS
    db.all(`
        SELECT id, nome
        FROM colaboradores
        WHERE tipo = 'diarista'
        AND ativo = 1
    `, [], (err, diaristas) => {

        if (err) {
            console.error("Erro ao buscar diaristas:", err);
            return;
        }

        diaristas.forEach(diarista => {

            // Busca a ÚLTIMA presença desse diarista
            db.get(`
                SELECT data
                FROM presencas
                WHERE colaborador_id = ?
                AND presente = 1
                ORDER BY data DESC
                LIMIT 1
            `, [diarista.id], (err, row) => {

                if (err) {
                    console.error("Erro ao buscar presença:", err);
                    return;
                }

                // Se nunca teve presença → já pode ser inativado
                if (!row) {
                    inativar(diarista.id, diarista.nome, "Nunca teve presença");
                    return;
                }

                const ultimaPresenca = new Date(row.data);
                const hoje = new Date();

                const diffMs = hoje - ultimaPresenca;
                const diffDias = diffMs / (1000 * 60 * 60 * 24);

                if (diffDias >= LIMITE_DIAS) {
                    inativar(diarista.id, diarista.nome, `${Math.floor(diffDias)} dias sem presença`);
                }

            });

        });

    });
}

// Função que inativa o colaborador
function inativar(id, nome, motivo) {

    db.run(`
        UPDATE colaboradores
        SET ativo = 0
        WHERE id = ?
    `, [id], err => {
        if (err) {
            console.error(`Erro ao inativar ${nome}:`, err);
        } else {
            console.log(`⛔ Diarista inativado: ${nome} (${motivo})`);
        }
    });

}

module.exports = verificarInatividade;
