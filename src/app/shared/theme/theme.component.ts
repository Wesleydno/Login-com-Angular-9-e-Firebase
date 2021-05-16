import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

toggleDarkMode(event?: Boolean){
  this.isDarkMode = !this.themeService.isDarkMode();
  console.log(this.isDarkMode)
  this.isDarkMode ? this.themeService.update('dark-mode') : this.themeService.update('light-mode');
}

ngOnInit(): void {

}

}
