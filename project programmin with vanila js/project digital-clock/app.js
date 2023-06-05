// Refactored code:

const selectElement = (selector) => document.querySelector(selector);

// Selectors
const hourEl = selectElement(".hours");
const minuteEl = selectElement(".minutes");
const secondEl = selectElement(".seconds");
const amPmEl = selectElement(".am-pm");

// Function to update clock
const updateClock = () => {
  const currentDate = new Date();
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  let second = currentDate.getSeconds();
  let amPm = "AM";

  if (hour > 12) {
    hour -= 12;
    amPm = "PM";
  }
  
  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  // Usage in the code:
  hour = formatTime(hour);
  minute = formatTime(minute);
  second = formatTime(second);

  hourEl.innerText = hour;
  minuteEl.innerText = minute;
  secondEl.innerText = second;
  amPmEl.innerText = amPm;
};

// Initial call to update clock
updateClock();

// Update clock every second
setInterval(updateClock, 1000);
