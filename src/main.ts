/*
 * @Description: What's this for
 * @Autor: WangYuan
 * @Date: 2022-04-27 10:52:51
 * @LastEditors: WangYuan
 * @LastEditTime: 2022-04-29 16:49:51
 */
import { createApp } from "vue";
import { createPinia } from 'pinia'
import App from "./App.vue";
import router from "./router";
import "uno.css";
import "./style/index.scss";
import vText from './widgets/v-text.vue'

const app = createApp(App);

app.use(router);
app.use(createPinia())

app.component('v-text', vText)

app.mount("#app");
