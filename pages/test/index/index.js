import Util from "../../../common/util"
import * as Test from "../../../common/test"
import App from "./index.vue"
import { newA } from "common/api"

() => {
    console.log("index");
    console.log(Test);
    Util.say();
}

console.log("index");
console.log("2333, hahah3333444");
console.log(Test.a);
Util.say();
newA();

Vue.config.productionTip = false;

new Vue({
    el: "#app",
    components: { App },
    template: "<App/>"
})
