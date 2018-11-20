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
import * as Async from '@polymer/polymer/lib/utils/async.js';

import {
  scroll
} from '@polymer/app-layout/helpers/helpers.js';

import {
  setPassiveTouchGestures,
  setRootPath
} from "@polymer/polymer/lib/utils/settings.js";
// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
// eslint-disable-next-line no-undef
setRootPath(BazdaraAppGlobals.rootPath);

import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-pages/iron-pages.js';
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
import './app-icons.js';
import './shared-styles.js';

/**
 * @polymer
 * @extends HTMLElement
 */
class BlogApp extends PolymerElement {
  static get template() {
    return html `
    <style include="shared-styles">

        :root  {
          background-color: var(--secondary-background-color);
          min-height: 100vh
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
        background-color: var(--primary-color);
      }

      .main-header {
        border-bottom: 1px solid #ccc;
        background-color: var(--primary-background-color);
        color: var(--primary-text-color);
      }

      .title-toolbar {
        @apply --layout-center-center;
        box-sizing: border-box;
      }

      .nav-title-toolbar {
        color: #fff;
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
        max-width: 736px;
        margin: 64px auto;
        background-color: #fff;
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

    </style>

    <!-- setup routes -->
    <app-location route="{{route}}" url-space-regex="^[[rootPath]]"></app-location>
    <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{abroute}}"></app-route>
    <app-route route="{{abroute}}" pattern="/:category" data="{{categoryData}}" tail="{{subRoute}}"></app-route>
    <app-route route="{{subRoute}}" pattern="/:id" data="{{idData}}"></app-route>

    <app-drawer-layout drawer-width="288px" responsive-width="1280px" narrow="{{narrow}}">

      <!-- nav panel -->
      <app-drawer id="drawer" slot="drawer" swipe-open>
        <app-header-layout has-scrolling-region>

          <app-header fixed slot="header">

            <!-- top toolbar -->
            <app-toolbar></app-toolbar>

            <!-- bottom toolbar -->
            <app-toolbar class="title-toolbar nav-title-toolbar">
              <div class="title">BAZDARA<div class="small">Web development</div></div>
            </app-toolbar>

          </app-header>

          <!-- nav menu -->
          <iron-selector class="nav-menu" selected\$="[[_selected(page, categoryData.category)]]" attr-for-selected="name">
            <a name="home" href="[[rootPath]]">About</a>
            <template is="dom-repeat" items="[[articles]]">
              <a name$="[[item.name]]" href="[[rootPath]]portfolio/[[item.name]]">{{item.title}}</a>
            </template>
            <a name="contact" href="[[rootPath]]contact">Contact</a>
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
              <paper-icon-button icon="app:arrow-back"></paper-icon-button>
            </a>
          </app-toolbar>

          <!-- bottom toolbar -->
          <app-toolbar class="title-toolbar main-title-toolbar">
            <div class="title">BAZDARA<div class="small">Web development</div></div>
          </app-toolbar>

        </app-header>

        <!-- list/detail pages -->
        <iron-pages selected="[[page]]" class$="[[page]]" attr-for-selected="name" role="main">

          <app-home name="home"></app-home>

          <!-- list page -->
          <iron-pages name="portfolio" selected="[[categoryData.category]]" attr-for-selected="name">

            <template is="dom-repeat" items="[[articles]]" as="category">
              <section class="category-page" name="[[category.name]]">
                <!-- 2-columns grid -->
                <two-columns-grid column-width="396" gutter="4">
                  <template is="dom-repeat" items="[[category.items]]" as="article">
                    <article-headline href="[[rootPath]]showcase/[[category.name]]/[[article.id]]" article="[[article]]"></article-headline>
                  </template>
                </two-columns-grid>
              </section>
            </template>

          </iron-pages>

          <!-- detail page -->
          <article-detail name="showcase" article="[[article]]"></article-detail>

          <app-contact name="contact"></app-contact>

          <app-view404 name="view404"></app-view404>
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
      }

    };
  }

  static get observers() {
    return ["_updateArticle(articles, categoryData.category, idData.id)", "_routePageChanged(routeData.page)"];
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
    } else if (["home", "portfolio", "showcase", "contact"].indexOf(page) !== -1) {
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
      case "contact":
        import("./app-contact.js");
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
}

window.customElements.define("blog-app", BlogApp);
