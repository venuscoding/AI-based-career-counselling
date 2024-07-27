const form = document.getElementById('chat-form');
const mytextInput = document.getElementById('mytext');
const responseTextarea = document.getElementById('response');

const API_KEY = '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';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mytext = mytextInput.value.trim();

    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: '',
                    messages: [{ role: 'user', content: mytext }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                responseTextarea.value = data.choices[0].message.content;
            } else {
                responseTextarea.value = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.value = 'Error: Unable to process your request.';
        }
    }
});


const bardApiUrl = 'https://api.example.com/bard'; // Replace with the actual API URL
const requestData = {
    userInput: 'User input data' // Replace with actual data to send
};

fetch(bardApiUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', // Set content type to JSON
    },
    body: JSON.stringify(requestData), // Convert data to JSON string
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the JSON response
})
.then(data => {
    // Handle the API response data here
    console.log(data); // Log the data to the console
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});
