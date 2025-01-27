import {bootstrapApplication} from "@angular/platform-browser";
import {AppComponent} from "@app/app.component";
import {serverAppConfig} from "./server.app.config";

const bootstrap = () => bootstrapApplication(AppComponent, serverAppConfig);

export default bootstrap;
