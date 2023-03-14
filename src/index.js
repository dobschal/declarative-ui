import Observable from "./core/Observable";
import Widget from "./core/Widget";
import LabeledInput from "./widgets/LabeledInput";
import SubHeadline from "./widgets/SubHeadline";
import SubmitButton from "./widgets/SubmitButton";

console.log("🚀 App started.");

const data = Observable({
  username: "",
  password: "",
  error: ""
});

document.body.append(
  Widget({
    tag: "form",

    /**
     * @param {SubmitEvent} event
     */
    onSubmit(event) {
      event.preventDefault();
      if (!data.username || !data.password) {
        console.log("Input missing");
        data.error = "Input missing";
        return;
      }
      console.log("Submit data: ", data);
    },

    children: [
      SubHeadline("Login"),
      Widget({
        tag: "p",
        style: "error",
        text: (cb) => data.$on("error", cb),
        show: (cb) => data.$on("error", cb)
      }),
      ...LabeledInput({
        labelText: "Username",
        onInput(event) {
          data.error = "";
          data.username = event.target.value;
        }
      }),
      ...LabeledInput({
        labelText: "Password",
        type: "password",
        onInput(event) {
          data.error = "";
          data.password = event.target.value;
        }
      }),
      SubmitButton("Login")
    ]
  })
);
