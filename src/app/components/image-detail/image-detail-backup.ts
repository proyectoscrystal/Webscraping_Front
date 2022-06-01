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
  
    photoDetails: any;
    modalRef: BsModalRef;
    photo;
    imageId;
    filtersLoaded: Promise<boolean>;
    featuresOptions: any;
    prendaGenOptions: any;
    prendaInfOptions: any;
    datos: any;
    imageName: string;
    expanded: boolean = false;
    featureSelected: string[] = [];
    prendaGenSelected: string[] = [];
    prendaInferiorSelected: string[] = [];
    etiquetaCheck = [];
    mainColors: any;
    colorSelected: string[] = [];
    hexColors: string[] = [];
    pantoneColors: string[] = [];
    principalColor: string[] = [];
    prendasGenerales: string[] = [];
    arrayColor: any[] = [];
    colors = [];
    pColor = [];
    delPrincipalColor;
    features = [];
    prendasInferiores = [];
  
    ngOnInit(): void {
      this.imageId = this.activatedRoute.snapshot.paramMap.get('id');
      this.getPhoto();
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
            this.prendasGenerales = this.photo.prendasGenerales;
            this.features = this.photo.features;
            this.prendasInferiores = this.photo.prendasInferiores;
  
            this.hexColors = this.photo.hexColors;
            this.principalColor = this.photo.principalColors;
            this.pantoneColors = this.photo.pantoneColors;
          });
  
          let pColors = {};
  
          for (let i = 0; i <= this.hexColors.length; i++) {
            let newColorObj = {
              hexColor: this.hexColors[i],
              pantoneColor: this.pantoneColors[i],
              principalColor: this.principalColor[i],
            };
  
            if (newColorObj.principalColor === 'amarillo') {
              pColors = {
                name: 'Amarillo',
                hexa: '#fdd500',
              };
              this.pColor.push(pColors);
            } else if (newColorObj.principalColor === 'rojo') {
              pColors = {
                name: 'Rojo',
                hexa: '#fd0000',
              };
              this.pColor.push(pColors);
            } else if (newColorObj.principalColor === 'azul') {
              pColors = {
                name: 'Azul',
                hexa: '#290c96',
              };
              this.pColor.push(pColors);
            } else if (newColorObj.principalColor === 'morado') {
              pColors = {
                name: 'Morado',
                hexa: '#7e0c96',
              };
              this.pColor.push(pColors);
            } else if (newColorObj.principalColor === 'naranjado') {
              pColors = {
                name: 'Naranjado',
                hexa: '#ec7335',
              };
              this.pColor.push(pColors);
            } else if (newColorObj.principalColor === 'verde') {
              pColors = {
                name: 'Verde',
                hexa: '#56a435',
              };
              this.pColor.push(pColors);
            } else if (newColorObj.principalColor === 'negro') {
              pColors = {
                name: 'Negro',
                hexa: '#000000',
              };
              this.pColor.push(pColors);
            } else if (newColorObj.principalColor === 'blanco') {
              pColors = {
                name: 'Blanco',
                hexa: '#ffffff',
              };
              this.pColor.push(pColors);
            } else if (newColorObj.principalColor === 'gris') {
              pColors = {
                name: 'Gris',
                hexa: '#4b5154',
              };
              this.pColor.push(pColors);
            } else if (newColorObj.principalColor === 'beige') {
              pColors = {
                name: 'Beige',
                hexa: '#feffd4',
              };
              this.pColor.push(pColors);
            } else if (newColorObj.principalColor === 'rosado') {
              pColors = {
                name: 'Rosado',
                hexa: '#fed4d4',
              };
              this.pColor.push(pColors);
            } else if (newColorObj.principalColor === 'cafe') {
              pColors = {
                name: 'Cafe',
                hexa: '#815140',
              };
              this.pColor.push(pColors);
            }
            this.arrayColor.push(newColorObj);
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
     * @param id Id de la imagen a eliminar
     *
     */
    deleteImage(imageName: string) {
      let imgs = localStorage.getItem('imgData');
      let array = JSON.parse(imgs);
  
      function removeItemFromArr(arr, item) {
        var i;
        for (let img of arr) {
          i = img.imageName.indexOf(item);
          if (i !== -1) {
            arr.splice(i, 1);
          }
        }
  
        localStorage.setItem('imgData', JSON.stringify(arr));
      }
  
      if (confirm('Esta seguro de eliminar la imagen?')) {
        this.blackboxService.deleteImage(imageName).subscribe(
          (res) => {
            removeItemFromArr(array, imageName);
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
  
    // Eliminar prenda general seleccionada
    async deletePrendaGeneral(feature: string, imageName: string) {
      try {
        if (confirm('¿Desea borrar la prenda seleccionada?'))
          await this.blackboxService
            .deletePrendaGeneral(imageName, feature)
            .subscribe((res) => {
              this.showSuccessDeleteFeature();
              window.location.reload();
            });
      } catch (error) {
        console.log(error);
      }
    }
  
    // Eliminar la característica seleccionada
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
  
    // Eliminar prenda inferior seleccionada
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
  
    getFeatures() {
      return this.datos.featureOptions;
    }
  
    getPrendasGenerales() {
      return this.datos.prendasGenerales;
    }
  
    getPrendaInferior() {
      return this.datos.prendasInferiores;
    }
  
    addFeature(imageName, template: TemplateRef<any>) {
      this.featuresOptions = this.getFeatures();
      this.modalRef = this.modalService.show(template);
  
      return (this.imageName = imageName);
    }
  
    addPrendaGeneral(imageName, template: TemplateRef<any>) {
      this.prendaGenOptions = this.getPrendasGenerales();
      this.modalRef = this.modalService.show(template);
  
      return (this.imageName = imageName);
    }
  
    addInferior(imageName, template: TemplateRef<any>) {
      this.prendaInfOptions = this.getPrendaInferior();
      this.modalRef = this.modalService.show(template);
  
      return (this.imageName = imageName);
    }
  
    /**
     *
     * Agregar característica
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
  
    validateCheckbox(item) {
      console.log('feature nueva: ', item);
  
      this.photo.features.forEach((feature) => {
        console.log('Features existentes: ', feature);
  
        if (item === feature) {
          this.featureSelected.splice(
            this.featureSelected.indexOf(item.value),
            1
          );
          console.log('vaya, creo que ya existe');
        }
      });
    }
  
    // Checbox modal
    updateCheckFilter(checked, item, className, elemento) {
      let itemLowerCase;
      if (checked) {
        itemLowerCase = item.value.toLowerCase();
        console.log('Check Filter Feature', itemLowerCase);
        this.featureSelected.push(itemLowerCase);
        console.log(this.featureSelected);
      } else {
        this.featureSelected.splice(
          this.featureSelected.indexOf(itemLowerCase),
          1
        );
      }
  
      this.photo.features.forEach((feature) => {
        console.log('Features existentes: ', feature);
  
        if (this.featureSelected.includes(feature)) {
          this.featureSelected.splice(this.featureSelected.indexOf(feature));
        }
      });
    }
  
    /**
     *
     * Agregar prenda general
     */
  
    createPrendaGeneral() {
      this.prendaGenSelected.forEach((feature) => {
        console.log('FEATURE: ', feature);
        let featureLower = feature.toLowerCase();
        this.blackboxService.addprendaGen(this.imageName, featureLower).subscribe(
          (res: any) => {
            console.log(JSON.stringify(res.message, null, 2));
            // this.getPhoto();
            this.prendaGenSelected = [];
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
  
    // Checbox modal
    updateCheckFilterPrendaGen(checked, item, className, elemento) {
      let itemLowerCase;
      if (checked) {
        itemLowerCase = item.value.toLowerCase();
  
        this.prendaGenSelected.push(itemLowerCase);
        console.log(this.prendaGenSelected);
      } else {
        this.prendaGenSelected.splice(
          this.prendaGenSelected.indexOf(itemLowerCase),
          1
        );
      }
  
      this.photo.prendasGenerales.forEach((feature) => {
        console.log('Prendas generales existentes: ', feature);
  
        if (this.prendaGenSelected.includes(feature)) {
          this.prendaGenSelected.splice(this.prendaGenSelected.indexOf(feature));
        }
      });
    }
  
    /**
     * Agregar prenda inferior
     */
  
     createPrendaInferior() {
      this.prendaInferiorSelected.forEach((prenda) => {
        console.log('Prenda Inferior: ', prenda);
        let featureLower = prenda.toLowerCase();
        this.blackboxService.addprendaInf(this.imageName, featureLower).subscribe(
          (res: any) => {
            this.prendaInferiorSelected = [];
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
  
    updateCheckFilterInferior(checked, item, className, elemento) {
      let itemLowerCase;
      if (checked) {
        itemLowerCase = item.value.toLowerCase();
  
        this.prendaInferiorSelected.push(itemLowerCase);
        console.log(this.prendaInferiorSelected);
      } else {
        this.prendaInferiorSelected.splice(
          this.prendaInferiorSelected.indexOf(itemLowerCase),
          1
        );
      }
  
      this.photo.prendasInferiores.forEach((feature) => {
        console.log('Prendas generales existentes: ', feature);
  
        if (this.prendaInferiorSelected.includes(feature)) {
          this.prendaInferiorSelected.splice(
            this.prendaInferiorSelected.indexOf(feature)
          );
        }
      });
    }
  
    /**
     * Agregar Colores
     */
  
    backDashboard() {
      this.router.navigate(['/dashboard']);
    }
  
    getMainColors() {
      this.mainColors = this.datos.mainColors;
    }
  
    addColors(imageName, colors: TemplateRef<any>) {
      this.modalRef = this.modalService.show(colors);
  
      this.getMainColors();
  
      return (this.imageName = imageName);
    }
  
    updateColorSelect(checked, item, className, elemento) {
      let colorName;
      if (checked) {
        colorName = item.value.charAt(0).toUpperCase() + item.value.slice(1);
        this.colorSelected.push(colorName);
      } else {
        this.colorSelected.splice(this.colorSelected.indexOf(colorName), 1);
      }
  
      this.photo.principalColors.forEach((color) => {
        if (this.colorSelected.includes(color)) {
          this.colorSelected.splice(this.featureSelected.indexOf(color));
        }
      });
      console.log(this.colorSelected);
    }
  
    createColor() {
      this.colorSelected.forEach((color) => {
        console.log(color);
        this.blackboxService.addColor(this.imageName, color).subscribe(
          (res: any) => {
            console.log(JSON.stringify(res.message, null, 2));
            // this.getPhoto();
            window.location.reload();
  
            this.colorSelected = [];
            // this.photos;
            this.modalRef.hide();
            this.showSuccessAddFeature(res.message);
          },
          (err) => {
            console.log(err);
          }
        );
      });
    }
  
    selectPrincipalColor(checked, item, className, elemento) {
      this.delPrincipalColor = {
        checked,
        clase: className,
        item: item.name,
      };
    }
  
    deleteColor(imageName) {
      let dataColor = {
        imageName: imageName,
        principalColors: this.delPrincipalColor.item,
      };
      console.log(dataColor);
  
      if (confirm('¿Desea borrar la característica seleccionada?'))
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
  