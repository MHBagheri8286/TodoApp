// Varaiebles
var isSpan, btnCurrent, elementLICurrent, countAllTask, countCompleteTask, countIncompleteTask, locked, heightUI, heightCurrent;
var list = document.querySelector('ul');
var ul = document.getElementById('myUL');
var btnYes = document.getElementById('btnYes');
var btnNo = document.getElementById('btnNo');
var modal = document.getElementById("myModal");
var divItems = document.getElementsByClassName("button");
var input = document.getElementById("myInput");

//Initialize 
function init() {
    isSpan = false;
    btnCurrent = 'showAll';
    locked = false;
    heightUI = 0;
    heightCurrent = 0;
    countAllTask = '';
    countCompleteTask = '';
    countIncompleteTask = '';
}

// Remove all li from ul when click on clearbutton
function removeUL() {
    if (ul.getElementsByTagName('li').length) {
        addModal();
    }
    isSpan = false;
}

// When clicked on yes button of modal
btnYes.onclick = function() {
    if (!isSpan) {
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        heightUI = 0;
        SetColor();
        removeModal();
        document.getElementById('myUL').style.height = heightUI + 'px';
        countAllTask = '';
        countCompleteTask = '';
        countIncompleteTask = '';
        updateCount();
    } else if (isSpan) {
        let current;
        switch (btnCurrent) {
            case 'Active':
                heightCurrent -= 45;
                heightUI -= 45;
                current = heightCurrent;
                break;
            case 'Complete':
                heightCurrent -= 45;
                heightUI -= 45;
                current = heightCurrent;
                break;
            case 'showAll':
                heightUI -= 45;
                current = heightUI;
                break;
        }
        removeModal();
        if (elementLICurrent.classList.contains('checked')) {
            countCompleteTask--;
        } else {
            countIncompleteTask--;
        }
        elementLICurrent.parentNode.removeChild(elementLICurrent);
        document.getElementById('myUL').style.height = current + 'px';
        isSpan = false;
        countAllTask--;
        updateCount();

    }
}

// When clicked on no button of modal
btnNo.onclick = function() {
    removeModal();
}

// Close when click anywhere outside of modal
window.onclick = function(event) {
    if (event.target == modal) {
        removeModal();
    }
}

// Remove a 'li' or Add a "checked" symbol when clicked on one of list item
list.onclick = function(event) {
    // Remove a "li" 
    if (event.target.tagName === 'SPAN') {
        isSpan = true;
        elementLICurrent = event.target.parentNode;
        addModal();
    }
    // Add a "checked" symbol 
    else if (event.target.tagName === 'LI') {
        if (btnCurrent === 'showAll') {
            event.target.classList.toggle('checked');
            if (event.target.classList.contains('checked')) {
                countCompleteTask++;
                countIncompleteTask--;
            } else {
                countIncompleteTask++;
                countCompleteTask--;
            }
        }
    }
    updateCount();
}

// Hidding Modal
function removeModal() {
    document.getElementById("myModal").style.display = 'none';
}

//Visible Modal
function addModal() {
    document.getElementById("myModal").style.display = 'flex';
}

// Complete List button
function completeList(item) {
    btnCurrent = 'Complete';
    this.clear();
    item.style.backgroundColor = '#06a206';
    heightCurrent = 0;
    let elementsLI = document.getElementsByTagName('li');
    let length = elementsLI.length;
    for (let i = 0; i < length; i++) {
        if (elementsLI[i].className != "checked" && elementsLI[i].className != "borderbottomradious checked")
            elementsLI[i].style.display = "none";
        else {
            elementsLI[i].style.display = "block";
            heightCurrent += 45;
        }
    }
    checkingHeight(heightCurrent);
    document.getElementById('myUL').style.height = heightCurrent + 'px';
}

// Active List button
function activeList(item) {
    btnCurrent = 'Active';
    this.clear();
    item.style.backgroundColor = '#ff0058';
    heightCurrent = 0;
    let elementsLI = document.getElementsByTagName('li');
    let length = elementsLI.length;
    for (let i = 0; i < length; i++) {
        if (elementsLI[i].className == "checked" || elementsLI[i].classList == "borderbottomradious checked")
            elementsLI[i].style.display = "none";
        else {
            elementsLI[i].style.display = "block";
            heightCurrent += 45;
        }
    }
    checkingHeight(heightCurrent);
    document.getElementById('myUL').style.height = heightCurrent + 'px';
}

// ShowAll Task button
function allList(item) {
    btnCurrent = 'showAll';
    SetColor();
    let elementsLI = document.getElementsByTagName('li');
    let length = elementsLI.length;
    for (let j = 0; j < length; j++) {
        if (elementsLI[j].style.display == "none")
            elementsLI[j].style.display = "block";
    }
    checkingHeight(heightUI);
    document.getElementById('myUL').style.height = heightUI + 'px';
}

// Highlight other button when focused
function clear() {
    for (let i = 0; i < divItems.length; i++) {
        let item = divItems[i];
        item.style.backgroundColor = 'rgb(146, 146, 146)';
    }
}

// Set Color buttons to default
function SetColor() {
    divItems[0].style.backgroundColor = '#3d92fd';
    divItems[1].style.backgroundColor = '#ff0058';
    divItems[2].style.backgroundColor = '#1fb387';
}


// Increas Height to customize list
function addHeight() {
    let current;
    switch (btnCurrent) {
        case 'Active':
            heightCurrentActive += 45;
            heightUI += 45;
            current = heightCurrentActive;
            break;
        case 'Complete':
            heightCurrentComplete += 45;
            heightUI += 45;
            current = heightCurrentComplete;
            break;
        case 'showAll':
            heightUI += 45;
            current = heightUI;
            break;
    }
    return current;
}

// Add new item when Keyup Enter 
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13)
        newElement();
});

// Add a new item when clicking on insert button
function newElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    inputValue = inputValue.trim();
    li.innerHTML = inputValue;
    let span = document.createElement("SPAN");
    span.className = "close";
    span.innerHTML = '\u00D7';
    li.appendChild(span);
    let repeat = 0;
    let elementsLI = [];
    elementsLI = document.getElementsByTagName('li');
    let length = document.getElementsByTagName('li').length;
    for (let i = 0; i < length; i++) {
        if (elementsLI[i].textContent == li.textContent)
            repeat = 1;
    }
    if (inputValue === '') {
        if (!locked) {
            locked = true;
            document.getElementById("snackbarTitle").innerHTML = " Item name can not be empty";
            myFunction();
        }
    } else if (repeat == 1) {
        if (!locked) {
            locked = true;
            document.getElementById("snackbarTitle").innerHTML = " Item already exsits";
            myFunction();
        }
    } else {
        let lastChildLI = document.getElementById("myUL").appendChild(li);
        lastChildLI.style.display = "block";
        let current = addHeight();
        checkingHeight(current);
        document.getElementById('myUL').style.height = current + 'px';
        document.getElementById("myInput").value = null;
        countAllTask++;
        countIncompleteTask++;
        if (!countCompleteTask)
            countCompleteTask = '0';
        updateCount();
    }
}

// show snackbar by 2s duration  
function myFunction() {
    let x = document.getElementById("snackbar");
    x.classList.add('show');
    setTimeout(function() {
        x.classList.remove('show');
        locked = false;
    }, 1900);
}

// Update counts of Items
function updateCount() {
    document.getElementById('countAll').innerHTML = countAllTask;
    document.getElementById('countActive').innerHTML = countIncompleteTask;
    document.getElementById('countComplete').innerHTML = countCompleteTask;
}

// Checking Height of lists
function checkingHeight(val) {
    if (val > 450)
        document.getElementById('myUL').style.overflowY = 'auto';
    else
        document.getElementById('myUL').style.overflowY = 'hidden';
}
init();