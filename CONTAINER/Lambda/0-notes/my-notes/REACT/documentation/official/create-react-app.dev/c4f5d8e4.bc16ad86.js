(window.webpackJsonp = window.webpackJsonp || []).push([
  [36],
  {
    129: function (e, t, a) {
      "use strict";
      const n = (e, { target: t = document.body } = {}) => {
        const a = document.createElement("textarea"),
          n = document.activeElement;
        (a.value = e),
          a.setAttribute("readonly", ""),
          (a.style.contain = "strict"),
          (a.style.position = "absolute"),
          (a.style.left = "-9999px"),
          (a.style.fontSize = "12pt");
        const r = document.getSelection();
        let o = !1;
        r.rangeCount > 0 && (o = r.getRangeAt(0)),
          t.append(a),
          a.select(),
          (a.selectionStart = 0),
          (a.selectionEnd = e.length);
        let l = !1;
        try {
          l = document.execCommand("copy");
        } catch (s) {}
        return (
          a.remove(),
          o && (r.removeAllRanges(), r.addRange(o)),
          n && n.focus(),
          l
        );
      };
      (e.exports = n), (e.exports.default = n);
    },
    130: function (e, t) {
      e.exports.parse = function (e) {
        var t = e.split(",").map(function (e) {
          return (function (e) {
            if (/^-?\d+$/.test(e)) return parseInt(e, 10);
            var t;
            if (
              (t = e.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/))
            ) {
              var a = t[1],
                n = t[2],
                r = t[3];
              if (a && r) {
                var o = [],
                  l = (a = parseInt(a)) < (r = parseInt(r)) ? 1 : -1;
                ("-" != n && ".." != n && "\u2025" != n) || (r += l);
                for (var s = a; s != r; s += l) o.push(s);
                return o;
              }
            }
            return [];
          })(e);
        });
        return 0 === t.length
          ? []
          : 1 === t.length
          ? Array.isArray(t[0])
            ? t[0]
            : t
          : t.reduce(function (e, t) {
              return (
                Array.isArray(e) || (e = [e]),
                Array.isArray(t) || (t = [t]),
                e.concat(t)
              );
            });
      };
    },
    134: function (e, t, a) {
      "use strict";
      var n = a(2),
        r = a(0),
        o = a.n(r),
        l = a(118),
        s = {
          plain: { backgroundColor: "#2a2734", color: "#9a86fd" },
          styles: [
            {
              types: ["comment", "prolog", "doctype", "cdata", "punctuation"],
              style: { color: "#6c6783" },
            },
            { types: ["namespace"], style: { opacity: 0.7 } },
            {
              types: ["tag", "operator", "number"],
              style: { color: "#e09142" },
            },
            { types: ["property", "function"], style: { color: "#9a86fd" } },
            {
              types: ["tag-id", "selector", "atrule-id"],
              style: { color: "#eeebff" },
            },
            { types: ["attr-name"], style: { color: "#c4b9fe" } },
            {
              types: [
                "boolean",
                "string",
                "entity",
                "url",
                "attr-value",
                "keyword",
                "control",
                "directive",
                "unit",
                "statement",
                "regex",
                "at-rule",
                "placeholder",
                "variable",
              ],
              style: { color: "#ffcc99" },
            },
            {
              types: ["deleted"],
              style: { textDecorationLine: "line-through" },
            },
            { types: ["inserted"], style: { textDecorationLine: "underline" } },
            { types: ["italic"], style: { fontStyle: "italic" } },
            { types: ["important", "bold"], style: { fontWeight: "bold" } },
            { types: ["important"], style: { color: "#c4b9fe" } },
          ],
        },
        c = { Prism: a(20).a, theme: s };
      function i(e, t, a) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: a,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = a),
          e
        );
      }
      function u() {
        return (u =
          Object.assign ||
          function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var a = arguments[t];
              for (var n in a)
                Object.prototype.hasOwnProperty.call(a, n) && (e[n] = a[n]);
            }
            return e;
          }).apply(this, arguments);
      }
      var p = /\r\n|\r|\n/,
        m = function (e) {
          0 === e.length
            ? e.push({ types: ["plain"], content: "", empty: !0 })
            : 1 === e.length && "" === e[0].content && (e[0].empty = !0);
        },
        d = function (e, t) {
          var a = e.length;
          return a > 0 && e[a - 1] === t ? e : e.concat(t);
        },
        y = function (e, t) {
          var a = e.plain,
            n = Object.create(null),
            r = e.styles.reduce(function (e, a) {
              var n = a.languages,
                r = a.style;
              return (
                (n && !n.includes(t)) ||
                  a.types.forEach(function (t) {
                    var a = u({}, e[t], r);
                    e[t] = a;
                  }),
                e
              );
            }, n);
          return (
            (r.root = a), (r.plain = u({}, a, { backgroundColor: null })), r
          );
        };
      function g(e, t) {
        var a = {};
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) &&
            -1 === t.indexOf(n) &&
            (a[n] = e[n]);
        return a;
      }
      var f = (function (e) {
          function t() {
            for (var t = this, a = [], n = arguments.length; n--; )
              a[n] = arguments[n];
            e.apply(this, a),
              i(this, "getThemeDict", function (e) {
                if (
                  void 0 !== t.themeDict &&
                  e.theme === t.prevTheme &&
                  e.language === t.prevLanguage
                )
                  return t.themeDict;
                (t.prevTheme = e.theme), (t.prevLanguage = e.language);
                var a = e.theme ? y(e.theme, e.language) : void 0;
                return (t.themeDict = a);
              }),
              i(this, "getLineProps", function (e) {
                var a = e.key,
                  n = e.className,
                  r = e.style,
                  o = u({}, g(e, ["key", "className", "style", "line"]), {
                    className: "token-line",
                    style: void 0,
                    key: void 0,
                  }),
                  l = t.getThemeDict(t.props);
                return (
                  void 0 !== l && (o.style = l.plain),
                  void 0 !== r &&
                    (o.style = void 0 !== o.style ? u({}, o.style, r) : r),
                  void 0 !== a && (o.key = a),
                  n && (o.className += " " + n),
                  o
                );
              }),
              i(this, "getStyleForToken", function (e) {
                var a = e.types,
                  n = e.empty,
                  r = a.length,
                  o = t.getThemeDict(t.props);
                if (void 0 !== o) {
                  if (1 === r && "plain" === a[0])
                    return n ? { display: "inline-block" } : void 0;
                  if (1 === r && !n) return o[a[0]];
                  var l = n ? { display: "inline-block" } : {},
                    s = a.map(function (e) {
                      return o[e];
                    });
                  return Object.assign.apply(Object, [l].concat(s));
                }
              }),
              i(this, "getTokenProps", function (e) {
                var a = e.key,
                  n = e.className,
                  r = e.style,
                  o = e.token,
                  l = u({}, g(e, ["key", "className", "style", "token"]), {
                    className: "token " + o.types.join(" "),
                    children: o.content,
                    style: t.getStyleForToken(o),
                    key: void 0,
                  });
                return (
                  void 0 !== r &&
                    (l.style = void 0 !== l.style ? u({}, l.style, r) : r),
                  void 0 !== a && (l.key = a),
                  n && (l.className += " " + n),
                  l
                );
              });
          }
          return (
            e && (t.__proto__ = e),
            (t.prototype = Object.create(e && e.prototype)),
            (t.prototype.constructor = t),
            (t.prototype.render = function () {
              var e = this.props,
                t = e.Prism,
                a = e.language,
                n = e.code,
                r = e.children,
                o = this.getThemeDict(this.props),
                l = t.languages[a];
              return r({
                tokens: (function (e) {
                  for (
                    var t = [[]],
                      a = [e],
                      n = [0],
                      r = [e.length],
                      o = 0,
                      l = 0,
                      s = [],
                      c = [s];
                    l > -1;

                  ) {
                    for (; (o = n[l]++) < r[l]; ) {
                      var i = void 0,
                        u = t[l],
                        y = a[l][o];
                      if (
                        ("string" == typeof y
                          ? ((u = l > 0 ? u : ["plain"]), (i = y))
                          : ((u = d(u, y.type)),
                            y.alias && (u = d(u, y.alias)),
                            (i = y.content)),
                        "string" == typeof i)
                      ) {
                        var g = i.split(p),
                          f = g.length;
                        s.push({ types: u, content: g[0] });
                        for (var h = 1; h < f; h++)
                          m(s),
                            c.push((s = [])),
                            s.push({ types: u, content: g[h] });
                      } else
                        l++, t.push(u), a.push(i), n.push(0), r.push(i.length);
                    }
                    l--, t.pop(), a.pop(), n.pop(), r.pop();
                  }
                  return m(s), c;
                })(void 0 !== l ? t.tokenize(n, l, a) : [n]),
                className: "prism-code language-" + a,
                style: void 0 !== o ? o.root : {},
                getLineProps: this.getLineProps,
                getTokenProps: this.getTokenProps,
              });
            }),
            t
          );
        })(r.Component),
        h = a(129),
        v = a.n(h),
        b = a(130),
        k = a.n(b),
        E = a(117),
        j = {
          plain: { color: "#bfc7d5", backgroundColor: "#292d3e" },
          styles: [
            {
              types: ["comment"],
              style: { color: "rgb(105, 112, 152)", fontStyle: "italic" },
            },
            {
              types: ["string", "inserted"],
              style: { color: "rgb(195, 232, 141)" },
            },
            { types: ["number"], style: { color: "rgb(247, 140, 108)" } },
            {
              types: ["builtin", "char", "constant", "function"],
              style: { color: "rgb(130, 170, 255)" },
            },
            {
              types: ["punctuation", "selector"],
              style: { color: "rgb(199, 146, 234)" },
            },
            { types: ["variable"], style: { color: "rgb(191, 199, 213)" } },
            {
              types: ["class-name", "attr-name"],
              style: { color: "rgb(255, 203, 107)" },
            },
            {
              types: ["tag", "deleted"],
              style: { color: "rgb(255, 85, 114)" },
            },
            { types: ["operator"], style: { color: "rgb(137, 221, 255)" } },
            { types: ["boolean"], style: { color: "rgb(255, 88, 116)" } },
            { types: ["keyword"], style: { fontStyle: "italic" } },
            {
              types: ["doctype"],
              style: { color: "rgb(199, 146, 234)", fontStyle: "italic" },
            },
            { types: ["namespace"], style: { color: "rgb(178, 204, 214)" } },
            { types: ["url"], style: { color: "rgb(221, 221, 221)" } },
          ],
        },
        N = a(125),
        O = function () {
          var e = Object(E.a)().siteConfig.themeConfig.prism,
            t = void 0 === e ? {} : e,
            a = Object(N.a)().isDarkTheme,
            n = t.theme || j,
            r = t.darkTheme || n;
          return a ? r : n;
        },
        x = a(47),
        w = a.n(x),
        C = /{([\d,-]+)}/,
        T = function (e) {
          void 0 === e && (e = ["js", "jsBlock", "jsx", "python", "html"]);
          var t = {
              js: { start: "\\/\\/", end: "" },
              jsBlock: { start: "\\/\\*", end: "\\*\\/" },
              jsx: { start: "\\{\\s*\\/\\*", end: "\\*\\/\\s*\\}" },
              python: { start: "#", end: "" },
              html: { start: "\x3c!--", end: "--\x3e" },
            },
            a = [
              "highlight-next-line",
              "highlight-start",
              "highlight-end",
            ].join("|"),
            n = e
              .map(function (e) {
                return (
                  "(?:" + t[e].start + "\\s*(" + a + ")\\s*" + t[e].end + ")"
                );
              })
              .join("|");
          return new RegExp("^\\s*(?:" + n + ")\\s*$");
        },
        S = /title=".*"/;
      t.a = function (e) {
        var t = e.children,
          a = e.className,
          s = e.metastring,
          i = Object(E.a)().siteConfig.themeConfig.prism,
          u = void 0 === i ? {} : i,
          p = Object(r.useState)(!1),
          m = p[0],
          d = p[1],
          y = Object(r.useState)(!1),
          g = y[0],
          h = y[1];
        Object(r.useEffect)(function () {
          h(!0);
        }, []);
        var b = Object(r.useRef)(null),
          j = [],
          N = "",
          x = O();
        if (s && C.test(s)) {
          var L = s.match(C)[1];
          j = k.a.parse(L).filter(function (e) {
            return e > 0;
          });
        }
        s &&
          S.test(s) &&
          (N = s.match(S)[0].split("title=")[1].replace(/"+/g, ""));
        var B = a && a.replace(/language-/, "");
        !B && u.defaultLanguage && (B = u.defaultLanguage);
        var A = t.replace(/\n$/, "");
        if (0 === j.length && void 0 !== B) {
          for (
            var P,
              D = "",
              R = (function (e) {
                switch (e) {
                  case "js":
                  case "javascript":
                  case "ts":
                  case "typescript":
                    return T(["js", "jsBlock"]);
                  case "jsx":
                  case "tsx":
                    return T(["js", "jsBlock", "jsx"]);
                  case "html":
                    return T(["js", "jsBlock", "html"]);
                  case "python":
                  case "py":
                    return T(["python"]);
                  default:
                    return T();
                }
              })(B),
              I = t.replace(/\n$/, "").split("\n"),
              _ = 0;
            _ < I.length;

          ) {
            var W = _ + 1,
              $ = I[_].match(R);
            if (null !== $) {
              switch (
                $.slice(1).reduce(function (e, t) {
                  return e || t;
                }, void 0)
              ) {
                case "highlight-next-line":
                  D += W + ",";
                  break;
                case "highlight-start":
                  P = W;
                  break;
                case "highlight-end":
                  D += P + "-" + (W - 1) + ",";
              }
              I.splice(_, 1);
            } else _ += 1;
          }
          (j = k.a.parse(D)), (A = I.join("\n"));
        }
        var z = function () {
          v()(A),
            d(!0),
            setTimeout(function () {
              return d(!1);
            }, 2e3);
        };
        return o.a.createElement(
          f,
          Object(n.a)({}, c, {
            key: String(g),
            theme: x,
            code: A,
            language: B,
          }),
          function (e) {
            var t,
              a,
              r = e.className,
              s = e.style,
              c = e.tokens,
              i = e.getLineProps,
              u = e.getTokenProps;
            return o.a.createElement(
              o.a.Fragment,
              null,
              N &&
                o.a.createElement(
                  "div",
                  { style: s, className: w.a.codeBlockTitle },
                  N
                ),
              o.a.createElement(
                "div",
                { className: w.a.codeBlockContent },
                o.a.createElement(
                  "button",
                  {
                    ref: b,
                    type: "button",
                    "aria-label": "Copy code to clipboard",
                    className: Object(l.a)(
                      w.a.copyButton,
                      ((t = {}), (t[w.a.copyButtonWithTitle] = N), t)
                    ),
                    onClick: z,
                  },
                  m ? "Copied" : "Copy"
                ),
                o.a.createElement(
                  "div",
                  {
                    tabIndex: 0,
                    className: Object(l.a)(
                      r,
                      w.a.codeBlock,
                      ((a = {}), (a[w.a.codeBlockWithTitle] = N), a)
                    ),
                  },
                  o.a.createElement(
                    "div",
                    { className: w.a.codeBlockLines, style: s },
                    c.map(function (e, t) {
                      1 === e.length &&
                        "" === e[0].content &&
                        (e[0].content = "\n");
                      var a = i({ line: e, key: t });
                      return (
                        j.includes(t + 1) &&
                          (a.className =
                            a.className + " docusaurus-highlight-code-line"),
                        o.a.createElement(
                          "div",
                          Object(n.a)({ key: t }, a),
                          e.map(function (e, t) {
                            return o.a.createElement(
                              "span",
                              Object(n.a)({ key: t }, u({ token: e, key: t }))
                            );
                          })
                        )
                      );
                    })
                  )
                )
              )
            );
          }
        );
      };
    },
    95: function (e, t, a) {
      "use strict";
      a.r(t);
      var n = a(0),
        r = a.n(n),
        o = a(119),
        l = a(117),
        s = a(120),
        c = a(123),
        i = a(134),
        u = a(118),
        p = a(96),
        m = a.n(p),
        d = [
          {
            title: "Less to Learn",
            content:
              "You don't need to learn and configure many build tools. Instant reloads help you focus on development. When it's time to deploy, your bundles are optimized automatically.",
          },
          {
            title: "Only One Dependency",
            content:
              "Your app only needs one build dependency. We test Create React App to make sure that all of its underlying pieces work together seamlessly \u2013 no complicated version mismatches.",
          },
          {
            title: "No Lock-In",
            content:
              "Under the hood, we use webpack, Babel, ESLint, and other amazing projects to power your app. If you ever want an advanced configuration, you can \u201deject\u201d from Create React App and edit their config files directly.",
          },
        ];
      t.default = function () {
        var e = Object(l.a)().siteConfig,
          t = void 0 === e ? {} : e;
        return r.a.createElement(
          c.a,
          {
            permalink: "/",
            description: "Set up a modern web app by running one command.",
          },
          r.a.createElement(
            "div",
            { className: Object(u.a)("hero hero--dark", m.a.heroBanner) },
            r.a.createElement(
              "div",
              { className: "container" },
              r.a.createElement("img", {
                className: Object(u.a)(m.a.heroBannerLogo, "margin-vert--md"),
                alt: "Create React App logo",
                src: Object(s.a)("img/logo.svg"),
              }),
              r.a.createElement("h1", { className: "hero__title" }, t.title),
              r.a.createElement(
                "p",
                { className: "hero__subtitle" },
                t.tagline
              ),
              r.a.createElement(
                "div",
                { className: m.a.getStarted },
                r.a.createElement(
                  o.a,
                  {
                    className:
                      "button button--outline button--primary button--lg",
                    to: Object(s.a)("docs/getting-started"),
                  },
                  "Get Started"
                )
              )
            )
          ),
          d &&
            d.length &&
            r.a.createElement(
              "div",
              { className: m.a.features },
              r.a.createElement(
                "div",
                { className: "container" },
                r.a.createElement(
                  "div",
                  { className: "row" },
                  d.map(function (e, t) {
                    var a = e.title,
                      n = e.content;
                    return r.a.createElement(
                      "div",
                      {
                        key: t,
                        className: Object(u.a)("col col--4", m.a.feature),
                      },
                      r.a.createElement("h2", null, a),
                      r.a.createElement("p", null, n)
                    );
                  })
                )
              )
            ),
          r.a.createElement(
            "div",
            { className: m.a.gettingStartedSection },
            r.a.createElement(
              "div",
              { className: "container padding-vert--xl text--left" },
              r.a.createElement(
                "div",
                { className: "row" },
                r.a.createElement(
                  "div",
                  { className: "col col--4 col--offset-1" },
                  r.a.createElement("h2", null, "Get started in seconds"),
                  r.a.createElement(
                    "p",
                    null,
                    "Whether you\u2019re using React or another library, Create React App lets you ",
                    r.a.createElement(
                      "strong",
                      null,
                      "focus on code, not build tools"
                    ),
                    ".",
                    r.a.createElement("br", null),
                    r.a.createElement("br", null),
                    "To create a project called ",
                    r.a.createElement("i", null, "my-app"),
                    ", run this command:"
                  ),
                  r.a.createElement(
                    i.a,
                    { className: "language-sh" },
                    "npx create-react-app my-app"
                  ),
                  r.a.createElement("br", null)
                ),
                r.a.createElement(
                  "div",
                  { className: "col col--5 col--offset-1" },
                  r.a.createElement("img", {
                    className: m.a.featureImage,
                    alt: "Easy to get started in seconds",
                    src: "https://camo.githubusercontent.com/29765c4a32f03bd01d44edef1cd674225e3c906b/68747470733a2f2f63646e2e7261776769742e636f6d2f66616365626f6f6b2f6372656174652d72656163742d6170702f323762343261632f73637265656e636173742e737667",
                  })
                )
              )
            )
          ),
          r.a.createElement(
            "div",
            null,
            r.a.createElement(
              "div",
              { className: "container padding-vert--xl text--left" },
              r.a.createElement(
                "div",
                { className: "row" },
                r.a.createElement(
                  "div",
                  { className: "col col--4 col--offset-1" },
                  r.a.createElement("img", {
                    className: m.a.featureImage,
                    alt: "Easy to update",
                    src: Object(s.a)("img/update.png"),
                  })
                ),
                r.a.createElement(
                  "div",
                  { className: "col col--5 col--offset-1" },
                  r.a.createElement("h2", null, "Easy to Maintain"),
                  r.a.createElement(
                    "p",
                    null,
                    "Updating your build tooling is typically a daunting and time-consuming task. When new versions of Create React App are released, you can upgrade using a single command:"
                  ),
                  r.a.createElement(
                    i.a,
                    { className: "language-sh" },
                    "npm install react-scripts@latest"
                  )
                )
              )
            )
          )
        );
      };
    },
  },
]);
