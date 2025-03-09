const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    const inputValue = inputBox.value.trim();
    if (inputValue === '') {
        alert('You must write something!');
    } else {
        const li = document.createElement('li');
        li.textContent = inputValue;
        const span = document.createElement('span');
        span.textContent = '\u00d7';
        li.appendChild(span);
        listContainer.appendChild(li);
        inputBox.value = '';
        saveData();
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentNode.remove();
        saveData();
    }
}, false);

function saveData() {
    const listItems = Array.from(listContainer.children);
    const data = listItems.map(item => {
        return {
            text: item.textContent.replace('\u00d7', ''),
            checked: item.classList.contains('checked')
        };
    });
    localStorage.setItem("data", JSON.stringify(data));
}

function showTask() {
    const data = localStorage.getItem("data");
    if (data) {
        const listItems = JSON.parse(data);
        listContainer.innerHTML = '';
        listItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.text;
            if (item.checked) {
                li.classList.add('checked');
            }
            const span = document.createElement('span');
            span.textContent = '\u00d7';
            li.appendChild(span);
            listContainer.appendChild(li);
        });
    }
}

showTask();