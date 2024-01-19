(function () {
    "use strict";
  
    // ======= Sticky
    window.onscroll = function () {
      // const ud_header = document.querySelector(".ud-header");
      // const sticky = ud_header.offsetTop;
      // const logo = document.querySelector(".header-logo");
  
      // if (window.pageYOffset > sticky) {
      //   ud_header.classList.add("sticky");
      // } else {
      //   ud_header.classList.remove("sticky");
      // }
  
      // // === logo change
      // if (ud_header.classList.contains("sticky")) {
      //   logo.src = "assets/images/logo/logo.svg";
      // } else {
      //   logo.src = "assets/images/logo/logo-white.svg";
      // }
  
      // show or hide the back-top-top button
      
    };
  
    // ===== responsive navbar
    
  
    //===== close navbar-collapse when a  clicked
    
  
    // ===== Sub-menu
    const submenuItems = document.querySelectorAll(".submenu-item");
    submenuItems.forEach((el) => {
      el.querySelector("a").addEventListener("click", () => {
        el.querySelector(".submenu").classList.toggle("hidden");
      });
    });
  
    // ===== Faq accordion
   
  
    // ===== wow js
    new WOW().init();
  
    // ====== scroll top js
    function scrollTo(element, to = 0, duration = 500) {
      const start = element.scrollTop;
      const change = to - start;
      const increment = 20;
      let currentTime = 0;
  
      const animateScroll = () => {
        currentTime += increment;
  
        const val = Math.easeInOutQuad(currentTime, start, change, duration);
  
        element.scrollTop = val;
  
        if (currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
      };
  
      animateScroll();
    }
  
    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
  
    document.querySelector(".back-to-top").onclick = () => {
      scrollTo(document.documentElement);
    };
  })();
  