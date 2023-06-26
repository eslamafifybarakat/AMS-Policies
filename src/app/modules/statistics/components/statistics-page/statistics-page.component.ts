import { keys } from './../../../shared/TS Files/localstorage-key';
import { PublicService } from './../../../../services/public.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit {
  userData: any = JSON.parse(window?.localStorage?.getItem(keys?.userData) || '{}');
  userName: string = '';

  cardsData: any = [
    {
      icon: 'pi-pause',
      number: 66.986,
      type: this.publicService?.translateTextFromJson('welcome.banks'),
      color: 'primary'
    },
    {
      icon: 'pi-users',
      number: 236,
      type: this.publicService?.translateTextFromJson('welcome.users'),
      color: 'danger'
    },
    {
      icon: 'pi-file',
      number: 23.88,
      type: this.publicService?.translateTextFromJson('welcome.articles'),
      color: 'warning'
    },

  ]

  targets: any = [
    {
      title: this.publicService?.translateTextFromJson('welcome.courses'),
      percentage: 75,
      color: 'courses'
    },
    {
      title: this.publicService?.translateTextFromJson('welcome.exams'),
      percentage: 60,
      color: 'exams'
    },
    {
      title: this.publicService?.translateTextFromJson('welcome.articleNotes'),
      percentage: 40,
      color: 'articleNotes'
    },
  ]

  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    this.userName = this.userData?.name;
  }
}
