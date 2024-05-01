// calendar.js
const calendarContainer = document.getElementById("calendar-container");
const tradingData = [
  { date: "2024-04-01", amount: -50 },
  { date: "2024-04-02", amount: 275 },
  { date: "2024-04-03", amount: 75 },
  // ... add more trading data here
];

function createCalendar() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("day-cell");

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("date");
    dateSpan.textContent = `${month + 1}/${day}`;

    const amountSpan = document.createElement("span");
    amountSpan.classList.add("amount");

    const tradeData = tradingData.find((data) => {
      const dateObj = new Date(data.date);
      return (
        dateObj.getFullYear() === year &&
        dateObj.getMonth() === month &&
        dateObj.getDate() === day
      );
    });

    if (tradeData) {
      amountSpan.textContent = tradeData.amount;
      if (tradeData.amount > 0) {
        dayCell.classList.add("positive");
      } else {
        dayCell.classList.add("negative");
      }
    }

    dayCell.appendChild(dateSpan);
    dayCell.appendChild(amountSpan);
    calendarContainer.appendChild(dayCell);
  }
}

createCalendar();
