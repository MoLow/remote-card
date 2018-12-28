import { LitElement, html } from 'https://unpkg.com/@polymer/lit-element@0.6.2/lit-element.js?module';


class RemoteCard extends LitElement {
    static get properties() {
        return { hass: Object, config: Object };
    }

    render() {
        return html`
    <style>
      :host {
      }
      ha-card{
        padding-bottom: 10px;
      }
      .controls {
        position: relative;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .controls paper-icon-button {
        width: 44px;
        height: 44px;
      }
      paper-icon-button {
        opacity: var(--dark-primary-opacity);
      }
      paper-icon-button[disabled] {
        opacity: var(--dark-disabled-opacity);
      }
      paper-icon-button.primary {
        width: 56px !important;
        height: 56px !important;
        background-color: var(--primary-color);
        color: white;
        border-radius: 50%;
        padding: 8px;
        transition: background-color .5s;
      }
      paper-icon-button.primary[disabled] {
        background-color: rgba(0, 0, 0, var(--dark-disabled-opacity));
      }
	  
	  .media-buttons{
		position: relative;
	    width: 110px;
		height: 110px;
        margin: 10px auto;
	   }
	   
	  .media-buttons .button-center{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	  }
	  .media-buttons .button-up{
		position: absolute;
		top: 0;
		left: 50%;
		width: 80px!important;
		height: 30px!important;
		padding: 0 2px 8px 2px;
		transform: translateX(-50%);
		overflow: hidden;
	  }
	  .media-buttons .button-up:before{
	    content: "";
		width: 60px;
		height: 66px;
		position: absolute;
		top: 0;
		left: -10px;
		border-radius: 50%;
		border: 20px solid var(--light-primary-color);
		border-left-color: transparent;
		border-right-color: transparent;
		border-bottom-color: transparent;
	  }
	   
	  .media-buttons .button-down{
		position: absolute;
		bottom: 0;
		left: 50%;
		width: 80px!important;
		height: 30px!important;
		padding: 8px 2px 0 2px;
		transform: translateX(-50%);
		overflow: hidden;
	  }
	  .media-buttons .button-down:before{
	    content: "";
		width: 60px;
		height: 66px;
		position: absolute;
		bottom: 0;
		left: -10px;
		border-radius: 50%;
		border: 20px solid var(--light-primary-color);
		border-left-color: transparent;
		border-right-color: transparent;
		border-top-color: transparent;
	  }
	  
	  .media-buttons .button-right{
		position: absolute;
		top: 50%;
		right: 0;
		height: 80px!important;
		width: 30px!important;
		padding: 2px 0 2px 8px;
		transform: translateY(-50%);
		overflow: hidden;
	  }
	  .media-buttons .button-right:before{
	    content: "";
		width: 66px;
		height: 60px;
		position: absolute;
		right: 0;
		top: -10px;
		border-radius: 50%;
		border: 20px solid var(--light-primary-color);
		border-top-color: transparent;
		border-bottom-color: transparent;
		border-left-color: transparent;
	  }
	  
	  .media-buttons .button-left{
		position: absolute;
		top: 50%;
		left: 0;
		height: 80px!important;
		width: 30px!important;
		padding: 2px 8px 2px 0;
		transform: translateY(-50%);
		overflow: hidden;
	  }
	  .media-buttons .button-left:before{
	    content: "";
		width: 66px;
		height: 60px;
		position: absolute;
		left: 0;
		top: -10px;
		border-radius: 50%;
		border: 20px solid var(--light-primary-color);
		border-top-color: transparent;
		border-bottom-color: transparent;
		border-right-color: transparent;
	  }
	  .title{
	    font-size: 20px;
	  }
    </style>
    <ha-card .header="${this.computeName()}">
      <div class="controls">
	  <paper-icon-button icon="mdi:power-standby" @click="${this.power}"></paper-icon-button>
	  <paper-icon-button icon="mdi:source-fork" @click="${this.source}"></paper-icon-button>
	  </div>
	  <div class="controls">
		<paper-icon-button icon="mdi:volume-plus" @click='${(e) => this.volume_up(e)}'></paper-icon-button>
		<paper-icon-button icon="mdi:volume-off" @click="${this.mute}"></paper-icon-button>
		<paper-icon-button icon="mdi:volume-minus" @click='${(e) => this.volume_down(e)}'></paper-icon-button>
	  </div>
	  <div class="media-buttons">
		<paper-icon-button class="button-up" icon="mdi:chevron-up" @click="${this.up}"></paper-icon-button>
		<paper-icon-button class="button-right" icon="mdi:chevron-right" @click="${this.right}"></paper-icon-button>
		<paper-icon-button class="button-center primary" .icon=${this.computeIcon()} @click="${this.enter}"></paper-icon-button>
		<paper-icon-button class="button-down" icon="mdi:chevron-down" @click="${this.down}"></paper-icon-button>
		<paper-icon-button class="button-left" icon="mdi:chevron-left" @click="${this.left}"></paper-icon-button>
	  </div>
    </ha-card>
`;
    }

    setConfig(config) {
        const configKeys = ['power', 'mute', 'source', 'up', 'down', 'right', 'left', 'enter', 'volume'];
        const errors = configKeys.filter(v=>!config[v]);

        if (errors.length) {
            throw new Error(`You need to define ${errors.join()}`);
        }
        this.config = config;
    }

    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
        return 3;
    }

    computeName() {
        const entity  = this.hass.states[this.config.power];
        return this.config.name || entity.attributes.friendly_name;
    }

    computeIcon() {
        const entity  = this.hass.states[this.config.power];
        return this.config.icon || entity.attributes.icon || null
    }

    power(e) {
        e.stopPropagation();
        this.hass.callService('switch', 'turn_on', { entity_id: this.config.power });
    }

    mute(e) {
        e.stopPropagation();
        this.hass.callService('switch', 'turn_on', { entity_id: this.config.mute });
    }

    right(e) {
        e.stopPropagation();
        this.hass.callService('switch', 'turn_on', { entity_id: this.config.right });
    }

    left(e) {
        e.stopPropagation();
        this.hass.callService('switch', 'turn_on', { entity_id: this.config.left });
    }

    up(e) {
        e.stopPropagation();
        this.hass.callService('switch', 'turn_on', { entity_id: this.config.up });
    }

    down(e) {
        e.stopPropagation();
        this.hass.callService('switch', 'turn_on', { entity_id: this.config.down });
    }

    enter(e) {
        e.stopPropagation();
        this.hass.callService('switch', 'turn_on', { entity_id: this.config.enter });
    }

    source(e) {
        e.stopPropagation();
        this.hass.callService('switch', 'turn_on', { entity_id: this.config.source });
    }

    volume_up(e) {
        e.stopPropagation();
        this.hass.callService('switch', 'turn_on', { entity_id: this.config.volume });
    }

    volume_down(e) {
        e.stopPropagation();
        this.hass.callService('switch', 'turn_off', { entity_id: this.config.volume });
    }
}

customElements.define('remote-card', RemoteCard);