import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Article {
  name:string;
  nameAr: string;
  nameFr: string;
  picture:string;
  category:string;
  subCategory:string;
  status:string;
  isTop:boolean;
  isNew:boolean;
  autoPublishing:boolean;
  experts:string;
  description:string;
  descriptionAr:string;
  descriptionFr:string;
  file:string;
  startPublishing:Date;
  endPublishing:Date;
  enableStreaming:boolean;
  totalPreviewed:number;
  fileSize:number;
  seasonNumber:number;
  duration:number;
  watermarkText:string;
  episodeNumber:number;
  totalDownloads:number;
  totalHits:number;
  totalComments:number;
  totalRatings:number;
  averageRatings:number;
  totalLikes:number;
  totalDislikes:number;
  totalBookmarks:number;
 
  remoteSource:boolean;
  url:string;
  alternativeUrl:string;
  copyright:string;
  publishDate:Date;

 
  
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'https://api.expert-sante.continuousnet.com/api/videos';
  private categoriesUrl = 'https://api.expert-sante.continuousnet.com/api/categories';
  private subcategoriesUrl = 'https://api.expert-sante.continuousnet.com/api/sub-categories';
  private expertsUrl = 'https://api.expert-sante.continuousnet.com/api/experts';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getArticles(token: string): Observable<Article[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Article[]>(this.apiUrl, { headers });
  }
  getCategories(): Observable<any[]> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<any[]>(this.categoriesUrl, { headers });
  }
  getSubCategories(): Observable<any[]> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this. subcategoriesUrl, { headers });
}
getexperts():Observable<any[]> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this. expertsUrl, { headers });
}
  addArticle(token: string, article: Article): Observable<Article> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Article>(this.apiUrl, article, { headers });
  }


  deleteArticle(token: string, articleId: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.apiUrl}/${articleId}`, { headers });
  }
}



  