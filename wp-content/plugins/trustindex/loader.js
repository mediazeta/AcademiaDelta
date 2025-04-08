(() => {
    "use strict";
    class t {
      static setCommonConstants() {
        (this.script = document.currentScript),
          (this.loadedCss = []),
          (this.loadedJs = []);
      }
      static addCSS(t, e, i = !1, s = null) {
        if (
          (void 0 === this.loadedCss && (this.loadedCss = []),
          !t || -1 !== this.loadedCss.indexOf(t))
        )
          return e ? e() : null;
        let r = document.createElement("link");
        return (
          (r.type = "text/css"),
          (r.rel = "stylesheet"),
          (r.href = t),
          i && window !== window.parent && this.isCrossDomainIframe()
            ? window.parent.document.head.appendChild(r)
            : document.head.appendChild(r),
          document.head.appendChild(r),
          "function" == typeof e && r.addEventListener("load", e),
          "function" == typeof s && r.addEventListener("error", s),
          this.loadedCss.push(t)
        );
      }
      static addJS(t, e, i = !1) {
        if (
          (void 0 === this.loadedJs && (this.loadedJs = []),
          !t || -1 !== this.loadedJs.indexOf(t))
        )
          return e ? e() : null;
        let s = document.createElement("script");
        return (
          (s.type = "text/javascript"),
          (s.src = t),
          i && window !== window.parent && this.isCrossDomainIframe()
            ? window.parent.document.head.appendChild(s)
            : document.head.appendChild(s),
          e && s.addEventListener("load", e),
          this.loadedJs.push(t)
        );
      }
      static openWindow(t) {
        let e = document.createElement("a");
        return (
          (e.href = t),
          (e.target = "_blank"),
          (e.rel = "noopener noreferrer nofollow"),
          e.click()
        );
      }
      static getScriptSelector(t) {
        return (
          '[src*=".trustindex."][src*="' +
          t +
          '.js"],[data-src*=".trustindex."][data-src*="' +
          t +
          '.js"]'
        );
      }
      static getScriptKey(t) {
        let e = t.getAttribute("data-src") || t.getAttribute("src"),
          i = e.replace(/.+\?([^&]+)/, "$1");
        return i && i !== e && -1 === i.indexOf("=") ? i : null;
      }
      static getCDNUrl() {
        if (void 0 !== this.cdnUrl && this.cdnUrl) return this.cdnUrl;
        let t = "https://cdn.trustindex.io/";
        if (this.script && this.script.src) {
          let e = this.script.src.split("/");
          e.pop(), (t = e.join("/") + "/");
        }
        return (
          -1 === t.indexOf("trustindex.") && (t = "https://cdn.trustindex.io/"),
          (this.cdnUrl = t),
          t
        );
      }
      static getWidgetUrl(t) {
        return void 0 === t
          ? null
          : this.getCDNUrl() + "widgets/" + t.substring(0, 2) + "/" + t + "/";
      }
      static getDecodedHtml(t) {
        let e = document.createElement("textarea");
        return (e.innerHTML = t), e.value;
      }
      static getRelativeTime(t, e) {
        let i = e.split("|"),
          s = i.shift(),
          r = i.shift(),
          o = [86400, 604800, 2419200, 31536e3],
          a = new Date().getTime() / 1e3 - t;
        for (let t = o.length - 1; t >= 0; t--)
          if (a >= o[t]) {
            let e = Math.floor(a / o[t]),
              r = 2 * t;
            return e > 1 && r++, s.replace("%d", e).replace("%s", i[r]);
          }
        return r;
      }
      static getDevicePixelRatio() {
        let t = 1;
        return (
          void 0 !== window.screen.systemXDPI &&
          void 0 !== window.screen.logicalXDPI &&
          window.screen.systemXDPI > window.screen.logicalXDPI
            ? (t = window.screen.systemXDPI / window.screen.logicalXDPI)
            : void 0 !== window.devicePixelRatio && (t = window.devicePixelRatio),
          Math.min(t, 2)
        );
      }
      static getDefaultAvatarUrl() {
        let t = Math.floor(10 * Math.random()) + 1;
        return (
          this.getCDNUrl() +
          "assets/default-avatar/noprofile-" +
          (t < 10 ? "0" : "") +
          t +
          ".svg"
        );
      }
      static getPageLanguage() {
        return (document.documentElement.lang || "en").substr(0, 2).toLowerCase();
      }
      static getUserLanguage() {
        return (
          navigator.language ||
          navigator.userLanguage ||
          this.getPageLanguage()
        )
          .substr(0, 2)
          .toLowerCase();
      }
      static isAdminUrl(t) {
        let e = t ? new URL(t) : location;
        return (
          /(admin|test)\.trustindex/.test(e.hostname) &&
          -1 === e.href.indexOf("test/widget.html")
        );
      }
      static isAdminEditUrl(t) {
        return (
          void 0 === t && (t = location.href), -1 !== t.indexOf("widget/edit")
        );
      }
      static isCrossDomainIframe() {
        if (window.parent === window) return !1;
        let t = new URL(window.parent.location);
        return (
          t.protocol !== location.protocol ||
          t.hostname !== location.hostname ||
          t.port !== location.port
        );
      }
      static isMobileDevice() {
        return this.isAdminUrl() && !this.isAdminEditUrl()
          ? !!document.querySelector(".widget-editor.mobile")
          : /mobi/i.test(navigator.userAgent || navigator.vendor || window.opera);
      }
      static isWebpSupported(t) {
        if (void 0 !== this.cacheWebpSupported) return t(this.cacheWebpSupported);
        let e = (e) => ((this.cacheWebpSupported = e), t(e)),
          i = new Image();
        (i.onload = () => e(i.width > 0 && i.height > 0)),
          (i.onerror = () => e(!1)),
          (i.src =
            "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA");
      }
      static waitForVisibility(t, e, i = 0) {
        if (t.offsetWidth > 0) return i ? setTimeout(e, i) : e();
        new ResizeObserver(function (t) {
          t[0].target.offsetWidth > 0 && (e(), this.disconnect());
        }).observe(t);
      }
    }
    var e = (t, e, i) =>
      new Promise((s, r) => {
        var o = (t) => {
            try {
              n(i.next(t));
            } catch (t) {
              r(t);
            }
          },
          a = (t) => {
            try {
              n(i.throw(t));
            } catch (t) {
              r(t);
            }
          },
          n = (t) => (t.done ? s(t.value) : Promise.resolve(t.value).then(o, a));
        n((i = i.apply(t, e)).next());
      });
    class i extends t {
      static resize_widgets() {}
      static init() {}
      static init_pager() {
        -1 !==
          decodeURIComponent(location.href).indexOf(
            "page=testimonial-widgets/tabs/create-widget.php",
          ) && (this.destroyWidgets(), this.initWidgetsFromDom(!0));
      }
      static setConstants() {
        this.setCommonConstants(),
          (this.svgs = {
            good: '<svg style="display: inline-block; vertical-align: sub;fill: #0ab21b;position:relative;top:-2px" viewBox="0 0 128 128"><path d="M64 8a56 56 0 1 0 56 56A56 56 0 0 0 64 8zm0 104a48 48 0 1 1 48-48 48 48 0 0 1-48 48zM44 64a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm48-8a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-4.8 21.6a4 4 0 0 1 .6 3.6A24.3 24.3 0 0 1 64 97c-9.7 0-15.7-4.2-19-7.8a22.7 22.7 0 0 1-4.8-8A4 4 0 0 1 44 76h40a4 4 0 0 1 3.2 1.6z"></path></svg>',
            bad: '<svg style="display: inline-block; vertical-align: sub;fill: #383838;margin-top: -1px;position:relative;top:-2px" viewBox="0 0 128 128"><path d="M64 8a56 56 0 1 0 56 56A56 56 0 0 0 64 8zm0 104a48 48 0 1 1 48-48 48 48 0 0 1-48 48zM44 64a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm48-8a8 8 0 1 1-8-8 8 8 0 0 1 8 8zm-5.2 30.2a4 4 0 1 1-5.6 5.6c-10.5-10.4-24-10.4-34.4 0a4 4 0 0 1-5.6-5.6c13.6-13.7 32-13.7 45.6 0z"></path></svg>',
          }),
          (this.additionalLogoStyles = {
            "header-logo": {
              Google: "height: 25px; top: -2px",
              Facebook: "height: 17px",
              Trustindex: "height: 19px",
              Tripadvisor: "height: 24px; top: -2px",
              Airbnb: "height: 26px; top: -3px",
              Yelp: "height: 32px; top: -8px",
              Amazon: "height: 13px; top: 1px",
              Arukereso: "height: 17px; top: 5px",
              Vrbo: "height: 20px; top: -2px",
              BBB: "height: 25px; top: -2px",
              Expedia: "height: 25px; top: -3px",
              Ebay: "height: 25px; top: -2px",
              Sitejabber: "height: 20px; top: 1px",
              Thumbtack: "height: 25px; top: -3px",
              Provenexpert: "height: 25px; top: 1px",
              Hotels: "height: 22px; top: -1px",
              Zillow: "height: 17px",
              Yell: "height: 18px",
              Checkatrade: "height: 15px; top: 2px",
              Capterra: "height: 15px; top: 2px",
              Etsy: "height: 20px; top: 1px",
              WordpressPlugin: "height: 13px; top: 1px",
              AngiesList: "height: 24px; top: -1px",
              OnlinePenztarca: "height: 30px; top: -3px",
              ConsumerAffairs: "height: 30px; top: -3px",
              Reviewsio: "height: 20px; top: 0px",
              Foursquare: "height: 15px; top: 3px",
              Justdial: "height: 15px; top: 3px",
              Houzz: "height: 20px; top: -3px",
              Indeed: "height: 17px; top: 0px",
            },
            "large-logo": {
              Facebook: "width: 145px; height: 28px",
              Google: "width: 110px; height: 35px",
              Yelp: "width: 95px; height: 46px; top: -5px",
              Airbnb: "width: 120px; height: 38px",
              Tripadvisor: "width: 155px; height: 33px",
              Trustpilot: "width: 140px; height: 34px",
              Hotels: "width: 152px; height: 30px",
              Amazon: "width: 120px; height: 25px",
              Bookatable: "height: 27px; left: 7px",
              Foursquare: "height: 20px; top: 3px",
              Trustindex: "width: 152px; height: 26px; top: 3px",
              Booking: "height: 25px",
              Opentable: "height: 35px",
              Capterra: "height: 34px",
              Thumbtack: "height: 34px",
              Fresha: "height: 21px",
              Expedia: "height: 44px",
              Mobilede: "height: 35px",
              Checkatrade: "height: 22px",
              Pricerunner: "height: 21px",
              Easyweddings: "height: 50px; top: 3px",
              Whichtrustedtraders:
                "width: 80px; height: 55px; top: -15px; left: 10px",
              Abia: "width: 100px; height: 41px",
              WordpressPlugin: "height: 35px",
              Zoover: "height: 22px",
              Arukereso: "height: 25px",
              "Arukereso-ro": "height: 29px",
              Pricespy: "height: 39px",
              "Pricespy-dk": "height: 42px",
              "Pricespy-fi": "height: 35px",
              "Pricespy-fr": "height: 31px",
              "Pricespy-no": "height: 43px",
              Szallashu: "height: 26px",
              "Szallashu-com": "height: 29px",
              "Szallashu-cz": "height: 47px",
              "Szallashu-pl": "height: 34px",
              "Szallashu-ro": "height: 29px",
            },
            "small-logo": {
              Facebook: "width: 72px; height: 15px; top: 0px",
              Google: "width: 62px; height: 20px; top: 1px",
              Yelp: "width: 45px; height: 22px; top: -3px",
              Airbnb: "width: 64px; height: 20px",
              Tripadvisor: "width: 97px; height: 21px; top: 1px",
              Trustpilot: "width: 65px; top: 2px",
              Hotels: "width: 100px; height: 20px",
              Amazon: "width: 68px; height: 20px;",
              Bookatable: "width: 83px; height: 15px; top: 1px",
              Foursquare: "width: 98px; height: 13px; top: 3px",
              Trustindex: "width: 95px; top: 2px",
              Booking: "width: 89px; height: 15px; top: 2px",
              Opentable: "width: 100px; height: 23px; top: -1px",
              Capterra: "width: 79px; height: 18px; top: 1px",
              Thumbtack: "width: 88px; height: 20px",
              Fresha: "width: 93px; height: 13px; top: 2px; left: 1px",
              Expedia: "width: 69px; height: 20px; top: 1px",
              Zillow: "width: 76px",
              Reco: "width: 76px",
              Mobilede: "width: 68px; top: 2px",
              Checkatrade: "width: 110px",
              Pricerunner: "width: 102px; height: 14px; top: 1px",
              Easyweddings: "width: 60px; height: 20px",
              Whichtrustedtraders: "width: 34px; height: 23px; top: -1px",
              Abia: "width: 40px",
              Ebay: "top: 2px",
              WordpressPlugin: "height: 12px; top: 1px",
              Arukereso: "width: 92px; height: 15px; top: 3px",
              "Arukereso-bg": "width: 89px; height: 15px; top: 3px",
              "Arukereso-ro": "width: 77px; height: 15px; top: 3px",
              Pricespy: "width: 69px; height: 18px",
              "Pricespy-dk": "width: 64px; height: 18px",
              "Pricespy-fi": "width: 77px; height: 18px",
              "Pricespy-fr": "width: 88px; height: 18px",
              "Pricespy-no": "width: 63px; height: 18px",
              "Pricespy-nu": "width: 63px; height: 18px",
              Szallashu: "width: 76px; height: 13px; top: 2px",
              "Szallashu-com": "width: 95px; height: 18px",
              "Szallashu-cz": "width: 61px; height: 19px; top: 3px",
              "Szallashu-pl": "width: 74px; height: 17px; top: 3px",
              "Szallashu-ro": "width: 100px; height: 19px",
            },
          }),
          (this.richSnippetLoaded =
            document.querySelectorAll(
              'script[src*=".trustindex.io/assets/js/richsnippet.js"], script[type="application/ld+json"][data-trustindex="1"]',
            ).length > 0);
      }
      static loadWidgetsFromDom() {
        return e(this, null, function* () {
          document
            .querySelectorAll(this.getScriptSelector("loader"))
            .forEach((t) => {
              if (t.getAttribute("data-ti-widget-inited")) return;
              t.setAttribute("data-ti-widget-inited", !0);
              let i = this.getScriptKey(t);
              if (!i) return;
              let s = Boolean(t.getAttribute("data-enable-delay-load"));
              if ("SCRIPT" === t.tagName) {
                let e = document.createElement("div");
                (e.key = t.key), t.replaceWith(e), (t = e);
              }
              (t.key = i),
                (t.isTriggerLoad = function (t = 600) {
                  let e = this.getBoundingClientRect();
                  return (
                    e.right <=
                      (window.innerWidth ||
                        document.documentElement.clientWidth) +
                        t &&
                    e.bottom <=
                      (window.innerHeight ||
                        document.documentElement.clientHeight) +
                        t
                  );
                }),
                ((t) => {
                  e(this, null, function* () {
                    let e = yield this.getWidgetHtml(t);
                    if (!1 === e)
                      return (t.innerHTML =
                        '\n\t\t\t\t\t\tWidget not found! Probably it is already deleted or there is typo in its ID.\n\t\t\t\t\t\tWe suggest that you log in to the <a href="https://admin.trustindex.io/" target="_blank">Trustindex system</a> and follow the widget configuration instructions.\n\t\t\t\t\t\tOr, if you don\'t have an account, create one for free at <a href="https://www.trustindex.io?a=sys&c=widget-not-found" target="_blank">www.trustindex.io</a>\n\t\t\t\t\t');
                    if (!e)
                      return t.replaceWith(
                        document.createComment(
                          "Trustindex widget (" + t.key + ") is empty here.",
                        ),
                      );
                    if (/style="[^"]*border: 4px dashed red[^"]*"/.test(e))
                      return (t.innerHTML = e);
                    s ||
                      (s =
                        -1 !== e.indexOf('data-delay-load="1" class="ti-widget'));
                    let i =
                      /(?:data-layout-category="[^"]*floating[^"]*"|data-layout-id="(?:17|21|52|53)")/.test(
                        e,
                      );
                    if (!t.closest("head") || i) {
                      if (((t.contentHtml = e), !this.richSnippetLoaded)) {
                        let t = /data-rich-snippet="([^"]+)"/.exec(e);
                        t &&
                          t[1] &&
                          ((this.richSnippetLoaded = !0),
                          this.addJS(
                            this.getCDNUrl() + "assets/js/richsnippet.js?" + t[1],
                          ));
                      }
                      t.isTriggerLoad(100)
                        ? s
                          ? window.tiElementToWaitForActivity.push(t)
                          : new TrustindexWidget(null, t)
                        : i
                          ? new TrustindexWidget(null, t)
                          : ((t.isWaitForVisibility = !0),
                            window.tiElementToWaitForActivity.push(t));
                    }
                  });
                })(t);
            });
        });
      }
      static initWidgetsFromDom(t = !1, e, i) {
        let s =
          this.widgetsForInit ||
          document.querySelectorAll(
            ".ti-widget:not(.ti-certificate):not(.ti-feed-widget)" +
              (t ? "" : ":not([data-trustindex-widget])"),
          );
        void 0 !== e && s.length
          ? (void 0 === this.widgetsForInit && (this.widgetsForInit = s),
            new TrustindexWidget(s[e]),
            ++e < s.length
              ? setTimeout(() => this.initWidgetsFromDom(t, e, i), 20)
              : (delete this.widgetsForInit, i && i()))
          : (s.forEach((t) => new TrustindexWidget(t)), i && i());
      }
      static getWidgetHtml(t) {
        return e(this, null, function* () {
          let e = this.getWidgetUrl(t.key) + "content.html";
          if ("wp-widget" === t.key) {
            let i = t.getAttribute("data-template-id");
            if (i) {
              let e = document.getElementById(i);
              if (e)
                return (
                  t.removeAttribute("data-template-id"),
                  e.remove(),
                  e.innerHTML
                    .replace(/decoding="async"/g, "")
                    .replace(
                      / (?:src|srcset|data-src|data-srcset|data-ti-src|data-ti-srcset|consent-original-src-_|consent-original-srcset-_|consent-original-data-src-_|consent-original-data-srcset-_)="(?!http)[^"]*"/g,
                      "",
                    )
                    .replace(
                      /data-ti-src="[^"]+lazy\.(png|jpg|jpeg|gif|svg)"/g,
                      "",
                    )
                    .replace(/consent-original-class-_="/g, 'class="')
                    .replace(/consent-original-src-_="/g, 'src="')
                    .replace(/consent-original-srcset-_="/g, 'srcset="')
                    .replace(/consent-original-data-src-_="/g, 'data-src="')
                    .replace(/consent-original-data-srcset="/g, 'data-srcset="')
                    .replace(/<noscript>[^<]+<\/noscript>/g, "")
                    .replace(/data-(?:lazy-|ti-)?src="/g, 'src="')
                    .replace(/data-(?:lazy-|ti-)?srcset="/g, 'srcset="')
                    .replace(/<trustindex-image/g, "<img")
                    .replace(/><\/trustindex-image>/g, "/>")
                    .replace(/data-imgurl(set)?="/g, 'src$1="')
                );
            }
            console.log(t)
            e = t.getAttribute("data-html-url");
          }
          console.log(e)
          let i = yield fetch(e);
          if (!i.ok) return !1;
          let s = yield i.text();
          return (
            -1 !== location.href.indexOf(this.getCDNUrl() + "amp-widget") &&
              (s = s.replace(/<img/g, '<img crossorigin="anonymus"')),
            s
          );
        });
      }
      static destroyWidgets() {
        window.tiWidgetInstances.forEach((t) => t.destroy()),
          (window.tiWidgetInstances = []);
      }
    }
    class s {
      constructor(t, e = null) {
        if (((this.classes = []), t)) {
          if ((this.getWidget(t), !t.container)) return;
          Trustindex.waitForVisibility(this.widget.container, () => {
            this.format(), this.resize(!0), this.registerEvents();
          });
        }
        e && this.load(e), window.tiWidgetInstances.push(this);
      }
      getWidget(t) {
        t.setAttribute("data-trustindex-widget", !0),
          (t.layoutId = t.getAttribute("data-layout-id")),
          (t.layoutCategory = (
            t.getAttribute("data-layout-category") || ""
          ).split(", ")),
          (t.setId = t.getAttribute("data-set-id")),
          (t.pid = t.getAttribute("data-pid") || "wp-widget"),
          (t.cssVersion = t.getAttribute("data-css-version") || null),
          (t.locales = {}),
          (t.footerLinkDomain =
            t.getAttribute("data-footer-link-domain") || null),
          t.layoutId && (t.layoutId = parseInt(t.layoutId)),
          (t.container = t.querySelector(".ti-widget-container")),
          t.setAttribute("data-no-translation", !0),
          (this.widget = t),
          this.getSubclasses();
      }
      getSubclasses() {
        (this.widget.TrustindexWidget = this),
          (this.classes = []),
          this.widget.querySelector(".ti-reviews-container") &&
            ((this.widget.TrustindexReviewWidget = new TrustindexReviewWidget(
              this.widget,
            )),
            this.classes.push(this.widget.TrustindexReviewWidget),
            this.widget.getAttribute("data-column-vertical-separate") &&
              ((this.widget.TrustindexMasonryWidget = new TrustindexMasonryWidget(
                this.widget,
              )),
              this.classes.push(this.widget.TrustindexMasonryWidget)),
            this.widget.querySelector("script.ti-ai-summary") &&
              ((this.widget.TrustindexAiSummaryModule =
                new TrustindexAiSummaryModule(this.widget)),
              this.classes.push(this.widget.TrustindexAiSummaryModule)),
            "readmore" === this.widget.reviewTextMode &&
              this.widget.querySelector(".ti-review-item .ti-read-more") &&
              ((this.widget.TrustindexReadMoreModule =
                new TrustindexReadMoreModule(this.widget)),
              this.classes.push(this.widget.TrustindexReadMoreModule)),
            this.widget.getAttribute("data-pager-autoplay-timeout") &&
              ((this.widget.TrustindexSliderWidget = new TrustindexSliderWidget(
                this.widget,
              )),
              this.classes.push(this.widget.TrustindexSliderWidget)),
            this.widget.querySelector(".ti-load-more-reviews-button") &&
              ((this.widget.TrustindexLoadMoreModule =
                new TrustindexLoadMoreModule(this.widget)),
              this.classes.push(this.widget.TrustindexLoadMoreModule)),
            this.widget.querySelector(".ti-widget-header") &&
              ((this.widget.TrustindexHeaderModule = new TrustindexHeaderModule(
                this.widget,
              )),
              this.classes.push(this.widget.TrustindexHeaderModule)),
            this.widget.querySelector("script.ti-lightbox-data") &&
              ((this.widget.TrustindexReviewImageModule =
                new TrustindexReviewImageModule(this.widget)),
              (this.widget.TrustindexLightboxModule =
                new TrustindexLightboxModule(this.widget)),
              this.classes.push(this.widget.TrustindexReviewImageModule),
              this.classes.push(this.widget.TrustindexLightboxModule))),
          (-1 !== this.widget.layoutCategory.indexOf("floating") ||
            this.widget.querySelector(".disable-widget")) &&
            ((this.widget.TrustindexFloatingWidget = new TrustindexFloatingWidget(
              this.widget,
            )),
            this.classes.push(this.widget.TrustindexFloatingWidget)),
          this.widget.querySelector('a[href="#popup"], a[href="#dropdown"]') &&
            ((this.widget.TrustindexPopupWidget = new TrustindexPopupWidget(
              this.widget,
            )),
            this.classes.push(this.widget.TrustindexPopupWidget)),
          this.widget.querySelector(".ti-top-rated-title") &&
            ((this.widget.TrustindexTopRatedWidget = new TrustindexTopRatedWidget(
              this.widget,
            )),
            this.classes.push(this.widget.TrustindexTopRatedWidget));
      }
      callSubclassesMethods() {
        let t = arguments[0];
        this.classes.forEach((e) => {
          "function" == typeof e[t] && e[t](...Array.from(arguments).slice(1));
        });
      }
      load(t) {
        let e = new DOMParser().parseFromString(t.contentHtml, "text/html"),
          i = e.querySelector(".ti-widget");
        if (
          (t.replaceWith(i),
          this.getWidget(i),
          i.toggleHide(),
          !i.layoutId || !i.container)
        )
          return (i.innerHTML = "Layout id or container not found!");
        if (
          -1 !== this.widget.layoutCategory.indexOf("floating") ||
          -1 !== [17, 21, 52, 53].indexOf(i.layoutId)
        ) {
          if (!document.body) return setTimeout(() => this.load(t), 40);
          document.body.appendChild(i);
          let e = 0;
          i.floatBodyCheckInterval = setInterval(() => {
            i.parentNode !== document.body &&
              (document.body.appendChild(i),
              clearInterval(i.floatBodyCheckInterval)),
              e++,
              e > 20 && clearInterval(i.floatBodyCheckInterval);
          }, 100);
        }
        if (
          i.footerLinkDomain &&
          -1 !== window.location.href.indexOf(i.footerLinkDomain)
        ) {
          let t = i.querySelector('a[href][target="_blank"]');
          t && t.removeAttribute("target");
        }
        (i.insertedElements = []),
          e.body.querySelectorAll("*").forEach((t) => {
            i.after(t), i.insertedElements.push(t);
          });
        let s = i.setId
          ? Trustindex.getCDNUrl() +
            "assets/widget-presetted-css/" +
            i.layoutId +
            "-" +
            i.setId +
            ".css"
          : null;
        i.cssVersion &&
          (s = s.replace(
            "widget-presetted-css/",
            "widget-presetted-css/v" + i.cssVersion + "/",
          )),
          "wp-widget" === t.key && (s = t.getAttribute("data-css-url")),
          Trustindex.addCSS(s, () => {
            i.toggleShow(),
              Trustindex.waitForVisibility(this.widget.container, () => {
                this.format(), this.resize(!0), this.registerEvents();
              });
          });
      }
      format() {
        (void 0 !== this.widget.TrustindexTopRatedWidget &&
          void 0 === this.widget.TrustindexSliderWidget) ||
          this.widget
            .querySelectorAll(
              "\n\t\t\t\t.ti-header-logo .ti-header-logo-img:not([data-logo-styles-added]),\n\t\t\t\t.ti-large-logo img:not([data-logo-styles-added]),\n\t\t\t\t.ti-small-logo img:not([data-logo-styles-added])\n\t\t\t",
            )
            .forEach((t) => {
              let e = "small-logo";
              t.matches(".ti-header-logo .ti-header-logo-img")
                ? (e = "header-logo")
                : t.matches(".ti-large-logo img") && (e = "large-logo");
              let i = t.getAttribute("alt"),
                s = Trustindex.additionalLogoStyles[e][i] || null,
                r = /\/logo-([^-\.]+)/.exec(t.src);
              r && (s = Trustindex.additionalLogoStyles[e][i + "-" + r[1]] || s),
                s &&
                  t.setAttribute(
                    "style",
                    s.replace(/((?:height|width): \d+px)/g, "$1 !important"),
                  ),
                t.setAttribute("data-logo-styles-added", 1);
            }),
          this.widget
            .querySelectorAll(".ti-profile-img-sprite")
            .forEach((t) => this.widget.TrustindexWidget.loadSpriteImage(t)),
          this.widget
            .querySelectorAll(".ti-company-sprite-profile-image")
            .forEach((t) => this.loadSpriteImage(t)),
          this.callSubclassesMethods("format");
      }
      resize(t = !1) {
        if (void 0 === this.widget.TrustindexReviewWidget) return;
        this.widget.style.width = "";
        let e = this.widget.offsetWidth;
        this.widget.toggleHide();
        let i = window
            .getComputedStyle(this.widget, null)
            .getPropertyValue("width"),
          s = this.widget,
          r = 0;
        do {
          if (((s = s.parentNode), !s || "HTML" === s.nodeName)) break;
          if (s.clientWidth) {
            let t = window.getComputedStyle(s, null);
            r =
              s.clientWidth -
              parseFloat(t.paddingLeft) -
              parseFloat(t.paddingRight);
          }
        } while (r < 100);
        "100%" === i && e > r && r
          ? ((this.widget.style.width = r + "px"),
            this.widget.toggleShow(),
            r < s.offsetWidth && (this.widget.style.width = s.offsetWidth + "px"))
          : this.widget.toggleShow(),
          this.widget.originalColCount <= 1
            ? this.classes.forEach((t) => {
                "function" == typeof t.resize &&
                  t.callOneOriginalColumnResize &&
                  t.resize();
              })
            : (this.callSubclassesMethods("resize", t), this.resizeAfter());
      }
      resizeAfter() {
        this.callSubclassesMethods("resizeAfter");
      }
      destroy() {
        this.callSubclassesMethods("destroy"),
          this.widget.floatBodyCheckInterval &&
            clearInterval(this.widget.floatBodyCheckInterval),
          delete this.widget.layoutId,
          delete this.widget.container,
          delete this.widget;
      }
      registerEvents() {
        this.widget.addEventListener("click", (t) => {
          if (
            t.target.matches(
              '.ti-header-write-btn-container .ti-header-write-btn[href=""]',
            )
          ) {
            t.preventDefault();
            let e = t.target
              .closest(".ti-header-write-btn-container")
              .querySelector(".ti-write-btn-dropdown");
            e.classList.contains("ti-active") ||
              (e.classList.add("ti-active"),
              setTimeout(() => {
                document.addEventListener(
                  "click",
                  () => e.classList.remove("ti-active"),
                  { once: !0 },
                );
              }, 1));
          }
          this.callSubclassesMethods("click", t);
        });
      }
      documentClick() {
        this.callSubclassesMethods("documentClick", event);
      }
      documentKeyup() {
        this.callSubclassesMethods("documentKeyup", event);
      }
      isOnViewport() {
        let t = this.widget.container.getBoundingClientRect(),
          e = this.widget.container.offsetWidth - 40,
          i = this.widget.container.offsetHeight - 40;
        return (
          t.top >= -1 * i &&
          t.left >= -1 * e &&
          t.right <=
            (window.innerWidth || document.documentElement.clientWidth) + i &&
          t.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) + i
        );
      }
      loadSpriteImage(t) {
        let e = Trustindex.getWidgetUrl(this.widget.pid) + "sprite.jpg",
          i = 0,
          s = 0,
          r = 0;
        if (!t.classList.contains("ti-company-sprite-profile-image")) {
          let e = t.closest(".ti-review-item"),
            o = getComputedStyle(t);
          if ((e || (e = t.closest(".ti-profile-img")), "auto" === o.height))
            return setTimeout(() => this.loadSpriteImage(t), 100);
          (i = e.getAttribute("data-index")
            ? parseInt(e.getAttribute("data-index"))
            : [].indexOf.call(e.parentNode.children, e) -
              e.parentNode.querySelectorAll(".ti-ai-summary-item").length),
            (s = parseInt(o.height || "0")),
            (s && !isNaN(s)) || (s = 40);
          let a = this.widget.querySelector(".ti-company-sprite-profile-image");
          a &&
            ((o = getComputedStyle(a)),
            (r = parseInt(o.height || "0")),
            (r && !isNaN(r)) || (r = 65));
        }
        let o = function () {
          t.style.background = 'url("' + e + '") 0 ' + (i * s * -1 - r) + "px";
        };
        t.getAttribute("data-webp")
          ? Trustindex.isWebpSupported((t) => {
              t && (e = e.replace(".jpg", ".webp")), o();
            })
          : o();
      }
    }
    class r {
      constructor(t) {
        (t.reviewTextMode =
          t.getAttribute("data-review-text-mode") || "readmore"),
          (t.reviewsContainer = t.querySelector(".ti-reviews-container")),
          (t.reviewsContainerWrapper = t.querySelector(
            ".ti-reviews-container-wrapper",
          )),
          (t.locales.time = t.getAttribute("data-time-locale")),
          (t.locales.replyBy = t.getAttribute("data-reply-by-locale")),
          (t.isCompanyBadge =
            t.container.offsetWidth > t.reviewsContainer.offsetWidth),
          (t.reviewTargetWidth = parseInt(
            t.getAttribute("data-review-target-width") ||
              (t.isCompanyBadge ? 275 : 300),
          )),
          (this.widget = t),
          (this.widget.originalColCount = this.getColCount()),
          this.initHeaderClick();
      }
      format() {
        (this.widget.isCompanyBadge =
          this.widget.container.offsetWidth >
          this.widget.reviewsContainer.offsetWidth),
          this.widget.reviewsContainer
            .querySelectorAll(".ti-review-item")
            .forEach((t) => this.formatReview(t));
      }
      formatReview(t) {
        let e = t.querySelector(".ti-review-text-container");
        e &&
          (this.formatReviewText(e),
          e.classList.contains("ti-empty-text") ||
            e.querySelectorAll(".ti-review-image").forEach((t) => {
              let e = document.createElement("span"),
                i = t.parentNode.childNodes[1],
                s = i.textContent;
              (e.innerHTML = s),
                i.replaceWith(e),
                e.offsetTop - t.parentNode.offsetTop > 20 &&
                  this.widget.classList.add("ti-ios-fallback"),
                e.replaceWith(i);
            }));
        let i = t.getAttribute("data-platform-page-url");
        if (i) {
          let e = t.querySelector(".ti-name");
          e &&
            ((e.style.cursor = "pointer"),
            e.addEventListener("click", (t) => Trustindex.openWindow(i)));
        }
        let s = t.getAttribute("data-time");
        if (s) {
          let e = t.querySelector(".ti-date:not(.ti-date-comment)");
          e &&
            (e.innerHTML = Trustindex.getRelativeTime(
              parseInt(s),
              this.widget.locales.time,
            ));
        }
        t.querySelectorAll(".ti-profile-img img").forEach((t) => {
          if (
            !t.complete ||
            (void 0 !== t.naturalWidth && 0 !== t.naturalWidth)
          ) {
            let e = (t) => {
              (t = t.target || t).setAttribute(
                "src",
                Trustindex.getDefaultAvatarUrl(),
              ),
                t.removeAttribute("srcset"),
                t.removeEventListener("error", e);
            };
            t.removeEventListener("error", e), t.addEventListener("error", e);
          } else
            t.setAttribute("src", Trustindex.getDefaultAvatarUrl()),
              t.removeAttribute("srcset");
        });
      }
      formatReviewText(t) {
        let e = t.querySelectorAll("svg");
        if (0 === e.length) {
          let i = t.innerHTML;
          (i = i
            .replace(
              /<img.+class="emoji" alt="\u263a" src="[^'"]+">/gm,
              Trustindex.svgs.good + "&nbsp;&middot;&nbsp;",
            )
            .replace(
              /<img.+class="emoji" alt="\u2639" src="[^'"]+">/gm,
              Trustindex.svgs.bad + "&nbsp;&middot;&nbsp;",
            )),
            t.closest(".ti-review-item").classList.contains("source-Booking") &&
              (i = i
                .replace(/\u263a/g, Trustindex.svgs.good + "&nbsp;&middot;&nbsp;")
                .replace(
                  /\u2639/g,
                  Trustindex.svgs.bad + "&nbsp;&middot;&nbsp;",
                )),
            (i = i.replace(/\n/g, "<br />")),
            (t.innerHTML = Trustindex.getDecodedHtml(i)),
            (e = t.querySelectorAll("svg"));
        }
        if (e.length) {
          let i = 0.95 * parseInt(t.style.fontSize || 14);
          e.forEach((t) => {
            (t.style.width = i + "px"), (t.style.height = i + "px");
          });
        }
      }
      resize() {
        let t = this.widget.reviewsContainer.offsetWidth;
        if (
          this.widget.isCompanyBadge &&
          void 0 !== this.widget.TrustindexSliderWidget &&
          this.widget.TrustindexSliderWidget.footer
        ) {
          if (void 0 === this.companyBadgeWidth) {
            this.companyBadgeWidth =
              this.widget.TrustindexSliderWidget.footer.offsetWidth;
            let t = window.getComputedStyle(
              this.widget.TrustindexSliderWidget.footer,
              null,
            );
            (this.companyBadgeWidth += parseInt(
              t.getPropertyValue("margin-left"),
            )),
              (this.companyBadgeWidth += parseInt(
                t.getPropertyValue("margin-right"),
              ));
          }
          t = this.widget.container.offsetWidth - this.companyBadgeWidth;
        }
        let e = Math.floor(t / this.widget.reviewTargetWidth);
        e > 1 && 44 === this.widget.layoutId && e--,
          this.widget.isCompanyBadge
            ? (t < 350 && (e = 0),
              this.widget.container.setAttribute(
                "class",
                "ti-widget-container ti-col-" + (e + 1),
              ))
            : (e < 1 && (e = 1),
              this.widget.container.setAttribute(
                "class",
                "ti-widget-container ti-col-" + e,
              ));
      }
      resizeAfter() {
        let t = 0;
        this.widget.reviewsContainer
          .querySelectorAll(".ti-verified-review.ti-verified-platform")
          .forEach((e) => {
            let i = e.querySelector(".ti-verified-tooltip");
            if (!t) {
              let s = getComputedStyle(i);
              (t = e.parentNode.offsetWidth - e.offsetLeft - 5),
                parseInt(s.left) < 0 &&
                  (t = e.offsetLeft - e.parentNode.offsetLeft - 5);
            }
            i.style.width = t + "px";
          });
      }
      click(t) {
        if (t.target.matches(".ti-show-original-text")) {
          t.preventDefault(), t.stopPropagation();
          let e = t.target.closest(".ti-review-text-container"),
            i = JSON.parse(
              e.querySelector('script[type="application/ld+json"]').innerHTML,
            ),
            s = i.text || i,
            r = e.querySelector(".ti-review-image");
          r && (s = r.outerHTML + s),
            void 0 !== i.reply &&
              i.reply &&
              (s +=
                '<br /><br /><strong class="ti-reply-by-owner-title">' +
                this.widget.locales.replyBy +
                "</strong><br />" +
                i.reply),
            (e.innerHTML = s),
            this.formatReviewText(e),
            void 0 !== this.widget.TrustindexReadMoreModule &&
              this.widget.TrustindexReadMoreModule.resetReview(e);
        }
      }
      initHeaderClick() {
        let t = this.widget.querySelector(
          "a[href]:not(.ti-write-btn-dropdown-item):not(.ti-header-write-btn)",
        );
        if (!t) return;
        let e = t.getAttribute("href");
        if (!e || "#" === t.getAttribute("href")) return;
        let i = t.closest(
          ".ti-header:not(a), .ti-footer:not(a), .ti-popup-header:not(a)",
        );
        i &&
          i.querySelector(
            ".ti-large-logo, .ti-profile-img, .ti-profile-details, .ti-logo-stars-flex",
          ) &&
          !i.querySelector(".ti-disclaimer") &&
          (i.classList.add("ti-clickable-link"),
          i.addEventListener("click", (t) => {
            if ("A" === t.target.nodeName) return !1;
            t.preventDefault(), Trustindex.openWindow(e);
          }));
      }
      getColCount() {
        let t = this.widget.container.classList.toString();
        return -1 === t.indexOf("ti-col-")
          ? 1
          : parseInt(t.replace(/^.*ti-col-(\d+).*$/, "$1"));
      }
    }
    class o {
      constructor(t) {
        (this.widget = t),
          (this.callOneOriginalColumnResize = !0),
          (this.controls = this.widget.querySelector(".ti-controls")),
          (this.footer = this.widget.container.querySelector(".ti-footer")),
          (this.rotateTo = this.widget.getAttribute("data-rotate-to") || "right"),
          (this.autoPlayDirection = "right" === this.rotateTo ? "next" : "prev"),
          (this.autoPlayTimeout = parseInt(
            this.widget.getAttribute("data-pager-autoplay-timeout"),
          )),
          (this.state = 0),
          (this.position = "0px"),
          (this.prevButton = this.widget.querySelector(".ti-prev")),
          (this.nextButton = this.widget.querySelector(".ti-next")),
          (this.isMoving = !1),
          (this.isLoop = this.widget.getAttribute("data-slider-loop")),
          (this.isMouseOver = !1),
          (this.stateLine = 0),
          (this.lineContainer = this.widget.querySelector(".ti-controls-line")),
          (this.lineDot = this.widget.querySelector(".ti-controls-line .dot")),
          this.addEvents();
      }
      format() {
        (this.reviewNum = this.getReviewNum()),
          (this.visibleReviewNum = null),
          this.widget.reviewsContainer
            .querySelectorAll(".ti-review-item")
            .forEach((t) => (t.style.position = "relative")),
          this.setAutoplay();
      }
      resize(t = !1) {
        let e = this.getVisibleReviewNum();
        (t || e !== this.visibleReviewNum) &&
          (null === this.visibleReviewNum && this.reset(!1),
          (this.reviewNum = this.getReviewNum()),
          (this.visibleReviewNum = e),
          this.renderLine(),
          this.toggleNavigation(),
          setTimeout(() => this.verticalPositionElements(), 4)),
          this.move(this.state, "resize", 0);
      }
      click(t) {
        (t.target.matches(".ti-controls .ti-next") ||
          t.target.matches(".ti-controls .ti-prev")) &&
          (t.preventDefault(),
          this.move(
            t.target.classList.contains("ti-next") ? "next" : "prev",
            "manual",
            500,
          ));
      }
      documentKeyup(t) {
        "ArrowLeft" === t.key && this.widget.TrustindexWidget.isOnViewport()
          ? this.move("prev", "keypress", 500)
          : "ArrowRight" === t.key &&
            this.widget.TrustindexWidget.isOnViewport() &&
            this.move("next", "keypress", 500);
      }
      destroy() {
        void 0 !== this.autoPlayInterval && clearInterval(this.autoPlayInterval);
      }
      renderLine() {
        if (this.lineContainer) {
          let t = 1 + this.reviewNum - this.visibleReviewNum;
          if (
            (this.isLoop &&
              this.reviewNum !== this.visibleReviewNum &&
              (t = this.reviewNum),
            this.lineDot)
          ) {
            let e = parseInt(this.lineContainer.offsetWidth / t);
            e < 1 && (e = 1),
              (this.lineDot.style.width = e + "px"),
              (this.lineDot.style.left =
                Math.ceil((this.stateLine / t) * 100) + "%");
          }
        }
      }
      setAutoplay() {
        this.autoPlayTimeout &&
          (this.autoPlayInterval = setInterval(() => {
            this.move(this.autoPlayDirection, "auto", 1e3);
          }, 1e3 * this.autoPlayTimeout));
      }
      addEvents() {
        let t, e, i, s, r;
        this.widget.container.addEventListener(
          "mouseenter",
          (t) => (this.isMouseOver = !0),
        ),
          this.widget.container.addEventListener(
            "mouseleave",
            (t) => (this.isMouseOver = !1),
          );
        let o,
          a = null,
          n = !1,
          d = !1;
        this.widget.reviewsContainer.addEventListener(
          "touchstart",
          (l) => {
            (t = l.touches[0].pageX),
              (i = l.touches[0].pageY),
              (e = null),
              (s = null),
              (r = null),
              (a = this.widget.reviewsContainer.querySelector(
                '.ti-review-item:not([style*="display: none"])',
              ).offsetWidth),
              (d = !1),
              (n = !1),
              o && clearTimeout(o),
              this.disableBodyScroll(),
              (this.isMouseOver = !0);
          },
          { passive: !0 },
        ),
          this.widget.reviewsContainer.addEventListener(
            "touchmove",
            (o) => {
              (e = o.touches[0].pageX), (s = o.touches[0].pageY);
              let l = e - t,
                h = s - i;
              if (
                ((n = (n || Math.abs(h) > 50) && !d),
                (d = (d || Math.abs(l) > 10) && !n),
                n)
              )
                this.enableBodyScroll();
              else if (d) {
                if (this.isMoving) return !1;
                if (
                  ((r = parseInt(this.position) + l),
                  this.animate(this.position, r + "px", 0),
                  this.isLoop)
                ) {
                  let i = t > e ? "next" : "prev",
                    s = ("prev" === i ? -1 : 1) * Math.ceil(Math.abs(e - t) / a);
                  this.addClonedReviews(this.state + s, i);
                }
                d = !0;
              }
            },
            { passive: !0 },
          ),
          this.widget.reviewsContainer.addEventListener(
            "touchend",
            (i) => {
              if (d && !n)
                if (t && e && Math.abs(t - e) > 25 && r) {
                  let i = t > e ? "next" : "prev";
                  if (
                    (this.widget.reviewsContainer
                      .querySelectorAll(".ti-review-text-container")
                      .forEach((t) => (t.scrollTop = 0)),
                    ("next" === i && this.isNext) ||
                      ("prev" === i && this.isPrev))
                  ) {
                    this.position = r + "px";
                    let s = Math.ceil(Math.abs(e - t) / a),
                      o =
                        (-1 *
                          (this.state + s * ("next" === i ? 1 : -1)) *
                          this.widget.reviewsContainerWrapper.offsetWidth) /
                        this.visibleReviewNum,
                      n = parseInt(Math.abs(o - r)),
                      d = parseInt((n / a) * 300);
                    this.move(i, "manual", d, s);
                  } else
                    this.animate(r + "px", parseInt(this.position) + "px", 120),
                      setTimeout(
                        () =>
                          this.move(
                            i,
                            "manual",
                            400,
                            Math.ceil(Math.abs(e - t) / a),
                          ),
                        120,
                      );
                } else
                  r &&
                    r !== parseInt(this.position) &&
                    this.animate(r + "px", parseInt(this.position) + "px", 120);
              (t = null),
                (e = null),
                (r = null),
                (d = !1),
                (n = !1),
                (o = setTimeout(() => this.enableBodyScroll(), 400)),
                (this.isMouseOver = !1);
            },
            { passive: !0 },
          ),
          this.widget.reviewsContainer.addEventListener("touchcancel", (t) => {
            this.enableBodyScroll(), (this.isMouseOver = !1);
          });
      }
      disableBodyScroll() {
        void 0 === this.oldBodyScrollAttributes &&
          ((this.oldBodyScrollAttributes = {
            documentElement: {
              overflow: document.documentElement.style.overflow,
              position: document.documentElement.style.position,
              height: document.documentElement.style.height,
            },
            body: {
              overflowX: document.body.style.overflowX,
              height: document.body.style.height,
            },
          }),
          (document.documentElement.style.overflow = "hidden"),
          (document.documentElement.style.position = "relative"),
          (document.documentElement.style.height = "unset"),
          (document.body.style.overflowX = "unset"),
          (document.body.style.height = "unset"));
      }
      enableBodyScroll() {
        if (void 0 !== this.oldBodyScrollAttributes) {
          for (let t in this.oldBodyScrollAttributes)
            for (let e in this.oldBodyScrollAttributes[t])
              document[t].style[e] = this.oldBodyScrollAttributes[t][e];
          delete this.oldBodyScrollAttributes;
        }
      }
      move(t, e, i = 1e3, s = 1) {
        if (
          -1 !== ["manual", "keypress"].indexOf(e) &&
          (("next" === t && !this.isNext) || ("prev" === t && !this.isPrev))
        )
          return this.animateThereIsNoReviews(t);
        if (
          !this.widget.clientWidth ||
          this.reviewNum <= this.visibleReviewNum ||
          this.isMoving ||
          (this.isMouseOver && "auto" === e) ||
          !0 === this.widget.isLightboxShowing
        )
          return;
        "manual" === e &&
          void 0 !== this.autoPlayInterval &&
          (clearInterval(this.autoPlayInterval), delete this.autoPlayInterval),
          "resize" !== e && (e = t),
          ("next" !== t && "prev" !== t) ||
            (t = this.state + s * ("next" === t ? 1 : -1));
        let r = this.getMaximumState();
        if (this.isLoop) {
          if (
            (this.addClonedReviews(t, e),
            t < this.state &&
              setTimeout(() => {
                let e = ".ti-review-item.ti-cloned.ti-cloned--end";
                t > r && (e += ":last-child"),
                  this.widget.reviewsContainer
                    .querySelectorAll(e)
                    .forEach((t) => t.remove());
              }, i),
            t < 0 &&
              "prev" === e &&
              setTimeout(() => {
                this.widget.reviewsContainer
                  .querySelectorAll(".ti-review-item.ti-cloned--dragging")
                  .forEach((t) => t.classList.remove("ti-cloned--dragging")),
                  (this.widget.reviewsContainerWrapper.scrollLeft = 0),
                  this.reset();
              }, i),
            "next" === e)
          ) {
            let e = t - this.state;
            setTimeout(() => {
              for (let t = 0; t < e; t++) {
                let t = this.widget.reviewsContainer.querySelector(
                  ".ti-review-item.ti-cloned.ti-cloned--start:first-child",
                );
                t && (t.remove(), this.reset());
              }
            }, i);
          }
          "next" === e
            ? (this.stateLine++,
              this.stateLine > this.reviewNum - 1 && (this.stateLine = 0))
            : "prev" === e
              ? (this.stateLine--,
                this.stateLine < 0 && (this.stateLine = this.reviewNum - 1))
              : (this.stateLine = t);
        } else (t = Math.min(r, Math.max(0, t))), (this.stateLine = t);
        let o =
          (-1 * t * this.widget.reviewsContainerWrapper.offsetWidth) /
            this.visibleReviewNum +
          "px";
        this.animate(this.position, o, i, this.state !== t),
          (this.position = o),
          this.state !== t &&
            ((this.state = t),
            (this.isMoving = !0),
            this.renderLine(),
            this.toggleNavigation(),
            setTimeout(() => (this.isMoving = !1), i),
            void 0 !== this.widget.TrustindexReviewImageModule &&
              this.widget.TrustindexReviewImageModule.toggleGalleryVisiblity());
      }
      animate(t, e, i, s = !1) {
        this.widget.reviewsContainer
          .querySelectorAll(".ti-review-item")
          .forEach((r) => {
            r.animate(
              { left: [t, e] },
              { duration: i, fill: "both", easing: "ease-in-out" },
            ),
              s &&
                setTimeout(() => {
                  if (!this.isReviewVisible(r)) {
                    let t = r.querySelector(
                      ".ti-read-more .ti-read-more-collapse",
                    );
                    t && t.click();
                  }
                }, i);
          });
      }
      animateThereIsNoReviews(t) {
        this.isMoving = !0;
        let e = parseInt(this.position),
          i = "next" === t ? -1 : 1,
          s = 0,
          r = 0,
          o = (t, e, i, s) =>
            setTimeout(() => this.animate(t + "px", e + "px", i), s);
        return (
          [
            { position: 30, speed: 100 },
            { position: -30, speed: 80 },
            { position: 15, speed: 60 },
            { position: -15, speed: 50 },
          ].forEach((t, a) => {
            0 === a ? (s = e + t.position * i) : ((e = s), (s += t.position * i)),
              o(e, s, t.speed, r),
              (r += t.speed);
          }),
          setTimeout(() => (this.isMoving = !1), r),
          !0
        );
      }
      addClonedReviews(t, e) {
        let i = this.getMaximumState();
        if (t > i && (this.state < t || "resize" === e)) {
          let e = this.widget.reviewsContainer.querySelectorAll(
              ".ti-review-item.ti-cloned.ti-cloned--end",
            ).length,
            s = t - i - e,
            r = e;
          r >= this.reviewNum &&
            (r -= parseInt(r / this.reviewNum) * this.reviewNum);
          for (let t = 0; t < s; t++) {
            let e = this.widget.reviewsContainer
              .querySelectorAll(
                '.ti-review-item:not(.ti-cloned):not([style*="display: none"])',
              )
              [r + t].cloneNode(!0);
            e.classList.add("ti-cloned", "ti-cloned--end"),
              this.widget.reviewsContainerWrapper.appendChild(e);
          }
        }
        if (t < 0 && "prev" === e) {
          let e = this.widget.reviewsContainer.querySelectorAll(
              ".ti-review-item.ti-cloned.ti-cloned--start.ti-cloned--dragging",
            ).length,
            i = this.widget.reviewsContainer.querySelectorAll(
              ".ti-review-item.ti-cloned.ti-cloned--start",
            ).length,
            s = Math.abs(t - this.state) - e,
            r = this.reviewNum - 1 - (i % this.reviewNum),
            o =
              this.widget.reviewsContainerWrapper.offsetWidth /
              this.visibleReviewNum,
            a = parseInt(this.widget.reviewsContainerWrapper.scrollLeft / o);
          for (let t = 0; t < s; t++) {
            let e = this.widget.reviewsContainer
              .querySelectorAll(
                '.ti-review-item:not(.ti-cloned):not([style*="display: none"])',
              )
              [r - t].cloneNode(!0);
            e.classList.add(
              "ti-cloned",
              "ti-cloned--start",
              "ti-cloned--dragging",
            ),
              this.widget.reviewsContainerWrapper.insertBefore(
                e,
                this.widget.reviewsContainerWrapper.firstChild,
              ),
              (this.widget.reviewsContainerWrapper.scrollLeft = parseInt(
                (t + 1 + a) * o,
              ));
          }
        }
      }
      toggleNavigation() {
        this.prevButton &&
          this.nextButton &&
          ((this.isPrev = !0),
          this.prevButton.toggleShow(),
          (this.isNext = !0),
          this.nextButton.toggleShow(),
          this.isLoop
            ? this.reviewNum === this.visibleReviewNum &&
              ((this.isPrev = !1),
              this.prevButton.toggleHide(),
              (this.isNext = !1),
              this.nextButton.toggleHide())
            : (0 === this.state &&
                ((this.isPrev = !1),
                this.prevButton.toggleHide(),
                (this.autoPlayDirection = "next")),
              this.state >= this.getMaximumState() &&
                ((this.isNext = !1),
                this.nextButton.toggleHide(),
                (this.autoPlayDirection = "prev"))));
      }
      verticalPositionElements() {
        let t = this.widget.querySelector(
          '.ti-review-item:not(.ti-hidden-review):not([style*="display: none"]) .ti-review-image-container',
        );
        if (
          (void 0 === this.widget.reviewsContainerWrapper.paddingTop &&
            (this.widget.reviewsContainerWrapper.paddingTop = parseInt(
              window
                .getComputedStyle(this.widget.reviewsContainerWrapper, null)
                .getPropertyValue("padding-top"),
            )),
          this.controls &&
            -1 !==
              [4, 5, 13, 14, 34, 36, 44, 95, 105].indexOf(this.widget.layoutId))
        ) {
          let e =
            this.widget.reviewsContainerWrapper.offsetHeight / 2 +
            this.widget.reviewsContainerWrapper.paddingTop / 2 -
            3;
          t && (e -= t.offsetHeight / 2), (this.controls.style.top = e + "px");
        }
        if (
          this.footer &&
          this.widget.container.offsetWidth >
            this.widget.reviewsContainer.offsetWidth
        ) {
          let e =
            (this.widget.reviewsContainerWrapper.offsetHeight -
              this.footer.offsetHeight) /
              2 +
            this.widget.reviewsContainerWrapper.paddingTop / 2;
          t && (e -= t.offsetHeight / 2),
            (this.widget.container.style.alignItems = "flex-start"),
            (this.footer.style.marginTop = e + "px");
        }
      }
      getReviewNum() {
        return this.widget.reviewsContainer.querySelectorAll(
          '.ti-review-item:not(.ti-cloned):not([style*="display: none"])',
        ).length;
      }
      getVisibleReviewNum() {
        if (void 0 !== this.widget.TrustindexFloatingWidget) return 1;
        let t = this.widget.TrustindexReviewWidget.getColCount();
        this.widget.container.offsetWidth >
          this.widget.reviewsContainer.offsetWidth && (t -= 1);
        let e = t;
        if (this.widget.reviewsContainer.querySelector(".ti-review-item")) {
          let t = this.widget.reviewsContainer.querySelector(
            '.ti-review-item:not([style*="display: none"])',
          );
          t &&
            (e = Math.floor(
              this.widget.reviewsContainer.offsetWidth / t.offsetWidth,
            ));
        }
        return Math.max(t, e, 1);
      }
      getMaximumState() {
        return Math.max(this.reviewNum - this.visibleReviewNum, 0);
      }
      isReviewVisible(t) {
        let e = t.offsetLeft - this.widget.reviewsContainerWrapper.offsetLeft,
          i = e + t.offsetWidth;
        return (
          e >= this.widget.reviewsContainerWrapper.scrollLeft &&
          i <=
            this.widget.reviewsContainerWrapper.scrollLeft +
              this.widget.reviewsContainerWrapper.offsetWidth
        );
      }
      reset(t = !0) {
        (this.position = "0px"),
          (this.state = "left" === this.rotateTo ? this.getMaximumState() : 0),
          t &&
            this.widget.reviewsContainer
              .querySelectorAll(".ti-review-item")
              .forEach((t) => t.animate({ left: 0 }, { fill: "both" }));
      }
    }
    class a {
      constructor(t) {
        (t.originalColCount = 3), (this.widget = t);
      }
      resize() {
        let t = this.widget.TrustindexReviewWidget.getColCount(),
          e = this.widget.container.querySelectorAll(
            '.ti-review-item:not([style*="display: none"])',
          ),
          i = this.widget.container.querySelectorAll(
            '.ti-review-item[style*="display: none"]',
          );
        this.widget.reviewsContainerWrapper.innerHTML = "";
        for (var s = 0, r = []; s < t; s++)
          (r[s] = document.createElement("div")),
            r[s].setAttribute("class", "ti-column"),
            this.widget.reviewsContainerWrapper.appendChild(r[s]);
        Array.from(e)
          .sort(function (t, e) {
            return (
              (t.getAttribute("data-index")
                ? parseInt(t.getAttribute("data-index"))
                : 0) -
              (e.getAttribute("data-index")
                ? parseInt(e.getAttribute("data-index"))
                : 1)
            );
          })
          .forEach((e, i) => r[i % t].appendChild(e)),
          i.forEach((t) => r[0].appendChild(t));
      }
    }
    class n {
      constructor(t) {
        this.widget = t;
      }
      click(t) {
        if (t.target.matches("a[data-subcontent]")) {
          t.preventDefault();
          let e = t.target;
          if (
            ((e.subcontentTarget = this.widget.querySelector(
              e.getAttribute("data-subcontent-target"),
            )),
            !e.subcontentTarget || e.classList.contains("ti-loading"))
          )
            return;
          if ("" !== e.subcontentTarget.innerHTML.trim())
            e.removeAttribute("data-subcontent"),
              e.removeAttribute("data-subcontent-target");
          else if (this.widget.pid) return this.load(e);
        }
        (t.target.matches('a[href="#popup"]') ||
          t.target.matches('a[href="#dropdown"]')) &&
          (t.preventDefault(), this.togglePopup(t.target)),
          t.target.matches(".ti-popup-header .ti-close-lg") &&
            (t.preventDefault(), this.closePopup());
      }
      documentClick(t) {
        void 0 === this.widget.popup ||
          t.target.closest(".ti-widget-container") ||
          (t.preventDefault(), this.closePopup());
      }
      load(t) {
        return (
          (e = this),
          (i = null),
          (s = function* () {
            t.classList.add("ti-loading");
            let e = yield fetch(
              Trustindex.getWidgetUrl(this.widget.pid) +
                "_subcontent-" +
                t.getAttribute("data-subcontent") +
                ".html",
            );
            if (!e.ok) return;
            let i = yield e.text();
            i &&
              (t.removeAttribute("data-subcontent"),
              t.removeAttribute("data-subcontent-target"),
              (t.subcontentTarget.innerHTML = i),
              t.classList.remove("ti-loading"),
              this.widget.TrustindexWidget.getSubclasses(),
              this.togglePopup(t));
          }),
          new Promise((t, r) => {
            var o = (t) => {
                try {
                  n(s.next(t));
                } catch (t) {
                  r(t);
                }
              },
              a = (t) => {
                try {
                  n(s.throw(t));
                } catch (t) {
                  r(t);
                }
              },
              n = (e) =>
                e.done ? t(e.value) : Promise.resolve(e.value).then(o, a);
            n((s = s.apply(e, i)).next());
          })
        );
        var e, i, s;
      }
      togglePopup(t) {
        (this.widget.button = t),
          this.widget.button.classList.toggle("active"),
          (this.widget.popup = this.widget.querySelector(
            ".ti-dropdown-widget, .ti-popup-widget",
          )),
          this.widget.popup.classList.toggle("active"),
          this.widget.popup.classList.contains("active")
            ? void 0 === this.methodsCalled &&
              ((this.methodsCalled = !0),
              this.widget.TrustindexWidget.callSubclassesMethods("format"),
              this.widget.TrustindexWidget.callSubclassesMethods("resize"))
            : this.closePopup();
      }
      closePopup(t) {
        this.widget.button.classList.remove("active"),
          this.widget.popup.classList.remove("active"),
          delete this.widget.button,
          delete this.widget.popup;
      }
    }
    class d {
      constructor(t) {
        (this.widget = t),
          sessionStorage.getItem("ti-widget-closed-" + this.widget.pid) &&
            (this.widget.remove(), this.widget.TrustindexWidget.destroy());
      }
      click(t) {
        t.target.matches(".disable-widget") &&
          (t.preventDefault(),
          Trustindex.isAdminUrl() ||
            (sessionStorage.setItem("ti-widget-closed-" + this.widget.pid, !0),
            this.widget.remove(),
            this.widget.TrustindexWidget.destroy()));
      }
    }
    class l {
      constructor(t) {
        (this.disclaimer = t.querySelector(".ti-disclaimer")),
          (this.widget = t),
          this.addEvents();
      }
      addEvents() {
        this.widget
          .querySelector(".ti-verified-by")
          .addEventListener("mouseenter", () => {
            this.disclaimer.classList.remove("ti-bottom"),
              this.disclaimer.getBoundingClientRect().y < 0 &&
                this.disclaimer.classList.add("ti-bottom");
          });
      }
    }
    class h {
      constructor(t) {
        (this.widget = t), (this.callOneOriginalColumnResize = !0);
      }
      resize(t, e = !0) {
        if (
          (void 0 === this.isReadmore &&
            (this.isReadmore =
              "undefined" !==
              window
                .getComputedStyle(
                  this.widget.reviewsContainer.querySelector(".ti-read-more"),
                  null,
                )
                .getPropertyValue("display")),
          !this.isReadmore)
        )
          return;
        let i = this.widget.reviewsContainer.querySelectorAll(
          ".ti-review-item:not(.ti-hide) .ti-read-more",
        );
        e &&
          i.forEach((t) =>
            this.setReview(
              t
                .closest(".ti-review-item")
                .querySelector(".ti-review-text-container"),
            ),
          ),
          i.length ===
            this.widget.reviewsContainer.querySelectorAll(
              '.ti-read-more[style*="opacity: 0"]',
            ).length && i.forEach((t) => t.toggleHide());
      }
      setReview(t, e = !1) {
        let i = t.closest(".ti-review-item");
        if (!i) return;
        let s = i.querySelector(".ti-read-more");
        s.setAttribute("style", ""),
          t.setAttribute("style", "transition: none"),
          t.scrollHeight > t.offsetHeight
            ? (t.setAttribute("style", ""),
              t.style.setProperty("height", t.offsetHeight + "px", "important"),
              t.setAttribute("data-initial-height", t.offsetHeight),
              t.setAttribute("data-expanded-height", this.getExpandedHeight(t)),
              t.parentNode.classList.contains("ti-review-content") &&
                ((t.parentNode.style.display = "block"),
                t.parentNode.style.setProperty(
                  "-webkit-line-clamp",
                  "unset",
                  "important",
                )),
              !t.getAttribute("data-max-height") &&
                parseInt(
                  window.getComputedStyle(t, null).getPropertyValue("max-height"),
                ) > 0 &&
                t.style.setProperty("max-height", "unset", "important"),
              s.getAttribute("data-open-text") &&
                (s.innerHTML =
                  '<span class="ti-read-more-active">' +
                  s.getAttribute("data-open-text") +
                  "</span>"),
              s.setAttribute("style", ""))
            : ((s.innerHTML = "<span>&nbsp;</span>"),
              (s.style.opacity = 0),
              (s.style.pointerEvents = "none")),
          e || setTimeout(() => this.setReview(t, !0), 4);
      }
      resetReview(t) {
        t.getAttribute("data-is-opened")
          ? (t.style.setProperty("height", ""),
            t.style.setProperty("transition", "none"),
            t.style.setProperty("height", t.scrollHeight + "px", "important"),
            t.setAttribute("data-expanded-height", this.getExpandedHeight(t)),
            t.style.setProperty("transition", ""))
          : (this.setReview(t), this.resize(!0, !1));
      }
      click(t) {
        if (t.target.matches(".ti-read-more-active")) {
          t.preventDefault();
          let e = t.target,
            i = e
              .closest(".ti-review-item")
              .querySelector(".ti-review-text-container");
          if (i.classList.contains("ti-is-transitioning")) return !1;
          e.classList.contains("ti-read-more-collapse")
            ? (i.style.setProperty("display", ""),
              i.style.setProperty("-webkit-line-clamp", ""),
              i.style.setProperty(
                "height",
                i.getAttribute("data-initial-height") + "px",
                "important",
              ),
              i.removeAttribute("data-is-opened"),
              i.classList.add("ti-is-transitioning"),
              setTimeout(() => i.classList.remove("ti-is-transitioning"), 500),
              (e.innerHTML = e.parentNode.getAttribute("data-open-text")),
              e.classList.remove("ti-read-more-collapse"))
            : (i.style.setProperty("display", "block", "important"),
              i.style.setProperty("-webkit-line-clamp", "unset", "important"),
              i.style.setProperty(
                "height",
                i.getAttribute("data-expanded-height") + "px",
                "important",
              ),
              i.setAttribute("data-is-opened", 1),
              i.classList.add("ti-is-transitioning"),
              setTimeout(() => i.classList.remove("ti-is-transitioning"), 500),
              (e.innerHTML = e.parentNode.getAttribute("data-collapse-text")),
              e.classList.add("ti-read-more-collapse"));
        }
      }
      getExpandedHeight(t) {
        let e = t.scrollHeight;
        return (
          t.getAttribute("data-max-height") &&
            (e = parseInt(
              window.getComputedStyle(t, null).getPropertyValue("max-height"),
            )),
          Math.min(t.scrollHeight, e)
        );
      }
    }
    class g {
      constructor(t) {
        (this.widget = t),
          (this.callOneOriginalColumnResize = !0),
          (this.rows = parseInt(
            this.widget.getAttribute("data-load-more-rows") ||
              (this.isGrid() ? 3 : 5),
          ));
      }
      resize() {
        let t = this.widget.querySelector(".ti-load-more-reviews-button"),
          e = this.getLimit();
        t.toggleShow(),
          this.widget.reviewsContainer
            .querySelectorAll(".ti-review-item")
            .forEach((t) => t.classList.remove("ti-hide"));
        let i = this.widget.reviewsContainer.querySelectorAll(
          '.ti-review-item:not([style*="display: none"])',
        );
        if (i.length > e)
          if (void 0 !== this.widget.TrustindexMasonryWidget) {
            let t =
              this.widget.reviewsContainerWrapper.querySelectorAll(".ti-column");
            e /= this.widget.TrustindexReviewWidget.getColCount();
            for (let s = 0; s < t.length; s++)
              (i = t[s].querySelectorAll(
                '.ti-review-item:not([style*="display: none"])',
              )),
                this.hideReviews(i, e);
          } else this.hideReviews(i, e);
        else t.toggleHide();
      }
      click(t) {
        if (t.target.matches(".ti-load-more-reviews-button")) {
          t.preventDefault();
          let e = t.target,
            i = this.getLimit();
          if (void 0 !== this.widget.TrustindexMasonryWidget) {
            let t =
              this.widget.reviewsContainerWrapper.querySelectorAll(".ti-column");
            i /= this.widget.TrustindexReviewWidget.getColCount();
            for (let e = 0; e < t.length; e++)
              this.showReviews(
                t[e].querySelectorAll(".ti-review-item.ti-hide"),
                i,
              );
          } else
            this.showReviews(
              this.widget.querySelectorAll(".ti-review-item.ti-hide"),
              i,
            );
          0 === this.widget.querySelectorAll(".ti-review-item.ti-hide").length &&
            e.toggleHide();
        }
      }
      isGrid() {
        return (
          -1 !== this.widget.container.classList.toString().indexOf("ti-col-") &&
          81 !== this.widget.layoutId
        );
      }
      getLimit() {
        return this.isGrid()
          ? this.widget.TrustindexReviewWidget.getColCount() * this.rows
          : this.rows;
      }
      hideReviews(t, e) {
        t.forEach((t, i) => {
          i > e - 1 && t.classList.add("ti-hide");
        });
      }
      showReviews(t, e) {
        for (let i = 0; i < t.length && !(i >= e); i++)
          t[i].classList.remove("ti-hide"),
            void 0 !== this.widget.TrustindexReadMoreModule &&
              this.widget.TrustindexReadMoreModule.setReview(
                t[i].querySelector(".ti-review-text-container"),
              );
      }
    }
    class c {
      constructor(t) {
        (this.widget = t), (this.callOneOriginalColumnResize = !0);
      }
      resize() {
        let t = this.widget.querySelector(".ti-widget-header .ti-platform-tabs");
        if (t)
          if (
            t.querySelector(".ti-platform-tab-items").scrollWidth > t.offsetWidth
          ) {
            let e = t.querySelector(".ti-tab-active");
            e.previousElementSibling
              ? (t.querySelector(".ti-arrow-prev").style.display = "inline-block")
              : (t.querySelector(".ti-arrow-prev").style.display = ""),
              e.nextElementSibling
                ? (t.querySelector(".ti-arrow-next").style.display =
                    "inline-block")
                : (t.querySelector(".ti-arrow-next").style.display = "");
          } else
            (t.querySelector(".ti-arrow-prev").style.display = ""),
              (t.querySelector(".ti-arrow-next").style.display = "");
        -1 !== this.widget.layoutCategory.indexOf("list") &&
          setTimeout(() => {
            let t = this.widget.querySelector(
              ".ti-widget-header .ti-header-content.ti-active",
            );
            if (t) {
              let e = t.querySelector(".ti-header-write-btn-container");
              if (e) {
                (e.style.marginLeft = ""),
                  (e.style.marginTop = ""),
                  t.offsetHeight -
                    parseInt(
                      window
                        .getComputedStyle(t, null)
                        .getPropertyValue("padding-bottom"),
                    ) >
                  t.firstElementChild.offsetHeight
                    ? ((e.style.marginLeft = 0), (e.style.marginTop = "15px"))
                    : ((e.style.marginLeft = ""), (e.style.marginTop = ""));
              }
            }
          }, 12);
      }
      click(t) {
        if (
          t.target.matches(
            ".ti-widget-header .ti-platform-tab-items .ti-tab-item",
          )
        ) {
          t.preventDefault();
          let e = t.target,
            i = e.closest(".ti-platform-tab-items"),
            s = e.getAttribute("data-source");
          i
            .querySelectorAll(".ti-tab-item")
            .forEach((t) => t.classList.remove("ti-tab-active")),
            e.classList.add("ti-tab-active");
          let r = this.widget.querySelector(
            ".ti-widget-header .ti-header-content.ti-active",
          );
          r && r.classList.remove("ti-active");
          let o = this.widget.querySelector(
            ".ti-widget-header .ti-header-content.source-" + s,
          );
          o && o.classList.add("ti-active"),
            this.widget
              .querySelectorAll(".ti-review-item.ti-cloned")
              .forEach((t) => t.remove()),
            "all" === s
              ? this.widget
                  .querySelectorAll(".ti-review-item")
                  .forEach((t) => t.toggleShow())
              : (this.widget
                  .querySelectorAll(".ti-review-item")
                  .forEach((t) => t.toggleHide()),
                this.widget
                  .querySelectorAll(".ti-review-item.source-" + s)
                  .forEach((t) => t.toggleShow())),
            i.scroll({ left: e.offsetLeft - 28, behavior: "smooth" }),
            void 0 !== this.widget.TrustindexSliderWidget &&
              this.widget.TrustindexSliderWidget.reset(!1),
            this.widget.TrustindexWidget.callSubclassesMethods("resize", !0);
        }
        if (
          t.target.matches(
            ".ti-widget-header .ti-platform-tab-nav .ti-arrow-prev",
          )
        ) {
          let e = t.target
            .closest(".ti-platform-tabs")
            .querySelector(".ti-tab-active");
          e && e.previousElementSibling && e.previousElementSibling.click();
        }
        if (
          t.target.matches(
            ".ti-widget-header .ti-platform-tab-nav .ti-arrow-next",
          )
        ) {
          let e = t.target
            .closest(".ti-platform-tabs")
            .querySelector(".ti-tab-active");
          e && e.nextElementSibling && e.nextElementSibling.click();
        }
      }
    }
    class u {
      constructor(t) {
        let e = t.querySelector(
          'script.ti-lightbox-data[type="application/ld+json"]',
        );
        (this.data = JSON.parse(e.innerHTML).data),
          e.remove(),
          (this.widget = t),
          (this.callOneOriginalColumnResize = !0);
      }
      format() {
        this.registerImageErrorEvent();
      }
      resize() {
        let t;
        this.widget.reviewsContainer
          .querySelectorAll(".ti-review-item .ti-review-image-container")
          .forEach((e) => {
            let i = e.closest(".ti-review-item").getAttribute("data-id"),
              s = this.data.filter((t) => t.r === i);
            if (
              (t || (t = Math.floor(e.offsetWidth / 70)),
              t &&
                s.length &&
                parseInt(e.getAttribute("data-image-listed")) !== t)
            ) {
              e.setAttribute("data-image-listed", t);
              let i = "";
              for (let e = 0, r = Math.min(s.length, t) - 1; e <= r; e++) {
                let o = e === r && e < s.length - 1;
                i +=
                  '<div class="ti-review-image' +
                  (o ? " ti-has-more-image" : "") +
                  '" data-image-index="' +
                  e +
                  '" style="width: ' +
                  (100 / t).toFixed(2) +
                  '%"><div class="ti-review-image-inner"><img src="' +
                  s[e].thumbnail +
                  '" loading="lazy" alt="" />' +
                  (o
                    ? '<div class="ti-more-image-count">+' +
                      (s.length - e - 1) +
                      "</div>"
                    : "") +
                  "</div></div>";
              }
              (e.innerHTML = i), this.registerImageErrorEvent();
            }
          });
      }
      toggleGalleryVisiblity() {
        let t = Boolean(
          this.widget.reviewsContainer.querySelector(
            ".ti-review-item:not(.ti-hidden-review) .ti-review-image-container",
          ),
        );
        this.widget.reviewsContainer
          .querySelectorAll(".ti-review-item")
          .forEach((e, i) => {
            let s = e.querySelector(".ti-review-image-container");
            s && (s.style.transition = ""),
              e.classList.add("ti-hidden-review"),
              i >= this.widget.TrustindexSliderWidget.state &&
                i <
                  this.widget.TrustindexSliderWidget.state +
                    this.widget.TrustindexSliderWidget.visibleReviewNum +
                    (this.widget.TrustindexSliderWidget.state < 0 ? 1 : 0) &&
                (e.classList.remove("ti-hidden-review"),
                s && t && (s.style.transition = "none"));
          });
      }
      registerImageErrorEvent() {
        this.widget.reviewsContainer
          .querySelectorAll(".ti-review-image img")
          .forEach((t) => {
            t.addEventListener("error", (t) => {
              let e = t.target,
                i = e.closest(".ti-review-item").getAttribute("data-id");
              for (let t = 0, s = this.data.length; t < s; t++)
                if (this.data[t].r === i && this.data[t].thumbnail === e.src) {
                  this.data.splice(t, 1);
                  break;
                }
              let s = e.closest(".ti-review-image-container");
              if (s) return s.removeAttribute("data-image-listed"), this.resize();
              let r = e.closest(".ti-review-image"),
                o = this.data.filter((t) => t.r === i);
              o.length > 0
                ? ((e.src = o[0].thumbnail),
                  (r.querySelector(".ti-more-image-count").innerHTML =
                    "+" + o.length - 1),
                  1 === o.length && r.classList.remove("ti-has-more-image"))
                : r.remove();
            });
          });
      }
    }
    class p {
      constructor(t) {
        (this.data = t.TrustindexReviewImageModule.data), (this.widget = t);
      }
      init() {
        (this.lightbox = new DOMParser()
          .parseFromString(
            '<div class="ti-widget-lightbox">\n\t\t\t<div class="ti-widget-lightbox-close"></div>\n\t\t\t<div class="ti-widget-lightbox-inner">\n\t\t\t\t<div class="ti-widget-card">\n\t\t\t\t\t<div class="ti-card-body">\n\t\t\t\t\t\t<div class="ti-card-media">\n\t\t\t\t\t\t\t<img alt="" />\n\t\t\t\t\t\t\t<div class="ti-nav-arrow">\n\t\t\t\t\t\t\t\t<div class="ti-arrow-prev"></div>\n\t\t\t\t\t\t\t\t<div class="ti-arrow-next"></div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="ti-review-content"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>',
            "text/html",
          )
          .querySelector(".ti-widget-lightbox")),
          (this.image = this.lightbox.querySelector(".ti-card-media img")),
          (this.reviewContent =
            this.lightbox.querySelector(".ti-review-content")),
          (this.prevArrow = this.lightbox.querySelector(".ti-arrow-prev")),
          (this.nextArrow = this.lightbox.querySelector(".ti-arrow-next")),
          (this.currentIndex = 0),
          (this.currentReview = null),
          (this.lightbox.style.fontFamily = window
            .getComputedStyle(this.widget.container, null)
            .getPropertyValue("font-family")),
          this.addEvents();
      }
      addEvents() {
        let t, e, i, s;
        this.image.onload = () =>
          this.image.parentNode.classList.remove("ti-image-loading");
        let r = !1,
          o = !1;
        this.image.addEventListener(
          "touchstart",
          (a) => {
            (t = a.touches[0].pageX),
              (i = a.touches[0].pageY),
              (e = null),
              (s = null),
              (r = !1),
              (o = !1);
          },
          { passive: !0 },
        ),
          this.image.addEventListener(
            "touchmove",
            (a) => {
              (e = a.touches[0].pageX), (s = a.touches[0].pageY);
              let n = e - t,
                d = s - i;
              Math.abs(d) > 10 && !r && (o = !0),
                !o && (Math.abs(n) > 10 || r) && (r = !0);
            },
            { passive: !0 },
          ),
          this.image.addEventListener(
            "touchend",
            (i) => {
              if (r && !o && t && e && Math.abs(t - e) > 25) {
                let i = this.currentIndex - 1;
                t > e && (i = this.currentIndex + 1), this.change(i);
              }
              return (t = null), (e = null), (r = !1), (o = !1), !1;
            },
            { passive: !0 },
          ),
          this.lightbox.addEventListener("click", (t) => {
            t.preventDefault(),
              t.stopPropagation(),
              t.target.matches(".ti-arrow-prev")
                ? this.change(this.currentIndex - 1)
                : t.target.matches(".ti-arrow-next")
                  ? this.change(this.currentIndex + 1)
                  : (!t.target.matches(".ti-widget-lightbox") &&
                      !t.target.matches(".ti-widget-lightbox-close")) ||
                    t.target.closest(".ti-widget-lightbox-inner") ||
                    this.close();
          });
      }
      show(t) {
        void 0 === this.lightbox && this.init(),
          (this.widget.isLightboxShowing = !0),
          (document.body.style.overflow = "hidden"),
          document
            .querySelectorAll(".ti-widget-lightbox")
            .forEach((t) => t.remove());
        let e = t.closest(".ti-review-item").getAttribute("data-id"),
          i = 0,
          s = parseInt(t.getAttribute("data-image-index"));
        for (let t = 0, r = this.data.length; t < r; t++)
          if (this.data[t].r === e && this.data[t].index === s) {
            i = t;
            break;
          }
        document.body.appendChild(this.lightbox),
          this.change(i),
          setTimeout(
            () => this.lightbox.classList.add("ti-widget-lightbox-appeared"),
            10,
          );
      }
      close() {
        this.lightbox.classList.remove("ti-widget-lightbox-appeared"),
          setTimeout(() => this.lightbox.remove(), 300),
          (document.body.style.overflow = ""),
          delete this.widget.isLightboxShowing;
      }
      change(t) {
        (this.currentIndex = t),
          this.image.parentNode.classList.add("ti-image-loading");
        let e = this.data[this.currentIndex].src;
        if (
          (-1 !== e.indexOf("google") &&
            (e = e.replace(
              /=w.+/,
              "=s" +
                Math.round(
                  this.image.parentNode.offsetHeight *
                    Trustindex.getDevicePixelRatio(),
                ),
            )),
          (this.image.src = e),
          this.currentReview !== this.data[this.currentIndex].r)
        ) {
          (this.currentReview = this.data[this.currentIndex].r),
            (this.reviewContent.innerHTML = "");
          let t = this.widget.querySelector(
            '.ti-review-item[data-id="' + this.data[this.currentIndex].r + '"]',
          );
          if (!t) return;
          let e = t.querySelector(".ti-review-header").cloneNode(!0);
          e.classList.add("ti-lightbox-review-header");
          let i = t.querySelector(".ti-review-text-container").cloneNode(!0);
          i.setAttribute("class", "ti-review-text"),
            i.setAttribute("style", ""),
            i.querySelectorAll(".ti-review-image").forEach((t) => t.remove()),
            this.reviewContent.appendChild(e),
            this.reviewContent.appendChild(
              t.querySelector(".ti-stars").cloneNode(!0),
            ),
            this.reviewContent.appendChild(i),
            this.lightbox
              .querySelector(".ti-widget-card")
              .setAttribute(
                "class",
                t
                  .getAttribute("class")
                  .replace("ti-review-item", "ti-widget-card"),
              );
        }
        this.prevArrow.toggleHide(),
          this.nextArrow.toggleHide(),
          t > 0 && this.prevArrow.toggleShow(),
          t < this.data.length - 1 && this.nextArrow.toggleShow();
      }
      click(t) {
        t.target.matches(".ti-review-image") &&
          (t.preventDefault(), this.show(t.target));
      }
    }
    class w {
      constructor(t) {
        let e = t.querySelector(
          'script.ti-ai-summary[type="application/ld+json"]',
        );
        (this.summary = JSON.parse(e.innerHTML).summary),
          e.remove(),
          (this.widget = t);
      }
      format() {
        let t = this.widget.reviewsContainer.querySelector(".ti-review-item");
        if (!t || void 0 !== this.element) return;
        let e = t.cloneNode(!0);
        e.setAttribute("class", this.getClassName(e)),
          e.removeAttribute("data-id"),
          e
            .querySelectorAll(
              ".ti-stars, .ti-platform-icon, .ti-review-image-container",
            )
            .forEach((t) => t.remove());
        let i = e.querySelector(".ti-profile-details .ti-name");
        i && (i.innerHTML = this.summary.title);
        let s = e.querySelector(".ti-profile-img");
        if (s) {
          let e = s.querySelector("img");
          t.querySelector(".ti-profile-img").offsetWidth;
          if (
            (e ||
              ((e = document.createElement("img")),
              (s.innerHTML = ""),
              s.appendChild(e)),
            this.summary.images.length > 0)
          ) {
            for (let t = 0; t < this.summary.images.length; t++) {
              let i = e.cloneNode(!0);
              (i.src = this.summary.images[t]),
                i.removeAttribute("srcset"),
                s.appendChild(i);
            }
            let t = e.cloneNode(!0);
            (t.src = Trustindex.getCDNUrl() + "assets/img/ai-profile-image.svg"),
              t.removeAttribute("srcset"),
              s.appendChild(t),
              e.remove();
          } else
            (e.src = Trustindex.getCDNUrl() + "assets/img/ai-profile-image.svg"),
              e.removeAttribute("srcset"),
              e.setAttribute("alt", ""),
              e.classList.add("ti-ai-profile-img");
        }
        let r = e.querySelector(".ti-profile-details .ti-date");
        r && (r.innerHTML = this.summary.comment);
        let o = e.querySelector(".ti-review-text-container");
        o && (o.innerHTML = this.summary.text),
          void 0 !== this.widget.TrustindexSliderWidget &&
          "left" === this.widget.TrustindexSliderWidget.rotateTo
            ? this.widget.reviewsContainerWrapper.append(e)
            : this.widget.reviewsContainerWrapper.insertBefore(
                e,
                this.widget.reviewsContainerWrapper.firstChild,
              ),
          (this.element = e);
      }
      getClassName(t) {
        return (
          "ti-ai-summary-item " +
          t
            .getAttribute("class")
            .replace(/source-[^\s]+/, "")
            .trim() +
          (-1 !== this.summary.text.indexOf("<li>") ? " ti-with-checklist" : "")
        );
      }
    }
    if (
      ((Element.prototype.toggleShow = function (t) {
        this.style.display = t || "";
      }),
      (Element.prototype.toggleHide = function () {
        this.style.display = "none";
      }),
      void 0 === window.TrustindexWidget)
    ) {
      (window.tiWidgetInstances = []),
        (window.Trustindex = i),
        (window.TrustindexWidget = s),
        (window.TrustindexReviewWidget = r),
        (window.TrustindexSliderWidget = o),
        (window.TrustindexMasonryWidget = a),
        (window.TrustindexPopupWidget = n),
        (window.TrustindexFloatingWidget = d),
        (window.TrustindexTopRatedWidget = l),
        (window.TrustindexReadMoreModule = h),
        (window.TrustindexLoadMoreModule = g),
        (window.TrustindexHeaderModule = c),
        (window.TrustindexReviewImageModule = u),
        (window.TrustindexLightboxModule = p),
        (window.TrustindexAiSummaryModule = w),
        i.setConstants();
      let t = document.body ? document.body.offsetWidth : 0,
        e = null;
      window.addEventListener("resize", () => {
        document.body.offsetWidth !== t &&
          ((t = document.body.offsetWidth),
          e && clearTimeout(e),
          window.tiWidgetInstances.forEach((t) => t.resize()));
      }),
        document.addEventListener("click", (t) => {
          window.tiWidgetInstances.forEach((e) => e.documentClick(t));
        }),
        document.addEventListener("keyup", (t) => {
          window.tiWidgetInstances.forEach((e) => e.documentKeyup(t));
        }),
        (window.tiElementToWaitForVisibility = []),
        (window.tiElementToWaitForActivity = []);
      let m = function (t) {
          window.tiElementToWaitForVisibility.forEach((t, e) => {
            t.isTriggerLoad() &&
              (new s(null, t), window.tiElementToWaitForVisibility.splice(e, 1));
          });
        },
        v = function (t) {
          window.tiElementToWaitForActivity.forEach((t, e) => {
            if (
              (window.tiElementToWaitForActivity.splice(e, 1),
              !0 === t.isWaitForVisibility && !t.isTriggerLoad())
            )
              return window.tiElementToWaitForVisibility.push(t);
            new s(null, t);
          });
        };
      window.addEventListener("keydown", v, !1),
        window.addEventListener("mousemove", v, !1),
        window.addEventListener("mouseover", v, !1),
        window.addEventListener("wheel", v, !1),
        window.addEventListener("touchmove", v, !1),
        window.addEventListener("touchstart", v, !1),
        window.addEventListener("scroll", m, !1),
        window.addEventListener("wheel", m, !1),
        window.addEventListener("touchmove", m, !1),
        i.isMobileDevice() &&
          "hidden" ===
            window
              .getComputedStyle(document.documentElement, null)
              .getPropertyValue("overflow") &&
          (document.documentElement.style.overflow = "unset");
    }
    document.currentScript.getAttribute("data-skip-init") ||
      (document
        .querySelectorAll("pre.ti-widget")
        .forEach((t) => t.replaceWith(t.firstChild)),
      setTimeout(() => {
        i.initWidgetsFromDom(), i.loadWidgetsFromDom();
      }, 4));
  })();
  //# sourceMappingURL=loader.js.map
  