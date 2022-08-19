const navBtn = document.querySelector('.hamburger');
const allNavItems = document.querySelectorAll('.link');
const navMobile = document.querySelector('.nav-mobile');
const nav = document.querySelector('.nav');
const footerYear = document.querySelector('.footer-year');

const handleNav = () => {
	navBtn.classList.toggle('is-active');
	nav.classList.toggle('nav-mobile--active');

	allNavItems.forEach((item) => {
		item.addEventListener('dbclick', () => {
			nav.classList.remove('nav-mobile--active');
		});
	});

	allNavItems.forEach((item) => {
		item.addEventListener('dbclick', () => {
			navBtn.classList.remove('is-active');
		});
	});

	handleNavItemsAnimation();
};

const handleNavItemsAnimation = () => {
	let delayTime = 0;

	allNavItems.forEach((item) => {
		item.classList.toggle('nav-items-animation');
		item.style.animationDelay = '.' + delayTime + 's';
		delayTime++;
	});
};

const handleCurrentYear = () => {
	const year = new Date().getFullYear();
	footerYear.innerText = year;
};

handleCurrentYear();

navBtn.addEventListener('click', handleNav);

document.addEventListener('mouseover', (e) => {
	const isDropdownButton = e.target.matches('[data-dropdown-button]');
	if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

	let currentDropdown;
	if (isDropdownButton) {
		currentDropdown = e.target.closest('[data-dropdown]');
		currentDropdown.classList.toggle('active');
	}

	document.querySelectorAll('[data-dropdown].active').forEach((dropdown) => {
		if (dropdown === currentDropdown) return;
		dropdown.classList.remove('active');
	});
});


const quotes = [
	'„O nic się nie martwcie, ale w każdej sprawie wasze prośby przedstawiajcie Bogu w modlitwie i błaganiu z dziękczynieniem.” Flp 4, 6', 'bye', 'lol', 'hello', 'world']

function randomQuotes() {
	let idx = Math.floor(Math.random() * quotes.length)
	document.getElementById('quote').innerHTML = quotes[idx]
}

randomQuotes()


//intencja

