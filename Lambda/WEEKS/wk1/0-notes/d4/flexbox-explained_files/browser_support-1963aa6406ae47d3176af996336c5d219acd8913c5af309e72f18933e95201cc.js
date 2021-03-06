!(function () {
  function e(e) {
    return "string" == typeof e && /^(\[|\{)/.test(e);
  }
  const s = document.getElementById("init-data");
  if (s)
    try {
      const n = s.getAttribute("value");
      if (e(n)) {
        const s = JSON.parse(n);
        Object.keys(s).forEach((t) => {
          window[t] = e(s[t]) ? JSON.parse(s[t]) : s[t];
        });
      }
    } catch (t) {
      console.error(`Error parsing 'init-data': ${t.message}`);
    }
})();
var NastyBrowserSniffing = {
  init: function () {
    NastyBrowserSniffing.isIE11OrLess() && NastyBrowserSniffing.addIEclasses(),
      NastyBrowserSniffing._hasClassList() &&
        (document.documentElement.classList.add(__browser.platform),
        document.documentElement.classList.add(this.getBrowserClassname()));
  },
  _hasClassList: function () {
    return document.documentElement && document.documentElement.classList;
  },
  isIE11OrLess: function () {
    return "ie" === __browser.name && 1 * __browser.version <= 11;
  },
  getBrowserClassname: function () {
    return __browser.name + __browser.version;
  },
  addIEclasses: function () {
    document.documentElement.className += " " + this.getBrowserClassname();
  },
};
try {
  NastyBrowserSniffing.init();
} catch (e) {}
