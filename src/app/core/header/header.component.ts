import { Component, EventEmitter, Output } from '@angular/core';

import * as screenfull from 'screenfull';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output()
  toggleSidenav = new EventEmitter<void>();
  @Output()
  toggleNotificationSidenav = new EventEmitter<void>();
  public menuItems = [
    {
      state: 'dashboard',
      name: 'employee',
      type: 'link',
      icon: 'dashboard.png',
      img: 'dashboard'
    },
    {
      state: 'dashboard',
      name: 'group',
      type: 'link',
      icon: 'dashboard.png',
      img: 'dashboard'
    }

  ];
  public currentUrl = window.document.URL;
  public url;
  public cdnUrl: any;
  public currIndex;
  public userDetails: any;
  public organisationId: any;
  public userId: any;
  public usrImage: any;
  public authToken: any;
  public menuList = [
    { 'class': 'fa fa-user', 'url': '/employee-management', 'img': 'employee-management', 'name': 'Employee' },
    { 'class': 'fa fa-users', 'url': '/group-management', 'img': 'group-management', 'name': 'Group' },
    { 'class': 'fa fa-play-circle', 'url': '/program-management', 'img': 'program-management', 'name': 'Program' },
    { 'class': 'fa fa-user', 'url': '/client-management', 'img': 'client-management', 'name': 'Client' }];
  // public companyName = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI8AAACPCAMAAAD0vXihAAAAhFBMVEX///8AAADv/PpK2sPA8unr6+vl5eX5+flKSkrw8PDOzs5kZGS/v787Ozv29vbKysotLS0PDw9CQkJVVVXe3t6xsbFwcHCFhYUhISF2dnaSkpLU1NRPT09paWmjo6OLi4sZGRmbm5s0NDS17+QAz6+B5NGo7N7Q9e4i1rqO5tZv4c3a9/Imzj5qAAADyElEQVR4nO2V23abOhBANXGEuOhmkAwYGwNNE6f9///rjLDTtM1ah/Pip9nLCxujy2Y0GgnBMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMAzDMA/k7f1/NB5iHOhb6qgLIZTTJd4FjTel1npQ9LCkR6Ic6Lmz+BGi0NRN6ez+s0gdpaZ/xKCdUpqQQnx7ed6sMwPSCuE6/O5KITuY8O8ewKmcnuU4YLFAxKvpCrxA1sBAHY/YLoMGPekiRvDYVKfRCuwqM+pOHZ9+XH9u1HGQa5eDFjXMbgQj5AJQCNsAlKqB0R2gVyLcJ4l4mYoRZiEqKJNPF9CnWl8hJJ/GCulhL7O9cc5RYJ+uu40+Lflr6CWc8C6HgKHAt8+W1acUWVcXNIlPPlXyGTAexb4ukg+GafU5wToW1FIMkHzy+zSvL6/bfE7gMFmgL+GMdwcYimWPw5Z+ST5OSOMzcYYzJJ9psPkkMZiFhotYfRY7kI+EerqQT47vE2FKPuo+z/v1bZOPoajbMnM3n7Lwvm5F7A7JZxChM1LkfsSfRb6HiyKfFoYWhtVnAp18SriYhnwO+BZt7f+Iz+YVSz6C8ujDxxwqdTFt8umPC8Yh63oNIy1VD8UJfRy09WJXH1Odk88M5QkTWsO5acWpN+gz+WMbbhO9XTdt+i986tHIvF19pr1vLT6cB+hpvdw0NugjMVKtWH3quETy6SH0OJiGajbKzAv5UPDuM71v2vRf+bh9gNgnH51RFGbQ1jQWfUJb1+iDC3abCH2kT3lujI2YeeijffAurVcdUv+V3e5po488xPLTemUwQtnf9hdxhkPbdcGiD26cLlUZqjXJx6gLoE+YfFthEDU0wc916P7MZ6ycm3zqdX+df+8vb6zHPdXf9heNZFJh0+QjuuQT4Jaq6IPbC310atOQj/T1qfjH5/Xl23/rYOBHgbuzxfqj1vqDPhWcik8+GZwsVl/cWugz3nxq9eGjKvQ54lpJAxJ91Akq9bfPxnzGchEk1d0lrX2HldXYI9bkTz64hSnBmuQz7P/2KQTlc0VtGwjog6l9+cdnd92wWuJ2fvWfzq/JY62bMWfo/Eo+Z6q7Fg+kmg6EAyQfI24+Hk8XqIo9YOZeYMQXxFg5+3F+jand1nqIb3+8aNoEYWxHnM5GrWTMhItYS2JKWhfpZIjRavoRokqt1t7UHMdwNkYaIw4Sn2SjVTEq/A+h0148b1utR7H9PH0M3zeu1s/nh7D5dH/fPYbvG+P49CA26jAMwzAMwzAMwzAMwzAMwzAMwzAMwzDMF/wCV6VBw9coJ68AAAAASUVORK5CYII=';
  // public userLogo: any = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAB6CAMAAABHh7fWAAAAZlBMVEX///8AAAD29vb5+fnz8/P8/PyioqJXV1c4ODhNTU1tbW13d3e3t7dzc3PKyspHR0erq6vQ0NDt7e0jIyMuLi7l5eVcXFxmZmacnJwoKCjW1taMjIwQEBB/f3+Tk5MbGxvAwMBAQEDvQLvQAAAFJUlEQVRoge1b25aiMBDkjihyExRxdPD/f3JBB0ggSVcg7pw9Z+uZpEjodFd3Gsv6j38Evut0cP2/yel6eXY77MMo7RCF+8Mtyz3347R+Xu9LW4ByX+cf3IAqCEWsE8Kg+gyvcLWL1RtnT8IvhLjHV5iY43XjCOV9I4rNWJ0fp3rEPdLYgM3lmiseV55vJHb264h77J0tzPF64h7xamLvso25W7i3jjm5bmW27euqgxZsJ+4RaBP7dzPMtn3XPGYu4a11EGr5F29njtm2dxrGVhgwMBbXAl6zYeaOG1y3a3S339hB39s3aGETQsTOD59g7s4YzWzIkyxB+pYWnenrcquzrL5dYPnSqpmLEzRL9KjGb+dWDyykn9RHDIpV57ns9fMzMu6iYkbi81UYhWPEFyjitwsMP0u8g4csXH66j/Tgh/zFH/Tog2xsQ49VnhDgXDaSobSh3lTMlnUjJ4jEA2kbkwzUeXmhpbm00idjX0FOkYosjV50TTFbVr1q2eRmlUDw8cl0VPDRklXvu0BGTrOUx2SULiGVU5DLDudDKjIAHRFmwC19zXN/2h20GDUddeduia5WgIWKipyo1B2AimlAwvOLoPdbGWxZ0CGf33FahYJWhoQ/3sbJxxFF+QaQJ7KP0/5EHmrnAMQ061Vo12vyW3PBAHgcTVWR9JhZhgtIYELKjkDk9HVahkc/Ldc2MwAqy7YnH5EjjwPRugdgNrY9lfPoSGcD6ugNKBPJxscBGWuDOw7tNyOpsbwWOtm6UwHSvwcQu+gw9MLolX0oWRPoiyXAisR5kHkuWnfOlLQWaK8douFgO3DJm9hycLs76qFe7cBl/m+lSyu+0XlSfWr7qeAu8KLXRK1xx3CSnu4Gq4W8MG44bGYvSGxNq/I0mhl6uH7wFCy8eWpNMR4u1KWMiFoueLut7q3QJPT0C4TlMW4qz3W9qomP0I0jh8mRYuFjjtMuTXcatsVgCh+oEzKGyVQhqWASk1SABJJJTAIJkYUmwchCrDRqDqym1zXx5/ketHnVIW+D+/mpOZxVmEDiM6K8xM0s4fWa+KJzuLlyCjzqmEiuhp0E94ncQFDYZMoraQf0D7zQQuKOuBDOAyqL86k9IG0C6FrUBxYxk1mUwtjDd4MF1WOwmw0gPhOpRTfMpSzZlWCWOaBRnbRFyU5l45F2q4VK7Z0XT8u9yl6XuIf8gwu6F2QvCleteMgcjChXlpTi4fLNHJKQJHIO4guI51pmy3qK5hNeQAiXfVrZ09LDE6kAiUcUfO1NPUwC3SWriiwfBUs3MixLOlIHMbdKIJdXY+4s5KfFmT25uU1wHpUUFUfe0ohrRAT8VaMy6rKH8XuDdQ/w2Gxf7RbZbhj9nikBmPBdEkthXLkJZlb1ka1ngdFFMwcMmG+4QIDL/moMCTRygTE2Ah0MtIL6g6uIoMnG9qfLZhMfGyOx9ifGzNONPqUagiHa9MW2urVbmMfrTbzVjb0d3GBsY4VGp8GPvbc5rYyb+Rit9doauWbOw4ovXkxFKd1mTot1gd+1pql79eS6V3mmdhI4pTrF5OFkUwZwatcwd7vGxLGyBsmdmkk9LhqmPQMXv++AweXcPe76Ju0OLl/DvCUKm/ETXhgctv4Q0Mx06jlLBLtYJNmsvBxppohCLH5DOO3Ce5DkzQt5EtzDRak03bTXE37t54sXfuuXkxd+7UebH3Zi4z/0e9EbflKLi/7lsVYdPENwnSZ+sL+SPbLG+fyvZAx+4we6/9iCP5HCQp3CXxmfAAAAAElFTkSuQmCC';

  constructor(private router: Router, private logUser: AuthenticationService,
    private commonService: CommonService) {
    this.changeLogo();
    this.cdnUrl = this.commonService.imageUrl;
    this.url = this.router.url;
    if (localStorage.getItem('authToken')) {
      this.authToken = localStorage.getItem('authToken');
    }
    this.currentUrl = this.url.split('/')[1];
    this.setUsr();
    this.commonService.getMessage().subscribe(message => {
      this.setUsr();
    });
  }
  setUsr() {
    if (localStorage.getItem('userDetails')) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
      this.organisationId = this.userDetails.user.organisationDetails.organisationId ?
        this.userDetails.user.organisationDetails.organisationId : '';
      this.userId = this.userDetails.user.userId ? this.userDetails.user.userId : '';
      this.usrImage = this.userDetails.user.image ? this.userDetails.user.image : '';
    }
  }
  fullScreenToggle(): void {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }
  changeLogo() {
    setTimeout(() => {
      // this.companyName = 'data:image/png;base64,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';
      // this.userLogo = 'data:image/png;base64,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'
    }, 6000);
  }
  // Login() {
  //   console.log("Loged in");
  //   var obj = "user1";
  //   this.logUser.login(obj).subscribe(data => {
  //     localStorage.setItem('authToken', data.sessionToken);
  //     localStorage.setItem('userDetails', JSON.stringify(data));
  //     this.router.navigate(['/dashboard']);
  //   });
  // }

  tabChange(id) {
    // this.tabArray.list.filter(key => {
    //   if (key.name == id.tab.textLabel) {
    //     this.roleId = key._id;
    //   }
    // });
    console.log('called tabs', id);
  }

  logout() {
    this.logUser.logout().subscribe(data => {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userDetails');
      this.router.navigate(['/session/signin']);
    });
  }
}
