// Утилітарна функція для генерації випадкових чисел в діапазоні
const getRandomInRange = (min, max) => Math.random() * (max - min) + min;

// Функція для імітації отримання даних від космічного апарата з логікою повторних спроб
const fetchSpacecraftData = (spacecraftName, retries = 3) => {
    return new Promise((resolve, reject) => {
        // Випадкова затримка для симуляції мережевого запиту (1-5 секунд)
        const fetchTime = getRandomInRange(1, 5) * 1000;

        setTimeout(() => {
            // Симулюємо 20% ймовірність помилки запиту
            if (Math.random() < 0.2) {
                if (retries > 0) {
                    console.warn(`Повторний запит для ${spacecraftName} (${3 - retries + 1} спроба)`);
                    resolve(fetchSpacecraftData(spacecraftName, retries - 1)); // Повторюємо запит
                } else {
                    reject(`Не вдалося отримати дані для ${spacecraftName} після 3 спроб`);
                }
            } else {
                // Генеруємо дані космічного апарата
                const data = {
                    name: spacecraftName,
                    location: {
                        x: getRandomInRange(0, 500).toFixed(2),
                        y: getRandomInRange(0, 500).toFixed(2),
                        z: getRandomInRange(0, 500).toFixed(2),
                    },
                    fuelLevel: getRandomInRange(0, 100).toFixed(2), // Відсоток пального
                    missionStatus: ["Operational", "Standby", "Critical"][Math.floor(Math.random() * 3)],
                };
                resolve(data); // Повідомляємо про успішне отримання даних
            }
        }, fetchTime);
    });
};

// Функція для отримання даних від космічних апаратів одночасно з обробкою помилок
const fetchAllSpacecraftData = async () => {
    const spacecraftNames = ["Orion", "Apollo", "Voyager"]; // Список космічних апаратів
    const promises = spacecraftNames.map(name => fetchSpacecraftData(name)); // Створюємо масив запитів

    // Використовуємо Promise.allSettled для обробки всіх запитів
    const results = await Promise.allSettled(promises);
    const spacecraftData = results
        .filter(result => result.status === "fulfilled") // Фільтруємо успішні результати
        .map(result => result.value);

    if (spacecraftData.length < spacecraftNames.length) {
        console.warn("Не вдалося отримати дані для деяких космічних апаратів.");
    }

    return spacecraftData; // Повертаємо отримані дані
};

// Функція для аналізу статусу місії на основі отриманих даних
const analyzeMissionStatus = (spacecraftData) => {
    if (spacecraftData.length === 0) return "Data Incomplete"; // Якщо дані не отримані

    const hasCritical = spacecraftData.some((data) => data.missionStatus === "Critical"); // Перевіряємо наявність критичних статусів
    const allOperational = spacecraftData.every((data) => data.missionStatus === "Operational"); // Перевіряємо, чи всі апарати в оперативному стані
    const hasStandby = spacecraftData.some((data) => data.missionStatus === "Standby"); // Перевіряємо наявність статусу очікування

    if (hasCritical) {
        return "Alert"; // Якщо є критичний статус
    } else if (allOperational) {
        return "All Systems Go"; // Якщо всі апарати оперативні
    } else if (hasStandby) {
        return "Monitoring"; // Якщо є статус очікування
    }

    return "Unknown Status"; // Невідомий статус
};

// Функція для представлення результатів у зручному форматі
const presentResults = (spacecraftData, overallStatus) => {
    const timestamp = new Date().toLocaleString(); // Отримуємо поточний час
    let output = `Звіт про дані місії - ${timestamp}\n\n`;

    // Форматування і виведення даних кожного космічного апарата
    spacecraftData.forEach((data) => {
        output += `Космічний апарат: ${data.name}\n`;
        output += `Розташування: x: ${data.location.x}, y: ${data.location.y}, z: ${data.location.z}\n`;
        output += `Рівень пального: ${data.fuelLevel}%\n`;
        output += `Статус місії: ${data.missionStatus}\n\n`;
    });

    output += `Загальний статус місії: ${overallStatus}`;
    document.getElementById("output").textContent = output; // Виводимо результати на сторінку
};

// Основна функція для виконання всіх кроків
const main = async () => {
    try {
        // Кроки 1 і 2: Отримання даних одночасно
        const spacecraftData = await fetchAllSpacecraftData();

        // Крок 3: Аналіз статусу місії
        const overallStatus = analyzeMissionStatus(spacecraftData);

        // Крок 4: Представлення результатів
        presentResults(spacecraftData, overallStatus);
    } catch (error) {
        console.error("Сталася помилка під час отримання даних космічних апаратів:", error);
    }
};

// Додаємо обробник події до кнопки для запуску отримання даних
document.getElementById("fetchDataBtn").addEventListener("click", main);
