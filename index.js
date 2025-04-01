document.getElementById('calculate').addEventListener('click', calculateSchedule);

function calculateSchedule() {
    const currentWakeUpTime = document.getElementById('current-wake-up-time').value;
    const desiredWakeUpTime = document.getElementById('desired-wake-up-time').value;

    if (!currentWakeUpTime || !desiredWakeUpTime) {
        alert('Please enter both the current and desired wake-up times.');
        return;
    }

    const sleepDuration = 8 * 60; // 8 hours in minutes
    const days = 7; // Number of days to adjust
    const schedule = [];

    const currentWakeUpMinutes = timeToMinutes(currentWakeUpTime);
    const desiredWakeUpMinutes = timeToMinutes(desiredWakeUpTime);
    const adjustmentPerDay = Math.floor((currentWakeUpMinutes - desiredWakeUpMinutes) / days);

    let adjustedWakeUpMinutes = currentWakeUpMinutes;

    for (let i = 0; i < days; i++) {
        const wakeUpTime = minutesToTime(adjustedWakeUpMinutes);
        const bedTime = minutesToTime(adjustedWakeUpMinutes - sleepDuration);

        schedule.push({ day: `Day ${i + 1}`, wakeUpTime, bedTime });

        adjustedWakeUpMinutes -= adjustmentPerDay;
    }

    displaySchedule(schedule);
}

function displaySchedule(schedule) {
    const tableBody = document.getElementById('schedule-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    schedule.forEach(({ day, wakeUpTime, bedTime }) => {
        const newRow = tableBody.insertRow();
        const dayCell = newRow.insertCell();
        const wakeUpTimeCell = newRow.insertCell();
        const bedTimeCell = newRow.insertCell();

        dayCell.textContent = day;
        wakeUpTimeCell.textContent = wakeUpTime;
        bedTimeCell.textContent = bedTime;
    });
}

function timeToMinutes(timeString) {
    const [timePart, ampmPart] = timeString.split(/\s+/);
    let [hours, minutes] = timePart.split(':').map(Number);
    const isPM = ampmPart && ampmPart.toUpperCase() === 'PM';

    if (isPM && hours !== 12) {
        hours += 12;
    } else if (!isPM && hours === 12) {
        hours = 0;
    }

    return hours * 60 + minutes;
}

function minutesToTime(totalMinutes) {
    totalMinutes = (totalMinutes + 24 * 60) % (24 * 60); // Handle wrap-around
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;
    const isPM = hours >= 12;

    if (hours === 0) {
        hours = 12;
    } else if (hours > 12) {
        hours -= 12;
    }

    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    const ampm = isPM ? 'PM' : 'AM';

    return `${hoursStr}:${minutesStr} ${ampm}`;
}