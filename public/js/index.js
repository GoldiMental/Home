//
let currentView;
let lastLoadedScript = null;
const ContentView = document.getElementById('Content');
const mainNav = document.getElementById('main-nav');
const moreDropdown = document.getElementById('more-dropdown');
const moreButton = document.getElementById('more-button');
const moreContainer = document.getElementById('more-container');

//Navbar-Observer-Functions
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
            } else { break; }
        }
    }
}

//Content-Switch-Function
async function SwitchTo(ContentID) {
    if (currentView != ContentID) {
        const API = `https://www.goldimental.de/api/views/${ContentID}`;
        //const API = `http://localhost:3000/api/views/${ContentID}`;
        try {
            const response = await fetch(API);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Serverfehler (${response.status}: ${errorText})`);
            }
            const Content = await response.text();
            if (lastLoadedScript) {
                lastLoadedScript.remove();
                lastLoadedScript = null;
            }
            const newScript = document.createElement('script');
            newScript.src = `/js/${ContentID}.js`;
            document.body.appendChild(newScript);
            lastLoadedScript = newScript;
            ContentView.innerHTML = Content;
            currentView = ContentID;
        } catch (error) {
            console.error(`Content-Switch-Fehler: ${error.message}`);
            ContentView.innerHTML = `<p>Fehler in der Navigation: ${error.message}</p>`
        }
    }
}
//Stylesheet-Loader for Content.EJS-Moduls and Content.JS Logik
function loadStylesheet(href) {
    if (document.querySelector(`link[href="${href}"]`)) {
        console.log(`Stylesheet "${href}" bereits geladen...`);
        return;
    };
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    link.onerror = () => {
        console.error(`Fehler beim Laden des Stylesheets "${href}"`);
    };
}
//Listeners
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
document.getElementById('Content').addEventListener('click', function (event) {
    const clickedElement = event.target.closest('[data-action="handle-click"]');
    if (clickedElement) {
        if (clickedElement.id === 'test-button' && typeof window.handleTestClick === 'function'){
            window.handleTestClick(clickedElement);
        }
    }
});
//Navbar-Observer
window.addEventListener('resize', () => {
    checkOverflow();
    moreDropdown.classList.add('hidethis');
});

//Onload
checkOverflow();
SwitchTo('Start');