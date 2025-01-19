// База данных отходов
const wasteDatabase = {
    recycling: {
        name: 'Переработка',
        items: [
            { id: 'plastic_bottle', name: 'Пластиковая бутылка', hint: 'Маркировка PET или HDPE' },
            { id: 'glass_jar', name: 'Стеклянная банка', hint: 'Стекло можно переплавить множество раз' },
            { id: 'newspaper', name: 'Газета', hint: 'Бумажная продукция' },
            { id: 'metal_can', name: 'Консервная банка', hint: 'Металл подлежит переплавке' },
            { id: 'cardboard', name: 'Картонная коробка', hint: 'Прессованная бумага' },
            { id: 'milk_carton', name: 'Пакет от молока', hint: 'Тетрапак можно переработать' },
            { id: 'plastic_container', name: 'Пластиковый контейнер', hint: 'Проверьте маркировку переработки' }
        ]
    },
    organic: {
        name: 'Органика',
        items: [
            { id: 'banana_peel', name: 'Банановая кожура', hint: 'Природное удобрение' },
            { id: 'apple_core', name: 'Яблочный огрызок', hint: 'Компостируемые остатки еды' },
            { id: 'tea_bags', name: 'Чайные пакетики', hint: 'Натуральные материалы' },
            { id: 'coffee_grounds', name: 'Кофейная гуща', hint: 'Отличное удобрение' },
            { id: 'egg_shells', name: 'Яичная скорлупа', hint: 'Источник кальция для компоста' },
            { id: 'vegetable_peels', name: 'Овощные очистки', hint: 'Идеально для компоста' }
        ]
    },
    hazardous: {
        name: 'Опасные отходы',
        items: [
            { id: 'battery', name: 'Батарейка', hint: 'Содержит токсичные металлы' },
            { id: 'light_bulb', name: 'Лампочка', hint: 'Может содержать ртуть' },
            { id: 'paint', name: 'Краска', hint: 'Химические вещества' },
            { id: 'medicine', name: 'Просроченные лекарства', hint: 'Требует специальной утилизации' },
            { id: 'electronics', name: 'Старый телефон', hint: 'Электронные компоненты' },
            { id: 'thermometer', name: 'Ртутный термометр', hint: 'Очень опасно при повреждении' }
        ]
    }
};

// Состояние игры
let gameState = {
    mode: 'classic',
    score: 0,
    perfectStreak: 0,
    itemsSorted: 0,
    currentItem: null,
    timer: null,
    timeLeft: 0,
    isGameOver: false
};

// Функция начала игры
function startGame(mode) {
    gameState.mode = mode;
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('gameContent').style.display = 'block';
    
    // Добавляем таймер для режима на время
    if (mode === 'time') {
        const statsDiv = document.querySelector('.stats');
        const timerDiv = document.createElement('div');
        timerDiv.className = 'timer';
        timerDiv.id = 'timer';
        timerDiv.textContent = '60';
        statsDiv.insertBefore(timerDiv, statsDiv.firstChild);
        startTimer();
    }

    resetGame();
    generateNewItem();
    initializeDictionary();
}

// Запуск таймера для режима на время
function startTimer() {
    gameState.timeLeft = 60;
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('timer').textContent = gameState.timeLeft;
        
        if (gameState.timeLeft <= 0) {
            endGame('Время вышло!');
        }
    }, 1000);
}

// Сброс игры
function resetGame() {
    gameState.score = 0;
    gameState.perfectStreak = 0;
    gameState.itemsSorted = 0;
    gameState.currentItem = null;
    gameState.isGameOver = false;
    updateStats();
}

// Генерация нового предмета
function generateNewItem() {
    if (gameState.isGameOver) return;

    const categories = Object.keys(wasteDatabase);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const categoryItems = wasteDatabase[randomCategory].items;
    const randomItem = categoryItems[Math.floor(Math.random() * categoryItems.length)];
    
    gameState.currentItem = {
        ...randomItem,
        type: randomCategory
    };

    document.getElementById('itemName').textContent = randomItem.name;
    document.getElementById('itemHint').style.display = 'none';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
}

// Показать подсказку
function showHint() {
    if (gameState.isGameOver) return;
    
    const hintElement = document.getElementById('itemHint');
    hintElement.textContent = gameState.currentItem.hint;
    hintElement.style.display = 'block';
}

// Обработка броска предмета в контейнер
function handleDrop(binType) {
    if (!gameState.currentItem || gameState.isGameOver) return;

    gameState.itemsSorted++;
    const isCorrect = gameState.currentItem.type === binType;

    if (isCorrect) {
        gameState.score++;
        gameState.perfectStreak++;
        showFeedback('Правильно! +1 очко', true);
    } else {
        gameState.perfectStreak = 0;
        showFeedback('Неправильно! Попробуйте еще раз', false);

        if (gameState.mode === 'survival') {
            endGame('Игра окончена! Неправильная сортировка.');
            return;
        }
    }

    updateStats();
    setTimeout(generateNewItem, 1500);
}

// Показать сообщение об успехе/неудаче
function showFeedback(message, isSuccess) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = message;
    feedbackElement.className = `feedback ${isSuccess ? 'success' : 'error'}`;
}

// Обновление статистики
function updateStats() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('streak').textContent = gameState.perfectStreak;
    document.getElementById('sorted').textContent = gameState.itemsSorted;
}

// Завершение игры
function endGame(message) {
    gameState.isGameOver = true;
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }

    const currentItem = document.getElementById('currentItem');
    currentItem.innerHTML = `
        <div class="game-over">
            <h2>${message}</h2>
            <p>Ваш счёт: ${gameState.score}</p>
            <button class="btn btn-start" onclick="location.reload()">Играть снова</button>
        </div>
    `;
}

// Инициализация справочника
function initializeDictionary() {
    const dictionaryContent = document.getElementById('dictionaryContent');
    dictionaryContent.innerHTML = '';

    Object.entries(wasteDatabase).forEach(([category, data]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'dictionary-category';
        
        categoryDiv.innerHTML = `
            <h3>${data.name}</h3>
            ${data.items.map(item => `
                <div class="dictionary-item">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                    <span>${item.name}</span>
                    <span class="hint">- ${item.hint}</span>
                </div>
            `).join('')}
        `;
        
        dictionaryContent.appendChild(categoryDiv);
    });
}

// Переключение видимости справочника
function toggleDictionary() {
    if (gameState.isGameOver) return;
    const dictionary = document.getElementById('dictionary');
    dictionary.classList.toggle('active');
}