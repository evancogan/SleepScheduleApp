function addRow() {
    const tableBody = document.getElementById('schedule-table').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();
  
    // Create table cells
    const startTimeCell = newRow.insertCell();
    const endTimeCell = newRow.insertCell();
    const activityCell = newRow.insertCell();
  
    // Create input elements
    const startTimeInput = document.createElement('input');
    startTimeInput.type = 'time';
    startTimeInput.id = `start-time-${newRow.rowIndex}`; // Using template literals for string interpolation
  
    const endTimeInput = document.createElement('input');
    endTimeInput.type = 'time';
    endTimeInput.id = `end-time-${newRow.rowIndex}`; // Using template literals for string interpolation
  
    const activityInput = document.createElement('input');
    activityInput.type = 'text';
    activityInput.placeholder = 'Activity';
  
    // Append input elements to table cells
    startTimeCell.appendChild(startTimeInput);
    endTimeCell.appendChild(endTimeInput);
    activityCell.appendChild(activityInput);
  
    // Add event listeners for input validation
    startTimeInput.addEventListener('change', validateTime);
    endTimeInput.addEventListener('change', validateTime);
  
    // Function to validate time inputs
    function validateTime(event) {
      const input = event.target;
      const inputValue = input.value;
      const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9](\s[AP]M)?$/i; // Modified regex for AM/PM
  
      // Basic validation to check if input is not empty
      if (inputValue === '') {
        alert('Please enter a time.');
        input.focus();
        return;
      }
  
      if (!timeRegex.test(inputValue)) {
        alert('Invalid time format. Please use HH:MM or HH:MM AM/PM format.');
        input.value = ''; // Clear invalid input
        input.focus();
        return;
      }
  
      // Check if both start and end time inputs have values before comparison
      const otherTimeInputId = (input.id.startsWith('start-time-')) ? `end-time-${newRow.rowIndex}` : `start-time-${newRow.rowIndex}`;
      const otherTimeInput = document.getElementById(otherTimeInputId);
      const otherTimeValue = otherTimeInput.value;
  
      /*if (otherTimeValue) {
        // Convert times to minutes for comparison
        const [timeStr, ampm] = inputValue.split(/\s+/);
        const [hours, minutes] = timeStr.split(':');
        let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
        if (ampm && ampm.toUpperCase() === 'PM' && hours !== '12') {
          totalMinutes += 12 * 60;
        }
  
        const [otherTimeStr, otherAmpm] = otherTimeValue.split(/\s+/);
        const [otherHours, otherMinutes] = otherTimeStr.split(':');
        let otherTotalMinutes = parseInt(otherHours) * 60 + parseInt(otherMinutes);
        if (otherAmpm && otherAmpm.toUpperCase() === 'PM' && otherHours !== '12') {
          otherTotalMinutes += 12 * 60;
        }
  
        if (totalMinutes > otherTotalMinutes) {
          alert('Start time cannot be after end time.');
          input.value = ''; // Clear invalid input
          input.focus();
          return;
        }
      }
  
      // Additional validation checks can be added here
    }
*/
  }
}

function shiftTime(timeString, shiftAmount) {
    // Handle potential errors or invalid inputs
    if(!timeString || isNaN(shiftAmount)) {
        return null;
    }
    const [timePart, ampmPart] = timeString.split(/\s+/);
    const [hours, minutes] =timePart.split(':');
    let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);

    // Handle AM/PM
    if (ampmPart && ampmPart.toUpperCase() === 'PM' && hours !== '12') {
        totalMinutes += 12 * 60;
    }
    // Apply the shift
    totalMinutes += shiftAmount;

    // Handle potential time wrap-around (values < 24 hours or less)
    const totalHours = Math.floor(totalMinutes / 60);
    const adjustedMinutes = totalMinutes % 60;

    // Convert back to display format
    let hoursStr = (totalHours % 24).toString().padStart(2, '0');
    let minutesStr = adjustedMinutes.toString().padStart(2, '0');
    let ampm = totalHours >= 12 ? 'PM' : 'AM' ;
    if (hoursStr === '00') {
        hoursStr = '12';
    }
    return `${hoursStr}:${minutesStr} ${ampm}`;
}
const shiftedTime = shiftTime("9:30 AM", 60);
console.log(shiftedTime); // Expected output: 10:30 AM


const addRowButton = document.getElementById('add-row');
addRowButton.addEventListener('click', addRow);
  
julie = 25
julie *=

console.log(julie)