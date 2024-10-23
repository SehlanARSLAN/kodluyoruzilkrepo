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



const menu = [
    {
        id: 1,
        title: "Sushi",
        category: "Sushi",
        price: 12.99,
        img: "https://images.unsplash.com/photo-1524735783477-2c69b5a0dbf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
        desc: "Fresh sushi rolls with salmon and avocado."
    },
    {
        id: 2,
        title: "Ramen",
        category: "Noodles",
        price: 10.99,
        img: "https://images.unsplash.com/photo-1555563472-b9f7b26e5e95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
        desc: "Delicious ramen with pork and vegetables."
    },
    {
        id: 3,
        title: "Spring Rolls",
        category: "Appetizers",
        price: 6.99,
        img: "https://images.unsplash.com/photo-1604808868231-f9c3c9f6b20e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
        desc: "Crispy spring rolls filled with vegetables."
    },
    {
        id: 4,
        title: "Peking Duck",
        category: "Main Course",
        price: 20.99,
        img: "https://images.unsplash.com/photo-1625129248595-3d9646ac3c44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
        desc: "Traditional Chinese Peking Duck."
    },
    {
        id: 5,
        title: "Bubble Tea",
        category: "Drinks",
        price: 4.99,
        img: "https://images.unsplash.com/photo-1625762202911-6d14e7715033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=400",
        desc: "Sweet bubble tea with tapioca pearls."
    }
];

function displayMenuItems(menuItems) {
    const menuContainer = document.getElementById("menu-container");
    menuContainer.innerHTML = ""; // Mevcut içeriği temizle

    menuItems.forEach(item => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        
        menuItem.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <span>${item.price} $</span>
        `;
        
        menuContainer.appendChild(menuItem);
    });
}

// İlk olarak tüm menüyü göster
displayMenuItems(menu);
function filterMenu(category) {
    const filteredMenu = menu.filter(item => item.category === category);
    displayMenuItems(filteredMenu);
}

// Örnek kullanım
const buttons = document.querySelectorAll(".filter-button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;
        filterMenu(category);
    });
});
const totalPrice = menu.reduce((total, item) => total + item.price, 0);
console.log(`Toplam Fiyat: ${totalPrice} $`);
