/**
 * Created by Grzegorz on 18.06.2017.
 */
class MockupElement extends HTMLElement {
    constructor () {
        super();
       // console.log("Add custom mockupelement");
        this.shadow = this.attachShadow({mode: 'open'});
       // console.log(this.shadow);
    }
    connectedCallback() {
        let template = document.currentScript.ownerDocument.querySelector('#mockup-template').content.cloneNode(true);

         this.shadow.appendChild(template);
         let photo = this.attributes.photo.value;
         this.shadow.querySelector('img').setAttribute('src', photo);

         let label = this.attributes.label.value;
         this.shadow.querySelector('h1').textContent = label;
    }
}
window.customElements.define('mockup-element', MockupElement);
