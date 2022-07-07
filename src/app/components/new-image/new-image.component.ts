import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { BlackboxService } from '../../services/blackbox.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm, NgModel } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Data } from '../../models/data';
import { Datos } from '../../utils/index';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import imageCompression from 'browser-image-compression';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css'],
})
export class NewImageComponent implements OnInit {
  @ViewChild('imageName')
  myFileInput: ElementRef;

  /**
   * !Comprimir imágenes
   */

  currentWebWorker: boolean;
  maxSizeMB: number = 1;
  maxWidthOrHeight: number = 1024;
  webWorkerLog: string = '';
  mainThreadLog: string = '';
  webWorkerProgress: string = '';
  mainThreadProgress: string = '';
  webWorkerDownloadLink: SafeUrl;
  mainThreadDownloadLink: SafeUrl;
  preview: SafeUrl = '';

  /**
   * !Comprimir imágenes
   */

  mostrar = false;
  files;
  fileName = [];
  data: any;
  photoSelected: ArrayBuffer | string;
  payload: any[] = [];
  filesBase64 = [];
  selectedFile = null;
  datoYear: any;
  datoOrigin: any;
  datoGender:any;
  datoUse:any;
  datoQuarters:any;
  newImg;
  message: string;
  datos: any;
  years: any;
  quarters: any;
  genders: any;
  uses: any;
  origins: any;
  imagen;
  outputFile;
  allFiles = [];
  allImgs = [];
  username;
  nameToken;

  file: File;

  constructor(
    private router: Router,
    private blackboxService: BlackboxService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    this.datos = new Datos();
  }

  ngOnInit(): void {
    var datosImagen= localStorage.getItem('informacionImagen');
    console.log(datosImagen)
    this.years = this.getYear();
    this.quarters = this.getQuarter();
    this.genders = this.getGender();
    this.uses = this.getUse();
    this.origins = this.getOrigin();
    this.mostrar = false;
    this.inputFile();
    this.username = localStorage.getItem('user');
    if(datosImagen)
    {
      var informacionImagen = JSON.parse(localStorage.getItem('informacionImagen'));
      this.datoYear = informacionImagen.year;
      this.datoOrigin = informacionImagen.origin;
      this.datoUse = informacionImagen.use;
      if(informacionImagen.gender && informacionImagen.quarter)
      {
        this.datoQuarters = informacionImagen.quarter;
        this.datoGender = informacionImagen.gender;
      }
      else if(informacionImagen.gender && !informacionImagen.quarter)
      {
        this.datoQuarters = "";
        this.datoGender = informacionImagen.gender;
      }
      else if( informacionImagen.quarter && !informacionImagen.gender)
      {
        this.datoQuarters = informacionImagen.quarter;
        this.datoGender = "";
      }
      else{
        this.datoQuarters = "";
        this.datoGender = "";
      }
    }
    else{
      this.datoYear = "";
      this.datoOrigin = "";
      this.datoUse = "";
      this.datoQuarters = "";
      this.datoGender = "";
    }
    console.log(this.username);
  }

  /**
   * ?Comprimir imágenes
   */

  async compressImg(img, useWebWorker) {
    this.currentWebWorker = useWebWorker;
    this.preview = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(img)
    );

    this.updateLog(
      false,
      'Source image size:' +
        (this.selectedFile.size / 1024 / 1024).toFixed(2) +
        'mb'
    );

    console.log('Comprimiendo imagen');

    var options = {
      maxSizeMB: this.maxSizeMB,
      maxWidthOrHeight: this.maxWidthOrHeight,
      useWebWorker: this.currentWebWorker,
      onProgress: (p) => {
        if (this.currentWebWorker) {
          this.webWorkerProgress = '(' + p + '%' + ')';
        } else {
          this.mainThreadProgress = '(' + p + '%' + ')';
        }
      },
    };
    this.outputFile = await imageCompression(this.selectedFile, options);
    this.updateLog(
      true,
      ', this.outputFile size:' +
        (this.outputFile.size / 1024 / 1024).toFixed(2) +
        'mb'
    );
    this.allFiles.push(this.outputFile);

    console.log(this.outputFile);
  }

  async onPhotoSelected(event, useWebWorker: boolean) {
    this.files = event.target.files;

    this.filesBase64.length = 0;

    let arrayFiles = [];
    for (let i of this.files) {
      arrayFiles.push(i);
    }

    var newArrayFiles = arrayFiles.slice(0, 300);

    for (let i = 0; i < newArrayFiles.length; i++) {
      this.selectedFile = newArrayFiles[i];


      await this.compressImg(this.selectedFile, useWebWorker);

      while (this.outputFile.size > 202000) {
        console.log('Comprimiendo nuevamente');
        this.preview = this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(this.outputFile)
        );

        this.updateLog(
          false,
          'Source image size:' +
            (this.outputFile.size / 1024 / 1024).toFixed(2) +
            'mb'
        );

        var options = {
          maxSizeMB: this.maxSizeMB,
          maxWidthOrHeight: this.maxWidthOrHeight,
          useWebWorker: this.currentWebWorker,
          onProgress: (p) => {
            if (this.currentWebWorker) {
              this.webWorkerProgress = '(' + p + '%' + ')';
            } else {
              this.mainThreadProgress = '(' + p + '%' + ')';
            }
          },
        };

        this.outputFile = await imageCompression(this.outputFile, options);

        console.log("IMG COMPRIMIDA 2", this.outputFile);

        this.updateLog(
          true,
          ', this.outputFile size:' +
            (this.outputFile.size / 1024 / 1024).toFixed(2) +
            'mb'
        );
        this.allFiles.push(this.outputFile);
      }

      if (this.outputFile.type.match(/image\/*/) !== null) {
        this.fileName.push(this.outputFile.name);

        const reader = new FileReader();
        reader.readAsDataURL(this.outputFile);
        reader.onload = async (e) => {
          this.filesBase64.push(await reader.result);
        };
      }
    }
  }

  updateLog(isAppend = false, log: string) {
    if (this.currentWebWorker) {
      this.webWorkerLog = (isAppend ? this.webWorkerLog : '') + log;
    } else {
      this.mainThreadLog = (isAppend ? this.mainThreadLog : '') + log;
    }
  }

  random() {
    return Math.random().toString(36).substr(2);
  }

  token() {
    return this.random() + this.random(); // Para hacer el token más largo
  }

  async uploadPhoto(form: NgForm) {
    var n;
    var d;
    this.mostrar = true;
    let data = form.value;
    
    try {      
      if(data.use === "producto")
      {
        if(data.gender == "" &&  data.quarter == "")
        {
          var mensaje = "Por favor diligenciar el campo género y colección.";
          throw new SyntaxError(mensaje);
        }
        else if(data.gender == "")
        {
          var mensaje = "Por favor diligenciar el campo género.";
          throw new SyntaxError(mensaje);
        }
        else if(data.quarter == "")
        {
          var mensaje = "Por favor diligenciar el campo colección.";
          throw new SyntaxError(mensaje);
        }
      }

      for (let i = 0; i < this.filesBase64.length; i++) {
        this.newImg = this.filesBase64[i].replace(/^data:image\/\w+;base64,/, '');

        if (this.fileName[i].indexOf('.jpeg') !== -1) {
          let extensionSlice = this.fileName[i].substring(
            0,
            this.fileName[i].length - 5
          );
          this.fileName[i] = extensionSlice;

          let quitSpaces = this.fileName[i].replace(/ /g, '');
          this.fileName[i] = quitSpaces;

          d = new Date();
          n = d.getTime();

          let newChar = this.fileName[i] + n;
          this.fileName[i] = newChar;

          let convertToString = n.toString();
          n = convertToString;

          this.nameToken = this.token();
          // console.log(this.nameToken);

          // console.log(this.fileName[i]);
        } else if (
          this.fileName[i].indexOf('.jpg') !== -1 ||
          this.fileName[i].indexOf('.png') ||
          this.fileName[i].indexOf('.gif')
        ) {
          let extensionSlice = this.fileName[i].substring(
            0,
            this.fileName[i].length - 4
          );
          this.fileName[i] = extensionSlice;

          let quitSpaces = this.fileName[i].replace(/ /g, '');
          this.fileName[i] = quitSpaces;

          d = new Date();
          n = d.getTime();

          let convertToString = n.toString();
          n = convertToString;

          this.nameToken = this.token();
          console.log(this.nameToken);

          console.log(this.fileName[i]);
        }

        this.payload.push({
          imageName: this.nameToken,
          year: data.year,
          quarter: data.quarter,
          use: data.use,
          gender: data.gender,
          origin: data.origin,
          base64: this.newImg,
          user: this.username,
          action: 'prendas',
        });
      }

      if (this.payload.length > 1) {
        let contador = 0;
        for (let i of this.payload) {
          await this.blackboxService.uploadPhoto(i).subscribe(
            async (res) => {
              this.showSuccess();
              // console.log('multiple', res);

              contador += 1;
              // console.log(contador);

              if (contador >= this.payload.length) {
                setTimeout(() => {
                  // this.router.navigate(['/newImage']).then(() => {
                  window.location.reload();
                  // });
                }, 3000);
              }
            },
            (err) => {
              this.showError();
              console.log(err);

              setTimeout(() => {
                // this.router.navigate(['/newImage']).then(() => {
                window.location.reload();
                // });
              }, 3000);
            }
          );
        }
      } else {
        let imgs = this.payload[0];
        console.log('UNA: ', imgs);
        this.blackboxService.uploadPhoto(imgs).subscribe(
          (res) => {
            this.showSuccess();
            // console.log(res);

            setTimeout(() => {
              // this.router.navigate(['/newImage']).then(() => {
              window.location.reload();
              // });
            }, 3000);
          },
          (err) => {
            console.log(err);
            this.showError();

            setTimeout(() => {
              // this.router.navigate(['/newImage']).then(() => {
              window.location.reload();
              // });
            }, 3000);
          }
        );
      }

      localStorage.setItem('informacionImagen', JSON.stringify(data));

      return false;
    } catch (error) {
      this.showErrorValidarError(error.message);
      this.mostrar = false;
      return false;
    }
  }

  /**
   * Función para el input file
   */
  inputFile() {
    $(document).ready(function () {
      $('input[type="file"]').on('change', function () {
        let filenames = [];
        let files = (<HTMLInputElement>document.getElementById('customFile'))
          .files;
        if (files.length > 1) {
          filenames.push('Total Files (' + files.length + ')');
        } else {
          for (let i in files) {
            if (files.hasOwnProperty(i)) {
              filenames.push(files[i].name);
            }
          }
        }
        $(this).next('.custom-file-label').html(filenames.join(','));
      });
    });
  }

  // obtener datos para mostrar en el formulario
  getYear() {
    return this.datos.years;
  }

  getQuarter() {
    return this.datos.coleccionOptions;
  }

  getGender() {
    return this.datos.generoOptions;
  }

  getUse() {
    return this.datos.usoOptions;
  }

  getOrigin() {
    return this.datos.fuenteOptions;
  }

  //Limpiar Campos 
  limpiarCampos()
  {
    localStorage.removeItem('informacionImagen');
    window.location.reload();
  }
  // Notificaciones
  showSuccess() {
    this.toastr.success('', 'imagen cargada!', {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }

  showError() {
    this.toastr.error('', 'Error al subir la imagen', {
      timeOut: 3000,
      closeButton: true,
      progressBar: true,
    });
  }

  showErrorValidarError(mensaje)
  {
    this.toastr.error('', mensaje, {
      timeOut: 5000,
      closeButton: true,
      progressBar: true,
    });
  }
}
