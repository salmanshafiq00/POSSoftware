import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/Core/Models/category.model';
import { DataListRepositoryService } from 'src/app/Core/Services/data-list-repository.service';
import { RestDataService } from 'src/app/Core/Services/rest.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  constructor(private service: RestDataService, private repo: DataListRepositoryService, private route: Router) { }
  private url: string = "http://localhost:5000/api/";
  public routeData?= Number(location.pathname.split('/')[3]);
  formData: Category = new Category();

  getEdit() {
    if (this.routeData > 0) {
      this.formData = this.repo.categoryData.find(f => f.id == this.routeData);
    }
  }


  submit(form: NgForm) {
    if (form.valid) {
      if (this.routeData > 0) {
        this.service.Update<Category>(this.formData, this.url + "category/" + this.routeData).subscribe(res => {
          alert("Data updated");
          var index = this.repo.categoryData.indexOf(this.formData);
          this.repo.categoryData.splice(index, 1, this.formData);
          this.route.navigateByUrl("category");
        })
      } else {
        this.service.Insert<Category>(this.formData, this.url + "category").subscribe(res => {
          alert("Data Inserted");
          this.repo.categoryData.push(res);
        });
      }
    }

  }

  ngOnInit(): void {
    this.getEdit();
  }

}
