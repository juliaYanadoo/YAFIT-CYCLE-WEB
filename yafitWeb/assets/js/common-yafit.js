
/* 스크롤에 따른 헤더 display 여부 */
const innerWidth = window.innerWidth;
let lastScrollTop = 0;

window.addEventListener("scroll", () => { 
	if ( innerWidth <= 768 && pageYOffset >= 1) {toggleMoveScroll();}  
});

function toggleMoveScroll() {
	const scrollTop = window.pageYOffset;
	(scrollTop < 1 || scrollTop > lastScrollTop) ? scrollUp() : scrollDown();
	lastScrollTop = scrollTop;
}
function scrollUp() {
	document.body.classList.add('scrollUp');
	document.body.classList.remove('scrollDown');
}
function scrollDown() {
	document.body.classList.add('scrollDown');
	document.body.classList.remove('scrollUp');
}