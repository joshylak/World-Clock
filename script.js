// script.js
// Import the UTC offsets from utc.js
// Ensure this script is loaded after utc.js in index.html

function createClockElement(id) {
    const clockContainer = document.createElement('div');
    clockContainer.classList.add('clock-container');

    const clock = document.createElement('div');
    clock.classList.add('clock');
    clock.id = id;

    const hourHand = document.createElement('div');
    hourHand.classList.add('hand', 'hour-hand');
    clock.appendChild(hourHand);

    const minuteHand = document.createElement('div');
    minuteHand.classList.add('hand', 'minute-hand');
    clock.appendChild(minuteHand);

    const secondHand = document.createElement('div');
    secondHand.classList.add('hand', 'second-hand');
    clock.appendChild(secondHand);

    const digitalClock = document.createElement('div');
    digitalClock.classList.add('digital-clock');
    digitalClock.id = `${id}-digital`;

    const countryName = document.createElement('div');
    countryName.classList.add('country-name');
    countryName.textContent = id.replace(/_/g, ' ').toUpperCase();

    clockContainer.appendChild(clock);
    clockContainer.appendChild(digitalClock);
    clockContainer.appendChild(countryName);

    return clockContainer;
}

function updateClock(id, offset) {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const localTime = new Date(utc + offset * 3600000);

    const hours = localTime.getHours();
    const minutes = localTime.getMinutes();
    const seconds = localTime.getSeconds();

    const hourDeg = (hours % 12) * 30 + minutes * 0.5;
    const minuteDeg = minutes * 6;
    const secondDeg = seconds * 6;

    const clock = document.getElementById(id);
    if (clock) {
        clock.querySelector('.hour-hand').style.transform = `rotate(${hourDeg}deg)`;
        clock.querySelector('.minute-hand').style.transform = `rotate(${minuteDeg}deg)`;
        clock.querySelector('.second-hand').style.transform = `rotate(${secondDeg}deg)`;
    }

    const digitalClock = document.getElementById(`${id}-digital`);
    if (digitalClock) {
        digitalClock.textContent = `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function initializeClocks() {
    Object.keys(countryUTCOffsets).forEach((id) => {
        const clockContainer = createClockElement(id);
        document.getElementById('clocks').appendChild(clockContainer);
        setInterval(() => updateClock(id, countryUTCOffsets[id]), 1000);
    });
}

document.getElementById('add-clock').addEventListener('click', () => {
    const searchBar = document.getElementById('search-bar');
    const country = searchBar.value.trim().toLowerCase().replace(/\s+/g, '_');
    if (country && countryUTCOffsets[country] !== undefined) {
        if (!document.getElementById(country)) {
            const clockContainer = createClockElement(country);
            document.getElementById('dynamic-clocks').appendChild(clockContainer);
            setInterval(() => updateClock(country, countryUTCOffsets[country]), 1000);
        } else {
            alert('Clock for this country already exists.');
        }
    } else {
        alert('Country not found in the UTC database.');
    }
});

initializeClocks();

