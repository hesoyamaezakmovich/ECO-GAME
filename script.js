// База данных отходов
const wasteDatabase = {
    recycling: {
        name: 'Переработка',
        items: [
            { id: 'plastic_bottle', name: 'Пластиковая бутылка', hint: 'Маркировка PET или HDPE', icon: '🍶' },
            { id: 'glass_jar', name: 'Стеклянная банка', hint: 'Стекло можно переплавить множество раз', icon: '🥛' },
            { id: 'newspaper', name: 'Газета', hint: 'Бумажная продукция', icon: '📰' },
            { id: 'metal_can', name: 'Консервная банка', hint: 'Металл подлежит переплавке', icon: '🥫' },
            { id: 'cardboard', name: 'Картонная коробка', hint: 'Прессованная бумага', icon: '📦' },
            { id: 'milk_carton', name: 'Пакет от молока', hint: 'Тетрапак можно переработать', icon: '🥛' },
            { id: 'aluminum_can', name: 'Алюминиевая банка', hint: 'Подлежит переплавке', icon: '🥤' },
            { id: 'magazine', name: 'Журнал', hint: 'Глянцевая бумага перерабатывается', icon: '📖' },
            { id: 'plastic_container', name: 'Пластиковый контейнер', hint: 'Проверьте маркировку PP или PS', icon: '🥡' },
            { id: 'wine_bottle', name: 'Винная бутылка', hint: 'Стеклянная тара', icon: '🍾' },
            { id: 'tin_foil', name: 'Алюминиевая фольга', hint: 'Металл для переработки', icon: '📄' },
            { id: 'plastic_bag', name: 'Пластиковый пакет', hint: 'LDPE пластик', icon: '🛍️' },
            { id: 'envelope', name: 'Конверт', hint: 'Бумажная продукция', icon: '✉️' },
            { id: 'beer_can', name: 'Пивная банка', hint: 'Алюминий подлежит переработке', icon: '🍺' },
            { id: 'glass_bottle', name: 'Стеклянная бутылка', hint: 'Стеклянная тара', icon: '🍾' },
            { id: 'plastic_toys', name: 'Пластиковые игрушки', hint: 'Твердый пластик', icon: '🎲' },
            { id: 'metal_caps', name: 'Металлические крышки', hint: 'Металл для переработки', icon: '⭕' },
            { id: 'paper_bag', name: 'Бумажный пакет', hint: 'Крафт-бумага', icon: '🛍️' },
            { id: 'yogurt_cup', name: 'Стаканчик от йогурта', hint: 'Пластик PP', icon: '🥛' },
            { id: 'shampoo_bottle', name: 'Бутылка от шампуня', hint: 'HDPE пластик', icon: '🧴' }
        ]
    },
    organic: {
        name: 'Органика',
        items: [
            { id: 'banana_peel', name: 'Банановая кожура', hint: 'Природное удобрение', icon: '🍌' },
            { id: 'apple_core', name: 'Яблочный огрызок', hint: 'Компостируемые остатки еды', icon: '🍎' },
            { id: 'tea_bags', name: 'Чайные пакетики', hint: 'Натуральные материалы', icon: '🍵' },
            { id: 'coffee_grounds', name: 'Кофейная гуща', hint: 'Отличное удобрение', icon: '☕' },
            { id: 'egg_shells', name: 'Яичная скорлупа', hint: 'Источник кальция для компоста', icon: '🥚' },
            { id: 'vegetable_peels', name: 'Овощные очистки', hint: 'Идеально для компоста', icon: '🥕' },
            { id: 'orange_peel', name: 'Апельсиновая кожура', hint: 'Цитрусовые остатки', icon: '🍊' },
            { id: 'grass_clippings', name: 'Скошенная трава', hint: 'Садовые отходы', icon: '🌱' },
            { id: 'fallen_leaves', name: 'Опавшие листья', hint: 'Садовый мусор', icon: '🍂' },
            { id: 'bread_crusts', name: 'Хлебные корки', hint: 'Пищевые остатки', icon: '🍞' },
            { id: 'fish_bones', name: 'Рыбные кости', hint: 'Остатки морепродуктов', icon: '🐟' },
            { id: 'meat_scraps', name: 'Обрезки мяса', hint: 'Пищевые отходы', icon: '🥩' },
            { id: 'nut_shells', name: 'Скорлупа орехов', hint: 'Твердые органические отходы', icon: '🥜' },
            { id: 'fruit_pits', name: 'Косточки фруктов', hint: 'Семена и косточки', icon: '🍑' },
            { id: 'corn_cobs', name: 'Кукурузные початки', hint: 'Растительные остатки', icon: '🌽' },
            { id: 'potato_peels', name: 'Картофельные очистки', hint: 'Овощные очистки', icon: '🥔' },
            { id: 'watermelon_rind', name: 'Корки арбуза', hint: 'Остатки бахчевых', icon: '🍉' },
            { id: 'pumpkin_seeds', name: 'Тыквенные семечки', hint: 'Семена овощей', icon: '🎃' },
            { id: 'used_napkins', name: 'Использованные салфетки', hint: 'Бумажные отходы', icon: '🧻' },
            { id: 'flower_stems', name: 'Стебли цветов', hint: 'Растительные остатки', icon: '🌸' }
        ]
    },
    hazardous: {
        name: 'Опасные отходы',
        items: [
            { id: 'battery', name: 'Батарейка', hint: 'Содержит токсичные металлы', icon: '🔋' },
            { id: 'light_bulb', name: 'Лампочка', hint: 'Может содержать ртуть', icon: '💡' },
            { id: 'paint', name: 'Краска', hint: 'Химические вещества', icon: '🎨' },
            { id: 'medicine', name: 'Просроченные лекарства', hint: 'Требует специальной утилизации', icon: '💊' },
            { id: 'electronics', name: 'Старый телефон', hint: 'Электронные компоненты', icon: '📱' },
            { id: 'thermometer', name: 'Ртутный термометр', hint: 'Очень опасно при повреждении', icon: '🌡️' },
            { id: 'motor_oil', name: 'Моторное масло', hint: 'Нефтепродукты', icon: '⚫' },
            { id: 'antifreeze', name: 'Антифриз', hint: 'Токсичная жидкость', icon: '💧' },
            { id: 'pesticides', name: 'Пестициды', hint: 'Ядохимикаты', icon: '☠️' },
            { id: 'printer_cartridge', name: 'Картридж принтера', hint: 'Содержит токсичные чернила', icon: '🖨️' },
            { id: 'nail_polish', name: 'Лак для ногтей', hint: 'Химические растворители', icon: '💅' },
            { id: 'cleaning_products', name: 'Чистящие средства', hint: 'Агрессивная химия', icon: '🧪' },
            { id: 'car_battery', name: 'Автомобильный аккумулятор', hint: 'Содержит свинец и кислоту', icon: '🚗' },
            { id: 'aerosol_cans', name: 'Аэрозольные баллончики', hint: 'Под давлением', icon: '⛫💨' },
            { id: 'laptop_battery', name: 'Батарея ноутбука', hint: 'Литий-ионный аккумулятор', icon: '💻' },
            { id: 'fertilizers', name: 'Удобрения', hint: 'Химические вещества', icon: '🌱' },
            { id: 'glue', name: 'Клей', hint: 'Химические растворители', icon: '🗞️' },
            { id: 'hair_dye', name: 'Краска для волос', hint: 'Химические красители', icon: '💇' },
            { id: 'varnish', name: 'Лак', hint: 'Токсичные испарения', icon: '🖌️' },
            { id: 'bleach', name: 'Отбеливатель', hint: 'Агрессивное химическое вещество', icon: '🧴' }
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
    isGameOver: false,
    isProcessing: false,
    mistakesCount: 0,
    comboMultiplier: 1,
    lastCorrectBin: null,
    penaltyTimeout: null
};

// Функция начала игры
function startGame(mode) {
    gameState.mode = mode;
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('gameContent').style.display = 'block';
    
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
    gameState.isProcessing = false;
    gameState.mistakesCount = 0;
    gameState.comboMultiplier = 1;
    gameState.lastCorrectBin = null;
    if (gameState.penaltyTimeout) {
        clearTimeout(gameState.penaltyTimeout);
    }
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

    const currentItemElement = document.getElementById('currentItem');
    currentItemElement.innerHTML = `
        <span style="font-size: 2em; margin-right: 10px;">${randomItem.icon}</span>
        <span>${randomItem.name}</span>
        <p id="itemHint" style="display: none;" class="hint"></p>
    `;
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
    if (!gameState.currentItem || 
        gameState.isGameOver || 
        gameState.isProcessing) return;

    gameState.isProcessing = true;

    gameState.itemsSorted++;
    const isCorrect = gameState.currentItem.type === binType;

    if (isCorrect) {
        if (gameState.lastCorrectBin === binType) {
            gameState.comboMultiplier = Math.max(0.5, gameState.comboMultiplier - 0.2);
        } else {
            gameState.comboMultiplier = Math.min(3, gameState.comboMultiplier + 0.5);
        }
        
        const pointsEarned = Math.ceil(gameState.comboMultiplier);
        gameState.score += pointsEarned;
        gameState.perfectStreak++;
        gameState.lastCorrectBin = binType;
        
        showFeedback(`Правильно! +${pointsEarned} ${getComboMessage(gameState.comboMultiplier)}`, true);
    } else {
        gameState.mistakesCount++;
        gameState.perfectStreak = 0;
        gameState.comboMultiplier = 1;
        gameState.lastCorrectBin = null;

        if (gameState.mistakesCount >= 3) {
            applyPenalty();
        }

        showFeedback('Неправильно! Попробуйте еще раз', false);

        if (gameState.mode === 'survival') {
            endGame('Игра окончена! Неправильная сортировка.');
            return;
        }
    }

    updateStats();

    setTimeout(() => {
        gameState.isProcessing = false;
        generateNewItem();
    }, 1500);
}

function goBack() {
    // Очищаем все таймеры и состояния
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }
    if (gameState.penaltyTimeout) {
        clearTimeout(gameState.penaltyTimeout);
    }
    
    // Скрываем игровой контент и показываем приветственный экран
    document.getElementById('gameContent').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
    
    // Удаляем таймер, если он был добавлен
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.remove();
    }
    
    // Сбрасываем состояние игры
    resetGame();
}

// Функция для применения штрафа
function applyPenalty() {
    const penaltyTime = 5000; // 5 секунд
    gameState.isProcessing = true;
    
    showFeedback('Слишком много ошибок! Штраф 5 секунд', false);
    
    gameState.penaltyTimeout = setTimeout(() => {
        gameState.isProcessing = false;
        gameState.mistakesCount = 0;
    }, penaltyTime);
}

// Функция для получения сообщения о комбо
function getComboMessage(multiplier) {
    if (multiplier >= 3) return '🔥 СУПЕР КОМБО!';
    if (multiplier >= 2) return '⭐ КОМБО!';
    if (multiplier <= 0.5) return '⚠️ Используйте разные контейнеры!';
    return '';
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
    
    const multiplierDisplay = gameState.comboMultiplier > 1 ? 
        ` (x${gameState.comboMultiplier.toFixed(1)})` : '';
    document.getElementById('score').textContent += multiplierDisplay;
}

// Завершение игры
function endGame(message) {
    gameState.isGameOver = true;
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }
    if (gameState.penaltyTimeout) {
        clearTimeout(gameState.penaltyTimeout);
    }

    const currentItem = document.getElementById('currentItem');
    currentItem.innerHTML = `
        <div class="game-over">
            <h2>${message}</h2>
            <p>Ваш счёт: ${gameState.score}</p>
            <button class="btn btn-start" onclick="restartGame()">Играть снова</button>
        </div>
    `;

    // Добавляем класс для отключения справочника
    document.getElementById('dictionary').classList.add('game-over-active');
}

function restartGame() {
    // Очищаем таймер, если он есть
    if (gameState.timer) {
        clearInterval(gameState.timer);
    }
    
    // Убираем класс отключения справочника
    document.getElementById('dictionary').classList.remove('game-over-active');
    
    // Сбрасываем состояние игры
    resetGame();
    
    // Запускаем таймер заново для режима на время
    if (gameState.mode === 'time') {
        startTimer();
    }
    
    // Генерируем новый предмет
    generateNewItem();
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
                    <span style="font-size: 1.5em; margin-right: 10px;">${item.icon}</span>
                    <span>${item.name}</span>
                    <span class="hint">${item.hint}</span>
                </div>
            `).join('')}
        `;
        
        dictionaryContent.appendChild(categoryDiv);
    });
}

/// Переключение видимости справочника
function toggleDictionary() {
    if (gameState.isGameOver) return;
    const dictionary = document.getElementById('dictionary');
    dictionary.classList.toggle('active');
}