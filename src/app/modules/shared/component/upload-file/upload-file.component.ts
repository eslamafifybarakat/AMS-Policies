import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AlertsService } from '../../services/alerts/alerts.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @Input() image: string = '';
  @Input() showImage: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() name: string = '';

  @Output() uploadHandler: EventEmitter<any> = new EventEmitter();
  @Output() uploadFile: EventEmitter<any> = new EventEmitter();

  imageLoaded: boolean = false;
  dragging: boolean = false;
  loaded: boolean = false;
  imageName: string = '';
  isLoading: boolean = false;
  imageSize: any;
  constructor(
    private alertsService: AlertsService
  ) { }

  ngOnInit(): void {
    this.imageName = this.image ? this.image : '';
  }

  uploadHandlerEmit(image: any): void {
    this.uploadHandler?.emit({ image: image });
  }

  handleInputChange(e: any): void {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    let formData = new FormData();
    formData.append('files', file);
    this.formatSizeUnits(file?.size);
    this.name = file?.name;
    this.uploadFile?.emit(file);
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.loaded = false;
    this.showImage = true;
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  handleDragEnter(): void {
    this.dragging = true;
    this.showImage = true;
  }

  handleDragLeave(): void {
    this.dragging = false;
    this.showImage = false;
  }

  handleDrop(e: any): void {
    e.preventDefault();
    this.dragging = false;
    this.handleInputChange(e);
    this.showImage = true;
  }

  handleImageLoad(): void {
    this.imageLoaded = true;
    this.showImage = true;
  }

  _handleReaderLoaded(e: any): void {
    this.isEdit = false;
    var reader = e.target;
    this.imageName = reader.result;
    // if (img?.size > 20000) {
    //   this.loaded = true;
    //   alert('file size must be more than 2000');
    //   this.showImage = false
    // this.imageName = '';
    // } else {
    this.showImage = true;
    // }
  }

  removeImg(): void {
    this.imageName = '';
    this.showImage = false;
    this.uploadFile?.emit(null);
  }

  formatSizeUnits(size: any): void {
    if (size >= 1073741824) { size = (size / 1073741824).toFixed(2) + " GB"; }
    else if (size >= 1048576) { size = (size / 1048576).toFixed(2) + " MB"; }
    else if (size >= 1024) { size = (size / 1024).toFixed(2) + " KB"; }
    else if (size > 1) { size = size + " bytes"; }
    else if (size == 1) { size = size + " byte"; }
    else { size = "0 bytes"; }
    this.imageSize = size;
  }
}

