let currentLanguage = 'es';

function changeLanguage(lang) {
    currentLanguage = lang;
    updateContent();
}

function updateContent() {
    const texts = currentLanguage === 'es' ? es : en;
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const keys = element.getAttribute('data-i18n').split('.');
        let value = texts;
        keys.forEach(key => {
            value = value[key];
        });
        element.textContent = value;
    });

    // Crear y ordenar experiencias y educación por fecha
    createAndSortItems('experience-container', texts.sections.experience.jobs);
    createAndSortItems('education-container', texts.sections.education.degrees);
}

function createAndSortItems(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Limpiar el contenedor
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
    items.forEach(item => {
        const article = document.createElement('article');
        article.className = containerId.includes('experience') ? 'experience-item' : 'education-item';
        article.innerHTML = `
            <h3>${item.title}</h3>
            <p class="company">${item.company || item.institution}</p>
            <p class="date">${formatDate(item.startDate)} - ${formatDate(item.endDate)}</p>
            <p class="description">${item.description}</p>
        `;
        container.appendChild(article);
    });
}

function formatDate(date) {
    if (date === 'actual') return 'Actual';
    const [year, month] = date.split('-');
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return `${months[parseInt(month) - 1]} ${year}`;
}

// Inicializar con el idioma por defecto
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
});