/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
import events from "events";

export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}

const burger = document.getElementById("burger");

burger?.addEventListener("click", () => {
	document.querySelector(".nav").classList.add("_active");
})

const navClose = document.getElementById("nav-close");

navClose?.addEventListener("click", () => {
	document.querySelector(".nav").classList.remove("_active");
})

// Блокировка скролла
export const bodyLock = (e) => {
	let widthScrollBar = window.innerWidth - document.documentElement.clientWidth;

	// document.querySelector('.header').style.paddingRight = widthScrollBar + 'px';
	// document.documentElement.style.marginRight = widthScrollBar + 'px';
	document.body.classList.add('_lock');
}

// Удаление блокировки скролла
export const bodyUnLock = (e) => {
	// document.documentElement.style.marginRight = '0px';
	// document.querySelector('.header').style.paddingRight = '0px';
	document.body.classList.remove('_lock');
}

const openPopup = (e) => {
	bodyLock();
	const currentPopup = document.getElementById(e.currentTarget.dataset.popup);
	currentPopup.classList.add("popup_show");

	const hiddenField = currentPopup.querySelector("#order-product");
	if (hiddenField) {
		hiddenField.value = e.currentTarget.dataset.name;
	}
};

const closePopup = (e) => {
	bodyUnLock();
	document.querySelector(".popup_show").classList.remove("popup_show");
};

document.addEventListener("keydown", (e) => {
	if (e.keyCode === 27 && document.querySelector(".popup_show").classList.contains("popup_show")) {
		document.querySelector(".popup_show").classList.remove("popup_show");
		document.body.classList.remove("_lock");
		bodyUnLock();
	}
});

const popup = document.querySelectorAll(".popup");
popup?.forEach(popup => popup.addEventListener("click", (e) => {
	if (!e.target.closest(".popup__content")) {
		e.currentTarget.classList.remove("popup_show");
		document.body.classList.remove("_lock");
		bodyUnLock();
	}
}));

const modalOpenButtonsList = document.querySelectorAll("[data-popup]");
modalOpenButtonsList?.forEach(btn => btn.addEventListener("click", openPopup));

const modalCloseButtonsList = document.querySelectorAll("[data-close]");
modalCloseButtonsList?.forEach(btn => btn.addEventListener("click", closePopup));
