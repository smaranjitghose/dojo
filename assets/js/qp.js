class QuestionPaperRenderer {
    constructor(paperNumber) {
        this.paperNumber = paperNumber;
        this.paperTitle = document.getElementById('paper-title');
        this.paperDate = document.getElementById('paper-date');
        this.mcqsContainer = document.getElementById('mcqs-container');
        this.shortQuestionsContainer = document.getElementById('short-questions-container');
        this.longQuestionsContainer = document.getElementById('long-questions-container');

        // Update solution link
        const solutionLink = document.querySelector('a[href*="solutions"]');
        if (solutionLink) {
            solutionLink.href = `../solutions/sol${paperNumber.padStart(2, '0')}.html`;
        }
    }

    static escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    async loadQuestions() {
        try {
            const response = await fetch(`../data/qp${this.paperNumber.padStart(2, '0')}.json`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            
            const data = await response.json();
            this.validateData(data);
            this.renderPaperDetails(data);
            this.renderAllQuestions(data);
            
            requestAnimationFrame(() => Prism.highlightAll());
        } catch (error) {
            this.handleError(error);
        }
    }

    validateData(data) {
        const requiredKeys = ['title', 'date', 'mcqs', 'shortQuestions', 'longQuestions'];
        const missingKeys = requiredKeys.filter(key => !data[key]);
        if (missingKeys.length) {
            throw new Error(`Missing required data: ${missingKeys.join(', ')}`);
        }
    }

    renderPaperDetails(data) {
        this.paperTitle.textContent = data.title;
        this.paperDate.textContent = `Date: ${data.date}`;
    }

    renderAllQuestions(data) {
        this.renderMCQs(data.mcqs);
        this.renderShortQuestions(data.shortQuestions);
        this.renderLongQuestions(data.longQuestions);
    }

    renderMCQs(mcqs) {
        this.mcqsContainer.innerHTML = mcqs.map(mcq => `
            <div class="question-card">
                <p class="question-text">
                    <span class="font-semibold">(${mcq.id})</span> ${QuestionPaperRenderer.escapeHTML(mcq.question)}
                </p>
                ${mcq.code ? `
                    <pre class="code-block">
                        <code class="language-javascript">${QuestionPaperRenderer.escapeHTML(mcq.code)}</code>
                    </pre>
                ` : ''}
                ${this.renderOptions(mcq.options)}
            </div>
        `).join('');
    }

    renderOptions(options) {
        if (!options) return '';
        return `
            <div class="options-grid">
                ${Object.entries(options).map(([key, value]) => `
                    <div class="option-item">
                        <span class="font-semibold mr-2">${key})</span>
                        <span>${QuestionPaperRenderer.escapeHTML(value)}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderShortQuestions(questions) {
        this.shortQuestionsContainer.innerHTML = questions.map(q => `
            <div class="question-card">
                <p class="question-text">
                    <span class="font-semibold">(${q.id})</span> ${QuestionPaperRenderer.escapeHTML(q.question)}
                </p>
                ${q.code ? `
                    <pre class="code-block">
                        <code class="language-javascript">${QuestionPaperRenderer.escapeHTML(q.code)}</code>
                    </pre>
                ` : ''}
            </div>
        `).join('');
    }

    renderLongQuestions(questions) {
        this.longQuestionsContainer.innerHTML = questions.map(q => `
            <div class="question-card">
                <p class="question-text">
                    <span class="font-semibold">(${q.id})</span> ${QuestionPaperRenderer.escapeHTML(q.question)}
                </p>
                ${q.code ? `
                    <pre class="code-block">
                        <code class="language-javascript">${QuestionPaperRenderer.escapeHTML(q.code)}</code>
                    </pre>
                ` : ''}
                <p class="text-gray-300 font-semibold mb-4">${QuestionPaperRenderer.escapeHTML(q.question1 || '')}</p>
                ${this.renderSubparts(q.subparts)}
            </div>
        `).join('');
    }

    renderSubparts(subparts) {
        if (!subparts?.length) return '';
        return `
            <ol class="list-decimal list-inside space-y-2">
                ${subparts.map(part => `
                    <li class="text-gray-400">${QuestionPaperRenderer.escapeHTML(part)}</li>
                `).join('')}
            </ol>
        `;
    }

    handleError(error) {
        console.error('Error:', error);
        const errorHTML = `
            <div class="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-500">
                <p class="font-semibold">Error loading questions:</p>
                <p>${QuestionPaperRenderer.escapeHTML(error.message)}</p>
            </div>
        `;
        this.mcqsContainer.innerHTML = errorHTML;
    }
}