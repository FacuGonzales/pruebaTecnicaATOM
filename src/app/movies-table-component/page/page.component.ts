import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  private destroyEmmiter$: Subject<boolean>;
  public filtersForm: FormGroup;
  public isSearchAdvance: boolean = false;
  public data: any[] = [];
  public error: string = '';
  public loading: boolean = false;
  public orderByTitle: boolean = false;
  public orderByYears: boolean = false;
  public page: number = 1;
  public totalResults!: number;
  public totalPages!: number
  public array: number[] = [];

  constructor(private fb: FormBuilder, private moviesData: MoviesService, private alertMessage: ToastrService) {
    this.destroyEmmiter$ = new Subject();
    this.filtersForm = this.fb.group({
      type: [''],
      title: [''],
      years: [''],
      id: ['']
    });
  }

  ngOnInit(): void {
    this.getData();
    this.formChanges();
  }

  ngOnDestroy(): void {
    this.destroyEmmiter$.next(true);
    this.destroyEmmiter$.complete();
  }

  public getData(page?:number): any {
    const data:any = {};
    this.data = [];
    this.array = [];
    this.loading = true;

    data.id = this.filtersForm.get('id')?.value ? this.filtersForm.get('id')?.value : '';
    data.year = this.filtersForm.get('years')?.value ? this.filtersForm.get('years')?.value : '';
    data.title = this.filtersForm.get('title')?.value ? this.filtersForm.get('title')?.value : 'cars';
    data.type = this.filtersForm.get('type')?.value ? this.filtersForm.get('type')?.value : '';

    if(data.years && data.year.toString().length != 4) return this.alertMessage.warning('Debes ingresar 4 digtos en el año.');
    if(!data.title && !data.id) return this.alertMessage.warning('Debes ingresar el titulo o el id.');

    this.moviesData.getDataMovies(data, page).pipe(takeUntil(this.destroyEmmiter$)).subscribe(
      (r:any) => {
        setTimeout(() => {
          if(r.Response === 'True') {
            this.data = (r && r.Search) ? r.Search : []
            this.totalResults = r.totalResults;
            this.totalPages = Math.ceil(this.totalResults / 10);
            for (let index = 1; index < this.totalPages; index++) {
              this.array.push(index);
            }

          } else {
            this.error = r.Error;
            this.data = [];
          }
          this.loading = false;
        }, 2000);
      }
    )
  }

  public formChanges(): void {
    this.filtersForm.get('years')?.valueChanges.pipe(takeUntil(this.destroyEmmiter$)).subscribe(
      (val:number) => {
        if(val.toString().length >= 4 && (val < 1895 || val > 2024)) return this.alertMessage.error('El año ingresado no es válido.')

        return null
      }
    )
  }

  orderBy(value:string) {
    switch (value) {
      case 'title':
        this.orderByTitle = true;
        this.orderByYears = false;

        this.data = this.data.sort( function(a,b) {
          if (a.Title > b.Title) return 1;
          if (a.Title < b.Title) return -1;

          return 0;
        });
        break;

      case 'year':
        this.orderByTitle = false;
        this.orderByYears = true;

        this.data = this.data.sort( function(a,b) {
          if (a.Year < b.Year) return 1;
          if (a.Year > b.Year) return -1;

          return 0;
        });
        break;
    }
  }

  goToPage(page: number){
    this.page = page;
    this.getData(this.page);
  }

  public cleanFilters(): void {
    this.filtersForm.reset();
    this.filtersForm.get('type')?.setValue("");
  }
}
