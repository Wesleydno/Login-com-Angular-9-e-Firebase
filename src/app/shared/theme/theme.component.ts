import { Component, NgModule, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
isDarkMode: boolean;

constructor(private themeService: ThemeService) {
  this.themeService.initTheme();
  this.isDarkMode = this.themeService.isDarkMode();
}

toggleDarkMode(){
    this.isDarkMode ? this.themeService.update('light-mode') : this.themeService.update('dark-mode');
}

ngOnInit(): void {
}

}
