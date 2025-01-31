// Toggle section visibility
function toggleSection(header) {
    const section = header.closest('.paper-section');
    section.classList.toggle('active');
    header.classList.toggle('active');
}

// Search functionality
function toggleSearch() {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('hidden');
    if (!searchBar.classList.contains('hidden')) {
        document.getElementById('searchInput').focus();
    }
}

// Search within question paper
document.getElementById('searchInput')?.addEventListener('input', function(e) {
    const searchText = e.target.value.toLowerCase();
    const sections = document.querySelectorAll('.section-content');
    
    // Remove existing highlights
    document.querySelectorAll('.highlight').forEach(el => {
        el.outerHTML = el.innerHTML;
    });
    
    if (searchText.length < 2) return;

    sections.forEach(section => {
        let found = false;
        const textNodes = [];
        
        // Get all text nodes
        const walker = document.createTreeWalker(
            section,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        // Search and highlight
        textNodes.forEach(textNode => {
            const text = textNode.textContent.toLowerCase();
            if (text.includes(searchText)) {
                found = true;
                const span = document.createElement('span');
                span.innerHTML = textNode.textContent.replace(
                    new RegExp(searchText, 'gi'),
                    match => `<span class="highlight">${match}</span>`
                );
                textNode.parentNode.replaceChild(span, textNode);
            }
        });

        // Show section if match found
        const paperSection = section.closest('.paper-section');
        if (found && !paperSection.classList.contains('active')) {
            paperSection.classList.add('active');
            paperSection.querySelector('.section-header').classList.add('active');
        }
    });
});

// Print functionality
function printPaper() {
    window.print();
}

// Initialize all sections as expanded on load
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.paper-section');
    sections.forEach(section => {
        section.classList.add('active');
        section.querySelector('.section-header').classList.add('active');
    });
});
