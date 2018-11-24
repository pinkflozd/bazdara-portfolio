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

import '@polymer/paper-fab/paper-fab.js';
import './app-icons.js';

/**
 * @polymer
 * @extends HTMLElement
 */
class ArticleDetail extends PolymerElement {
  static get template() {
    return html `
    <style>

      :host {
        display: block;
      }

      .image {
        height: 240px;
        background-repeat: no-repeat;
        background-position: center center;
      }

      .header {
        position: relative;
        padding: 24px 0;
        text-align: center;
        font-size: 14px;
        letter-spacing: 1px;
        color: var(--primary-text-color);
      }

      .title h2 {
        padding: 6px 0;
        font-size: 30px;
        font-weight: 600;
      }

      paper-fab {
        position: absolute;
        top: -28px;;
        right: 40px;
        background-color: var(--primary-color);
      }

      .main {
        padding: 24px 80px;
        border-top: 1px solid var(--divider-color);
        font-size: 18px;
        line-height: 32px;
        letter-spacing: 1px;
        color: var(--primary-text-color);
      }

      h3 {
        font-size: 24px;
        font-weight: 400;
        line-height: 32px;
      }

      /* narrow layout */
      @media (max-width: 808px) {

        .main {
          padding: 24px;
        }

        /* position fab to the bottom right corner of the screen */
        paper-fab {
          position: fixed;
          top: auto;
          right: 24px;
          bottom: 24px;
        }

      }

    </style>

    <div class="image" style\$="background-color: [[article.primaryColor]]; background-size: [[article.imageSize]]; background-image: url('[[path]]images/pages/[[article.image]]')"></div>

    <div class="header">
      <div>[[article.author]]</div>
      <div class="title" style\$="color: [[article.secondaryColor]];"><h2>[[article.title]]</h2></div>
      <div>[[article.date]]</div>
      <a href\$="[[link]]" target="_blank" rel="noopener" title\$="[[desc]]">
        <paper-fab icon\$="[[icon]]" aria-label\$="[[desc]]"></paper-fab>
      </a>
    </div>

    <section class="main">
      <h3>{{article.desc}}</h3>
      <p>{{article.content}}</p>
    </section>
`;
}

static get properties() {
  return {
    properties: {
      article: {
        type: Object
      }
    }
  };
}

static get observers() {
  return ["_articlechange(article)"];
}

constructor() {
  super();

  this.path = document.getElementsByTagName('base')[0].href;
  this.url = window.BazdaraAppGlobals.url;
}

_articlechange(article) {
  if (article.downloadlink) {
    this.icon = "app:download";
    this.link = article.downloadlink;
    this.desc = "Download";
  } else {
    this.icon = "app:googleplus-reshare";
    this.link = article.articlelink;
    this.desc = "Go to article";
  }
}


}

window.customElements.define("article-detail", ArticleDetail);
