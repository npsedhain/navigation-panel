import { nothing } from 'lit-html';
import { html, css, LitElement } from 'lit-element';

const SIDEBAR = 'sidebar';

/**
 * Navigation panel for the landing page.
 * `<navigation-panel>`
 * @customElement
 * @litElement
 * @polymer
 */
class NavigationPanel extends LitElement {
  /**
   * Styles for the comopnent.
   */
  static get styles() {
    return css`
      a {
        color: inherit;
        text-decoration: none;
        overflow: hidden;
      }
      .sidebar {
        height: calc(100vh - 50px);
        width: 0px;
        position: fixed;
        z-index: 300;
        top: 0;
        left: 0;
        background-color: var(--color-white);
        overflow-x: hidden;
        margin-top: 48px;
      }
      .show {
        margin-left: 0px;
        width: 250px;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
      }
      .hide {
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        width: 250px;
        margin-left: -250px;
      }
      ul {
        padding: var(--spacing-3x) 0;
        margin: 0;
        overflow: hidden;
      }
      ul li {
        cursor: pointer;
        overflow: hidden;
        list-style: none;
        font-family: va(--theme-font-family);
        font-size: var(--font-main);
        line-height: 22px;
        color: var(--color-grey-700);
        padding: var(--spacing-2x) var(--spacing-4x);
      }
      ul li:hover {
        background-color: var(--color-faintGrey);
      }
      .active {
        color: var(--color-blue);
        border-left: 2px solid var(--color-blue);
        background-color: var(--color-faintGrey);
      }
      iron-icon {
        position: absolute;
        right: var(--spacing-2x);
        color: var(--color-blue);
      }
      .overlay {
        background: var(--color-black);
        position: absolute;
        top: 48px;
        left: 0;
        height: calc(100vh - 48px);
        width: 100vw;
        z-index: 205;
        opacity: 0.5;
      }
      .dp-block {
        display: block;
      }
      .dp-none {
        display: none;
      }
    `;
  }

  /**
   * Props for the component.
   */
  static get properties() {
    return {
      /**
       * Boolean value to control the display of the side bar.
       */
      isSideBarOpen: { type: Boolean },
      /**
       * The function to close the sidebar.
       */
      handleCloseSidebar: { type: Function },
      /**
       * The urls to be implemented in the menu bar.
       */
      routes: { type: Object },
      /**
       * The navigation links for the urls.
       */
      navigation: { type: Object }
    };
  }

  /**
   * Constructor to initialize the props.
   */
  constructor() {
    super();

    this.routes = {
      HIT_RESYNTHESIS: '',
      DEL_SCREENING: '',
      PROTEIN_PRODUCTION: ''
    };

    this.navigation = {
      protein_production: '',
    hit_resynthesis: '',
    del_screening: ''
    };
  }

  /**
   * Closes the side bar when clicked other than the element.
   *
   * @param {Object} event
   */
  closeSideBar(event) {
    if (event.target.id === SIDEBAR) {
      return;
    }

    this.handleCloseSidebar();
  }

  /**
   * Sets the active class.
   *
   * @param {String} location
   */
  setActiveClass(location) {
    const active =
      location.split('/')[1] === window.location.pathname.split('/')[1]
        ? 'active'
        : null;

    return active;
  }

  /**
   * Renderer for the component.
   */
  render() {
    return html`
      <div
        @click=${this.closeSideBar}
        class="overlay ${this.isSideBarOpen ? 'dp-block' : 'dp-none'}"
      ></div>
      <div id="${SIDEBAR}" class="sidebar ${this.isSideBarOpen ? 'show' : 'hide'}">
        <ul>
          <li class="${this.setActiveClass(this.routes.HIT_RESYNTHESIS)}">
            <a router-link href="${this.navigation.hit_resynthesis}"
              >Hit Resynthesis</a
            >
            ${this.setActiveClass(this.routes.HIT_RESYNTHESIS)
              ? html`
                  <iron-icon icon="arrow-forward"></iron-icon>
                `
              : nothing}
          </li>
          <li class="${this.setActiveClass(this.routes.DEL_SCREENING)}">
            <a router-link href="${this.navigation.del_screening}"
              >Del Screening</a
            >
            ${this.setActiveClass(this.routes.DEL_SCREENING)
              ? html`
                  <iron-icon icon="arrow-forward"></iron-icon>
                `
              : nothing}
          </li>
          <li class="${this.setActiveClass(this.routes.PROTEIN_PRODUCTION)}">
            <a router-link href="${this.navigation.protein_production}"
              >Protein Production</a
            >
            ${this.setActiveClass(this.routes.PROTEIN_PRODUCTION)
              ? html`
                  <iron-icon icon="arrow-forward"></iron-icon>
                `
              : nothing}
          </li>
        </ul>
      </div>
    `;
  }
}

customElements.define('navigation-panel', NavigationPanel);
