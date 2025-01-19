// Базы данных
const CARD_SETS = {
    set1: {
        name: "Набор 1",
        items: [
            { name: "Банановая кожура", emoji: "🍌", decompositionTime: "3-4 недели", correct: 1 },
            { name: "Огрызок яблока", emoji: "🍎", decompositionTime: "2 месяца", correct: 2 },
            { name: "Картонная коробка", emoji: "📦", decompositionTime: "3 месяца", correct: 3 },
            { name: "Консервная банка", emoji: "🥫", decompositionTime: "50 лет", correct: 4 },
            { name: "Пластиковая бутылка", emoji: "🧴", decompositionTime: "450 лет", correct: 5 }
        ]
    },
    set2: {
        name: "Набор 2",
        items: [
            { name: "Листья", emoji: "🍂", decompositionTime: "2-4 недели", correct: 1 },
            { name: "Газета", emoji: "📰", decompositionTime: "1-2 месяца", correct: 2 },
            { name: "Кожаный ботинок", emoji: "👞", decompositionTime: "25-40 лет", correct: 3 },
            { name: "Зажигалка", emoji: "🔥", decompositionTime: "100 лет", correct: 4 },
            { name: "Стеклянная бутылка", emoji: "🍾", decompositionTime: "1000+ лет", correct: 5 }
        ]
    },
    set3: {
        name: "Набор 3",
        items: [
            { name: "Кофейная гуща", emoji: "☕", decompositionTime: "2-3 недели", correct: 1 },
            { name: "Бумажный пакет", emoji: "🛍️", decompositionTime: "2 месяца", correct: 2 },
            { name: "Шерстяной носок", emoji: "🧦", decompositionTime: "1-5 лет", correct: 3 },
            { name: "Батарейка", emoji: "🔋", decompositionTime: "100 лет", correct: 4 },
            { name: "CD диск", emoji: "💿", decompositionTime: "1000 лет", correct: 5 }
        ]
    }
    return newArray;
}

function showFeedback(message, type = 'success') {
    const existingFeedback = document.querySelector('.feedback-popup');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    const popup = document.createElement('div');
    popup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ' +
                     'bg-white rounded-xl shadow-lg p-6 z-50 text-center';
    popup.innerHTML = `
        <div class="text-xl font-bold ${type === 'success' ? 'text-green-600' : 'text-red-600'}">
            ${message}
        </div>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 1500);
}

function showScreen(screenId) {
    document.querySelectorAll('.game-container').forEach(container => {
        container.style.display = 'none';
    });
    document.getElementById(screenId).style.display = 'block';
}

function backToMenu() {
    showScreen('menu');
}

function initDecompositionGame() {
    const setButtonsContainer = document.getElementById('set-buttons');
    setButtonsContainer.innerHTML = '';
    
    Object.entries(CARD_SETS).forEach(([key, set]) => {
        const button = document.createElement('button');
        button.className = `set-button ${currentSet === key ? 'bg-green-600 text-white' : 'bg-gray-200'}`;
        button.textContent = set.name;
        button.addEventListener('touchend', () => selectSet(key));
        setButtonsContainer.appendChild(button);
    });

    selectSet(currentSet);
}

function selectSet(setKey) {
    currentSet = setKey;
    currentItems = shuffle([...CARD_SETS[setKey].items]);
    showTimes = false;
    renderItems();

    document.querySelectorAll('#set-buttons button').forEach(button => {
        button.className = `set-button px-4 py-2 rounded-lg ${
            button.textContent === CARD_SETS[setKey].name ? 'bg-green-600 text-white' : 'bg-gray-200'
        }`;
    });
}

function renderItems() {
    const container = document.getElementById('items-container');
    container.innerHTML = '';

    currentItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.dataset.index = index;
        card.innerHTML = `
            <div class="flex items-center p-6">
                <div class="text-4xl mr-4">${item.emoji}</div>
                <div class="flex-grow">
                    <div class="text-xl font-bold">${item.name}</div>
                    ${showTimes ? `
                        <div class="text-green-600 mt-1">${item.decompositionTime}</div>
                    ` : ''}
                </div>
                <div class="text-gray-400 text-2xl">⋮⋮</div>
            </div>
        `;

        setupDragListeners(card);
        container.appendChild(card);
    });
}

function setupDragListeners(card) {
    let startY = 0;
    let initialPosition = 0;
    
    card.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startY = e.touches[0].clientY;
        initialPosition = card.offsetTop;
        card.classList.add('dragging');
    });

    card.addEventListener('touchmove', (e) => {
        if (!card.classList.contains('dragging')) return;
        
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        
        card.style.transform = `translateY(${deltaY}px)`;

        const cards = [...document.querySelectorAll('.item-card:not(.dragging)')];
        const cardBelow = cards.find(otherCard => {
            const box = otherCard.getBoundingClientRect();
            return currentY >= box.top && currentY <= box.bottom;
        });

        if (cardBelow) {
            const draggedIndex = parseInt(card.dataset.index);
            const targetIndex = parseInt(cardBelow.dataset.index);
            
            if (draggedIndex !== targetIndex) {
                const item = currentItems[draggedIndex];
                currentItems.splice(draggedIndex, 1);
                currentItems.splice(targetIndex, 0, item);
                renderItems();
                
                const newCard = document.querySelector(`[data-index="${targetIndex}"]`);
                newCard.classList.add('dragging');
            }
        }
    });

    card.addEventListener('touchend', () => {
        card.classList.remove('dragging');
        card.style.transform = '';
    });

    card.addEventListener('touchcancel', () => {
        card.classList.remove('dragging');
        card.style.transform = '';
    });
}

function checkOrder() {
    const isCorrect = currentItems.every((item, index) => item.correct === index + 1);
    showTimes = true;
    showFeedback(
        isCorrect ? 'Правильно! Вы отлично справились!' : 'Попробуйте еще раз!',
        isCorrect ? 'success' : 'error'
    );
    renderItems();
}

function shuffleItems() {
    currentItems = shuffle([...currentItems]);
    showTimes = false;
    renderItems();
}

function initWasteSortingGame() {
    score = 0;
    combo = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('combo').textContent = `${combo}x`;
    
    const binsContainer = document.getElementById('waste-bins');
    binsContainer.innerHTML = '';

    Object.entries(WASTE_CATEGORIES).forEach(([key, category]) => {
        const bin = document.createElement('div');
        bin.className = `waste-bin ${category.color} text-white text-center p-6 rounded-xl mb-4`;
        bin.innerHTML = `
            <div class="text-4xl mb-2">${category.emoji}</div>
            <div class="text-xl font-bold">${category.name}</div>
        `;
        bin.addEventListener('touchend', () => handleSort(key));
        binsContainer.appendChild(bin);
    });

    generateNewItem();
}

function generateNewItem() {
    const categories = Object.keys(WASTE_CATEGORIES);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryItems = WASTE_CATEGORIES[randomCategory].items;
    const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
    
    currentWasteItem = {
        ...randomItem,
        type: randomCategory
    };

    const itemContainer = document.getElementById('current-item');
    itemContainer.innerHTML = `
        <div class="bg-white p-8 rounded-xl shadow-md inline-block">
            <div class="text-6xl mb-4">${currentWasteItem.emoji}</div>
            <div class="text-xl font-bold">${currentWasteItem.name}</div>
        </div>
    `;
}

function handleSort(binType) {
    if (!currentWasteItem) return;

    if (currentWasteItem.type === binType) {
        const pointsEarned = currentWasteItem.points + Math.floor(combo / 3);
        score += pointsEarned;
        combo++;
        showFeedback(`+${pointsEarned} очков!`, 'success');
    } else {
        combo = 0;
        showFeedback(
            `Неправильно! Это ${WASTE_CATEGORIES[currentWasteItem.type].name.toLowerCase()}`,
            'error'
        );
    }

    document.getElementById('score').textContent = score;
    document.getElementById('combo').textContent = `${combo}x`;

    setTimeout(generateNewItem, 1500);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Запрос полноэкранного режима при первом касании
    document.addEventListener('touchstart', function enableFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        }
        document.removeEventListener('touchstart', enableFullscreen);
    }, { once: true });

    // Инициализация кнопок
    document.getElementById('start-decomposition').addEventListener('touchend', () => {
        showScreen('decomposition');
        initDecompositionGame();
    });

    document.getElementById('start-sorting').addEventListener('touchend', () => {
        showScreen('waste-sorting');
        initWasteSortingGame();
    });

    // Обработчики для кнопок "Назад в меню"
    document.querySelectorAll('.back-to-menu').forEach(button => {
        button.addEventListener('touchend', backToMenu);
    });

    // Предотвращение скролла страницы при перетаскивании
    document.addEventListener('touchmove', (e) => {
        if (document.querySelector('.dragging')) {
            e.preventDefault();
        }
    }, { passive: false });
});;

const WASTE_CATEGORIES = {
    recycling: {
        name: 'Переработка',
        emoji: '♻️',
        color: 'bg-blue-500',
        items: [
            { name: 'Пластиковая бутылка', emoji: '🧴', points: 1 },
            { name: 'Стеклянная банка', emoji: '🫙', points: 1 },
            { name: 'Газета', emoji: '📰', points: 1 },
            { name: 'Картонная коробка', emoji: '📦', points: 1 },
            { name: 'Алюминиевая банка', emoji: '🥤', points: 1 }
        ]
    },
    organic: {
        name: 'Органика',
        emoji: '🍂',
        color: 'bg-green-500',
        items: [
            { name: 'Банановая кожура', emoji: '🍌', points: 1 },
            { name: 'Яблочный огрызок', emoji: '🍎', points: 1 },
            { name: 'Кофейная гуща', emoji: '☕', points: 1 },
            { name: 'Листья', emoji: '🍂', points: 1 },
            { name: 'Скошенная трава', emoji: '🌿', points: 1 }
        ]
    },
    hazardous: {
        name: 'Опасные отходы',
        emoji: '⚠️',
        color: 'bg-red-500',
        items: [
            { name: 'Батарейка', emoji: '🔋', points: 2 },
            { name: 'Лампочка', emoji: '💡', points: 2 },
            { name: 'Краска', emoji: '🎨', points: 2 },
            { name: 'Лекарства', emoji: '💊', points: 2 },
            { name: 'Бытовая химия', emoji: '🧪', points: 2 }
        ]
    }
};

// Глобальные переменные
let currentSet = 'set1';
let currentItems = [];
let showTimes = false;
let score = 0;
let combo = 0;
let currentWasteItem = null;
let draggedElement = null;
let touchStartY = 0;
let initialScrollTop = 0;

// Функции управления экраном
function toggleFullScreen() {
    if (!document.fullscreenElement && 
        !document.mozFullScreenElement && 
        !document.webkitFullscreenElement && 
        !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    }
}

// Вспомогательные функции
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
}    