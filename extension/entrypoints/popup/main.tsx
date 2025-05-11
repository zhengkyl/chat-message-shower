import { render } from "solid-js/web";
import { App } from "./App";

import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./style.css";

render(() => <App />, document.querySelector<HTMLDivElement>("#app")!);
