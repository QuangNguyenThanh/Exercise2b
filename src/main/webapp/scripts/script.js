var check = false;
var day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//create Calendar
function createTable() {
    if (check) {
        deleteElement("container", "table-js");
        check = false;
    } else {
        check = true;     
        var container = document.getElementById("container");
        var table = document.createElement("table");
        table.setAttribute("id", "table-js");
        createNav(table);
        createRowDate(table);
        
        var i, j;
        var today = new Date();
        var currentMonth = today.getMonth();
        var currentYear = today.getFullYear();
        var dayOfMonth = daysInMonth(currentMonth, currentYear);
        var firstDay = new Date(currentYear, currentMonth, 1).getDay();
        var count = 1;
        for (i = 0; i < 6; i++) {
            var row = document.createElement("tr");
            for (j = 0; j < 7; j++) {
                var cell = document.createElement("td");
                if (i === 0 && j < firstDay) {
                    cell.setAttribute("class", "not_day-js");                
                    row.appendChild(cell);
                    continue;
                }
                if (count <= dayOfMonth) {
                    cell.setAttribute("class", "day-js");
                    cell.classList.add("choice-js");
                    cell.innerHTML = count;
                    cell.onclick = function() {choiceDay(this.innerHTML)};
                    count++;       
                }
                else {
                    cell.setAttribute("class", "not_day-js");
                }
                row.appendChild(cell);  
            }
            table.appendChild(row);
        }
        container.appendChild(table);
    
        var month = document.getElementById("month-js");
        var year = document.getElementById("year-js");
        var preMonth = document.getElementById("preMonth-js");
        var preYear = document.getElementById("preYear-js");
        var nextMonth = document.getElementById("nextMonth-js");
        var nextYear = document.getElementById("nextYear-js");
        
        updateMonth(month, today);
        updateYear(year, today);
        onChangeSelect(month, year);
        onClickPreYear(preYear, month, year);
        onClickPreMonth(preMonth, month, year);
        onClickNextMonth(nextMonth, month, year);
        onClickNextYear(nextYear, month, year);
    }
}
//Delete element
function deleteElement(parent, child) {
    var parent = document.getElementById(parent);
    var child = document.getElementById(child);
    parent.removeChild(child);
}
//set event click previous year
function onClickPreYear(preYear, month, year) {
    preYear.onclick = function() {
        selectCbo(parseInt(year.options[year.selectedIndex].value) - 1, 
            month.options[month.selectedIndex].value, 
            daysInMonth(month.options[month.selectedIndex].value, 
                parseInt(year.options[year.selectedIndex].value) - 1));
        var newDate = new Date();
        newDate.setFullYear(parseInt(year.options[year.selectedIndex].value) - 1, 
        month.options[month.selectedIndex].value,
            1);
        updateYear(year, newDate);
    }
}
//set event click previous month
function onClickPreMonth(preMonth, month, year) {
    preMonth.onclick = function() {
        selectCbo(year.options[year.selectedIndex].value, 
            parseInt(month.options[month.selectedIndex].value) - 1, 
            daysInMonth(parseInt(month.options[month.selectedIndex].value) - 1, 
                year.options[year.selectedIndex].value));
        var newDate = new Date();
        newDate.setFullYear(year.options[year.selectedIndex].value, 
            parseInt(month.options[month.selectedIndex].value) - 1,
        1);
        updateMonth(month, newDate);
        updateYear(year, newDate);
    }
}
//set event click next month
function onClickNextMonth(nextMonth, month, year) {
    nextMonth.onclick = function() {
        selectCbo(year.options[year.selectedIndex].value, 
            parseInt(month.options[month.selectedIndex].value) + 1, 
            daysInMonth(parseInt(month.options[month.selectedIndex].value) + 1, 
                year.options[year.selectedIndex].value));
        var newDate = new Date();
        newDate.setFullYear(year.options[year.selectedIndex].value, 
            parseInt(month.options[month.selectedIndex].value) + 1,
        1);
        updateMonth(month, newDate);
        updateYear(year, newDate);
    }
}
//set event click next year
function onClickNextYear(nextYear, month, year) {
    nextYear.onclick = function() {
        selectCbo(parseInt(year.options[year.selectedIndex].value) + 1, 
            month.options[month.selectedIndex].value, 
            daysInMonth(month.options[month.selectedIndex].value, 
                parseInt(year.options[year.selectedIndex].value) + 1));
        var newDate = new Date();
        newDate.setFullYear(parseInt(year.options[year.selectedIndex].value) + 1, 
        month.options[month.selectedIndex].value,
        1);
        updateYear(year, newDate);
    }
}
//set event on change combobox
function onChangeSelect(month, year) {
    month.onchange = year.onchange = function() {
        selectCbo(year.options[year.selectedIndex].value, 
            month.options[month.selectedIndex].value, 
            daysInMonth(month.options[month.selectedIndex].value, 
                year.options[year.selectedIndex].value));
    }
}
//Get day choice in calendar and show in text box
function choiceDay(day) {
    if (day == "")
        return;
    var month = document.getElementById("month-js");
    var year = document.getElementById("year-js");
    var m = month.options[month.selectedIndex].value;
    var y = year.options[year.selectedIndex].value;
    document.getElementById("calendar-js").value = day.padStart(2, '0') + "/" + (parseInt(m) + 1 + "").padStart(2, '0') + "/" + y;
    //remove table calendar
    deleteElement("container", "table-js");
    check = false;

    var split = document.getElementById("calendar-js").value.split("/");
    var birthday = new Date(split[2], split[1] - 1, split[0]);
    var now = new Date();
    var offset = now.getTime() - birthday.getTime();
    var totalDays = Math.round(offset / 1000 / 60 / 60 / 24); 
    if (totalDays <= 1) {
        var valid = document.getElementById("valid_birthday");
        valid.innerHTML = "Birthday is bigger than Now";
    } else {
        var valid = document.getElementById("valid_birthday");
        valid.innerHTML = "";
    }
}
//Get days in month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
//Choice in select
function selectCbo(year, month, dayOfMonth) {
    var date = new Date();
    date.setFullYear(year, month, 1);
    var firstDay = date.getDay();
    var i;
    var count = 1;
    var listday = document.getElementById("table").getElementsByTagName("td");
    for (i = 0; i < 42; i++) {
        if (i < firstDay) {
            listday[i].setAttribute("class", "not_day-js");                
            listday[i].innerHTML = "";
            continue;
        }
        if (count <= dayOfMonth) {
            listday[i].setAttribute("class", "day-js");
            listday[i].classList.add("choice-js");
            listday[i].innerHTML = count;
            listday[i].onclick = function() {choiceDay(this.innerHTML)};
            count++;       
        } else {
            listday[i].innerHTML = "";
            listday[i].setAttribute("class", "not_day-js");
        }
    }
}
//Update select item in combobox year
function updateYear(year, date) {
    year.getElementsByTagName("option")[date.getFullYear() - 1900].selected = "selected";
}
//Update select item in combobox month
function updateMonth(month, date) {
    month.getElementsByTagName("option")[date.getMonth()].selected = "selected";
}
//Create Date part in calendar
function createRowDate(table) {
    var rowDate = document.createElement("tr");
    var i;
    for (i = 0; i < 7; i++) {
        var cellDate = document.createElement("th");
        cellDate.setAttribute("class", "date-js");
        cellDate.innerHTML = day[i];
        rowDate.appendChild(cellDate);
    }
    table.appendChild(rowDate);
}
//Create Nav part in calendar
function createNav(table) {
    var rowNav = document.createElement("tr");
    rowNav.setAttribute("class", "nav-js");

    var preYear = document.createElement("th");
    preYear.setAttribute("id", "preYear-js");
    var preMonth = document.createElement("th");
    preMonth.setAttribute("id", "preMonth-js");
    var cboMonth = document.createElement("th");
    cboMonth.setAttribute("colspan", 2);
    var cboYear = document.createElement("th");
    var nextMonth = document.createElement("th");
    nextMonth.setAttribute("id", "nextMonth-js");
    var nextYear = document.createElement("th");
    nextYear.setAttribute("id", "nextYear-js");
    preYear.innerHTML = "<<";
    preMonth.innerHTML = "<";
    nextMonth.innerHTML = ">";
    nextYear.innerHTML = ">>";

    var i;
    var cboM = document.createElement("select");
    cboM.setAttribute("id", "month-js");
    for (i = 0; i < 12; i++) {
        var t = document.createElement("option");
        t.setAttribute("value", i);
        t.innerHTML = month[i];
        cboM.appendChild(t);
    }
    var cboY = document.createElement("select");
    cboY.setAttribute("id", "year-js");
    for (i = 1900; i < 2100; i++) {
        var t = document.createElement("option");
        t.setAttribute("value", i);
        t.innerHTML = i;
        cboY.appendChild(t);
    }

    cboMonth.appendChild(cboM);
    cboYear.appendChild(cboY);
    rowNav.appendChild(preYear);
    rowNav.appendChild(preMonth);
    rowNav.appendChild(cboMonth);
    rowNav.appendChild(cboYear);
    rowNav.appendChild(nextMonth);
    rowNav.appendChild(nextYear);
    table.appendChild(rowNav);
}

function checkUserName() {
    var username = document.getElementById("username");
    var valid = document.getElementById("valid_username");
    username.onblur = function() {
        if (username.value.trim().length == 0) {
            valid.innerHTML = "Username cannot be blank";
        } else if (username.value.trim().length < 8) {
            valid.innerHTML = "Username length min 8 letter";
        } else {
            valid.innerHTML = "";
        }
    }
}

function checkPassword() {
    var password = document.getElementById("password");
    var valid = document.getElementById("valid_password");
    password.onblur = function() {
        if (password.value.trim().length == 0) {
            valid.innerHTML = "Password cannot be blank";
        } else if (password.value.trim().length < 8) {
            valid.innerHTML = "Password length min 8 letter";
        } else {
            valid.innerHTML = "";
        }
    }
}

function checkEmail() {
    var email = document.getElementById("email");
    var valid = document.getElementById("valid_email");
    email.onblur = function() {
        if (email.value.trim().length === 0) {
            valid.innerHTML = "Email cannot be blank";
        } else if (email.value.trim().length < 8) {
            valid.innerHTML = "Email length min 8 letter";
        } else {
            var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            var checkEmail = regex.test(email.value);
            if (!checkEmail) {
                valid.innerHTML = "Wrong email format";
            } else {
                valid.innerText = "";
            }
        }
    }
}

checkUserName();
checkPassword();
checkEmail();