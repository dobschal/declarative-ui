import Widget from "../core/Widget";

/**
 * @typedef {object} LabelInputConfig
 * @property {string} labelText
 * @property {string} [placeholder] - default is labelText
 * @property {string} [type] - default is "text"
 * @property {(InputEvent) => void} [onInput]
 */

/**
 * @param {LabelInputConfig} config
 * @returns {Array<HTMLElement>}
 */
export default function (config) {
  return [
    Widget({
      tag: "label",
      text: config.labelText
    }),
    Widget({
      tag: "input",
      type: config.type ?? "text",
      placeholder: config.placeholder ?? config.labelText,
      onInput: config.onInput
    })
  ];
}
