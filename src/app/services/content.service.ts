import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import {ContentData} from "../models/content";
import {URL} from "../constants/content";

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) {
  }

  fetchContent(): Observable<ContentData> {
    return this.http.get<ContentData>(URL);
  }
}
