import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { delay } from '../../../directive/animation';
@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss'],
  animations: [delay]
})
export class ProfileManagementComponent implements OnInit {

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
  public adminLists = [{
    id: 1, 'empNumber': '', 'name': '', 'email': '', 'contactNumber': ''
  }, {
    id: '2', 'empNumber': '', 'name': '', 'email': '', 'contactNumber': ''
  }, {
    id: '3', 'empNumber': '', 'name': '', 'email': '', 'contactNumber': ''
  }];
  public tabList = [{
    id: '1', name: 'Company Profile',
  }, {
    id: '2', name: 'Admin Profile',
  }];
  public adminForm: any;
  constructor(private accountService: AccountService) { }
  ngOnInit() {
  }
  stepOneCheck(val) {
   
    if (Object.keys(this.company).length === 4) {
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
    console.log(88);
    console.log('admin', this.admin);
    if (Object.keys(this.admin).length === 3) {
      // this.count = val;
      this.adminForm = true;
      console.log('Object.keys(admin).length:', Object.keys(this.admin).length);
    } else {
      this.adminForm = false;
    }
  }
  stepThreeCheck() {
    console.log(33);
    // console.log('adminlist', this.adminlist);
    console.log('adminlist', this.adminLists);
    if (Object.keys(this.admin).length === 3) {
      // this.count = val;
      // this.adminForm = true;
      // console.log('Object.keys(admin).length:', Object.keys(this.adminListInfo).length);
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

  onSelectFile(event) {
    console.log('333');
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
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
