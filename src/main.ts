/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 10:52:51
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-05-20 09:26:35
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "uno.css";
import "./style/index.scss";
import vImage from "./widgets/v-image.vue";

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.component("v-image", vImage);

app.mount("#app");
