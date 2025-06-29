let day_order = 'europe';

function CalendarControl(day_order = "europe") { // Default to "europe"
    const calendar = new Date();
    const calendarControl = {
        localDate: new Date(),
        prevMonthLastDate: null,
        calMonthName: 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' '),
        daysInMonth: function (month, year) { return new Date(year, month, 0).getDate() },
        firstDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
        },
        lastDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0);
        },
        firstDayNumber: function () {
            return (day_order === "america") ? this.firstDay().getDay() : (this.firstDay().getDay() + 6) % 7; // Adjust for Monday start
        },
        lastDayNumber: function () {
            return (day_order === "america") ? this.lastDay().getDay() : (this.lastDay().getDay() + 6) % 7; // Adjust for Monday start
        },
        getPreviousMonthLastDate: function () {
            let lastDate = new Date(calendar.getFullYear(), calendar.getMonth(), 0).getDate();
            return lastDate;
        },
        navigateToPreviousMonth: function () {
            calendar.setMonth(calendar.getMonth() - 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToNextMonth: function () {
            calendar.setMonth(calendar.getMonth() + 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToCurrentMonth: function () {
            let currentMonth = calendarControl.localDate.getMonth();
            let currentYear = calendarControl.localDate.getFullYear();
            calendar.setMonth(currentMonth);
            calendar.setYear(currentYear);
            calendarControl.attachEventsOnNextPrev();
        },
        displayYear: function () {
            let yearLabel = $(".calendar .calendar-year-label");
            yearLabel.innerHTML = calendar.getFullYear();
        },
        displayMonth: function () {
            let monthLabel = $('.calendar .calendar-month-label');
            monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
        },
        selectDate: function (e) {
            console.log(
                `${e.target.textContent} ${calendarControl.calMonthName[calendar.getMonth()]} ${calendar.getFullYear()}`
            );
        },
        plotSelectors: function () {
            $('.calendar').innerHTML += `
                <div class="controls">
                    <div class="today-date">Today</div>
                    <div class="calendar-year-month">
                        <div class="calendar-month-label"></div>
                        <div class="calendar-year-label"></div>
                    </div>
                    <div class="arrows">
                        <div class="prev"><a href="#lists"><i efy_icon="chevron_left"></i></a></div>
                        <div class="next"><a href="#lists"><i efy_icon="chevron"></i></a></div>
                    </div>
              </div>
            <div class="day_names"></div><div class="days"></div>`;
        },
        plotDates: function () {
            $(".calendar .days").innerHTML = "";
            calendarControl.displayMonth();
            calendarControl.displayYear();
            let count = 1;
            let prevDateCount = 0;

            calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
            let prevMonthDatesArray = [];
            let calendarDays = calendarControl.daysInMonth(
                calendar.getMonth() + 1,
                calendar.getFullYear()
            );

            // dates of current month
            for (let i = 1; i <= calendarDays; i++) {
                if (i < calendarControl.firstDayNumber() + 1) {
                    prevDateCount += 1;
                    $('.calendar .days').innerHTML += `<div class="prev-dates"></div>`;
                    prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
                } else {
                    $('.calendar .days').innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
                }
            }
            // remaining dates after month dates
            for (let j = 0; j < prevDateCount; j++) {
                $('.calendar .days').innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
            }
            calendarControl.highlightToday();
            calendarControl.plotPrevMonthDates(prevMonthDatesArray);
            calendarControl.plotNextMonthDates();
        },
        attachEvents: function () {
            let prevBtn = $(".calendar .prev a");
            let nextBtn = $(".calendar .next a");
            let todayDate = $(".calendar .today-date");
            let dateNumber = $all('.calendar .number-item:not(.prev-dates, next-dates)');
            prevBtn.addEventListener(
                "click",
                calendarControl.navigateToPreviousMonth
            );
            nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
            todayDate.addEventListener(
                "click",
                calendarControl.navigateToCurrentMonth
            );
            for (var i = 0; i < dateNumber.length; i++) {
                $event(dateNumber[i], 'click', (e) => {
                    if ($('.calendar .days .today') !== null) {
                        $('.calendar .days .today').classList.remove('today');
                    }
                    e.target.parentElement.classList.add('today');
                    calendarControl.selectDate(e);
                }, false);
            }
        },
        highlightToday: function () {
            let currentMonth = calendarControl.localDate.getMonth() + 1;
            let changedMonth = calendar.getMonth() + 1;
            let currentYear = calendarControl.localDate.getFullYear();
            let changedYear = calendar.getFullYear();
            if (currentYear === changedYear && currentMonth === changedMonth && $all('.number-item')) {
                $all('.number-item')[calendar.getDate() - 1].classList.add("today");
            }
        },
        plotPrevMonthDates: function (dates) {
            dates.reverse();
            for (let i = 0; i < dates.length; i++) {
                if ($all('.prev-dates')) {
                    $all('.prev-dates')[i].textContent = dates[i];
                }
            }
        },
        plotNextMonthDates: function () {
            let childElemCount = $('.days').childElementCount;
            // 7 lines
            if (childElemCount > 42) {
                let diff = 49 - childElemCount;
                calendarControl.loopThroughNextDays(diff);
            }

            // 6 lines
            if (childElemCount > 35 && childElemCount <= 42) {
                let diff = 42 - childElemCount;
                calendarControl.loopThroughNextDays(diff);
            }
        },
        loopThroughNextDays: function (count) {
            if (count > 0) {
                for (let i = 1; i <= count; i++) {
                    $('.days').innerHTML += `<div class="next-dates">${i}</div>`;
                }
            }
        },
        attachEventsOnNextPrev: function () {
            calendarControl.plotDates();
            calendarControl.attachEvents();
        },
        init: function () {
            calendarControl.plotSelectors();
            calendarControl.plotDates();
            calendarControl.attachEvents();
        }
    };
    calendarControl.init();
}

const calendarControl = new CalendarControl(day_order),
dayNames = (day_order === "america") ? 'Sun Mon Tue Wed Thu Fri Sat'.split(' ') : 'Mon Tue Wed Thu Fri Sat Sun'.split(' ');
dayNames.forEach(day => {
    $add('div', {}, [day], $('.calendar .day_names'));
});