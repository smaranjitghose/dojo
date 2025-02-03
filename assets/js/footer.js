document.addEventListener("DOMContentLoaded", function() {
  const footerHTML = `
    <footer class="py-8 px-4 text-gray-400 border-t border-gray-800">
        <div class="flex justify-center items-center space-x-8">
            <a
                href="https://www.linkedin.com/in/smaranjitghose/?originalSubdomain=in"
                class="flex flex-col items-center text-gray-400 hover:text-blue-700"
            >
                <i class="fa-brands fa-linkedin-in text-3xl mb-2"></i>
            </a>
            <a
                href="https://github.com/smaranjitghose"
                class="flex flex-col items-center text-gray-400 hover:text-gray-600"
            >
                <i class="fa-brands fa-github text-3xl mb-2"></i>
            </a>
            <a
                href="https://smaranjitghose.com/"  
                class="flex flex-col items-center text-gray-400 hover:text-green-500"
            >
                <i class="fa-solid fa-briefcase text-3xl mb-2"></i>
            </a>
        </div>
        <div class="flex justify-center mt-4">
            <p>&copy; 2025 PracticeDojo. All rights reserved.</p>
        </div>
    </footer>
  `;
  // Append the footer to the body of the page
  document.body.insertAdjacentHTML('beforeend', footerHTML);
});
