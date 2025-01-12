import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Article, ArticleService } from '../article.service';
import { AuthService } from '../auth.service';
import { noop } from 'rxjs';

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrl: './ajout.component.css'
})

export class AjoutComponent implements OnInit {
    @Output() articleAdded = new EventEmitter<Article>();
    displayForm: boolean =true;
    newArticle: Article = {
      name: '',
      nameAr: '',
      nameFr: '',
      picture: '',
      category: '',
      subCategory: '',
      status: '',
      isTop: false,
      isNew: false,
      experts: '',
      description:'',
      descriptionAr:'',
      descriptionFr:'',
      file:'',
      autoPublishing:false,
      startPublishing:new Date(),
      endPublishing:new Date(),
      enableStreaming:false,
      totalPreviewed:0,
      fileSize:0,
      seasonNumber:0,
      duration:0,
      watermarkText:'',
      episodeNumber:0,
      totalDownloads:0,
      totalHits:0,
      totalComments:0,
      totalRatings:0,
      averageRatings:0,
      totalLikes:0,
      totalDislikes:0,
      totalBookmarks:0,
      
      remoteSource:false,
      url:'',
      alternativeUrl:'',
      copyright:'',
      publishDate:new Date(),

      
      
      
    };
    categories: any[] = [];
    SubCategories:any[]=[];
    expert:any[]=[]
  
    constructor(private articleService: ArticleService, private authService: AuthService) {}
  
    ngOnInit(): void {
      
      this.fetchCategories();
      this.fetchSubCategories();
      this.fetchexpert();
    }
  
    fetchCategories(): void {
        const token = this.authService.getToken();
        if (token) {
          this.articleService.getCategories().subscribe(
            (data: any ) => {
              this.categories = data.results;
        },
        error => {
          console.error('Error fetching categories', error);
        }
      );
    }
}
fetchSubCategories():void{
    const token=this.authService.getToken();
    if (token) {
        this.articleService.getSubCategories().subscribe(
          (data: any ) => {
            this.SubCategories = data.results;
      },
      error => {
        console.error('Error fetching categories', error);
      }
    );
  }
}
fetchexpert():void{
    const token=this.authService.getToken();
    if (token) {
        this.articleService.getexperts().subscribe(
          (data: any ) => {
            this.expert = data.results;
      },
      error => {
        console.error('Error fetching experts', error);
      }
    );
  }
}

    onSubmit(): void {
        const token=this.authService.getToken();
        if (token) {
          this.articleService.addArticle(token, this.newArticle).subscribe(
            (article: Article) => {
              console.log('Article ajouté:', article);
              this.articleAdded.emit(article);
              this.resetForm();
            },
            error => {
              console.error('Erreur lors de l\'ajout de l\'article', error);
            }
          );
         
      } else {
        console.error('Token not found. User may not be logged in.');
        
      }
    }
  
    resetForm(): void {
      this.newArticle = {
        name: '',
        nameAr: '',
        nameFr: '',
        picture: '',
        category: '',
        subCategory: '',
        status: '',
        isTop: false,
        isNew: false,
        experts:'',
         description:'',
         descriptionAr:'',
         descriptionFr:'',
         file:'',
         autoPublishing:false,
         startPublishing:new Date(),
         endPublishing:new Date(),
         enableStreaming:false,
         totalPreviewed:0,
         fileSize:0 ,
         seasonNumber:0,
         duration:0,
         watermarkText:'',
         episodeNumber:0,
         totalDownloads:0,
         totalHits:0,
         totalComments:0,
         totalRatings:0,
         averageRatings:0,
         totalLikes:0,
         totalDislikes:0,
         totalBookmarks:0,
        
         remoteSource:false,
         url:'',
         alternativeUrl:'',
         copyright:'',
         publishDate:new Date(),

      };
    }
    toggleForm() {
        this.displayForm = !this.displayForm;
      }
      handleFileInput(event: any): void {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            this.newArticle.picture = reader.result as string;
          };
          reader.readAsDataURL(file);
        }
      }
  }
    


