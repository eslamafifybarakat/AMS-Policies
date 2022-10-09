import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-social-btns',
  templateUrl: './share-social-btns.component.html',
  styleUrls: ['./share-social-btns.component.scss']
})
export class ShareSocialBtnsComponent implements OnInit {
  @Input() type!: 'facebook' | 'twitter' | 'linkedIn' | 'whatsapp' | 'instagram' | 'discard' | 'telegram';
  @Input() shareUrl: any;
  navUrl: any;

  constructor() { }

  ngOnInit(): void {
    this.createNavigationUrl();
  }

  private createNavigationUrl(): void {
    let searchParams = new URLSearchParams();
    switch (this.type) {
      case 'facebook':
        searchParams.set('u', this.shareUrl);
        this.navUrl = 'https://www.facebook.com/sharer/sharer.php?' + searchParams;
        break;
      case 'twitter':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://twitter.com/share?' + searchParams;
        break;
      case 'linkedIn':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://linkedIn.com/share?' + searchParams;
        break;
      case 'whatsapp':
        searchParams.set('url', this.shareUrl);
        this.navUrl = ' https://wa.me/?text=' + searchParams;
        break;
      case 'instagram':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://instagram.com/share?' + searchParams;
        break;
      case 'discard':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://discard.com/share?' + searchParams;
        break;
      case 'telegram':
        searchParams.set('url', this.shareUrl);
        this.navUrl = 'https://telegram.me/share/url?text=<' + searchParams + '>';
        break;
    }
    // https://telegram.me/share/url?url=<URL>
    // https://telegram.me/share/url?url={url}&text={text}
  }
  // https://plus.google.com/share?
  public share() {
    return window.open(this.navUrl, "_blank");
  }
}
