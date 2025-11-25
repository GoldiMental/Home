//CSS-Loader
loadStylesheet('/css/Development.css');
//End

window.handleTestClick = async function (buttonElement) {
    const testStatus = document.getElementById('test-status');
    testStatus.innerText = 'API-Test gestartet...';
    testStatus.style.color = 'rgb(210,170,100)';
    const API = 'http://localhost:3000/api/test';
    const testData = { message: 'Erste API-POST Anfrage von Development.ejs!',id: 42 };
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testData)
        });
        if (response.ok) {
            const result = await response.json();
            testStatus.innerText = `Erfolg: ${result.message} (Daten: ${result.data.info})`;
            testStatus.style.color = 'rgb(50,200,50)';
        } else {
            testStatus.innerText = `Fehler: ${result.message}`;
            testStatus.style.color = 'rgb(200,50,50)';
        }
    } catch (error) {
        testStatus.innerText = `Netzwerkfehler: ${error.message}`;
        testStatus.style.color = 'rgb(200,50,50)';
        console.error('Netzwerkfehler:', error);
    }
};