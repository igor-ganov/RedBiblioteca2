import { Injectable } from "@angular/core";
import { ThemeService } from "./ThemeService";

@Injectable({providedIn: 'root'})
export class ThemeSwitcher{

    constructor(private readonly themeService: ThemeService){}

    public get isDark(){
        return this.themeService.theme === 'dark';
    }
    public set isDark(value: boolean){
        this.themeService.theme = value? 'dark' : 'light';
    }
}