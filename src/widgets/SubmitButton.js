import Widget from "../core/Widget";

export default function (text) {
  return Widget({
    tag: "button",
    type: "submit",
    text
  });
}
