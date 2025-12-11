function calcularPagamento(colaborador, data, diaria = 100) {
    const diaSemana = new Date(data).getDay(); // 0 = domingo | 6 = sábado
    const fimDeSemana = diaSemana === 0 || diaSemana === 6;

    // Diarista recebe sempre
    if (colaborador.contratacao === "Diarista") {
        return diaria;
    }

    // Funcionário só recebe no fim de semana
    if (colaborador.contratacao === "Funcionário" && fimDeSemana) {
        return diaria;
    }

    return 0;
}

module.exports = calcularPagamento;
