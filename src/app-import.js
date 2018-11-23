import {
  PolymerElement,
  html
} from "@polymer/polymer/polymer-element.js";
import '@polymer/iron-ajax/iron-ajax.js';
import './blog-app.js';


/**
 * @polymer
 * @extends HTMLElement
 */
class AppImport extends PolymerElement {
  static get template() {
    return html `
    <dom-bind>
      <template is="dom-bind">

        <iron-ajax url="data/articles.json" auto last-response="{{articles}}" handle-as="json"></iron-ajax>
        <blog-app articles="[[articles]]"></blog-app>

      </template>
    </dom-bind>
`;
}

}

window.customElements.define("app-import", AppImport);
