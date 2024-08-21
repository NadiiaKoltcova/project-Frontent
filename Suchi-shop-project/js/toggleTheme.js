document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.querySelector('#darkModeToggle');
    const body = document.body;

    // Проверяем сохранённую тему при загрузке страницы
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeToggleButton.checked = savedTheme === 'dark-theme';
    }

    // Функция для переключения темы
    function toggleTheme() {
        if (themeToggleButton.checked) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    }

    // Добавляем обработчик события для кнопки переключения темы
    themeToggleButton.addEventListener('change', toggleTheme);
});
