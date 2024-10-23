// DOM elementlerini seçiyoruz
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Local Storage'dan görevleri al
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Görevi DOM'a ekleyen fonksiyon
function addTaskToDOM(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task;
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    const doneButton = document.createElement('button');
    doneButton.textContent = 'Yapıldı';
    doneButton.className = 'btn btn-success btn-sm';
    doneButton.onclick = function() {
        listItem.classList.toggle('list-group-item-success');
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Sil';
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.onclick = function() {
        taskList.removeChild(listItem);
        showToast('Görev silindi!');
        saveTasks();
    };

    listItem.appendChild(doneButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

// Görev ekleme fonksiyonu
function addTask() {
    const task = taskInput.value.trim();
    if (task === '') {
        showToast('Lütfen boş görev eklemeyin!');
        return;
    }
    addTaskToDOM(task);
    taskInput.value = '';
    showToast('Görev eklendi!');
    saveTasks();
}

// Görevleri Local Storage'a kaydet
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.list-group-item').forEach(item => {
        tasks.push(item.firstChild.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Toast bildirimini göster
function showToast(message) {
    toastMessage.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Event listener ekle
addTaskButton.addEventListener('click', addTask);
loadTasks();
