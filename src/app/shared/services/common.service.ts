import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CommonService {

  private accessToken = 'access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c';
  private apiPath = 'http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2';

  constructor(private http: HttpClient) { }

  // Service using GET method to fetching opportunity data
  getOpportunities() {
    return this.http.get(this.apiPath + `/opportunities?${this.accessToken}&per_page=5`);
  }

  // Service using PATCH method to update opportunity
  updateOpportunity(id: number, obj: any) {
    return this.http.patch(this.apiPath + `/opportunities/${id}?${this.accessToken}`, {opportunity: obj});
  }

  loadMoreOpportunities(preOffset: number) {
    const offset = preOffset + 1;
    return this.http.get(this.apiPath + `/opportunities?${this.accessToken}&per_page=5&page=` + offset);
  }

}
