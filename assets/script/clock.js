const clockElement = document.getElementById('clock');

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}`;

    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();
    const timeToNextMinute = ((60 - seconds) * 1000) - milliseconds;
    
    setTimeout(updateClock, timeToNextMinute);
}
updateClock();