import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
// import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { AccountService } from '../../../services/account.service';
import { delay } from '../../../directive/animation';
@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
  // Add this:
  animations: [delay]
})
export class AccountInfoComponent implements OnInit {
  @ViewChild('fileClick') fileClick: ElementRef;
  public user$;
  public curr: any = 0;
  public count: any = 0;
  public currUrl = '';
  public companyImg = '';
  public adminImg = '';
  public companyInfo: any = {};
  public adminInfo: any = {};
  public admin: any = {};
  public company: any = {};
  public companyForm: any;
  public adminListInfo: any = {};
  public adminlist: any = {};
  public categories = [{
    id: 1, name: 'c1'
  }, {
    id: 1, name: 'c2'
  }, {
    id: 1, name: 'c3'
  }];
  public adminLists = [{
    id: 1, 'empNumber': '', 'name': '', 'email': '', 'contactNumber': ''
  }, {
    id: '2', 'empNumber': '', 'name': '', 'email': '', 'contactNumber': ''
  }, {
    id: '3', 'empNumber': '', 'name': '', 'email': '', 'contactNumber': ''
  }];
  public tabList = [{
    id: '1', name: 'Company Info',
  }, {
    id: '2', name: 'Super Admin Info',
  }, {
    id: '3', name: 'Invite More Admin',
  }];
  public adminForm: any;
  constructor(private accountService: AccountService) { }
  ngOnInit() {
  }
  stepOneCheck(val) {
  
    if (Object.keys(this.company).length === 5) {
      // this.count = val;
      this.companyForm = true;
      let obj = {};
      obj = this.company;
      this.accountService.addCompany(obj).subscribe(data => {
        if (data) {
          //  this.toastr.success(data.message);
        }
      },
        err => {
          let mgs = JSON.parse(err._body);
          // this.toastr.error(mgs.message);
          // this.dialogRef.close();
        });
    } else {
      this.companyForm = false;
    }
  }
  stepTwoCheck() {
     if (Object.keys(this.admin).length === 3) {
      // this.count = val;
      this.adminForm = true;
      
    } else {
      this.adminForm = false;
    }
  }
  stepThreeCheck() {
  
    if (Object.keys(this.admin).length === 3) {
     
    } else {
      // this.companyForm = false;
    }
  }
  deleteAdmin(index) {
    this.adminLists.splice(index, 1);
  }
  addAdmin() {
    this.adminLists.push({
      id: this.adminLists.length + 1,
      'empNumber': '',
      'name': '',
      'email': '',
      'contactNumber': ''
    });
  }
  removeAdmin(val) {
    val === 'adminImg' ? this.adminImg = '' : this.companyImg = '';
  }
  onSelectFile(event) {
   
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.currUrl === 'company' ? this.companyImg = event.target.result : this.adminImg = event.target.result
      };
    }
  }
  public onFileClick(val) {
    this.currUrl = val;
    let el: HTMLElement = this.fileClick.nativeElement as HTMLElement;
    el.click();
  }
}
