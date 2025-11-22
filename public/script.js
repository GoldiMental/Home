//
//TestListener --- Button is in <section id="Development"> in index.html
const testButton = document.getElementById('test-button');
const testStatus = document.getElementById('test-status');
testButton.addEventListener('click', async () => {
    console.log('Test gestartet...');
    testStatus.innerText = 'Test wird ausgeführt...';
    const testInput = {info:'Erster API Aufruf'};
    const API = 'http://localhost:3000/api/test';
    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testInput)
        });
        if (response.ok) {
            const result = await response.json();
            console.log('Erfolg:', result.message);
            console.log('Übermittelte Daten:', result.data);
            testStatus.innerText = `Test erfolgreich: ${result.data.info}`;
            testStatus.style.color = 'rgb(20,150,30)';
        } else {
            const errorData = await response.json();
            console.error(`Fehler ${response.status}: ${errorData.message}`);
            testStatus.innerText = `Test fehlgeschlagen: Fehler ${response.status}: ${errorData.message}`;
            testStatus.style.color = 'rgb(150,30,50)';
        }
    } catch (error) {
        console.error('Fehler beim Senden', error.message);
        testStatus.innerText = `Test konnte nicht ausgeführt werden! Fehler: ${error.message}`;
        testStatus.style.color = 'rgb(150,30,50)';
    }
});
//TestListener-End

const mainNav = document.getElementById('main-nav');
const moreDropdown = document.getElementById('more-dropdown');
const moreButton = document.getElementById('more-button');
const moreContainer = document.getElementById('more-container');

//Navbar-Functions
function moveBackToMain() {
    while (moreDropdown.children.length > 0) {
        const item = moreDropdown.firstElementChild;
        mainNav.insertBefore(item, moreContainer);
    }
    moreContainer.style.display = 'none';
}
function checkOverflow() {
    moveBackToMain();
    const isOverflowing = mainNav.scrollWidth > mainNav.clientWidth;
    if (isOverflowing) {
        moreContainer.style.display = 'flex';
        const navItems = Array.from(mainNav.children);
        for (let i = navItems.length - 2; i >= 0; i--) {
            const item = navItems[i];
            if (mainNav.scrollWidth > mainNav.clientWidth) {
                moreDropdown.prepend(item);
            } else {
                break;
            }
        }
    } else {
        moreContainer.style.display = 'none';
    }
}

//Content-Switch-Function
function SwitchTo(ContentID) {
    const sections = document.getElementsByTagName('section');
    const errInfo = 'Klicke auf "Startseite" o.ä.';
    let switched = false;
    for (const section of sections) {
        if (section.nodeType === 1) {
            if (section.id === ContentID) {
                section.classList.remove('hidethis');
                console.log('SwitchedTo:', section.id);
                switched = true;
            } else { section.classList.add('hidethis'); }
        }
    }
    if (!switched) {
        console.log(`Cannot SwitchTo(${ContentID}): no section with this ID! Prove section.id in index.html`);
        alert(`Unerwarteter Fehler.\nMach Dir keine Sorgen, wir sind GoldiMental Entertainment.\nEinfach folgendes tun: ${errInfo}`);
    }
}
//Listeners
mainNav.addEventListener('click', (event) => {
    const navElement = event.target.closest('.nav-link');
    if (navElement) {
        const ContentID = navElement.dataset.ziel;
        if (ContentID) { SwitchTo(ContentID); }
    }
});
moreButton.addEventListener('click', (e) => {
    e.stopPropagation();
    moreDropdown.classList.toggle('hidethis');
});
document.addEventListener('click', (event) => {
    const target = event.target;
    const targetElement = target.closest('.nav-link');
    if (targetElement && targetElement.dataset.ziel) {
        SwitchTo(targetElement.dataset.ziel);
        moreDropdown.classList.add('hidethis');
        return;
    }
    if (!moreContainer.contains(target)) { moreDropdown.classList.add('hidethis'); }
});

//Navbar-Observer
window.addEventListener('resize', () => {
    checkOverflow();
    moreDropdown.classList.add('hidethis');
});

//Onload
checkOverflow();