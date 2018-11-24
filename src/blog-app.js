/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/

import {
  PolymerElement,
  html
} from "@polymer/polymer/polymer-element.js";

import {
  scroll
} from '@polymer/app-layout/helpers/helpers.js';

import {
  setPassiveTouchGestures,
  setRootPath
} from "@polymer/polymer/lib/utils/settings.js";

import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-fab/paper-fab.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-styles/shadow.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-media-query/iron-media-query.js';

import "@polymer/app-storage/app-localstorage/app-localstorage-document.js";
import '@polymer/paper-toggle-button/paper-toggle-button.js';

import {
  afterNextRender
} from "@polymer/polymer/lib/utils/render-status.js";
import './app-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
// eslint-disable-next-line no-undef
setRootPath(BazdaraAppGlobals.rootPath);

/**
 * @polymer
 * @extends HTMLElement
 */
class BlogApp extends PolymerElement {
  static get template() {
    return html `
    <style>

      :host  {
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

      /*
     * You can use these generic variables in your elements for easy theming.
     * For example, if all your elements use \`--primary-text-color\` as its main
     * color, then switching from a light to a dark theme is just a matter of
     * changing the value of \`--primary-text-color\` in your application.
     */
    --primary-text-color: var(--dark-theme-text-color);
    --primary-background-color: var(--dark-theme-background-color);
    --secondary-background-color: var(--dark-theme-background2-color);
    --light-background-color: var(--dark-theme-background3-color);
    --secondary-text-color: var(--dark-theme-secondary-color);
    --disabled-text-color: var(--dark-theme-disabled-color);
    --divider-color: var(--dark-theme-divider-color);
    --error-color: var(--paper-deep-orange-a700);
    /*
     * Primary and accent colors. Also see color.js for more colors.
     */
    --primary-color: var(--paper-deep-orange-500);
    --light-primary-color: var(--paper-deep-orange-300);
    --dark-primary-color: var(--paper-deep-orange-900);
    --accent-color: var(--paper-red-a200);
    --light-accent-color: var(--paper-red-a100);
    --dark-accent-color: var(--paper-red-a400);
    /*
     * Material Design Light background theme
     */
     --light-theme-background-color: #fff;
     --light-theme-background2-color: #eee;
     --light-theme-background3-color: #fafafa;
    --light-theme-base-color: #000000;
    --light-theme-text-color: var(--paper-grey-800);
    --light-theme-secondary-color: #737373;  /* for secondary text and icons */
    --light-theme-disabled-color: #9b9b9b;  /* disabled/hint text */
    --light-theme-divider-color: #dbdbdb;
    /*
     * Material Design Dark background theme
     */
     --dark-theme-background-color: var(--paper-grey-900);
     --dark-theme-background2-color: var(--paper-grey-800);
     --dark-theme-background3-color: var(--paper-grey-600);
    --dark-theme-base-color: #fafafa;
    --dark-theme-text-color: #fafafa;
    --dark-theme-secondary-color: #bcbcbc;  /* for secondary text and icons */
    --dark-theme-disabled-color: #646464;  /* disabled/hint text */
    --dark-theme-divider-color: #3c3c3c;
    /*
     * Deprecated values because of their confusing names.
     */
    --text-primary-color: var(--dark-theme-text-color);
    --default-primary-color: var(--primary-color);
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
    	margin: 0;
    	padding: 0;
    	border: 0;
    	font: inherit;
    }

    .text-left {
      text-align: left;
    }
    .text-right {
      text-align: right;
    }
    .text-center {
      text-align: center;
    }
    .text-justify {
      text-align: justify;
    }
    .text-nowrap {
      white-space: nowrap;
    }
    .text-lowercase {
      text-transform: lowercase;
    }
    .text-uppercase {
      text-transform: uppercase;
    }
    .text-capitalize {
      text-transform: capitalize;
    }


      app-drawer {
        --app-drawer-content-container: {
          background-color: var(--dark-theme-background-color);
          overflow-x: hidden;
        };
      }

      app-drawer app-header {
        background-color: var(--dark-theme-background-color);
      }

      .nav-menu {
        background-color: var(--dark-theme-background-color);
        color: var(--dark-theme-text-color);
      }

      a {
        text-decoration: none;
        color: inherit;
        font-size: inherit;
      }

      .nav-menu > a {
        display: block;
        padding: 12px 16px;
        font-size: 20px;
        font-weight: 500;
      }

      .nav-menu > a.iron-selected {
        background-color: var(--light-primary-color);
        color: var(--dark-theme-background-color);
      }

      .main-header {
        border-bottom: 1px solid var(--divider-color);
        background-color: var(--primary-background-color);
        color: var(--primary-text-color);
      }

      .title-toolbar {
        @apply --layout-center-center;
        box-sizing: border-box;
      }

      .nav-title-toolbar {
        color: var(--dark-theme-text-color);;
        width: 100vw;
      }

      .main-title-toolbar {
        width: 100%;
      }

      .title {
        padding-bottom: 40px;
        font-size: 60px;
        font-weight: 400;
      }

      article-headline {
        @apply --shadow-transition;
        @apply --shadow-elevation-2dp;
        cursor: pointer;
      }

      article-detail {
        max-width: 800px;
        margin: 64px auto;
        background-color: var(--primary-background-color);
        @apply --shadow-elevation-2dp;
      }

      [hidden] {
        display: none;
      }

      @media (max-width: 580px) {

        /* make title smaller to fit on screen */
        .title {
          font-size: 40px;
          padding-bottom: 16px;
        }

      }

      /* narrow layout */
      @media (max-width: 808px) {

        article-detail {
          max-width: none;
          margin: 0;
        }

      }

      .small {
        font-size: 30%;
      }

      .title {
        text-align: center;
      }

      .logo {
        margin-top:60px;
        width:72px;
        margin-left:auto;
        margin-right:auto
      }

      .icon {
        margin-top:-3px;
        margin-right: 10px
      }

      /* narrow layout */
      @media (min-width: 809px) {

        .category-page {
          margin: 60px auto;
        }

      }

      .themebutton {
        margin-top:-43px;
        float:right;
        margin-right:10px
      }

    </style>

    <!-- setup routes -->
    <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{abroute}}"></app-route>
    <app-route route="{{abroute}}" pattern="/:category" data="{{categoryData}}" tail="{{subRoute}}"></app-route>
    <app-route route="{{subRoute}}" pattern="/:id" data="{{idData}}"></app-route>

    <app-drawer-layout fullbleed="" drawer-width="288px" responsive-width="1280px" narrow="{{narrow}}">

      <!-- nav panel -->
      <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
        <app-header-layout has-scrolling-region>

          <app-header fixed slot="header">

            <!-- top toolbar -->
            <app-toolbar class="inner-logo">
            <img class="logo" src\$="[[path]]images/icons/bazdara-icon-72.png" hidden="[[narrow]]" />
            </app-toolbar>

            <!-- bottom toolbar -->
            <app-toolbar class="title-toolbar nav-title-toolbar">
              <div class="title">BAZDARA<div class="small">Solutions</div></div>
            </app-toolbar>

          </app-header>

          <!-- nav menu -->
          <iron-selector class="nav-menu" selected\$="[[_selected(page, categoryData.category)]]" attr-for-selected="name">
            <a name="home" href="[[rootPath]]"><iron-icon class="icon" icon="app:home"></iron-icon>Home</a>
            <template is="dom-repeat" items="[[articles]]">
              <a name$="[[item.name]]" href="[[rootPath]]portfolio/[[item.name]]"><iron-icon class="icon" icon\$="{{item.icon}}"></iron-icon>{{item.title}}</a>
            </template>
            <a name="about" href="[[rootPath]]about"><iron-icon class="icon" icon="app:email"></iron-icon>About</a>
          </iron-selector>

        </app-header-layout>
      </app-drawer>

      <!-- main panel -->
      <app-header-layout>

        <app-header fixed effects="waterfall" class="main-header" slot="header">

          <!-- top toolbar -->
          <app-toolbar>
            <!-- menu button -->
            <paper-icon-button drawer-toggle icon="app:menu" hidden\$="[[_shouldHideMenuButton(routeData.page, narrow)]]" aria-label="Menu"></paper-icon-button>

            <!-- back button -->
            <a href="[[rootPath]]portfolio/[[categoryData.category]]" hidden\$="[[_shouldHideBackButton(routeData.page)]]"">
              <paper-icon-button icon="app:arrow-back" aria-label="Back"></paper-icon-button>
            </a>


          </app-toolbar>
          <div class="themebutton">
            <iron-media-query query="(prefers-color-scheme: dark)" query-matches="{{dark}}"></iron-media-query>
            <app-localstorage-document key="theme" data="{{theme}}"></app-localstorage-document>
            <paper-toggle-button checked="{{theme}}" aria-label="Dark Theme">Dark</paper-toggle-button>
          </div>

          <!-- bottom toolbar -->
          <app-toolbar class="title-toolbar main-title-toolbar">
            <div class="title"><h1>BAZDARA</h1><div class="small">Solutions</div></div>
          </app-toolbar>



        </app-header>

        <!-- list/detail pages -->
        <iron-pages selected="[[page]]" class$="[[page]]" attr-for-selected="name" role="main">

          <app-home id="home" name="home"></app-home>

          <!-- list page -->
          <iron-pages id="portfolio" name="portfolio" selected="[[categoryData.category]]" attr-for-selected="name">

            <template is="dom-repeat" items="[[articles]]" as="category">
              <section class="category-page" name="[[category.name]]">
                <!-- 2-columns grid -->
                <two-columns-grid column-width="396" gutter="4">
                  <template is="dom-repeat" items="[[category.items]]" as="article">
                    <template is="dom-if" if="[[article.link]]">
                      <article-headline href="[[article.link]]" article="[[article]]"></article-headline>
                    </template>
                    <template is="dom-if" if="[[!article.link]]">
                      <article-headline href="[[rootPath]]showcase/[[category.name]]/[[article.id]]" article="[[article]]"></article-headline>
                    </template>
                  </template>
                </two-columns-grid>
              </section>
            </template>

          </iron-pages>

          <!-- detail page -->
          <article-detail id="showcase" name="showcase" article="[[article]]"></article-detail>

          <app-about id="about" name="about"></app-about>

          <app-view404 id="view404" name="view404"></app-view404>
        </iron-pages>

      </app-header-layout>

    </app-drawer-layout>
    `;
  }

  static get properties() {
    return {

      /**
       * Articles data.
       */
      page: {
        type: String,
        reflectToAttribute: true,
        observer: "_pageChanged"
      },
      routeData: Object,
      abroute: Object,
      articles: Object,
      route: Object,
      subRoute: {
        type: Object,
        observer: '_subsubrouteChanged'
      },
      categoryData: Object,
      idData: Object,
      _scrollPositionMap: {
        type: Object,
        value: function () {
          return {};
        }
      },
      theme: {
        type: Boolean,
      }
    };
  }

  /**
   * Send data to Google Analytics via ga('send')
   * @type {String|Object} See https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits
   */
  send(payload) {
    ga('send', payload);
  }

  static get observers() {
    return ["_themechange(theme)", "_updateArticle(articles, categoryData.category, idData.id)", "_routePageChanged(routeData.page)", "_meta(routeData.page, categoryData.category, idData.id, article)"];
  }

  _themechange() {

    if (this.dark) {
      this.theme = true;
    }

    if (this.theme === true) {
      //DARK THEME
      this.updateStyles({
        '--primary-text-color': 'var(--dark-theme-text-color'
      });
      this.updateStyles({
        '--primary-background-color': 'var(--dark-theme-background-color'
      });
      this.updateStyles({
        '--secondary-background-color': 'var(--dark-theme-background2-color'
      });
      this.updateStyles({
        '--light-background-color': 'var(--dark-theme-background3-color'
      });
      this.updateStyles({
        '--secondary-text-color': 'var(--dark-theme-secondary-color'
      });
      this.updateStyles({
        '--disabled-text-color': 'var(--dark-theme-disabled-color'
      });
      this.updateStyles({
        '--divider-color': 'var(--dark-theme-divider-color'
      });
      document.body.classList.remove('white');
      document.body.classList.add('black');

    } else {
      //LIGHT THEME
      this.updateStyles({
        '--primary-text-color': 'var(--light-theme-text-color'
      });
      this.updateStyles({
        '--primary-background-color': 'var(--light-theme-background-color'
      });
      this.updateStyles({
        '--secondary-background-color': 'var(--light-theme-background2-color'
      });
      this.updateStyles({
        '--light-background-color': 'var(--light-theme-background3-color'
      });
      this.updateStyles({
        '--secondary-text-color': 'var(--light-theme-secondary-color'
      });
      this.updateStyles({
        '--disabled-text-color': 'var(--light-theme-disabled-color'
      });
      this.updateStyles({
        '--divider-color': 'var(--light-theme-divider-color'
      });
      document.body.classList.remove('black');
      document.body.classList.add('white');
    }

  }

  _meta(page, category, id, article) {

    if (!this.json) {
      this.json = document.createElement('script');
      this.json.type = 'application/ld+json';
      //document.querySelector('body').appendChild(this.json);
      document.head.appendChild(this.json);
    }

    if ((page != this.oldpage) || (category != this.oldcategory) || (id != this.oldid) || (article)) {

      if ((!page) || (page == "home")) {
        this.metatitle = "Full-stack Developer";
        this.metadesc = "Luka Karinja aka pinkflozd personal site";
        this.metaimage = this.path + "images/icons/bazdara-icon-512.png";
        this.metatype = "website";
        this.metaurl = this.url + "/";
        this._settitle();

        this.json.text = JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebSite",
          "url": this.metaurl,
          "name": this.metatitle,
          "description": this.metadesc,
          "author": {
            "@type": "Person",
            "name": "Luka Karinja",
            "url": this.metaurl
          },
          "publisher": {
            "@type": "Person",
            "name": "Luka Karinja",
            "url": this.metaurl
          }
        });

      } else if (page == "portfolio") {
        this.metatitle = category[0].toUpperCase() + category.slice(1) + " Projects";
        this.metadesc = "My " + category + " Projects";
        this.metaimage = "";
        this.metatype = "website";
        this.metaurl = this.url + "/portfolio/" + category;
        this._settitle();

        this.json.text = JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebSite",
          "url": this.metaurl,
          "name": this.metatitle,
          "description": this.metadesc,
          "author": {
            "@type": "Person",
            "name": "Luka Karinja",
            "url": this.metaurl
          },
          "publisher": {
            "@type": "Person",
            "name": "Luka Karinja",
            "url": this.metaurl
          }
        });

      } else if (page == "showcase") {
        if (article) {
          this.metatitle = this.article.title;
          this.metadesc = this.article.desc;
          this.metaimage = this.path + "images/pages/" + this.article.image;
          this.metatype = "article";
          this.metaurl = this.url + "/showcase/" + category + '/' + id;
          this._settitle();

          this.json.text = JSON.stringify({
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "headline": this.article.title,
            "keywords": "",
            "url": this.metaurl,
            "datePublished": this.article.date,
            "dateCreated": this.article.date,
            "dateModified": this.article.date,
            "articleBody": this.article.desc + this.article.content,
            "image": {
              "@type": "ImageObject",
              "url": this.path + "images/pages/" + this.article.image
            },
            "author": {
              "@type": "Person",
              "name": this.article.author,
              "url": this.url
            },
            "publisher": {
              "@type": "Person",
              "name": this.article.author,
              "url": this.url
            }
          });
        }


      } else if (page == "about") {
        this.metatitle = "About Me";
        this.metadesc = "I’m a 34 year old self-taught developer. I started learning programming in 1996";
        this.metaimage = this.path + "images/icons/bazdara-icon-512.png";
        this.metatype = "profile";
        this.metaurl = this.url + "/about";
        this._settitle();

        this.json.text = JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Person",
          "email": "pinkflozd@gmail.com",
          "image": this.metaimage,
          "jobTitle": "Full Stack Developer",
          "name": "Luka Karinja",
          "givenName": "Luka",
          "familyName": "Karinja",
          "alternateName": "pinkflozd",
          "birthPlace": "Koper, Yugoslavia",
          "gender": "male",
          "nationality": "Slovenian",
          "url": this.url + "/about",
          "sameAs": ["https://www.linkedin.com/in/pinkflozd/",
            "https://www.facebook.com/pinkflozd",
            "https://github.com/pinkflozd/",
            "https://twitter.com/VarjantaSim"
          ]
        });

      } else {
        this.metatitle = "Page Not Found";
        this.metadesc = "The link is broken or has been moved.";
        this.metaimage = "";
        this.metatype = "website";
        this.metaurl = this.url + "/404";
        this._settitle();

        this.json.text = JSON.stringify({});

      }

    }

    try {
      if ((this.metaurl != this.metaurlold) || (!this.metaurlold)) {
        this.send({
          hitType: 'pageview',
          page: window.location.pathname,
          location: window.location.href,
          title: this.metatitle
        });
        this.metaurlold = this.metaurl;
      }
    } catch (error) {
      console.log(error);
    }

    this.oldpage = page;
    this.oldcategory = category;
    this.oldid = id;
  }

  _settitle() {
    // Title
    document.title = this.metatitle + " - BAZDARA";
    document.querySelector('meta[itemprop="name"]').setAttribute("content", this.metatitle);
    document.querySelector('meta[name="twitter:title"]').setAttribute("content", this.metatitle);
    document.querySelector('meta[property="og:title"]').setAttribute("content", this.metatitle);
    // Description
    document.querySelector('meta[name="description"]').setAttribute("content", this.metadesc);
    document.querySelector('meta[itemprop="description"]').setAttribute("content", this.metadesc);
    document.querySelector('meta[name="twitter:description"]').setAttribute("content", this.metadesc);
    document.querySelector('meta[property="og:description"]').setAttribute("content", this.metadesc);
    // Image
    document.querySelector('meta[itemprop="image"]').setAttribute("content", this.metaimage);
    document.querySelector('meta[name="twitter:image"]').setAttribute("content", this.metaimage);
    document.querySelector('meta[property="og:image"]').setAttribute("content", this.metaimage);
    // Type
    document.querySelector('meta[property="og:type"]').setAttribute("content", this.metatype);
    document.querySelector('meta[property="og:url"]').setAttribute("content", this.metaurl);
  }

  _selected(page, title) {

    if ((page != "portfolio") && (page != "showcase")) {
      return page;
    } else {
      return title;
    }

  }

  _routePageChanged(page) {
    // Show the corresponding page according to the route.
    //
    // If no page was found in the route data, page will be an empty string.
    // Show 'home' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = "home";
    } else if (["home", "portfolio", "showcase", "about"].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = "view404";
    }

    this._drawerSelected();

  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    /* jshint ignore:start */
    switch (page) {
      case "home":
        import("./app-home.js");
        break;
      case "portfolio":
        import("./article-headline.js");
        import("./two-columns-grid.js");
        break;
      case "showcase":
        import("./article-detail.js");
        break;
      case "about":
        import("./app-about.js");
        break;
      case "view404":
        import("./app-view404.js");
        break;
    }
    /* jshint ignore:end */
  }



  _equal(value1, value2) {
    return value1 === value2;
  }

  _updateArticle(articles, category, id) {
    if (!articles) {
      return;
    }
    for (var i = 0, cat; cat = articles[i]; i++) {
      if (cat.name === category) {
        for (var j = 0, article; article = cat.items[j]; j++) {
          if (article.id === id) {
            this.article = article;
            return;
          }
        }
      }
    }
  }

  _drawerSelected() {
    if (!this.$.drawer.persistent)
      this.$.drawer.close();
  }

  _shouldHideMenuButton(page, narrow) {
    return page === 'showcase' || !narrow;
  }

  _shouldHideBackButton(page) {
    return page != 'showcase';
  }

  /**
   * Preserves the document scroll position, so
   * it can be restored when returning to a page.
   */
  _subsubrouteChanged(subroute, oldSubroute) {
    var map = this._scrollPositionMap;
    if (oldSubroute != null && oldSubroute.prefix != null) {
      // Don't reset the scroll position in the detail page.
      if (oldSubroute.prefix.indexOf('detail') == -1) {
        map[oldSubroute.prefix] = window.pageYOffset;
      }
    }
    if (map[subroute.prefix] != null) {
      scroll({
        top: map[subroute.prefix],
        behavior: 'silent'
      });
    } else if (this.isAttached) {
      scroll({
        top: 0,
        behavior: 'silent'
      });
    }
  }

  constructor() {
    super();
    this.path = document.getElementsByTagName('base')[0].href;
    this.url = window.BazdaraAppGlobals.url;

    afterNextRender(this, function () {
      /* jshint ignore:start */
      setTimeout(function () {
        import("./app-home.js");
        import("./article-headline.js");
        import("./two-columns-grid.js");
        import("./article-detail.js");
        import("./app-about.js");
        import("./app-view404.js");
      }, 5000);
      /* jshint ignore:end */
    });


  }
}

window.customElements.define("blog-app", BlogApp);
