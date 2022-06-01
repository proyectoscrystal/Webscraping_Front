import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BlackboxService } from '../../services/blackbox.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Datos } from '../../utils/index';
import { NgForm } from '@angular/forms';

import { ServicioPagination } from './servicio-pagination-data.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  mostrar = false;
  mostrarImgs: boolean = false;
  photos: any;
  photosService: any;
  fotos: any[] = [];
  features: string[] = [];
  total: number;
  totalService: number;
  modalRef: BsModalRef;
  datos: any;
  featuresOptions: any;
  imageName: string;
  currentUser;
  photo: any;
  selectedFilter = [];
  username: string;
  p: any = 1;
  filterPhoto: any;
  nameFile: any;
  filesBase64 = [];
  files;
  selectedFile = null;
  fileName = [];
  payload = [];
  newImg;
  objFilter: any;
  filterImgdata = [];
  dataSubscription: Subscription;

  constructor(
    private blackboxService: BlackboxService,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private servicePagination: ServicioPagination
  ) {
    this.datos = new Datos();
  }

  ngOnInit(): void {
    let data = this.servicePagination.enviarObservable.subscribe(data => {
      this.p = data;
    });

    this.dataSubscription = data;
    
    this.mostrar = false;
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  /**
   * Muestra todas la imágenes
   */
  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        this.total = this.photos.length;
        // console.log(this.total);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Recibe los datos del componente SidebarComponent
  data(value) {
    this.photos = value;
    this.total = this.photos.length;
  }

  filterPhotoItems(value) {
    this.selectedFilter = []
    console.log('value: ', value);
    this.photos = value.consulta;
    this.total = this.photos.length;

    let prendaGen = value.prendaGenLower;
    let hexColor = value.hexColor;
    let pantoneColors = value.pantoneColors;
    let principalColors = value.principalColors;

    hexColor.forEach((item) => {
        let fotoFiltro = {
          item: item,
        };
        this.selectedFilter.push(fotoFiltro);
      });

      pantoneColors.forEach((item) => {
        let fotoFiltro = {
          item: item,
        };
        this.selectedFilter.push(fotoFiltro);
      });

      prendaGen.forEach((item) => {
        let fotoFiltro = {
          item: item,
        };
        this.selectedFilter.push(fotoFiltro);
      });

      principalColors.forEach((item) => {
        let fotoFiltro = {
          item: item,
        };
        this.selectedFilter.push(fotoFiltro);
      });



    console.log(this.selectedFilter);
  }

  filterPhotoText(value) {
    this.photos = value;
    this.total = this.photos.length;
  }

  filterDataItems(value) {

    if (value.checked) {
      if (value.clase == 'year') {
        this.selectedFilter.push(value);
        console.log('YEAR: ', this.selectedFilter);
      } else if (value.clase == 'quarter') {
        this.selectedFilter.push(value);
      } else if (value.clase == 'gender') {
        this.selectedFilter.push(value);
      } else if (value.clase == 'use') {
        this.selectedFilter.push(value);
      } else if (value.clase == 'origin') {
        this.selectedFilter.push(value);
      } else if (value.clase == 'feature') {
        this.selectedFilter.push(value);
      } else if (value.clase == 'color') {
        this.selectedFilter.push(value);
      } else if (value.clase == 'user') {
        this.selectedFilter.push(value);
      }
    } else {
      if (value.clase == 'year' && !value.checked) {
        this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      }
      if (value.clase == 'quarter' && !value.checked) {
        this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      }
      if (value.clase == 'gender' && !value.checked) {
        this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      }
      if (value.clase == 'use' && !value.checked) {
        this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      }
      if (value.clase == 'origin' && !value.checked) {
        this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      }
      if (value.clase == 'feature' && !value.checked) {
        this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      }
      if (value.clase == 'color' && !value.checked) {
        this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      }
      if (value.clase == 'user' && !value.checked) {
        this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      }
    }
  }

  /**
   *
   * Elimina la imagen seleccionada
   * @param id Id de la imagen a eliminar
   *
   */
  deleteImage(imageName: string) {
    if (confirm('Esta seguro de eliminar la imagen?')) {
      this.blackboxService.deleteImage(imageName).subscribe(
        (res) => {
          this.showSuccessDeleteImage();
          this.getPhotoList();
        },
        (err) => {
          console.log(err);
          this.showErrorDeleteImage();
        }
      );
    }
  }

  // Eliminar característica seleccionada
  async deleteFeature(feature: string, imageName: string) {
    try {
      if (confirm('¿Desea borrar la característica seleccionada?'))
        await this.blackboxService
          .deleteFeature(imageName, feature)
          .subscribe((res) => {
            this.showSuccessDeleteFeature();
            this.getPhotoList();
          });
    } catch (error) {
      console.log(error);
    }
  }

  getFeatures() {
    return this.datos.featureOptions;
  }

  addFeature(index, imageName, template: TemplateRef<any>) {
    this.featuresOptions = this.getFeatures();
    this.modalRef = this.modalService.show(template);

    return (this.imageName = imageName);
  }

  /**
   *
   * Agregar característica
   */
  createFeature(form?: NgForm) {
    const feature = form.value.featureOptions;

    this.blackboxService.addFeature(this.imageName, feature).subscribe(
      (res: Response) => {
        this.getPhotoList();
        this.modalRef.hide();
        this.showSuccessAddFeature(res.message);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  viewDetail(imageId) {
    this.photo = imageId;
    this.servicePagination.enviarMensaje(this.p);
    const host: string =  location.origin;
    const url: string = host + '/#/' + String(this.router.createUrlTree(['/image', imageId]));
    window.open(url.toString(), '_blank')
    // this.router.navigate(['/image', imageId]);
  }

  // Notificaciones

  // Configuración toaster
  toastrFeatures() {
    return {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    };
  }

  // Eliminar imagen
  showSuccessDeleteImage() {
    this.toastr.success('', 'Imagen eliminada!', this.toastrFeatures());
  }

  showErrorDeleteImage() {
    this.toastr.error(
      '',
      'No se pudo eliminar la imagen',
      this.toastrFeatures()
    );
  }

  // Eliminar caracteristica
  showSuccessDeleteFeature() {
    this.toastr.success('', 'Característica eliminada!', this.toastrFeatures());
  }

  showErrorDeleteFeature() {
    this.toastr.error(
      '',
      'No se pudo eliminar la característica seleccionada!',
      this.toastrFeatures()
    );
  }

  // Agregar característica
  showSuccessAddFeature(msg) {
    this.toastr.success('', msg, this.toastrFeatures());
  }
}

export interface Response {
  message: string;
}
