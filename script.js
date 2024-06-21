document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    const turnNumberEl = document.getElementById('turn-number');
    const lastTurnsListEl = document.getElementById('last-turns-list');
    const turnsServedNumberEl = document.getElementById('turns-served-number');
    const nextTurnButton = document.getElementById('next-turn-button');
  
    socket.on('update', (data) => {
      turnNumberEl.textContent = data.currentTurn;
      turnsServedNumberEl.textContent = data.turnsServedToday;
      lastTurnsListEl.innerHTML = data.lastTurns.map(turn => `<li>Turno ${turn}</li>`).join('');
    });
  
    nextTurnButton.addEventListener('click', () => {
      socket.emit('nextTurn');
    });
  });
  