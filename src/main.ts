/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 10:52:51
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-20 15:43:36
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "uno.css";
import "./style/index.scss";
import registerWidgets from "@/utils/registerWidgets";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(registerWidgets);

app.mount("#app");
