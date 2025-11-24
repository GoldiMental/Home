//

const ContentView = document.getElementById('Content');
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
async function SwitchTo(ContentID) {
    const API = `http://localhost:3000/api/views/${ContentID}`;
    const response = await fetch(API);
    if (!response.ok) {
        console.error('Failed to fetch in SwitchTo() with ContentID:',ContentID);
    }
    const Content = await response.text();
    ContentView.innerHTML = Content;
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

//Navbar-Observer
window.addEventListener('resize', () => {
    checkOverflow();
    moreDropdown.classList.add('hidethis');
});

//Onload
checkOverflow();