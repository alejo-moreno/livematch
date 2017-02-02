module.exports = {
    languages: {
        'ES': {
            'game-start': 'Inicia Partido',
            'line-up-announcement': 'Alineaciones confirmadas',
            'free-kick': 'Tiro Libre',
            'foul': 'Falta Cometida',
            'shot': 'Disparo',
            'corner': 'Tiro de esquina',
            'yellow-card': 'Tarjeta Amarilla',
            'period-end': 'Fin del período',
            'period-start': 'Inicio del período',
            'delayed-start': 'Ha comenzado retraso en el juego',
            'delayed-end': 'Ha terminado retraso en el juego',
            'substitution': 'Cambio',
            'yellow-red-card': 'Segunda Tarjeta Amarilla',
            'red-card': 'Tarjeta Roja',
            'goal': '¡Golazo!',
            'game-end': 'Fin del partido',
            'offside': 'Fuera de lugar',
            'penalty-shot-drawn': 'Penalti marcado',
            'penalty-shot-conceded': 'Penalti concedido'
        },
        'EN': {}
    },
    isMobile: function isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && $(window).width() <= 1023) {
            return true;
        } else {
            return false;
        }
    }
}