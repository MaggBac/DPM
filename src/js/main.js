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
	'„O nic się nie martwcie, ale w każdej sprawie wasze prośby przedstawiajcie Bogu w modlitwie i błaganiu z dziękczynieniem.” Flp 4, 6', '„Powiodę ślepych drogą, której nie znali, poprowadzę ich ścieżkami, o których nie wiedzieli. Ciemność zamienię w światłość przed nimi, a miejsca nierówne – w równinę.” Iz 42, 16', '„Wszystko, o co prosicie w modlitwie, stanie się wam, tylko wierzcie, że otrzymacie.” Mk 11, 24', '„A nadzieja nie zawodzi, bo miłość Boża rozlana jest w sercach naszych przez Ducha Świętego, który nam jest dany.” 5,5, List do Rzymian', '„I choćbym rozdał na żywność dla ubogich cały swój majątek, i choćbym wydał swoje ciało na spalenie, a miłości bym nie miał, nic nie zyskam.”I Koryntian 13:3']

function randomQuotes() {
	let idx = Math.floor(Math.random() * quotes.length)
	document.getElementById('quote').innerHTML = quotes[idx]
}

randomQuotes()