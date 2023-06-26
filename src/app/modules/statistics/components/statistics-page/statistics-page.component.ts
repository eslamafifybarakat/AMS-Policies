import { AlertsService } from './../../../shared/services/alerts/alerts.service';
import { StatisticsService } from '../../services/statistics.service';
import { PublicService } from './../../../../services/public.service';
import { keys } from './../../../shared/TS Files/localstorage-key';
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
    {
      title: this.publicService?.translateTextFromJson('welcome.articleNotes'),
      percentage: 40,
      color: 'articleNotes'
    },
    {
      title: this.publicService?.translateTextFromJson('welcome.articleNotes'),
      percentage: 40,
      color: 'articleNotes'
    },
  ]

  isFullLoading: boolean = false;
  homeData: any;
  yourTransactions: any;
  policies: any;

  constructor(
    private statisticsService: StatisticsService,
    private publicService: PublicService,
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.userName = this.userData?.name;
    this.getHomeData();
  }

  getHomeData(): any {
    this.isFullLoading = true;
    this.statisticsService?.getHomeData()?.subscribe(
      (res: any) => {
        if (res?.code == 200) {
          this.homeData = res?.data ? res?.data : null;
          this.yourTransactions = {
            purchased_policies: this.homeData?.your_transactions?.purchased_policies,
            refunded_policies: this.homeData?.your_transactions?.refunded_policies,
            bounce_rate: this.homeData?.your_transactions?.bounce_rate,
          }
          this.policies = {
            active: this.homeData?.policies?.active,
            pending: this.homeData?.policies?.pending,
            cancelled: this.homeData?.policies?.cancelled,
            expired: this.homeData?.policies?.expired,
            under_review: this.homeData?.policies?.under_review,
          }
          this.isFullLoading = false;
        } else {
          res?.message ? this.alertsService?.openSnackBar(res?.message) : '';
          this.isFullLoading = false;
        }
      },
      (err: any) => {
        err?.message ? this.alertsService?.openSnackBar(err?.message) : '';
        this.isFullLoading = false;
      });
  }

}
