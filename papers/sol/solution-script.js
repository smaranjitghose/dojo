// Load solutions from JSON
fetch('javascript-solutions.json')
    .then(response => response.json())
    .then(data => {
        loadSolutions(data);
    })
    .catch(error => console.error('Error loading solutions:', error));

function createCodeBlock(code, language = 'javascript') {
    return `
        <div class="code-container bg-gray-900 rounded-lg p-4 my-4 relative">
            <button onclick="copyCode(this)" class="copy-button">Copy</button>
            <pre><code class="${language}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
        </div>
    `;
}

function loadSolutions(data) {
    // Load MCQ solutions
    const mcqSection = document.getElementById('mcq-solutions');
    data.mcq.forEach((mcq, index) => {
        const solution = document.createElement('div');
        solution.className = 'question-item p-6 bg-gray-800/50 rounded-lg';
        
        let html = `
            <div class="flex items-center gap-2 mb-4">
                <span class="bg-blue-600 text-white px-2 py-1 rounded-md">${index + 1}</span>
                <h3 class="text-lg font-semibold">${mcq.question}</h3>
            </div>
        `;
        
        if (mcq.code) {
            html += createCodeBlock(mcq.code);
        }
        
        html += `
            <div class="solution">
                <p class="answer">Answer: ${mcq.answer}</p>
                <p class="explanation">${mcq.explanation}</p>
            </div>
        `;
        
        solution.innerHTML = html;
        mcqSection.appendChild(solution);
    });

    // Load short question solutions
    const shortSection = document.getElementById('short-solutions');
    data.short.forEach((q, index) => {
        const solution = document.createElement('div');
        solution.className = 'question-item p-6 bg-gray-800/50 rounded-lg';
        
        let html = `
            <div class="flex items-center gap-2 mb-4">
                <span class="bg-blue-600 text-white px-2 py-1 rounded-md">${index + 1}</span>
                <h3 class="text-lg font-semibold">${q.question}</h3>
            </div>
            <div class="solution">
        `;
        
        if (q.solution.includes('<')) {
            // HTML content
            html += createCodeBlock(q.solution, 'html');
        } else {
            // JavaScript content
            html += createCodeBlock(q.solution);
        }
        
        html += `
                <p class="explanation">${q.explanation}</p>
            </div>
        `;
        
        solution.innerHTML = html;
        shortSection.appendChild(solution);
    });

    // Load long question solutions
    const longSection = document.getElementById('long-solutions');
    data.long.forEach((q, index) => {
        const solution = document.createElement('div');
        solution.className = 'question-item p-6 bg-gray-800/50 rounded-lg';
        
        let html = `
            <div class="flex items-center gap-2 mb-4">
                <span class="bg-blue-600 text-white px-2 py-1 rounded-md">${index + 1}</span>
                <h3 class="text-lg font-semibold">${q.question}</h3>
            </div>
            <div class="solution">
        `;
        
        if (q.solution.includes('<')) {
            // HTML content
            html += createCodeBlock(q.solution, 'html');
        } else {
            // JavaScript content
            html += createCodeBlock(q.solution);
        }
        
        html += `
                <p class="explanation">${q.explanation}</p>
            </div>
        `;
        
        solution.innerHTML = html;
        longSection.appendChild(solution);
    });

    // Initialize syntax highlighting for all code blocks
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
    });
}
