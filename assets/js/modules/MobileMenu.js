class MobileMenu {
    constructor() {
        this.mobileMenuButton = document.querySelector('.nav__button');
        this.events();
    }

    // Events
    events() {
        this.mobileMenuButton.addEventListener('click', this.toggleMenu );
    }

    // Methods
    toggleMenu() {
		document.body.classList.toggle('menu__open');
    }
}

export default MobileMenu;
