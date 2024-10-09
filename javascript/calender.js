let year = document.getElementById("year-btn");
let month = document.getElementById("month-btn");
let tbody = document.getElementById("tb_body");
let currentDate = new Date();
const monthPopup = document.getElementById("month-popup");

let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();

year.innerText = currentYear;

function calcLeapYear(year) {
  if (year % 400 == 0) {
    return true;
  } else if (year % 100 == 0) {
    return false;
  } else if (year % 4 == 0) {
    return true;
  } else {
    return false;
  }
}

const engMonthName = [
  "JANUARY",
  "FEBRARUY",
  "MARCH",
  "APRIL",
  "MAY",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER",
];

month.innerText = engMonthName[currentMonth];

function getFirstDayOfWeek(year, month) {
  month = month + 1;
  if (month < 10) {
    month = "0" + month;
  }
  return new Date(year + "-" + month + "-01").getDay();
}

function changeYearMonth(year, month) {
  let monthDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month == 2 && calcLeapYear(year)) {
    monthDay[1] = 29;
  }

  let first_day_of_week = getFirstDayOfWeek(year, month);
  let arr_calender = [];

  for (let i = 0; i < first_day_of_week; i++) {
    arr_calender.push("");
  }

  for (let i = 1; i <= monthDay[month - 1]; i++) {
    arr_calender.push(String(i));
  }

  let remain_day = 7 - (arr_calender.length % 7);
  if (remain_day < 7) {
    for (let i = 0; i < remain_day; i++) {
      arr_calender.push("");
    }
  }

  renderCalender(arr_calender);
}

function renderCalender(data) {
  let h = [];
  for (let i = 0; i < data.length; i++) {
    if (i == 0) {
      h.push("<tr>");
    } else if (i % 7 == 0) {
      h.push("</tr>");
      h.push("<tr>");
    }

    h.push("<td>" + data[i] + "</td>");
  }

  h.push("</tr>");

  tbody.innerHTML = h.join("");
}

changeYearMonth(currentYear, currentMonth);

function selectMonth(event) {
  if (monthPopup.style.display === "none") {
    monthPopup.style.display = "block";
  } else {
    monthPopup.style.display = "none";
  }
}

month.addEventListener("click", selectMonth);

const monthButtons = monthPopup.querySelectorAll("button");

monthButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const selectedMonth = parseInt(this.getAttribute("data-month")); 
    currentMonth = selectedMonth; 
    month.innerText = engMonthName[currentMonth]; 
    changeYearMonth(currentYear, currentMonth);
    monthPopup.style.display = "none";
  });
});
