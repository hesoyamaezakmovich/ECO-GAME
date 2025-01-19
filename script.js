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
};

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

// Базовые функции
function showScreen(screenId) {
    console.log('Showing screen:', screenId); // Отладочный вывод
    const screens = document.querySelectorAll('.game-container');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'block';
    }
}

function backToMenu() {
    showScreen('menu');
}

// Функции для игры "Время разложения"
function initDecompositionGame() {
    console.log('Initializing decomposition game'); // Отладочный вывод
    const setButtonsContainer = document.getElementById('set-buttons');
    setButtonsContainer.innerHTML = '';
    
    Object.entries(CARD_SETS).forEach(([key, set]) => {
        const button = document.createElement('button');
        button.className = `set-btn ${currentSet === key ? 'bg-green-600 text-white' : 'bg-gray-200'}`;
        button.textContent = set.name;
        button.addEventListener('click', (e) => {
            e.preventDefault();
            selectSet(key);
        });
        setButtonsContainer.appendChild(button);
    });

    selectSet(currentSet);
}

function selectSet(setKey) {
    currentSet = setKey;
    currentItems = shuffle([...CARD_SETS[setKey].items]);
    showTimes = false;
    renderItems();

    document.querySelectorAll('.set-btn').forEach(button => {
        button.className = `set-btn ${
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
                    ${showTimes ? `<div class="text-green-600 mt-1">${item.decompositionTime}</div>` : ''}
                </div>
                <div class="text-gray-400 text-2xl">⋮⋮</div>
            </div>
        `;

        setupDragListeners(card);
        container.appendChild(card);
    });
}

// Вспомогательные функции
function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function setupDragListeners(card) {
    let startY = 0;
    let initialPosition = 0;
    
    card.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        initialPosition = card.offsetTop;
        card.classList.add('dragging');
    }, { passive: false });

    card.addEventListener('touchmove', (e) => {
        if (!card.classList.contains('dragging')) return;
        e.preventDefault();
        
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
    }, { passive: false });

    card.addEventListener('touchend', () => {
        card.classList.remove('dragging');
        card.style.transform = '';
    });

    card.addEventListener('touchcancel', () => {
        card.classList.remove('dragging');
        card.style.transform = '';
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded'); // Отладочный вывод
    
    // Обработчики для основных кнопок меню
    const decompositionButton = document.getElementById('start-decomposition');
    const sortingButton = document.getElementById('start-sorting');
    const backButtons = document.querySelectorAll('button[onclick="backToMenu()"]');
    
    if (decompositionButton) {
        console.log('Adding decomposition button listener'); // Отладочный вывод
        decompositionButton.onclick = (e) => {
            e.preventDefault();
            showScreen('decomposition');
            initDecompositionGame();
        };
    }
    
    if (sortingButton) {
        console.log('Adding sorting button listener'); // Отладочный вывод
        sortingButton.onclick = (e) => {
            e.preventDefault();
            showScreen('waste-sorting');
            initWasteSortingGame();
        };
    }
    
    backButtons.forEach(button => {
        button.onclick = (e) => {
            e.preventDefault();
            backToMenu();
        };
    });

    // Инициализация полноэкранного режима
    const fullscreenButton = document.getElementById('fullscreen-button');
    if (fullscreenButton) {
        fullscreenButton.onclick = async (e) => {
            e.preventDefault();
            try {
                if (!document.fullscreenElement) {
                    await document.documentElement.requestFullscreen();
                }
            } catch (err) {
                console.error('Error attempting to enable fullscreen:', err);
            }
        };
    }

    // Предотвращение скролла при перетаскивании
    document.addEventListener('touchmove', (e) => {
        if (document.querySelector('.dragging')) {
            e.preventDefault();
        }
    }, { passive: false });
});