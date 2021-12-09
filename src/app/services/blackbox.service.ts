import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../config/constants';
import { Data } from '../models/data';

@Injectable({
  providedIn: 'root',
})
export class BlackboxService {
  selectedData: Data;
  data: Data[];

  url: string = AppSettings.Api;
  modelo: string = AppSettings.Model;
  filter: string = AppSettings.Filter;

  constructor(private http: HttpClient) {
    this.selectedData = new Data();
  }

  getPhotos() {
    return this.http.get(this.url + '/getImages');
  }

  getScraping() {
    return this.http.get(this.url + '/webScraping');
  }

  getPhoto(data) {
    return this.http.get(this.url + '/getImage/' + data);
  }

  // peticion para cards vista informes generales
  getInfoCards(params: any) {
    return this.http.get(this.url + '/m_infoCards/' ,{ params } );
  }

  getPrendasInfoCards(params: any) {
    return this.http.get(this.url + '/m_prendasInfo/' ,{ params } );
  }

  // peticiones para las tablas 
  getTablePriceInfo(params: any) {
    return this.http.get(this.url + '/m_tablePriceInfo/' ,{ params } );
  }

  getTableDiscountInfo(params: any) {
    return this.http.get(this.url + '/m_tableDiscountInfo/' ,{ params } );
  }

  getTableDiscountinuedInfo(params: any) {
    return this.http.get(this.url + '/m_tableDiscountinuedInfo/' ,{ params } );
  }

  getTableSKUInfo(params: any) {
    return this.http.get(this.url + '/m_tableSKUInfo/' ,{ params } );
  }

  getTableNewsInfo(params: any) {
    return this.http.get(this.url + '/m_tableNewsInfo/' ,{ params } );
  }

  // peticiones para los charts
  getInfoPrice(params: any) {
    return this.http.get(this.url + '/m_averagePrice/' ,{ params } );
  }

  getInfoDiscount(params: any) {
    return this.http.get(this.url + '/m_averageDiscount/' ,{ params } );
  }

  // peticiones para los cards por semana
  getInfoCardWeek(params: any) {
    return this.http.get(this.url + '/m_infoCardsWeek/' ,{ params } );
  }
  

// peticiones para el chart por semana
  getInfoPriceWeek(params: any) {
    return this.http.get(this.url + '/m_averagePriceWeek/' ,{ params } );
  }
  
  getInfoDiscountWeek(params: any) {
    return this.http.get(this.url + '/m_averageDiscountWeek/' ,{ params } );
  }

  getInfoNewWeek(params: any) {
    return this.http.get(this.url + '/m_averageNewWeek/' ,{ params } );
  }

  getInfoSKUWeek(params: any) {
    return this.http.get(this.url + '/m_averageSKUWeek/' ,{ params } );
  }

  getInfoDiscontinuedWeek(params: any) {
    return this.http.get(this.url + '/m_averageDiscontinuedWeek/' ,{ params } );
  }

  getInfoDiscountinued(params: any) {
    return this.http.get(this.url + '/m_averageDiscountinued/' ,{ params } );
  }

  getInfoNews(params: any) {
    return this.http.get(this.url + '/m_averageNews/' ,{ params } );
  }

  getInfoSKU(params: any) {
    return this.http.get(this.url + '/m_averageSKU/' ,{ params } );
  }

  // peticiones para las vistas de colores
  getInfoCategoryColors(params: any) {
    return this.http.get(this.url + '/m_infoCategoryColors/' ,{ params } );
  }

  getInfoMujerCategoryColors(params: any) {
    return this.http.get(this.url + '/m_infoCategoryMujerColors/' ,{ params } );
  }

  getInfoHombreCategoryColors(params: any) {
    return this.http.get(this.url + '/m_infoCategoryHombreColors/' ,{ params } );
  }

  getInfoKidsCategoryColors(params: any) {
    return this.http.get(this.url + '/m_infoCategoryKidsColors/' ,{ params } );
  }

  // peticiones para los barcharts en vista colores
  getInfoGeneralColors(params: any) {
    return this.http.get(this.url + '/m_infoGeneralColors/' ,{ params } );
  }

  // peticiones para los barcharts en vista colores
  getInfoGeneralColorsMateriales(params: any) {
    return this.http.get(this.url + '/m_infoGeneralColorsMateriales/' ,{ params } );
  }



  uploadPhoto(data: any) {

    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(this.modelo, data, requestOptions);
  }

  /**
   * 
   * upload images
   *  
   */

  uploadTestPhoto(data: any, photo: File) {
    
    const fd = new FormData();
    fd.append('data', JSON.stringify(data))
    fd.append('image', photo)

    return this.http.post(this.url + '/testImage', fd)

  }

  /**
   * 
   * upload images
   *  
   */

  deleteImage(data: any) {
    const imageName = { name: data };
    return this.http.post(this.url + '/deleteImage', imageName);
  }

  deletePrendaGeneral(imageName: string, feature: string) {
    const data = { name: imageName, feature: feature };
    return this.http.post(this.url + '/deletePrendaGen', data);
  }

  deleteFeature(imageName: string, feature: string) {
    const data = { name: imageName, feature: feature };
    return this.http.post(this.url + '/deleteFeature', data);
  }

  deleteInferior(imageName: string, prenda: string) {
    const data = { name: imageName, prenda: prenda };
    return this.http.post(this.url + '/deleteInferior', data);
  }

  addFeature(imageName: string, feature: string) {
    const data = { imageName, feature };
    return this.http.post(this.url + '/updateFeature', data);
  }

  addprendaGen(imageName: string, feature: string) {
    const data = { imageName, feature };
    return this.http.post(this.url + '/updatePrendaGen', data);
  }

  updateInfo(data) {
    return this.http.post(this.url + '/updateInfo', data);
  }

  addprendaInf(imageName: string, prenda: string) {
    const data = { imageName, prenda };

    console.log(data);
    return this.http.post(this.url + '/updatePrendaInf', data);
  }

  addColor(imageName: string, principalColors: string) {
    const data = { imageName, principalColors };
    return this.http.post(this.url + '/updateColor', data);
  }

  delColor(data: any) {
    return this.http.post(this.url + '/deleteColor', data);
  }

  delPrendaColor(prenda, imageName) {
    const data = { imageName, prenda }
    return this.http.post(this.url + '/deletePrendaColor', data)
  }

  filterImages(params) {
    return this.http.get(this.url + '/getImagesFilter', { params });
  }

  filterImageByPhoto(params) {
    return this.http.post(this.filter, params);
  }

  sendFilter() {
    return this.http.get(this.url + '/sendFilter');
  }

  filterimagesBytext(params) {
    const data = { text: params };
    return this.http.post(this.url + '/filterText', data);
  }
}
