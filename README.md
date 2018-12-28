# Lovelace Remote Control Card
A stateless remote control lovelace card for [Home Assistant](https://github.com/home-assistant/home-assistant).

![Preview](https://raw.githubusercontent.com/MoLow/remote-card/master/screenshot.png)

## Install

### Simple install

1. Download and copy `remote-card.js` into your `config/www` directory.

- Add a reference to `remote-card.js` inside your `ui-lovelace.yaml`.

  ```yaml
  resources:
    - url: /local/remote-card.js
      type: module
  ```

### CLI install

1. Move into your `config/www` directory

- Grab `remote-card.js`

  ```
  $ wget https://raw.githubusercontent.com/MoLow/remote-card/master/remote-card.js
  ```

- Add a reference to `remote-card.js` inside your `ui-lovelace.yaml`.

  ```yaml
  resources:
    - url: /local/remote-card.js
      type: module
  ```

## Using the card

### Options

| Name | Type | Default | Description |
|------|:----:|:-------:|-------------|
| type | string | **required** | `custom:remote-card`.
| power | string | **required** | Entity id the power switch.
| source | string | **required** | Entity id the source switch.
| volume | string | **required** | Entity id the volume switch.
| mute | string | **required** | Entity id the mute switch.
| up | string | **required** | Entity id the up switch.
| down | string | **required** | Entity id the down switch.
| left | string | **required** | Entity id the left switch.
| right | string | **required** | Entity id the right switch.
| enter | string | **required** | Entity id the enter switch.
| icon | string | optional | icon to present. could also be configured in customization for the power switch.
| name | string | optional | pretty name. could also be configured in customization for the power switch.
### Example usage

```yaml
  - type: 'custom:remote-card'
    power: switch.tv_on
    source: switch.tv_source
    volume: switch.tv_volume
    mute: switch.tv_mute
    up: switch.tv_up
    down: switch.tv_down
    left: switch.tv_left
    right: switch.tv_right
    enter: switch.tv_enter
    icon: mdi:television
    name: 'Living Room TV'
```

## License
This project is under the MIT license.