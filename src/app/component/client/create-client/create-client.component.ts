import { Component, OnInit, ViewChild, ElementRef, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ClientApiService } from '../../../services/client.service';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateClientComponent implements OnInit {
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public userFile: any = '';
  @ViewChild('fileClick') fileClick: ElementRef;
  public client: any = {};
  public clientInfo: any = {};
  public currUrl = '';
  public companyImg = '';
  public orgId: any = '';
  public imageId: any = '';
  public cdnUrl: any;
  public authToken: any;
  constructor(
    public dialogRef: MatDialogRef<CreateClientComponent>,
    private toastr: ToastrService,
    private commonService: CommonService,
    private clientSerice: ClientApiService, @Inject(MAT_DIALOG_DATA) public inputData: any
  ) {
    this.cdnUrl = this.commonService.imageUrl;
    if (localStorage.getItem('authToken')) {
      this.authToken = localStorage.getItem('authToken');
    }
  }

  ngOnInit() {
    this.client.status = 'active';
    if (this.inputData.value) {
      this.orgId = this.inputData.value.organisationId;
      this.client.organisationName = this.inputData.value.organisationName;
      this.client.mail = this.inputData.value.mail.mail;
      this.client.tradingName = this.inputData.value.tradingName;
      this.client.businessId = this.inputData.value.businessId;
      this.client.name = this.inputData.value.contactDetails.name;
      this.client.mobileNo = this.inputData.value.contactDetails.mobileNo;
      this.client.location = this.inputData.value.location.area;
      this.croppedImage = this.cdnUrl + 'cdn/files/' + this.inputData.value.image + '?authorization=' + this.authToken;
    }
  }
  removeAdmin(val) {
    this.companyImg = '';
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: any, ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  stringToImage() {
    if (this.croppedImage) {
      fetch(this.croppedImage)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'File name');
          this.userFile = file;
        });
      // if (this.userFile) {
      //   this.saveSelected();
      // }
    }
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.companyImg = event.target.result;
      };
    }
  }
  public onFileClick(val) {
    this.currUrl = val;
    let el: HTMLElement = this.fileClick.nativeElement as HTMLElement;
    el.click();
  }
  saveEmployee(val) {
    let obj: any = {};
    this.stringToImage();
    if (this.userFile) {
      this.saveSelected();
    }
    if (this.imageId) {
      if (this.inputData.value) {
        this.editClient(this.inputData.value);
      } else {
        obj = {
          'organisationName': val.form.value.organisationName,
          'image': this.imageId,
          // 'logo': 'manoj2',
          'businessId': val.form.value.businessId,
          'tradingName': val.form.value.tradingName,
          'location': {
            // 'no':  val.form.value.location,
            'area': val.form.value.location,
            'city': val.form.value.location,
            // 'state': 'chennai',
            // 'country': 'chennai',
            // 'pinCode': '1233',
            // 'geoLoc': {
            //   'lat': 0,
            //   'lon': 0
            // }
          },
          'mail': {
            'mail': val.form.value.mail
          },
          // 'postCode': '123',
          // 'mobileNo': '9789490122',
          // 'cCode': '233',
          // 'phoneNo': '9789490122',
          // 'country': 'india',
          'contactDetails': {
            'mobileNo': val.form.value.mobileNo,
            'name': val.form.value.name
          }
        };
        this.clientSerice.clientAdd(obj).subscribe(data => {
          if (data) {
            // this.toastr.success('Successfully');
            this.toastr.success(data.message);
            this.dialogRef.close(data.message);
          } else {
            this.toastr.success(data.message);
          }
        },
          err => {
            let mgs = JSON.parse(err._body);
            mgs = mgs.message;
            this.toastr.error(mgs);
            // this.showLoader = false;
          });
      }
    }
  }
  editClient(val) {
    let obj: any = {};
    this.stringToImage();
    if (this.userFile) {
      this.saveSelected();
    }
    if (this.imageId) {
      obj = {
        'organisationName': this.client.organisationName,
        'image': this.imageId,
        // 'logo': 'manoj2',
        'businessId': this.client.businessId,
        'tradingName': this.client.tradingName,
        'location': {
          // 'no':  val.form.value.location,
          'area': this.client.location,
          'city': this.client.location,
          // 'state': 'chennai',
          // 'country': 'chennai',
          // 'pinCode': '1233',
          // 'geoLoc': {
          //   'lat': 0,
          //   'lon': 0
          // }
        },
        'mail': {
          'mail': this.client.mail
        },
        // 'postCode': '123',
        // 'mobileNo': '9789490122',
        // 'cCode': '233',
        // 'phoneNo': '9789490122',
        // 'country': 'india',
        'contactDetails': {
          'mobileNo': this.client.mobileNo,
          'name': this.client.name
        }
      };
      // let currId = this.orgId;
      this.clientSerice.editClient({ val, obj }).subscribe(data => {
        if (data) {
          // this.toastr.success('Successfully');
          this.toastr.success(data.message);
          this.dialogRef.close(data.message);
        } else {
          this.toastr.success(data.message);
        }
      },
        err => {
          let mgs = JSON.parse(err._body);
          mgs = mgs.message;
          this.toastr.error(mgs);
          // this.showLoader = false;
        });

    }

  }
  public saveSelected() {
    let type = 'COMPANYLOGO';
    this.clientSerice.imageUpload(this.userFile, type).subscribe(data => {
      if (data) {
        // this.toastr.success(data.message);
        this.imageId = data.imageId;
      }
    },
      err => {
        let mgs = JSON.parse(err._body);
        this.toastr.error(mgs.message);
        // this.dialogRef.close();
      });
    // } else {
    //   this.toastr.error('Invalid File Type');
    // }
  }
}
