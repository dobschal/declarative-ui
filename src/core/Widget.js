/**
 * @typedef {object} WidgetConfig
 * @property {string} [text]
 * @property {string} [tag]
 * @property {Array<HTMLElement>} [children]
 */

/**
 * @param {WidgetConfig} [config]
 * @returns {HTMLElement}
 */
export default function (config = {}) {
  const element = document.createElement(config.tag ?? "div");
  if (typeof config.text === "string") {
    element.innerText = config.text;
  }
  if (typeof config.text === "function") {
    config.text((text) => (element.innerText = text));
  }
  if (Array.isArray(config.children)) {
    element.append(...config.children);
  }
  if (typeof config.style === "string") {
    element.className = config.style;
  }
  if (typeof config.show === "function") {
    config.show((shouldShow) => {
      if (!shouldShow) {
        element.classList.add("hidden");
      } else {
        element.classList.remove("hidden");
      }
    });
  }
  Object.keys(config)
    .filter(
      (key) => !["style", "show", "text", "children", "tag"].includes(key)
    )
    .forEach((key) => {
      const isEvent = key.startsWith("on");
      if (isEvent) {
        const eventName = key.toLowerCase().substring(2); // "onInput" --> "input"
        element.addEventListener(eventName, config[key]);
      } else {
        element.setAttribute(key, config[key]);
      }
    });
  return element;
}
