import {HttpHeaders} from '@angular/common/http';

export class Header {
  headers: HttpHeaders;

  constructor() {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer'
    });
  }
}
