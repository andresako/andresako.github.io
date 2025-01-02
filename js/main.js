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

    createAndSortItems('experience-container', texts.sections.experience.jobs);
    createAndSortItems('education-container', texts.sections.education.degrees);
    createLanguages('skills-container', texts.sections.skills.languages);
}

function createAndSortItems(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    items.forEach(item => {
        const article = document.createElement('article');
        article.className = containerId.includes('experience') ? 'experience-item' : 'education-item';
        article.innerHTML = `
            <h3>${item.title}</h3>
            <p class="company">${item.company || item.institution}</p>
            <p class="date">${formatDate(item.startDate)} - ${formatDate(item.endDate)}</p>
            ${item.description ? `<p class="description">${item.description}</p>` : ''}
            ${item.tools ? `<p class="tools"><strong>Herramientas:</strong> ${item.tools.join(', ')}</p>` : ''}
        `;
        container.appendChild(article);
    });
}

function createLanguages(containerId, languages) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    languages.forEach(language => {
        const div = document.createElement('div');
        div.className = 'language-item';
        div.innerHTML = `
            <p><strong>${language.language}:</strong> ${language.level}</p>
        `;
        container.appendChild(div);
    });
}

function formatDate(date) {
    if (date === 'actual') return currentLanguage === 'es' ? 'Actual' : 'Present';
    const [year, month] = date.split('-');
    const months = {
        es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };
    return `${months[currentLanguage][parseInt(month) - 1]} ${year}`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateContent();
});