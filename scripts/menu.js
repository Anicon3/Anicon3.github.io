const menu = document.getElementsByClassName('menu')[0];
const menu_screen = document.getElementsByClassName('menu-screen')[0];

menu.addEventListener("click", () => {
	console.log(menu);
	menu.classList.toggle('menu-active');
	menu_screen.classList.toggle('menu-onscreen');
});