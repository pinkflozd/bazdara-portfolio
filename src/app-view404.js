import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/paper-styles/shadow.js';

/**
 * @polymer
 * @extends HTMLElement
 */
class AppView404 extends PolymerElement {
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
  color: #999;
}

.title {
  padding: 16px 0;
  font-size: 30px;
  font-weight: 600;
}

.main {
  padding: 24px 80px;
  border-top: 1px solid #ddd;
  font-size: 18px;
  line-height: 32px;
  letter-spacing: 1px;
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
  background-color: #fff;
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

<div class="article-detail">

<div class="image" style\$="background-color: var(--light-primary-color); background-image: url('[[this.path]]images/pages/man_about_mod.svg')"></div>

<div class="header">
<div class="title" style="color: var(--primary-color);">Page not found</div>
</div>

<section class="main">
<p class="text-center">The link is broken or has been moved.<br>Please try with the <a href="/">Home Page</a></p>
</section>
</div>
    `;
  }

  constructor() {
    super();
    this.path = window.BazdaraAppGlobals.rootPath;
  }

}

customElements.define('app-view404', AppView404);
