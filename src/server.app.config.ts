import { provideServerRendering } from '@angular/ssr';
import {ApplicationConfig, mergeApplicationConfig} from "@angular/core";
import {appConfig} from "./app.config";

export const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const serverAppConfig = mergeApplicationConfig(appConfig, serverConfig);
