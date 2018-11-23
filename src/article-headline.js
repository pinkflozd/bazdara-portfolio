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
import {} from '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

/**
 * @polymer
 * @extends HTMLElement
 */
class ArticleHeadline extends PolymerElement {
  static get template() {
    return html `
    <style>

      :host {
        font-size: 22px;
        line-height: 32px;
      }

      a {
        @apply --layout-vertical;
        height: 100%;
        text-decoration: none;
      }

      .image {
        @apply --layout-flex;
        background-repeat: no-repeat;
        background-position: center center;
      }

      .title {
        height: 56px;
        @apply --layout-horizontal;
        @apply --layout-center-center;
        padding: 0 8px;
        text-align: center;
        letter-spacing: 0.8px;
      }

    </style>

    <a href\$="[[href]]" target\$="[[target]]" title\$="[[article.desc]]">
      <div class="image" style\$="background-color: [[article.primaryColor]]; background-size: [[article.imageSize]]; background-image: url('[[path]]images/pages/[[article.image]]');"></div>
      <div class="title" style\$="background-color: [[article.secondaryColor]]; color: [[article.textColor]]">[[article.title]]</div>
    </a>
`;
}

static get properties() {
  return {
    properties: {

      article: Object,
      href: String

    }
  };
}

ready() {
  super.ready();

  if (this.article.link) {
    this.target = "_blank";
  } else {
    this.target = "_self";
  }

}

constructor() {
  super();
  this.path = document.getElementsByTagName('base')[0].href;
}

}

window.customElements.define("article-headline", ArticleHeadline);
