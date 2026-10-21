// Cielra EYE — shared behaviour
(function () {
  var hdr = document.querySelector('.hdr');
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  var hero = document.querySelector('.hero, .page-hero');

  // header solid-on-scroll + over-dark toggle when a dark hero is present
  function onScroll() {
    if (!hdr) return;
    var scrolled = window.scrollY > 40;
    hdr.classList.toggle('scrolled', scrolled);
    if (hero) {
      var h = hero.offsetHeight - 90;
      hdr.classList.toggle('over-dark', window.scrollY < h && hero.classList.contains('page-hero'));
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // mobile menu
  if (burger && nav) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // current year
  var y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
