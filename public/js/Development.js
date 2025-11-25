const testStatus = document.getElementById('test-status');
const testButton = document.getElementById('test-button');

testButton.addEventListener('click', async () => {
    testStatus.innerText = 'API-Test gestartet...';
    const API = 'http://localhost:3000/api/test';
    const input = { info: 'Erste API-POST Anfrage!' };
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        if (response.ok) {
            const result = await response.json();
            console.log('API-Antwortdaten:', result.data);
            testStatus.innerText = 'API-Test erfolgreich!';
            testStatus.style.color = 'rgb(50,200,50)';
        } else {
            const errorData = await response.json();
            console.error(`Fehler ${response.status}: ${errorData.message}`);
            testStatus.innerText = 'API-Test fehlgeschlagen!';
            testStatus.style.color = 'rgb(200,50,50)';
        }
    } catch (error) {
        console.error('Fehler:', error.message);
        testStatus.innerText = `API-Test Fehler: ${error.message}`;
    }
});