import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { BlackboxService } from '../../services/blackbox.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { Datos } from '../../utils/index';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
})
export class ImageDetailComponent implements OnInit {
  constructor(
    private blackboxService: BlackboxService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) {
    this.datos = new Datos();
  }

  modalRef: BsModalRef;
  photoDetails: any;
  photo;
  imageId;
  filtersLoaded: Promise<boolean>;
  prendaGeneralList: any;
  colorPrincipalList: any;
  prendaGeneralSelected: any;
  datos: any;
  imageName: string;
  mainColors: any;
  hexColors: string[] = [];
  pantoneColors: string[] = [];
  principalColor: string[] = [];
  prendasGenerales: string[] = [];
  arrayColor: any[] = [];
  pColor = [];
  features = [];
  prendasInferiores = [];
  prendaColor = [];
  mostrarInferiores: boolean;

  arrayItems = [];
  prendaGenSelected: string[] = [];
  principalColorSelected: string[] = [];
  hexaColorSelected: string[] = [];
  prendaInfSelected: string[] = [];
  featureSelected: string[] = [];
  featuresOptions: any;
  prendaInfOptions: any;

  ngOnInit(): void {
    this.imageId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getPhoto();
    this.getMainColors();
    this.featuresOptions = this.getFeatures();
  }

  /**
   * Muestra detalles de una imagen
   */
  getPhoto() {
    this.blackboxService.getPhoto(this.imageId).subscribe(
      (res) => {
        console.log(res);
        this.photoDetails = res;
        this.filtersLoaded = Promise.resolve(true);

        this.photoDetails.forEach((photo) => {
          this.photo = photo;
          this.imageName = this.photo.imageName;
          this.prendasGenerales = this.photo.prendasGenerales;
          this.features = this.photo.features;
          this.prendasInferiores = this.photo.prendasInferiores;

          // this.hexColors = this.photo.hexColors;
          this.principalColor = this.photo.principalColors;
          // this.pantoneColors = this.photo.pantoneColors;
          this.prendaColor = this.photo.prendaColor;
        });

        if (this.prendasInferiores.length > 0) {
          this.mostrarInferiores = true;
        } else {
          this.mostrarInferiores = false;
        }

        let pColors = {};
        for (let i = 0; i < this.prendaColor.length; i++) {
          let objDetail = this.prendaColor[i];

          if (objDetail.ppal === 'amarillo') {
            objDetail.ppalHexa = '#fdd500';
            this.pColor.push(pColors);
          } else if (objDetail.ppal === 'rojo') {
            objDetail.ppalHexa = '#fd0000';
            this.pColor.push(pColors);
          } else if (objDetail.ppal === 'azul') {
            objDetail.ppalHexa = '#290c96';
            this.pColor.push(pColors);
          } else if (objDetail.ppal === 'morado') {
            objDetail.ppalHexa = '#7e0c96';
            this.pColor.push(pColors);
          } else if (objDetail.ppal === 'naranjado') {
            objDetail.ppalHexa = '#ec7335';
            this.pColor.push(pColors);
          } else if (objDetail.ppal === 'verde') {
            objDetail.ppalHexa = '#56a435';
            this.pColor.push(pColors);
          } else if (objDetail.ppal === 'negro') {
            objDetail.ppalHexa = '#000000';
            this.pColor.push(pColors);
          } else if (objDetail.ppal === 'blanco') {
            objDetail.ppalHexa = '#ffffff';
            this.pColor.push(pColors);
          } else if (objDetail.ppal === 'gris') {
            objDetail.ppalHexa = '#4b5154';
            this.pColor.push(pColors);
          } else if (objDetail.ppal === 'beige') {
            objDetail.ppalHexa = '#feffd4';
            this.pColor.push(pColors);
          } else if (objDetail.ppal === 'rosado') {
            objDetail.ppalHexa = '#fed4d4';
            this.pColor.push(pColors);
          } else if (objDetail.ppal === 'cafe') {
            objDetail.ppalHexa = '#815140';
          }
          this.arrayColor.push(objDetail);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   *
   * Elimina la imagen seleccionada
   * Id de la imagen a eliminar
   *
   */
  deleteImage(imageName: string) {
    if (confirm('Esta seguro de eliminar la imagen?')) {
      this.blackboxService.deleteImage(imageName).subscribe(
        (res) => {
          this.showSuccessDeleteImage();
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          console.log(err);
          this.showErrorDeleteImage();
        }
      );
    }
  }

  /**
   * Eliminar característica
   */

  async deleteFeature(feature: string, imageName: string) {
    try {
      if (confirm('¿Desea borrar la característica seleccionada?'))
        await this.blackboxService
          .deleteFeature(imageName, feature)
          .subscribe((res) => {
            this.showSuccessDeleteFeature();
            window.location.reload();
          });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Eliminar prenda inferior
   */

  async deleteInferior(prenda: string, imageName: string) {
    try {
      if (confirm('¿Desea borrar la prenda inferior seleccionada?'))
        await this.blackboxService
          .deleteInferior(imageName, prenda)
          .subscribe((res) => {
            this.showSuccessDeleteFeature();
            window.location.reload();
          });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Editar (editar, agregar y eliminar) información de la imagen (color principal, características y prendas generales)
   */
  async editInfo(imageName, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.prendaGeneralList = this.getPrendasGenerales();

    let itemLowerCase;
    this.prendaGeneralList.forEach((prendaGen) => {
      itemLowerCase = prendaGen.text.toLowerCase();

      prendaGen.checked = false;
      if (this.prendasGenerales.includes(itemLowerCase)) {
        prendaGen.checked = true;
      }
    });

    let colorLowerCase;
    this.mainColors.forEach((color) => {
      colorLowerCase = color.value.toLowerCase();

      color.checked = false;
      if (this.principalColor.includes(colorLowerCase)) {
        color.checked = true;
      }
    });
  }

  /**
   * Validar check en cada item de prendas generales
   */

  updateCheckFilterPrendaGen(checked, item, className, elemento) {
    let itemLowerCase = item.value.toLowerCase();

    if (checked) {
      this.prendaGenSelected.push(itemLowerCase);
    } else {
      console.log('Quitando: ', itemLowerCase);
      this.prendaGenSelected.splice(
        this.prendaGenSelected.indexOf(itemLowerCase),
        1
      );
    }

    this.photo.prendasGenerales.forEach((feature) => {
      if (this.prendaGenSelected.includes(feature)) {
        this.prendaGenSelected.splice(this.prendaGenSelected.indexOf(feature));
      }
    });
  }

  /**
   * Validar check en cada item de colores
   */
  updateColorSelect(checked, item, className, elemento) {
    let colorLowerCase = item.value.toLowerCase();

    if (checked) {
      this.principalColorSelected.push(colorLowerCase);
    } else {
      console.log('Quitando color: ', colorLowerCase);
      this.principalColorSelected.splice(
        this.principalColorSelected.indexOf(colorLowerCase),
        1
      );
    }
  }

  /**
   * Valor del input color 
   */
  updateColorInput(event) {
    let color = event.target.value;

    this.hexaColorSelected.push(color);
  }

  /**
   * Modal para agregar características
   */

  addFeature(imageName, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.featuresOptions = this.getFeatures();

    let featureLowerCase;
    this.featuresOptions.forEach((feature) => {
      featureLowerCase = feature.value.toLowerCase();

      feature.checked = false;
      if (this.features.includes(featureLowerCase)) {
        feature.checked = true;
      }
    });
  }

  /**
   * Validar check en cada item de características
   */
  updateCheckFeature(checked, item, className, elemento) {
    let featureLowerCase = item.value.toLowerCase();

    if (checked) {
      this.featureSelected.push(featureLowerCase);
    } else {
      console.log('Quitando caraterística');
      this.featureSelected.splice(
        this.featureSelected.indexOf(featureLowerCase),
        1
      );
    }
  }

  /**
   * Enviar prendas inferiores al backend
   */
  createFeature() {
    this.featureSelected.forEach((feature) => {
      let featureLower = feature.toLowerCase();
      this.blackboxService.addFeature(this.imageName, featureLower).subscribe(
        (res: any) => {
          console.log(JSON.stringify(res.message, null, 2));
          // this.getPhoto();
          this.featureSelected = [];
          // this.photos;
          this.modalRef.hide();
          this.showSuccessAddFeature(res.message);
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  /**
   * Modal para agregar prendas inferiores
   */

  addInferior(imageName, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.prendaInfOptions = this.getPrendaInferior();

    let prendaInfLowerCase;
    this.prendaInfOptions.forEach((prendaInf) => {
      prendaInfLowerCase = prendaInf.value.toLowerCase();

      prendaInf.checked = false;
      if (this.prendasInferiores.includes(prendaInfLowerCase)) {
        prendaInf.checked = true;
      }
    });
  }

  /**
   * Validar check en cada item de prendas inferiores
   */

  updateCheckFilterInferior(checked, item, className, elemento) {
    let prendaInfLowerCase = item.value.toLowerCase();

    if (checked) {
      this.prendaInfSelected.push(prendaInfLowerCase);
      console.log(this.prendaInfSelected);
    } else {
      console.log('Quitando prenda inferior');
      this.prendaInfSelected.splice(
        this.prendaInfSelected.indexOf(prendaInfLowerCase),
        1
      );
    }
  }

  /**
   * Enviar prendas inferiores al backend
   */
  savePrendaInf() {
    console.log(this.prendaInfSelected);
    this.prendaInfSelected.forEach((prenda) => {
      let featureLower = prenda.toLowerCase();
      this.blackboxService.addprendaInf(this.imageName, featureLower).subscribe(
        (res: any) => {
          this.prendaInfSelected = [];
          this.modalRef.hide();
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  /**
   * Enviar datos al backend para actualizar los datos de la imagen
   */
  createPrendaGeneral() {
    console.log(this.prendaGenSelected);
    console.log(this.principalColorSelected);
    console.log(this.hexaColorSelected);

    let data = {};

    if (
      this.prendaGenSelected.length == 0 ||
      this.principalColorSelected.length == 0
    ) {
      console.log('Debe seleccionar una prenda general y un color');
    } else if (
      this.prendaGenSelected.length != this.principalColorSelected.length
    ) {
      console.log('Hay algo que no cuadra');
    } else {
      console.log('Enviando datos al backend');

      for (let i = 0; i < this.prendaGenSelected.length; i++) {
        let hexaColor;
        let pantoneColor;
        if (this.principalColorSelected[i] === 'amarillo') {
          hexaColor = '#fdd500';
          pantoneColor = 'Yellow 012 C';
        } else if (this.principalColorSelected[i] === 'rojo') {
          hexaColor = '#fd0000';
          pantoneColor = '2347 C';
        } else if (this.principalColorSelected[i] === 'azul') {
          hexaColor = '#290c96';
          pantoneColor = '2371 C';
        } else if (this.principalColorSelected[i] === 'morado') {
          hexaColor = '#7e0c96';
          pantoneColor = '2602 C';
        } else if (this.principalColorSelected[i] === 'naranjado') {
          hexaColor = '#ec7335';
          pantoneColor = '4012 C';
        } else if (this.principalColorSelected[i] === 'verde') {
          hexaColor = '#56a435';
          pantoneColor = '362 C';
        } else if (this.principalColorSelected[i] === 'negro') {
          hexaColor = '#000000';
          pantoneColor = 'Black 6 C';
        } else if (this.principalColorSelected[i] === 'blanco') {
          hexaColor = '#ffffff';
          pantoneColor = '0';
        } else if (this.principalColorSelected[i] === 'gris') {
          hexaColor = '#4b5154';
          pantoneColor = '7540 C';
        } else if (this.principalColorSelected[i] === 'beige') {
          hexaColor = '#feffd4';
          pantoneColor = '0';
        } else if (this.principalColorSelected[i] === 'rosado') {
          hexaColor = '#fed4d4';
          pantoneColor = '706 C';
        } else if (this.principalColorSelected[i] === 'cafe') {
          hexaColor = '#815140';
          pantoneColor = '4705 C';
        }

        data = {
          imageName: this.imageName,
          prenda: this.prendaGenSelected[i],
          ppal: this.principalColorSelected[i],
          hexaColor: hexaColor,
          pantoneColor: pantoneColor,
          hexaColorSelect: this.hexaColorSelected[i]
        };

        console.log(data);

        this.blackboxService.updateInfo(data).subscribe(
          (res) => {
            console.log(res);
            this.modalRef.hide();
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );

        this.blackboxService
          .addprendaGen(this.imageName, this.prendaGenSelected[i])
          .subscribe(
            (res) => {
              this.prendaGenSelected = [];
              window.location.reload();
            },
            (err) => {
              console.log(err);
            }
          );

        this.blackboxService
          .addColor(this.imageName, this.principalColorSelected[i])
          .subscribe(
            (res) => {
              this.principalColorSelected = [];
              window.location.reload();
            },
            (err) => {
              console.log(err);
            }
          );
      }
    }
  }

  /**
   * Eliminar prendaColor
   */
  async deletePrendaColor(prenda, imageName: string) {
    console.log(prenda.prenda);
    console.log(imageName);

    try {
      if (confirm('¿Desea borrar la característica seleccionada?'))
        await this.blackboxService
          .delPrendaColor(prenda, imageName)
          .subscribe((res) => {
            // window.location.reload();
          });

      this.deletePrendaGeneral(prenda.prenda, imageName);
      this.deleteColor(prenda);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Eliminar Prenda general
   */

  async deletePrendaGeneral(feature: string, imageName: string) {
    await this.blackboxService
      .deletePrendaGeneral(imageName, feature)
      .subscribe((res) => {
        this.showSuccessDeleteFeature();
        window.location.reload();
      });
  }

  /**
   * Eliminar Color
   */
  deleteColor(data) {
    let dataColor = {
      imageName: this.imageName,
      principalColors: data.ppal,
    };
    console.log(dataColor);
    this.blackboxService.delColor(dataColor).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getFeatures() {
    return this.datos.featureOptions;
  }

  getPrendasGenerales() {
    return this.datos.prendasGenerales;
  }

  getPrendaInferior() {
    return this.datos.prendasInferiores;
  }

  backDashboard() {
    this.router.navigate(['/dashboard']);
  }

  getMainColors() {
    this.mainColors = this.datos.mainColors;
  }

  // Notificaciones
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
