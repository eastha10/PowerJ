let currentYear, currentMonth;
const today = new Date();
const calendarBody = document.getElementById("calendar-body");
const title = document.getElementById("month-title");
const scheduleInput = document.getElementById("schedule-input");
const selectedDateTitle = document.getElementById("selected-date-title");

let selectedCell = null;
let selectedDateKey = null;
const scheduleMap = {};

function renderCalendar(year, month, selectedDay = null) {
  currentYear = year;
  currentMonth = month;
  title.textContent = `${year}년 ${month + 1}월`;
  calendarBody.innerHTML = "";
  selectedDateTitle.textContent = '';
  scheduleInput.value = '';
  selectedDateKey = null;
  if (selectedCell) {
    selectedCell.classList.remove('selected');
    selectedCell = null;
  }

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let date = 1;

  let currentDay = 0; // 셀 수 세기

  while (date <= lastDate) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement("td");

      if (currentDay < firstDay && date === 1) {
        // 첫 주 빈 칸 채우기
        row.appendChild(cell);
        currentDay++;
      } else if (date > lastDate) {
        row.appendChild(cell); // 마지막 주 빈 칸
      } else {
        const key = `${year}-${month + 1}-${date}`;

        const innerBox = document.createElement("div");
        innerBox.className = "date-box";
        innerBox.textContent = date;
        cell.appendChild(innerBox);

        const isToday =
          year === today.getFullYear() &&
          month === today.getMonth() &&
          date === today.getDate();

        if (isToday) cell.classList.add("today");

        if (scheduleMap[key]) {
          cell.style.backgroundColor = "#f0f0f0";
        }

        const thisDate = date;

        cell.onclick = () => {
          if (selectedCell) selectedCell.classList.remove("selected");
          cell.classList.add("selected");
          selectedCell = cell;

          const key = `${year}-${month + 1}-${thisDate}`;
          const selectedDateObj = new Date(year, month, thisDate);
          const days = ["일", "월", "화", "수", "목", "금", "토"];
          const weekday = days[selectedDateObj.getDay()];

          selectedDateTitle.textContent = `${year}년 ${month + 1}월 ${thisDate}일 (${weekday})`;
          scheduleInput.value = scheduleMap[key] || '';
          selectedDateKey = key;
        };
        row.appendChild(cell);
        date++;
      }
    }

  calendarBody.appendChild(row);
  }

}

document.getElementById("prev").onclick = () => {
  const prev = new Date(currentYear, currentMonth - 1);
  renderCalendar(prev.getFullYear(), prev.getMonth());
};

document.getElementById("next").onclick = () => {
  const next = new Date(currentYear, currentMonth + 1);
  renderCalendar(next.getFullYear(), next.getMonth());
};

document.getElementById("save-button").onclick = () => {
  if (!selectedDateKey) {
    alert("날짜를 먼저 선택해주세요.");
    return;
  }
  scheduleMap[selectedDateKey] = scheduleInput.value;
  alert("일정이 저장되었습니다.");
};

window.onload = () => {
  renderCalendar(today.getFullYear(), today.getMonth(), today.getDate());
};
