(window["canvasWebpackJsonp"] = window["canvasWebpackJsonp"] || []).push([
  [41],
  {
    "08kA": function (e, n, t) {
      "use strict";
      var a = t("s4NR"),
        r = t("CxY0"),
        s = t("U6jy");
      function o(e) {
        return e && e.rel;
      }
      function d(e, n) {
        function t(t) {
          e[t] = s(n, { rel: t });
        }
        n.rel.split(/\s+/).forEach(t);
        return e;
      }
      function c(e, n) {
        var t = n.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
        t && (e[t[1]] = t[2]);
        return e;
      }
      function i(e) {
        try {
          var n = e.match(/<?([^>]*)>(.*)/),
            t = n[1],
            o = n[2].split(";"),
            d = r.parse(t),
            i = a.parse(d.query);
          o.shift();
          var _ = o.reduce(c, {});
          _ = s(i, _);
          _.url = t;
          return _;
        } catch (e) {
          return null;
        }
      }
      e.exports = function (e) {
        if (!e) return null;
        return e.split(/,\s*</).map(i).filter(o).reduce(d, {});
      };
    },
    "4Ogu": function (e, n, t) {
      "use strict";
      t.d(n, "a", function () {
        return l;
      });
      var a = t("VTBJ");
      var r = t("ouhR");
      var s = t.n(r);
      var o = t("zidk");
      var d = t("08kA");
      var c = t.n(d);
      var i = t("etQE");
      function _({ path: e, params: n }) {
        const t = s.a.param(n);
        if (!t.length) return e;
        return `${e}?${t}`;
      }
      async function l({
        path: e,
        method: n = "GET",
        headers: t = {},
        params: r = {},
        body: s,
        fetchOpts: d = {},
      }) {
        const l = Object(a["a"])({}, i["e"]);
        l.headers["X-CSRF-Token"] = Object(o["a"])("_csrf_token");
        if (s && "string" !== typeof s) {
          s = JSON.stringify(s);
          l.headers["Content-Type"] = "application/json";
        }
        Object.assign(l.headers, t);
        Object.assign(l, d);
        const b = _({ path: e, params: r });
        const u = await fetch(b, Object(a["a"])({ body: s, method: n }, l));
        if (!u.ok) {
          const e = new Error(
            `doFetchApi received a bad response: ${u.status} ${u.statusText}`
          );
          e.response = u;
          throw e;
        }
        const g = c()(u.headers.get("Link"));
        const h = await u.text();
        const f = h.length > 0 ? JSON.parse(h) : null;
        return { json: f, response: u, link: g };
      }
    },
    "6V2X": function (e, n, t) {
      "use strict";
      t.d(n, "a", function () {
        return b;
      });
      var a = t("An8g");
      var r = t("Ff2n");
      var s = t("pQTu");
      var o = t("m0r6");
      Object(o["a"])(
        JSON.parse(
          '{"ar":{"copy_to_64f8456b":"?????? ??????..."},"ca":{"copy_to_64f8456b":"Copia a..."},"cy":{"copy_to_64f8456b":"Cop??o I..."},"da":{"copy_to_64f8456b":"Kopier til ..."},"da-x-k12":{"copy_to_64f8456b":"Kopier til ..."},"de":{"copy_to_64f8456b":"Kopieren nach ..."},"en-AU":{"copy_to_64f8456b":"Copy To..."},"en-AU-x-unimelb":{"copy_to_64f8456b":"Copy To..."},"en-CA":{"copy_to_64f8456b":"Copy To..."},"en-GB":{"copy_to_64f8456b":"Copy To..."},"en-GB-x-ukhe":{"copy_to_64f8456b":"Copy To..."},"es":{"copy_to_64f8456b":"Copiar a..."},"fa":{"copy_to_64f8456b":"?????? ???? ..."},"fi":{"copy_to_64f8456b":"Kopioi kohteeseen..."},"fr":{"copy_to_64f8456b":"Copier dans..."},"fr-CA":{"copy_to_64f8456b":"Copi?? ?????"},"ht":{"copy_to_64f8456b":"Kopye Nan..."},"is":{"copy_to_64f8456b":"Afrita til???"},"it":{"copy_to_64f8456b":"Copia a..."},"ja":{"copy_to_64f8456b":"????????????..."},"mi":{"copy_to_64f8456b":"T??rua k?? ..."},"nb":{"copy_to_64f8456b":"Kopier til..."},"nb-x-k12":{"copy_to_64f8456b":"Kopier til..."},"nl":{"copy_to_64f8456b":"Kopi??ren naar..."},"nn":{"copy_to_64f8456b":"Kopier til..."},"pl":{"copy_to_64f8456b":"Kopiuj do..."},"pt":{"copy_to_64f8456b":"Copiar para..."},"pt-BR":{"copy_to_64f8456b":"C??pia para..."},"ru":{"copy_to_64f8456b":"???????????????????? ??..."},"sv":{"copy_to_64f8456b":"Kopiera till..."},"sv-x-k12":{"copy_to_64f8456b":"Kopiera till..."},"zh-Hans":{"copy_to_64f8456b":"?????????..."},"zh-Hant":{"copy_to_64f8456b":"?????????..."}}'
        )
      );
      t("jQeR");
      t("0sPK");
      var d = s["default"].scoped("direct_share_course_tray");
      var c = t("q1tI");
      var i = t.n(c);
      var _ = t("xGaD");
      const l = Object(c["lazy"])(() =>
        Promise.all([
          t.e(7),
          t.e(9),
          t.e(11),
          t.e(29),
          t.e(135),
          t.e(685),
        ]).then(t.bind(null, "mftS"))
      );
      function b(e) {
        let n = e.sourceCourseId,
          t = e.contentSelection,
          s = e.onDismiss,
          o = Object(r["a"])(e, [
            "sourceCourseId",
            "contentSelection",
            "onDismiss",
          ]);
        return i.a.createElement(
          _["a"],
          Object.assign(
            {
              label: d.t("Copy To..."),
              placement: "end",
              onDismiss: s,
              padding: "medium",
            },
            o
          ),
          Object(a["a"])(l, {
            sourceCourseId: n,
            contentSelection: t,
            onCancel: s,
          })
        );
      }
    },
    BxIY: function (e, n, t) {
      "use strict";
      t.d(n, "a", function () {
        return m;
      });
      var a = t("An8g");
      var r = t("Ff2n");
      var s = t("pQTu");
      var o = t("m0r6");
      Object(o["a"])(
        JSON.parse(
          '{"ar":{"close_d634289d":"??????????"},"ca":{"close_d634289d":"Tanca"},"cy":{"close_d634289d":"Cau"},"da":{"close_d634289d":"Luk"},"da-x-k12":{"close_d634289d":"Luk"},"de":{"close_d634289d":"Schlie??en"},"el":{"close_d634289d":"????????????????"},"en-AU":{"close_d634289d":"Close"},"en-AU-x-unimelb":{"close_d634289d":"Close"},"en-CA":{"close_d634289d":"Close"},"en-GB":{"close_d634289d":"Close"},"en-GB-x-lbs":{"close_d634289d":"Close"},"en-GB-x-ukhe":{"close_d634289d":"Close"},"es":{"close_d634289d":"Cerrar"},"fa":{"close_d634289d":"????????"},"fi":{"close_d634289d":"Sulje"},"fr":{"close_d634289d":"Fermer"},"fr-CA":{"close_d634289d":"Fermer"},"he":{"close_d634289d":"??????????"},"ht":{"close_d634289d":"F??men"},"hu":{"close_d634289d":"Bez??r??s"},"hy":{"close_d634289d":"??????????"},"is":{"close_d634289d":"Loka"},"it":{"close_d634289d":"Chiudi"},"ja":{"close_d634289d":"?????????"},"ko":{"close_d634289d":"??????"},"mi":{"close_d634289d":"Katia"},"nb":{"close_d634289d":"Lukk"},"nb-x-k12":{"close_d634289d":"Lukk"},"nl":{"close_d634289d":"Sluiten"},"nn":{"close_d634289d":"Lukk"},"pl":{"close_d634289d":"Zamknij"},"pt":{"close_d634289d":"Fechar"},"pt-BR":{"close_d634289d":"Fechar"},"ru":{"close_d634289d":"??????????????"},"sl":{"close_d634289d":"Zapri"},"sv":{"close_d634289d":"St??ng"},"sv-x-k12":{"close_d634289d":"St??ng"},"tr":{"close_d634289d":"Kapat"},"uk":{"close_d634289d":"??????????????"},"zh-Hans":{"close_d634289d":"??????"},"zh-Hant":{"close_d634289d":"??????"}}'
        )
      );
      t("jQeR");
      t("0sPK");
      var d = s["default"].scoped("canvas_modal");
      var c = t("q1tI");
      var i = t.n(c);
      t("17x9");
      var _ = t("Mmr1");
      var l = t("S4Kx");
      var b = t("TstA");
      var u = t("msMH");
      var g = t("Dibh");
      var h = t("p9+C");
      var f = t("z3Sh");
      var p = t("RtEy");
      var v = t.n(p);
      m.defaultProps = {
        padding: "small",
        errorImageUrl: v.a,
        footer: null,
        title: null,
        closeButtonSize: "small",
      };
      function m(e) {
        let n = e.padding,
          t = e.errorSubject,
          s = e.errorCategory,
          o = e.errorImageUrl,
          c = e.label,
          p = e.title,
          v = e.onDismiss,
          m = e.children,
          y = e.footer,
          j = e.closeButtonSize,
          k = Object(r["a"])(e, [
            "padding",
            "errorSubject",
            "errorCategory",
            "errorImageUrl",
            "label",
            "title",
            "onDismiss",
            "children",
            "footer",
            "closeButtonSize",
          ]);
        null == p && (p = c);
        return i.a.createElement(
          g["a"],
          Object.assign({ label: c, onDismiss: v }, k),
          Object(a["a"])(
            g["a"].Header,
            {},
            void 0,
            Object(a["a"])(
              b["a"],
              {},
              void 0,
              Object(a["a"])(
                b["a"].Item,
                { grow: true },
                void 0,
                Object(a["a"])(u["a"], {}, void 0, p)
              ),
              Object(a["a"])(
                b["a"].Item,
                {},
                void 0,
                Object(a["a"])(
                  _["a"],
                  { onClick: v, size: j },
                  void 0,
                  d.t("Close")
                )
              )
            )
          ),
          Object(a["a"])(
            g["a"].Body,
            { padding: n },
            void 0,
            Object(a["a"])(
              l["a"],
              { as: "div", height: "100%" },
              void 0,
              Object(a["a"])(
                h["a"],
                {
                  errorComponent: Object(a["a"])(f["a"], {
                    imageUrl: o,
                    errorSubject: t,
                    errorCategory: s,
                  }),
                },
                void 0,
                m
              )
            )
          ),
          y &&
            Object(a["a"])(
              g["a"].Footer,
              {},
              void 0,
              "function" === typeof y ? y() : y
            )
        );
      }
    },
    EUQ6: function (e, n, t) {
      "use strict";
      t.d(n, "a", function () {
        return s;
      });
      var a = t("17x9");
      const r = Object(a["shape"])({
        id: a["string"].isRequired,
        display_name: a["string"].isRequired,
        avatar_image_url: a["string"],
      });
      n["b"] = r;
      Object(a["shape"])({
        id: a["string"].isRequired,
        name: a["string"].isRequired,
        avatar_url: a["string"],
        email: a["string"],
      });
      const s = Object(a["shape"])({
        id: a["string"].isRequired,
        name: a["string"].isRequired,
        avatar_image_url: a["string"],
        html_url: a["string"].isRequired,
      });
    },
    U6jy: function (e, n) {
      e.exports = a;
      var t = Object.prototype.hasOwnProperty;
      function a() {
        var e = {};
        for (var n = 0; n < arguments.length; n++) {
          var a = arguments[n];
          for (var r in a) t.call(a, r) && (e[r] = a[r]);
        }
        return e;
      }
    },
    eCn1: function (e, n, t) {
      "use strict";
      t.d(n, "a", function () {
        return m;
      });
      var a = t("An8g");
      var r = t("Ff2n");
      var s = t("pQTu");
      var o = t("m0r6");
      Object(o["a"])(
        JSON.parse(
          '{"ar":{"close_d634289d":"??????????"},"ca":{"close_d634289d":"Tanca"},"cy":{"close_d634289d":"Cau"},"da":{"close_d634289d":"Luk"},"da-x-k12":{"close_d634289d":"Luk"},"de":{"close_d634289d":"Schlie??en"},"el":{"close_d634289d":"????????????????"},"en-AU":{"close_d634289d":"Close"},"en-AU-x-unimelb":{"close_d634289d":"Close"},"en-CA":{"close_d634289d":"Close"},"en-GB":{"close_d634289d":"Close"},"en-GB-x-lbs":{"close_d634289d":"Close"},"en-GB-x-ukhe":{"close_d634289d":"Close"},"es":{"close_d634289d":"Cerrar"},"fa":{"close_d634289d":"????????"},"fi":{"close_d634289d":"Sulje"},"fr":{"close_d634289d":"Fermer"},"fr-CA":{"close_d634289d":"Fermer"},"he":{"close_d634289d":"??????????"},"ht":{"close_d634289d":"F??men"},"hu":{"close_d634289d":"Bez??r??s"},"hy":{"close_d634289d":"??????????"},"is":{"close_d634289d":"Loka"},"it":{"close_d634289d":"Chiudi"},"ja":{"close_d634289d":"?????????"},"ko":{"close_d634289d":"??????"},"mi":{"close_d634289d":"Katia"},"nb":{"close_d634289d":"Lukk"},"nb-x-k12":{"close_d634289d":"Lukk"},"nl":{"close_d634289d":"Sluiten"},"nn":{"close_d634289d":"Lukk"},"pl":{"close_d634289d":"Zamknij"},"pt":{"close_d634289d":"Fechar"},"pt-BR":{"close_d634289d":"Fechar"},"ru":{"close_d634289d":"??????????????"},"sl":{"close_d634289d":"Zapri"},"sv":{"close_d634289d":"St??ng"},"sv-x-k12":{"close_d634289d":"St??ng"},"tr":{"close_d634289d":"Kapat"},"uk":{"close_d634289d":"??????????????"},"zh-Hans":{"close_d634289d":"??????"},"zh-Hant":{"close_d634289d":"??????"}}'
        )
      );
      t("jQeR");
      t("0sPK");
      var d = s["default"].scoped("tray");
      var c = t("q1tI");
      var i = t.n(c);
      t("17x9");
      var _ = t("Mmr1");
      var l = t("S4Kx");
      var b = t("TstA");
      var u = t("msMH");
      var g = t("7Hz5");
      var h = t("p9+C");
      var f = t("z3Sh");
      var p = t("RtEy");
      var v = t.n(p);
      m.defaultProps = {
        padding: "small",
        contentPadding: "0",
        errorImageUrl: v.a,
      };
      function m(e) {
        var n, t, s;
        let o = e.padding,
          c = e.headerPadding,
          p = e.contentPadding,
          v = e.errorSubject,
          m = e.errorCategory,
          y = e.errorImageUrl,
          j = e.label,
          k = e.title,
          C = e.onDismiss,
          S = e.children,
          O = Object(r["a"])(e, [
            "padding",
            "headerPadding",
            "contentPadding",
            "errorSubject",
            "errorCategory",
            "errorImageUrl",
            "label",
            "title",
            "onDismiss",
            "children",
          ]);
        null == c && (c = `0 0 ${o} 0`);
        null == k && (k = j);
        function x() {
          return Object(a["a"])(
            b["a"],
            { as: "div", padding: c },
            void 0,
            n ||
              (n = Object(a["a"])(
                b["a"].Item,
                { grow: true },
                void 0,
                Object(a["a"])(u["a"], { ellipsis: true }, void 0, k)
              )),
            Object(a["a"])(
              b["a"].Item,
              {},
              void 0,
              Object(a["a"])(
                _["a"],
                { onClick: C, size: "small" },
                void 0,
                d.t("Close")
              )
            )
          );
        }
        function A() {
          return Object(a["a"])(
            h["a"],
            {
              errorComponent:
                t ||
                (t = Object(a["a"])(f["a"], {
                  imageUrl: y,
                  errorSubject: v,
                  errorCategory: m,
                })),
            },
            void 0,
            s ||
              (s = Object(a["a"])(
                l["a"],
                { as: "div", padding: p, width: "100%", height: "100%" },
                void 0,
                S
              ))
          );
        }
        return i.a.createElement(
          g["a"],
          Object.assign({ label: j, onDismiss: C }, O),
          Object(a["a"])(
            l["a"],
            {
              as: "div",
              padding: o,
              position: "absolute",
              insetBlockStart: "0",
              insetBlockEnd: "0",
              insetInlineStart: "0",
              insetInlineEnd: "0",
            },
            void 0,
            Object(a["a"])(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                },
              },
              void 0,
              x(),
              Object(a["a"])(
                "div",
                { style: { position: "relative", flex: 1 } },
                void 0,
                A()
              )
            )
          )
        );
      }
    },
    "p9+C": function (e, n, t) {
      "use strict";
      t.d(n, "a", function () {
        return s;
      });
      var a = t("q1tI");
      var r = t.n(a);
      t("17x9");
      class s extends r.a.Component {
        constructor(...e) {
          super(...e);
          this.state = { hasError: false, error: null };
        }
        static getDerivedStateFromError(e) {
          return { hasError: true, error: e };
        }
        componentDidCatch(e, n) {
          console.error(e, n);
        }
        render() {
          if (this.state.hasError)
            return r.a.cloneElement(this.props.errorComponent, {
              errorSubject: this.state.error.message,
            });
          return this.props.children;
        }
      }
    },
    ppA4: function (e, n, t) {
      "use strict";
      t.d(n, "a", function () {
        return y;
      });
      var a = t("An8g");
      var r = t("VTBJ");
      var s = t("ODXe");
      var o = t("Ff2n");
      var d = t("pQTu");
      var c = t("m0r6");
      Object(c["a"])(
        JSON.parse(
          '{"ar":{"cancel_caeb1e68":"??????????","content_share_started_successfully_2c37fb79":"???? ?????? ???????????? ?????????????? ??????????","error_starting_content_share_18fb1532":"?????? ?????? ?????????? ?????? ???????????? ??????????????","loading_bde52856":"?????? ???????? ??????????????...","send_e3bd0ed0":"??????????","send_to_b940900a":"?????????? ?????? ...","starting_content_share_2d8c2999":"???????? ?????? ???????????? ??????????????"},"ca":{"cancel_caeb1e68":"Cancel??la","content_share_started_successfully_2c37fb79":"S\'ha comen??at a compartir el contingut correctament","error_starting_content_share_18fb1532":"Error en comen??a a compartir el contingut","loading_bde52856":"S\'est?? carregant","send_e3bd0ed0":"Envia","send_to_b940900a":"Envia a...","starting_content_share_2d8c2999":"S\'est?? comen??ant a compartir el contingut"},"cy":{"cancel_caeb1e68":"Canslo","content_share_started_successfully_2c37fb79":"Rhannu cynnwys wedi dechrau\'n llwyddiannus","error_starting_content_share_18fb1532":"Gwall wrth ddechrau rhannu cynnwys","loading_bde52856":"Wrthi???n llwytho","send_e3bd0ed0":"Anfon","send_to_b940900a":"Anfon At...","starting_content_share_2d8c2999":"Dechrau rhannu cynnwys"},"da":{"cancel_caeb1e68":"Annuller","content_share_started_successfully_2c37fb79":"Indholdsdelingen blev p??begyndt","error_starting_content_share_18fb1532":"Fejl ved p??begyndelse af indholdsdeling","loading_bde52856":"Indl??ser","send_e3bd0ed0":"Send","send_to_b940900a":"Send til ...","starting_content_share_2d8c2999":"Starter indholdsdeling"},"da-x-k12":{"cancel_caeb1e68":"Annuller","content_share_started_successfully_2c37fb79":"Indholdsdelingen blev p??begyndt","error_starting_content_share_18fb1532":"Fejl ved p??begyndelse af indholdsdeling","loading_bde52856":"Indl??ser","send_e3bd0ed0":"Send","send_to_b940900a":"Send til ...","starting_content_share_2d8c2999":"Starter indholdsdeling"},"de":{"cancel_caeb1e68":"Abbrechen","content_share_started_successfully_2c37fb79":"Inhaltsfreigabe erfolgreich gestartet","error_starting_content_share_18fb1532":"Fehler beim Starten der Inhaltsfreigabe","loading_bde52856":"Wird geladen","send_e3bd0ed0":"Senden","send_to_b940900a":"Senden an ...","starting_content_share_2d8c2999":"Starten der Inhaltsfreigabe"},"el":{"cancel_caeb1e68":"??????????????","loading_bde52856":"??????????????","send_e3bd0ed0":"????????????????"},"en-AU":{"cancel_caeb1e68":"Cancel","content_share_started_successfully_2c37fb79":"Content share started successfully","error_starting_content_share_18fb1532":"Error starting content share","loading_bde52856":"Loading","send_e3bd0ed0":"Send","send_to_b940900a":"Send To...","starting_content_share_2d8c2999":"Starting content share"},"en-AU-x-unimelb":{"cancel_caeb1e68":"Cancel","content_share_started_successfully_2c37fb79":"Content share started successfully","error_starting_content_share_18fb1532":"Error starting content share","loading_bde52856":"Loading","send_e3bd0ed0":"Send","send_to_b940900a":"Send To...","starting_content_share_2d8c2999":"Starting content share"},"en-CA":{"cancel_caeb1e68":"Cancel","content_share_started_successfully_2c37fb79":"Content share started successfully","error_starting_content_share_18fb1532":"Error starting content share","loading_bde52856":"Loading","send_e3bd0ed0":"Send","send_to_b940900a":"Send To...","starting_content_share_2d8c2999":"Starting content share"},"en-GB":{"cancel_caeb1e68":"Cancel","content_share_started_successfully_2c37fb79":"Content share started successfully","error_starting_content_share_18fb1532":"Error starting content share","loading_bde52856":"Loading","send_e3bd0ed0":"Send","send_to_b940900a":"Send To...","starting_content_share_2d8c2999":"Starting content share"},"en-GB-x-lbs":{"cancel_caeb1e68":"Cancel","loading_bde52856":"Loading","send_e3bd0ed0":"Send"},"en-GB-x-ukhe":{"cancel_caeb1e68":"Cancel","content_share_started_successfully_2c37fb79":"Content share started successfully","error_starting_content_share_18fb1532":"Error starting content share","loading_bde52856":"Loading","send_e3bd0ed0":"Send","send_to_b940900a":"Send To...","starting_content_share_2d8c2999":"Starting content share"},"es":{"cancel_caeb1e68":"Cancelar","content_share_started_successfully_2c37fb79":"El contenido comenz?? a compartirse correctamente","error_starting_content_share_18fb1532":"Ocurri?? un error al comenzar a compartir contenido","loading_bde52856":"Cargando","send_e3bd0ed0":"Enviar","send_to_b940900a":"Enviar a...","starting_content_share_2d8c2999":"Comenzando a compartir contenido"},"fa":{"cancel_caeb1e68":"??????","content_share_started_successfully_2c37fb79":"???????????? ???????????? ???? ???????????? ???????? ????","error_starting_content_share_18fb1532":"?????? ???? ???????? ???? ???????????? ?????????? ??????????","loading_bde52856":"???? ?????? ????????????????","send_e3bd0ed0":"??????????","send_to_b940900a":"?????????? ???? ...","starting_content_share_2d8c2999":"???????? ???? ???????????? ?????????? ????????????"},"fi":{"cancel_caeb1e68":"Peruuta","content_share_started_successfully_2c37fb79":"Sis??ll??n jako aloitettiin onnistuneesti","error_starting_content_share_18fb1532":"Virhe sis??ll??n jaon aloittamisessa","loading_bde52856":"Ladataan","send_e3bd0ed0":"L??het??","send_to_b940900a":"L??het?? kohteeseen...","starting_content_share_2d8c2999":"Sis??ll??n jako aloitetaan"},"fr":{"cancel_caeb1e68":"Annuler","content_share_started_successfully_2c37fb79":"Le partage de contenu a ??t?? lanc?? avec succ??s","error_starting_content_share_18fb1532":"Erreur lors du lancement du partage de contenu","loading_bde52856":"En cours de chargement","send_e3bd0ed0":"Envoyer","send_to_b940900a":"Envoyer ??...","starting_content_share_2d8c2999":"Lancement du partage de contenu"},"fr-CA":{"cancel_caeb1e68":"Annuler","content_share_started_successfully_2c37fb79":"Le partage de contenu a d??marr?? avec succ??s","error_starting_content_share_18fb1532":"Une erreur est survenue lors du d??marrage du partage de contenu","loading_bde52856":"Chargement","send_e3bd0ed0":"Envoyer","send_to_b940900a":"Envoyer ?????","starting_content_share_2d8c2999":"D??marrage du partage de contenu"},"he":{"cancel_caeb1e68":"??????????","loading_bde52856":"????????","send_e3bd0ed0":"??????????"},"ht":{"cancel_caeb1e68":"Anile","content_share_started_successfully_2c37fb79":"Pataj kontni k??manse ak siks??","error_starting_content_share_18fb1532":"Er?? nan demaraj pataj kontni","loading_bde52856":"Chajman","send_e3bd0ed0":"Voye","send_to_b940900a":"Voye Bay...","starting_content_share_2d8c2999":"Demaraj pataj kontni"},"hu":{"cancel_caeb1e68":"M??gse","content_share_started_successfully_2c37fb79":"Tartalom megoszt??s sikeresen elindult","error_starting_content_share_18fb1532":"Tartalom megoszt??s elind??t??sa nem siker??lt","loading_bde52856":"T??lt??dik","send_e3bd0ed0":"K??ld??s","starting_content_share_2d8c2999":"Tartalom megoszt??s ind??t??sa"},"hy":{"cancel_caeb1e68":"???????????? ??????????????","loading_bde52856":"?????????????? ??","send_e3bd0ed0":"????????????????"},"is":{"cancel_caeb1e68":"H??tta vi??","content_share_started_successfully_2c37fb79":"Efnisdeiling h??fst giftusamlega","error_starting_content_share_18fb1532":"Villa vi?? a?? byrja efnisdeilingu","loading_bde52856":"S??ki","send_e3bd0ed0":"Senda","send_to_b940900a":"Senda til???","starting_content_share_2d8c2999":"Byrja efnisdeilingu"},"it":{"cancel_caeb1e68":"Annulla","content_share_started_successfully_2c37fb79":"La condivisione dei contenuti ?? iniziata con successo","error_starting_content_share_18fb1532":"Errore nell???avvio della condivisione dei contenuti","loading_bde52856":"Caricamento in corso","send_e3bd0ed0":"Invia","send_to_b940900a":"Invia a...","starting_content_share_2d8c2999":"Inizio della condivisione dei contenuti"},"ja":{"cancel_caeb1e68":"???????????????","content_share_started_successfully_2c37fb79":"?????????????????????????????????????????????????????????","error_starting_content_share_18fb1532":"?????????????????????????????????????????????","loading_bde52856":"???????????????","send_e3bd0ed0":"??????","send_to_b940900a":"?????????...","starting_content_share_2d8c2999":"?????????????????????????????????"},"ko":{"cancel_caeb1e68":"??????","send_e3bd0ed0":"?????????"},"mi":{"cancel_caeb1e68":"Whakakore","content_share_started_successfully_2c37fb79":"Te tuari ihirangi i timata pai","error_starting_content_share_18fb1532":"He hapa i te w?? e timata ana te tuari ihirangi","loading_bde52856":"E tukuake ana","send_e3bd0ed0":"Tukua","send_to_b940900a":"Tukua ki ...","starting_content_share_2d8c2999":"E timata tuari ihirangi"},"nb":{"cancel_caeb1e68":"Avbryt","content_share_started_successfully_2c37fb79":"Innholdsdeling startet vellykket","error_starting_content_share_18fb1532":"Avvik under start av innholdsdeling","loading_bde52856":"Laster","send_e3bd0ed0":"Send","send_to_b940900a":"Send til...","starting_content_share_2d8c2999":"Starter innholdsdeling"},"nb-x-k12":{"cancel_caeb1e68":"Avbryt","content_share_started_successfully_2c37fb79":"Innholdsdeling startet vellykket","error_starting_content_share_18fb1532":"Avvik under start av innholdsdeling","loading_bde52856":"Laster","send_e3bd0ed0":"Send","send_to_b940900a":"Send til...","starting_content_share_2d8c2999":"Starter innholdsdeling"},"nl":{"cancel_caeb1e68":"Annuleren","content_share_started_successfully_2c37fb79":"Contentshare is gestart","error_starting_content_share_18fb1532":"Fout bij starten van contentshare","loading_bde52856":"Bezig met laden...","send_e3bd0ed0":"Versturen","send_to_b940900a":"Verzenden naar...","starting_content_share_2d8c2999":"Contentshare starten"},"nn":{"cancel_caeb1e68":"Avbryt","content_share_started_successfully_2c37fb79":"Innhaldsdeling er starta","error_starting_content_share_18fb1532":"Det oppstod ein feil under oppstart av innhaldsdeling","loading_bde52856":"Lastar","send_e3bd0ed0":"Send","send_to_b940900a":"Send til...","starting_content_share_2d8c2999":"Startar innhaldsdeling"},"pl":{"cancel_caeb1e68":"Anuluj","content_share_started_successfully_2c37fb79":"Pomy??lnie rozpocz??to udost??pnianie zawarto??ci","error_starting_content_share_18fb1532":"B????d podczas udost??pniania zawarto??ci","loading_bde52856":"Trwa ??adowanie","send_e3bd0ed0":"Wy??lij","send_to_b940900a":"Wy??lij do...","starting_content_share_2d8c2999":"Rozpoczynanie udost??pniania zawarto??ci"},"pt":{"cancel_caeb1e68":"Cancelar","content_share_started_successfully_2c37fb79":"O partilhamento de conte??do foi iniciado com sucesso","error_starting_content_share_18fb1532":"Erro ao iniciar o partilhamento de conte??do","loading_bde52856":"Carregando","send_e3bd0ed0":"Enviar","send_to_b940900a":"Enviar para...","starting_content_share_2d8c2999":"A iniciar o partilhamento de conte??do"},"pt-BR":{"cancel_caeb1e68":"Cancelar","content_share_started_successfully_2c37fb79":"Compartilhamento de conte??do iniciado com sucesso","error_starting_content_share_18fb1532":"Erro ao iniciar compartilhamento de conte??do","loading_bde52856":"Carregando","send_e3bd0ed0":"Enviar","send_to_b940900a":"Enviar para...","starting_content_share_2d8c2999":"Iniciando compartilhamento de conte??do"},"ru":{"cancel_caeb1e68":"????????????????","content_share_started_successfully_2c37fb79":"?????????? ???????????? ?? ???????????????? ?????????????? ??????????????","error_starting_content_share_18fb1532":"???????????? ?????????????? ???????????? ?????????????? ?? ????????????????","loading_bde52856":"????????????????","send_e3bd0ed0":"??????????????????","send_to_b940900a":"?????????????????? ??...","starting_content_share_2d8c2999":"???????????? ???????????? ?????????????? ?? ????????????????"},"sl":{"cancel_caeb1e68":"Prekli??i","loading_bde52856":"Nalaganje","send_e3bd0ed0":"Po??lji"},"sv":{"cancel_caeb1e68":"Avbryt","content_share_started_successfully_2c37fb79":"Inneh??llsdelning startades","error_starting_content_share_18fb1532":"Fel vid start av inneh??llsdelning","loading_bde52856":"Laddar","send_e3bd0ed0":"Skicka","send_to_b940900a":"Skicka till...","starting_content_share_2d8c2999":"Startar inneh??llsdelning"},"sv-x-k12":{"cancel_caeb1e68":"Avbryt","content_share_started_successfully_2c37fb79":"Inneh??llsdelning startades","error_starting_content_share_18fb1532":"Fel vid start av inneh??llsdelning","loading_bde52856":"Laddar","send_e3bd0ed0":"Skicka","send_to_b940900a":"Skicka till...","starting_content_share_2d8c2999":"Startar inneh??llsdelning"},"tr":{"cancel_caeb1e68":"??ptal","content_share_started_successfully_2c37fb79":"????erik payla????m?? ba??ar??l?? bir ??ekilde ba??lat??ld??","loading_bde52856":"Y??kleniyor","send_e3bd0ed0":"G??nder"},"uk":{"cancel_caeb1e68":"??????????????????","loading_bde52856":"????????????????????????","send_e3bd0ed0":"??????????????????"},"zh-Hans":{"cancel_caeb1e68":"??????","content_share_started_successfully_2c37fb79":"???????????????????????????","error_starting_content_share_18fb1532":"????????????????????????","loading_bde52856":"??????","send_e3bd0ed0":"??????","send_to_b940900a":"?????????...","starting_content_share_2d8c2999":"??????????????????"},"zh-Hant":{"cancel_caeb1e68":"??????","content_share_started_successfully_2c37fb79":"???????????????????????????","error_starting_content_share_18fb1532":"??????????????????????????????","loading_bde52856":"????????????","send_e3bd0ed0":"??????","send_to_b940900a":"?????????...","starting_content_share_2d8c2999":"??????????????????"}}'
        )
      );
      t("jQeR");
      t("0sPK");
      var i = d["default"].scoped("direct_share_user_modal");
      var _ = t("q1tI");
      var l = t.n(_);
      t("17x9");
      var b = t("L+/K");
      var u = t("Xx/m");
      var g = t("uSnb");
      var h = t("S4Kx");
      var f = t("BxIY");
      t("qBwj");
      var p = t("dqQ7");
      var v = t("4Ogu");
      const m = Object(_["lazy"])(() =>
        Promise.all([t.e(7), t.e(9), t.e(11), t.e(653)]).then(
          t.bind(null, "FB/m")
        )
      );
      function y(e) {
        let n = e.contentShare,
          t = e.courseId,
          d = Object(o["a"])(e, ["contentShare", "courseId"]);
        const c = Object(_["useState"])([]),
          y = Object(s["a"])(c, 2),
          j = y[0],
          k = y[1];
        const C = Object(_["useState"])(null),
          S = Object(s["a"])(C, 2),
          O = S[0],
          x = S[1];
        const A = Object(_["useRef"])(d.open);
        function E() {
          k([]);
          x(null);
        }
        function z(e) {
          j.find((n) => n.id === e.id) || k(j.concat([e]));
        }
        function L(e) {
          k(j.filter((n) => n.id !== e.id));
        }
        function I() {
          return Object(v["a"])({
            method: "POST",
            path: "/api/v1/users/self/content_shares",
            body: Object(r["a"])(
              Object(r["a"])({}, n),
              {},
              { receiver_ids: j.map((e) => e.id) }
            ),
          });
        }
        function T() {
          x("info");
          I()
            .then(B)
            .catch((e) => {
              console.error(e);
              e.response && console.error(e.response);
              x("error");
            });
        }
        function B() {
          Object(p["c"])(i.t("Content share started successfully"))();
          d.onDismiss();
        }
        function R() {
          return l.a.createElement(
            l.a.Fragment,
            null,
            Object(a["a"])(
              u["a"],
              { onClick: d.onDismiss },
              void 0,
              i.t("Cancel")
            ),
            Object(a["a"])(
              u["a"],
              {
                disabled: 0 === j.length || "info" === O,
                variant: "primary",
                margin: "0 0 0 x-small",
                onClick: T,
              },
              void 0,
              i.t("Send")
            )
          );
        }
        const w = Object(a["a"])(
          h["a"],
          { as: "div", textAlign: "center" },
          void 0,
          Object(a["a"])(g["a"], { renderTitle: i.t("Loading") })
        );
        if (d.open !== A.current) {
          A.current = d.open;
          E();
        }
        let F = "";
        "info" === O
          ? (F = i.t("Starting content share"))
          : "error" === O && (F = i.t("Error starting content share"));
        const K = F
          ? Object(a["a"])(
              b["a"],
              { variant: O },
              void 0,
              Object(a["a"])(
                "div",
                {
                  role: "alert",
                  "aria-live": "assertive",
                  "aria-atomic": true,
                },
                void 0,
                F
              ),
              "info" === O
                ? Object(a["a"])(g["a"], { renderTitle: F, size: "x-small" })
                : null
            )
          : null;
        return l.a.createElement(
          f["a"],
          Object.assign({ label: i.t("Send To..."), size: "medium" }, d, {
            footer: Object(a["a"])(R, {}),
          }),
          Object(a["a"])(
            _["Suspense"],
            { fallback: w },
            void 0,
            K,
            Object(a["a"])(m, {
              courseId: t,
              selectedUsers: j,
              onUserSelected: z,
              onUserRemoved: L,
            })
          )
        );
      }
    },
    qBwj: function (e, n, t) {
      "use strict";
      var a = t("17x9");
      var r = t("EUQ6");
      const s = Object(a["shape"])({
        id: a["string"],
        display_name: a["string"],
        url: a["string"],
      });
      var o = s;
      const d = Object(a["shape"])({
        id: a["string"].isRequired,
        progress_url: a["string"],
        user_id: a["string"],
        workflow_state: Object(a["oneOf"])([
          "created",
          "exporting",
          "exported",
          "failed",
        ]),
        attachment: o,
      });
      var c = d;
      const i = [
        "assignment",
        "discussion_topic",
        "page",
        "quiz",
        "module",
        "module_item",
      ];
      Object(a["shape"])({
        id: a["string"].isRequired,
        name: a["string"].isRequired,
        content_type: Object(a["oneOf"])(i).isRequired,
        created_at: a["string"].isRequired,
        updated_at: a["string"].isRequired,
        read_state: a["string"].isRequired,
        sender: r["b"].isRequired,
        content_export: c,
      });
    },
    xGaD: function (e, n, t) {
      "use strict";
      t.d(n, "a", function () {
        return u;
      });
      var a = t("An8g");
      var r = t("Ff2n");
      var s = t("pQTu");
      var o = t("m0r6");
      Object(o["a"])(
        JSON.parse(
          '{"ar":{"loading_25990131":"???????? ??????????????..."},"ca":{"loading_25990131":"S\'est?? carregant..."},"cy":{"loading_25990131":"Wrthi???n llwytho..."},"da":{"loading_25990131":"Indl??ser ..."},"da-x-k12":{"loading_25990131":"Indl??ser ..."},"de":{"loading_25990131":"Wird geladen ..."},"el":{"loading_25990131":"??????????????..."},"en-AU":{"loading_25990131":"Loading..."},"en-AU-x-unimelb":{"loading_25990131":"Loading..."},"en-CA":{"loading_25990131":"Loading..."},"en-GB":{"loading_25990131":"Loading..."},"en-GB-x-lbs":{"loading_25990131":"Loading..."},"en-GB-x-ukhe":{"loading_25990131":"Loading..."},"es":{"loading_25990131":"Cargando..."},"fa":{"loading_25990131":"???? ?????? ????????????????..."},"fi":{"loading_25990131":"Ladataan..."},"fr":{"loading_25990131":"Chargement..."},"fr-CA":{"loading_25990131":"En cours de chargement..."},"he":{"loading_25990131":"????????..."},"ht":{"loading_25990131":"Chajman..."},"hu":{"loading_25990131":"T??lt??dik..."},"hy":{"loading_25990131":"?????????????? ??..."},"is":{"loading_25990131":"Hle?? inn..."},"it":{"loading_25990131":"Caricamento in corso..."},"ja":{"loading_25990131":"????????????????????????"},"ko":{"loading_25990131":"???????????? ???..."},"mi":{"loading_25990131":"E uta ana ...."},"nb":{"loading_25990131":"Laster..."},"nb-x-k12":{"loading_25990131":"Laster..."},"nl":{"loading_25990131":"Bezig met laden..."},"nn":{"loading_25990131":"Lastar..."},"pl":{"loading_25990131":"Wczytywanie..."},"pt":{"loading_25990131":"A carregar..."},"pt-BR":{"loading_25990131":"Carregando..."},"ru":{"loading_25990131":"?????????????????????? ????????????????..."},"sl":{"loading_25990131":"Nalaganje ..."},"sv":{"loading_25990131":"L??ser in ..."},"sv-x-k12":{"loading_25990131":"L??ser in ..."},"tr":{"loading_25990131":"Y??kleniyor..."},"uk":{"loading_25990131":"????????????????????????..."},"zh-Hans":{"loading_25990131":"???????????????"},"zh-Hant":{"loading_25990131":"??????????????????"}}'
        )
      );
      t("jQeR");
      t("0sPK");
      var d = s["default"].scoped("canvas_lazy_tray");
      var c = t("q1tI");
      var i = t.n(c);
      var _ = t("eCn1");
      var l = t("uSnb");
      var b = t("S4Kx");
      function u(e) {
        let n = e.children,
          t = Object(r["a"])(e, ["children"]);
        const s = Object(a["a"])(
          b["a"],
          { as: "div", textAlign: "center" },
          void 0,
          Object(a["a"])(l["a"], { renderTitle: d.t("Loading...") })
        );
        return i.a.createElement(
          _["a"],
          t,
          Object(a["a"])(c["Suspense"], { fallback: s }, void 0, n)
        );
      }
    },
  },
]);

//# sourceMappingURL=41-c-d4c6b9c421.js.map
