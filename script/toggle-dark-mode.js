const toggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');

    if (currentTheme === 'dark') {
        htmlElement.setAttribute('data-bs-theme', 'light');
        toggleBtn.textContent = '🌙';
    } else {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        toggleBtn.textContent = '☀️';
    }
});
