(function (factory) {
  typeof define === 'function' && define.amd ? define('main', factory) :
  factory();
}((function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var MobileMenu = /*#__PURE__*/function () {
    function MobileMenu() {
      _classCallCheck(this, MobileMenu);

      this.mobileMenuButton = document.querySelector('.nav__button');
      this.events();
    } // Events


    _createClass(MobileMenu, [{
      key: "events",
      value: function events() {
        this.mobileMenuButton.addEventListener('click', this.toggleMenu);
      } // Methods

    }, {
      key: "toggleMenu",
      value: function toggleMenu() {
        document.body.classList.toggle('menu__open');
      }
    }]);

    return MobileMenu;
  }();

  var HeaderScroll = /*#__PURE__*/function () {
    function HeaderScroll() {
      _classCallCheck(this, HeaderScroll);

      this.width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      this.header = document.querySelector('header.HeaderScroll');
      this.didScroll = 0;
      this.lastScrollTop = 0;
      this.delta = 5;
      this.navbarHeight = this.setNavbarHeight();
      this.maxWidth = 768;
      this.events();
    } // Events


    _createClass(HeaderScroll, [{
      key: "events",
      value: function events() {
        var _this = this;

        if (this.header) {
          document.body.onmousemove = function (e) {
            var pageY = e.pageY || e.clientY,
                scrollTop = window.pageYOffset || document.documentElement.scrollTop,
                trigger_area = pageY - scrollTop,
                trigger_threshold = _this.navbarHeight;

            if (trigger_area <= trigger_threshold) {
              _this.header.classList.remove('header__wrapper--hidden');
            }
          }; // set on scroll behavior


          window.onscroll = function () {
            _this.didScroll = true;
          };

          setInterval(function () {
            if (_this.didScroll) {
              _this.menuOnScroll();

              _this.didScroll = false;
            }
          }, 250);
        }
      } // Methods

    }, {
      key: "setNavbarHeight",
      value: function setNavbarHeight() {
        if (this.header) {
          return this.header.offsetHeight;
        } else {
          return 0;
        }
      }
    }, {
      key: "getCurrentScroll",
      value: function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
      }
    }, {
      key: "menuOnScroll",
      value: function menuOnScroll() {
        var currentScroll = this.getCurrentScroll();
        var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

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
    }]);

    return HeaderScroll;
  }();

  // 3rd party

  new MobileMenu();
  new HeaderScroll();

})));
