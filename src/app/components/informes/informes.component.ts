import { formatCurrency } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'
import { BlackboxService } from '../../services/blackbox.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { InformePrecioComponent } from './informe-precio/informe-precio.component';
import { InformeDescuentoComponent } from './informe-descuento/informe-descuento.component';
import { InformeNuevosComponent } from './informe-nuevos/informe-nuevos.component';
import { InformeSKUComponent } from './informe-sku/informe-sku.component';



@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  // @ViewChild(InformeDescuentoComponent) informeDescuento: InformeDescuentoComponent;
  // @ViewChild(InformeNuevosComponent) informeNuevo: InformeNuevosComponent;
  // @ViewChild(InformeSKUComponent) informeSKU: InformeSKUComponent;
  modalRef: BsModalRef;

  titulo: string;
  photos: any;
  averagePrice: number;
  totalDiscount: number;
  totalNew: any;
  totalsku: any;
  currency1: any = '';
  totalDescontinuados: any = 0;
  origins: any;
  categorys: any;
  subcategorys: any;
  imagesnames: any;
  colors: any;
  materials: any;

  constructor(private blackboxService: BlackboxService, @Inject(LOCALE_ID) public locale: string, private modalService: BsModalService) {
    Chart.register(...registerables);

    // metodo para obtener todos los documentos de tipo images

  }

  ngOnInit(): void {
    this.titulo = 'Resumen Mes';
    this.getPhotoList();
    this.toggleSidebar();
  }

  // Ocultar/Mostrar sidebar
  toggleSidebar() {
    $('#menu-toggle-sidebar').on('click', function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
      (<any>$('#wrapper.toggled').find("#sidebar-wrapper").find(".collapse")).collapse('hide');
    });
  }

  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        this.getAverage();
        this.getDiscount();
        this.getNew();
        this.setTotalSKU();
        this.filterDuplicatesOrigin();
        this.filterDuplicatesCategorys();
        this.filterDuplicatesSubCategorys();
        this.filterDuplicatesImagesNames();
        this.filterDuplicatesColors();
        this.filterDuplicatesMaterials();
        return (this.photos = res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filterDuplicatesOrigin() {
    this.origins = this.photos.filter(
      (dupe: { origin: any; }, i: any, arr: any[]) => arr.findIndex(t => t.origin === dupe.origin) === i
    );
  }
  filterDuplicatesCategorys() {
    this.categorys = this.photos.filter(
      (dupe: { categoria: any; }, i: any, arr: any[]) => arr.findIndex(t => t.categoria === dupe.categoria) === i
    );
  }
  filterDuplicatesSubCategorys() {
    this.subcategorys = this.photos.filter(
      (dupe: { subCategoria: any; }, i: any, arr: any[]) => arr.findIndex(t => t.subCategoria === dupe.subCategoria) === i
    );
  }
  filterDuplicatesImagesNames() {
    this.imagesnames = this.photos.filter(
      (dupe: { imageName: any; }, i: any, arr: any[]) => arr.findIndex(t => t.imageName === dupe.imageName) === i
    );
  }
  filterDuplicatesColors() {
    this.colors = this.photos.filter(
      (dupe: { color: any; }, i: any, arr: any[]) => arr.findIndex(t => t.color === dupe.color) === i
    );
  }
  filterDuplicatesMaterials() {
    this.materials = this.photos.filter(
      (dupe: { materiales: any; }, i: any, arr: any[]) => arr.findIndex(t => t.materiales === dupe.materiales) === i
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getAverage() {
    let precioPromedio: number = 0;
    this.photos.forEach(element => {
      let { precio, descuento } = element;
      precioPromedio += precio;
    });
    this.averagePrice = parseInt((precioPromedio / this.photos.length).toFixed());


    this.setCurrency();
  }

  setCurrency() {
    this.currency1 = formatCurrency(this.averagePrice, this.locale, '$ ');
    this.currency1 = this.currency1.split(' ').splice(1, 1);
    this.currency1 = this.currency1[0].split('.');
    this.currency1 = this.currency1.splice(0, 1);
    this.currency1 = this.currency1[0];
    this.currency1 = this.currency1.split(',').join('.');
  }

  getDiscount() {
    let discountTotal: any = this.photos.filter((prom) => {
      if (prom.descuento !== null) {
        return prom;
      }
    });

    let promedios: any = discountTotal.map(element => {
      let { descuento, precio } = element;

      return parseFloat(Math.abs(((descuento * 100) / precio) - 100).toFixed(2));
    });

    let discount: any = 0;
    promedios.forEach(element => {
      discount += element;
    });
    this.totalDiscount = (discount / promedios.length);
  }

  getNew() {
    this.totalNew = this.photos.filter((res) => {
      if (res.estado === 'nuevo') {
        return res;
      }
    })

    this.totalNew = this.totalNew.length;
  }

  setTotalSKU() {
    let tallas: any = 0;
    this.photos.forEach(element => {
      tallas += element.talla.length;
    });
    this.totalsku = tallas;
  }





}
