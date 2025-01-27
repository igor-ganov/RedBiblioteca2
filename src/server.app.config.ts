import {ApplicationConfig, mergeApplicationConfig} from "@angular/core";
import {appConfig} from "./app.config";
import {provideServerRendering} from "@angular/platform-server";

export const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering()],
};

export const serverAppConfig = mergeApplicationConfig(appConfig, serverConfig);
