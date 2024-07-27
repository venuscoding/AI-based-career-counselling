document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultText = document.getElementById('result-text');

    searchButton.addEventListener('click', function () {
        const searchQuery = searchInput.value;
        if (searchQuery) {
            fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'search_query': searchQuery })
            })
            .then(response => response.json())
            .then(data => {
                if (data.result) {
                    resultText.value = data.result;
                } else {
                    resultText.value = 'No results found.';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultText.value = 'An error occurred while fetching data.';
            });
        } else {
            resultText.value = 'Please enter a search query.';
        }
    });
});
