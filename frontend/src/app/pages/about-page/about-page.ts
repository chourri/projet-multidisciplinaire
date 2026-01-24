import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './about-page.html'
})
export class AboutPageComponent {
  
  teamMembers = [
    {
      role: '',
      name: 'SOU Abdelmounaim',
      email: 'souabdelmounaim2020@gmail.com',
      desc: ''
    },
    {
      role: '',
      name: 'HOURRI Chaimae',
      email: 'chaimaehourri@gmail.com',
      desc: ''
    },
    {
      role: '',
      name: 'Rebbouh Houda',
      email: 'rbouhhouda@gmail.com',
      desc: ''
    },
    {
      role: '',
      name: 'Chemchaq Maryem',
      email: 'student4@usms.ma',
      desc: ''
    },
    {
      role: '',
      name: 'Zineb Bennis',
      email: 'zinebbennis44@gmail.com',
      desc: ''
    }
  ];
}