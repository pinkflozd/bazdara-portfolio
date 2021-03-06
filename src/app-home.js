import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/paper-styles/shadow.js';
import './social-icons.js';

/**
 * @polymer
 * @extends HTMLElement
 */
class AppHome extends PolymerElement {
  static get template() {
    return html`
<style>

:host {
  display: block;
}

.image {
  height: 240px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
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

}

 .article-detail {
  max-width: 800px;
  margin: 64px auto;
  background-color: var(--primary-background-color);
  @apply --shadow-elevation-2dp;
}

/* narrow layout */
@media (max-width: 808px) {

  .article-detail {
    max-width: none;
    margin: 0;
  }

}

.text-center {
  text-align: center
}

</style>

<div class="article-detail" id="animatable">

<div class="image" style\$="background-color: var(--primary-background-color); background-image: url('[[path]]images/pages/man_contact.svg')"></div>

<div class="header">
<div class="title" style="color: var(--primary-color);"><h2>I'm a self-taught Full Stack Developer</h2></div>
</div>

<section class="main">
<p class="text-center">If you want to get in touch with me use the links bellow.</p>
<social-icons></social-icons>
</section>
</div>
    `;
  }

  constructor() {
    super();
    this.path = document.getElementsByTagName('base')[0].href;
  }

}

customElements.define('app-home', AppHome);
