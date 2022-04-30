import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";

// PrimeVue Styles
import "primevue/resources/themes/md-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import Sidebar from "primevue/sidebar";
import Row from "primevue/row";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import Dropdown from "primevue/dropdown";
import Tag from "primevue/tag";
import Card from "primevue/card";
import ToastService from "primevue/toastservice";

const app = createApp(App);

app.use(router);

// PrimeVue Configuration
app.use(PrimeVue, { ripple: true });

app.use(ToastService);

// PrimeVue Components
app.component("pv-data-table", DataTable);
app.component("pv-column", Column);
app.component("pv-button", Button);
app.component("pv-toolbar", Toolbar);
app.component("pv-input-text", InputText);
app.component("pv-sidebar", Sidebar);
app.component("pv-row", Row);
app.component("pv-dialog", Dialog);
app.component("pv-toast", Toast);
app.component("pv-dropdown", Dropdown);
app.component("pv-tag", Tag);
app.component("pv-card", Card);

// App mounting
app.mount("#app");
