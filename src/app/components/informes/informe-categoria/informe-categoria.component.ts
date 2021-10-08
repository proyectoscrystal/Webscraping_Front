import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { BlackboxService } from '../../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-informe-categoria',
  templateUrl: './informe-categoria.component.html',
  styleUrls: ['./informe-categoria.component.css']
})
export class InformeCategoriaComponent implements OnDestroy, OnInit, AfterViewInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  photos: any;
  categorys: any;
  imagesNames: any;

  constructor(private blackboxService: BlackboxService) { 
  }

  ngOnInit(): void {
    this.getPhotoList();
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      }
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        this.filterDuplicates();
        this.filterDuplicatesImageNames();
        this.dtTrigger.next();
        return (this.photos = res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filterDuplicates() {

    this.categorys = this.photos.filter(
      (dupe: { categoria: any; }, i: any, arr: any[]) => arr.findIndex(t => t.categoria === dupe.categoria) === i
    );

    //this.totalCat = this.photos.filter((n, i) => this.photos.indexOf(n) === i);

    //this.totalCat = this.photos.map(res => res.categoria).filter((value, index, self) => self.indexOf(value) === index)

    //this.totalCatss =  [...new Set(this.photos.map(res => res.categoria))]
  }

  filterDuplicatesImageNames() {
    this.imagesNames = this.photos.filter(
      (dupe: { imageName: any; }, i: any, arr: any[]) => arr.findIndex(t => t.imageName === dupe.imageName) === i
    );
  }

  ngAfterViewInit(): void {
    this.dtTrigger.subscribe(() => {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.columns(0).every(function() {
          const that = this;
          $("select", this.footer()).on('keyup change', function() {
            if (that.search() !== this['value']) {
              that.search(this['value']).draw();
            }
          });
          $("input", this.footer()).on('keyup change', function() {
            if (that.search() !== this['value']) {
              that.search(this['value']).draw();
            }
          });
        });
      });
    });
  }  

}
