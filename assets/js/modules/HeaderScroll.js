class HeaderScroll {
    constructor()
    {
        this.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        this.header = document.querySelector('header.HeaderScroll');
        this.didScroll = 0;
        this.lastScrollTop = 0;
        this.delta = 5;
        this.navbarHeight = this.setNavbarHeight();
        this.maxWidth = 768;

        this.events();
    }

    // Events
    events()
    {

        if (this.header) {
            document.body.onmousemove =  (e) => {
                let pageY = e.pageY || e.clientY,
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop,
                    trigger_area = pageY - scrollTop,
                    trigger_threshold = this.navbarHeight;

                if (trigger_area <= trigger_threshold) {
                    this.header.classList.remove('header__wrapper--hidden');
                }
            };

            // set on scroll behavior
            window.onscroll = () => {
                this.didScroll = true;
            };

            setInterval(() => {
                if (this.didScroll) {
                    this.menuOnScroll();
                    this.didScroll = false;
                }
            }, 250);
        }

    }

    // Methods
    setNavbarHeight()
    {
        if (this.header) {
            return this.header.offsetHeight;
        } else {
            return 0;
        }
    }

    getCurrentScroll()
    {
        return window.pageYOffset || document.documentElement.scrollTop;
    }

    menuOnScroll()
    {
        let currentScroll = this.getCurrentScroll();
        const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        if (width <= this.maxWidth) {
            return;
        }


        if (Math.abs(this.lastScrollTop - currentScroll) <= this.delta) {
            return;
        }

        if (currentScroll > this.lastScrollTop && currentScroll > this.navbarHeight) {
            this.header.classList.add('header__wrapper--hidden');
        } else {
            if (currentScroll + window.innerHeight < document.documentElement.scrollHeight) {
                this.header.classList.remove('header__wrapper--hidden');
            }
        }

        this.lastScrollTop = currentScroll;
    }

}

export default HeaderScroll;
