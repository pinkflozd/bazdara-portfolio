import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/paper-styles/shadow.js';
import './social-icons.js';

/**
 * @polymer
 * @extends HTMLElement
 */
class AppAbout extends PolymerElement {
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

.text-muted {
  color: var(--secondary-text-color)
}

</style>

<div class="article-detail">

<div class="image" style\$="background-color: var(--light-primary-color); background-image: url('[[path]]images/pages/man_home1.svg')"></div>

<div class="header">
<div class="title" style="color: var(--primary-color);"><h2>About me</h2></div>
</div>

<section class="main">
<p>My name is Luka <span class="text-muted">(pinkflozd)</span>. I'm a [[getAge("1985/08/04")]] years old self-taught Full Stack Developer. I started learning web development back in 1996 when I made a Pink Floyd tribute site hosted on GeoCities. I have extensive HTML 5, CSS skills. In the past most of my project were based on Wordpress or some sort of PHP framework. Recently i got in love with Web Components and Progressive Web Apps so i started to learn and code mostly in JavaScript. I'm a Arch Linux user since 2005 and have never looked back. The only Microsoft products i use are Visual Studio Code and GitHub. I have also extensive knowledge of Linux server administration, cloud based systems and Virtualization. In the past i was working on all kinds of stuff, from Android kernels to Game 3d modeling done in Autodesk 3ds Max for the game rFactor. You can find some of my projects on this site and if you want to get in touch with me use the links bellow.</p>
<social-icons></social-icons>
</section>
</div>
    `;
  }

  constructor() {
    super();
    this.path = document.getElementsByTagName('base')[0].href;
  }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

}

customElements.define('app-about', AppAbout);
