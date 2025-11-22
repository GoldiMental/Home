//
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