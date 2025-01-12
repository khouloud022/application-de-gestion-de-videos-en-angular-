import { Component, OnInit } from '@angular/core';
import { ArticleService, Article } from '../article.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  articles:any = [];
  categories: any[] = [];
  subcategories: any[] = [];
  searchTerm: string = '';
  
  showAddForm = false;

  constructor(private articleService: ArticleService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    const token = this.authService.getToken();
    if (token) {
      this.articleService.getArticles(token).subscribe(
        (data: any ) => {
          this.articles = data.results;
          this.articles.forEach((value:any) => {
            value.picture = 'https://api.expert-sante.continuousnet.com' + value.picture
          }); 
          console.log('articles',this.articles  )

        },
        error => {
          console.error('Error fetching articles', error);
        }
      );
    } else {
      console.error('Token not found. User may not be logged in.');
    }
  }


  toggleAddForm(): void {
    this.showAddForm = !this.showAddForm;
  }

  onArticleAdded(article: Article): void {
    this.articles.push(article);
    this.showAddForm = false;
  }
  applyFilter(): void {
    if (this.searchTerm.trim().length === 0) {
      this.loadArticles(); 
      return;
    }

    this.articles = this.articles.filter((article: any) =>
      article.name.toLowerCase()==this.searchTerm.toLowerCase() ||
      article.nameAr.toLowerCase()==this.searchTerm.toLowerCase()||
      article.category.name.toLowerCase()==this.searchTerm.toLowerCase()||
      article.subCategory.name.toLowerCase()==this.searchTerm.toLowerCase()||
      article.experts.name.toLowerCase()==this.searchTerm.toLowerCase()
    );
}
}

  
  

