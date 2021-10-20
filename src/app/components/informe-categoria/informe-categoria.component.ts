import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { BlackboxService } from '../../services/blackbox.service';

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
  origin: String = '';
  categoria: String = '';
  subCategoria: String = '';
  tipoPrenda: String = '';
  color: String = '';

  // variables para las cards
  womenNew: number = 0;
  womendiscontinued: number = 0;
  womenPromotion: number = 0;
  womensku: number = 0;
  
  menNew: number = 0;
  mendiscontinued: number = 0;
  menPromotion: number = 0;
  mensku: number = 0;
  
  kidsNew: number = 0;
  kidsdiscontinued: number = 0;
  kidsPromotion: number = 0;
  kidssku: number = 0;

  constructor(private blackboxService: BlackboxService) { 
  }

  ngOnInit(): void {
    this.getInfoCards()
    this.getPhotoList();
    this.toggleSidebar();
    
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

  // Ocultar/Mostrar sidebar
  toggleSidebar() {
    $('#menu-toggle-sidebar2').on('click', function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
      (<any>$('#wrapper.toggled').find("#sidebar-wrapper").find(".collapse")).collapse('hide');
    });
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


  // peticion infoCards
  getInfoCards() {
    let params = {
      origin: this.origin,
      categoria: this.categoria,
      subCategoria: this.subCategoria,
      tipoPrenda: this.tipoPrenda,
      color: this.color
    };

    this.blackboxService.getPrendasInfoCards(params).subscribe(
      (res) => {
        this.setPrendasInfoCards(res);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setPrendasInfoCards(res) {
    this.womenNew = res.obj.newWomen;
    this.womendiscontinued = res.obj.discontinuedWomen;
    this.womenPromotion = res.obj.promotionWomen;
    this.womensku = res.obj.totalskuWomen;

    this.menNew = res.obj.newMen;
    this.mendiscontinued = res.obj.discontinuedMen;
    this.menPromotion = res.obj.promotionMen;
    this.mensku = res.obj.totalskuMen;

    this.kidsNew = res.obj.newKids;
    this.kidsdiscontinued = res.obj.discontinuedKids;
    this.kidsPromotion = res.obj.promotionKids;
    this.kidssku = res.obj.totalskuKids;
  }


}
