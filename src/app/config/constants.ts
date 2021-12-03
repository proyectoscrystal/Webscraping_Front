export class AppSettings {
  // Variables Producción
  // public static Captcha: string = '6LecJxkaAAAAAHvRKyd-Q2ynk_YWtjIvyhHt04V8';
  // public static Api: string = 'https://blackboxapp01.azurewebsites.net';
  // public static Model: string ='https://blackboxapp01.azurewebsites.net/sendImgsModel';
  // public static Filter: string = 'https://blackboxapp01.azurewebsites.net/filtroImagen';

  // Variables desarrollo local
  public static Captcha: string = '6LcWmhAaAAAAAANjKl0-wVi86F_MCNqgZ490x7Sc';
  public static Api: string = 'http://localhost:4000';
  // public static Api: string = 'https://app.pm2.io/#/r/4e8p9darqtqt1t6';
  public static Model: string = 'http://localhost:4000/sendImgsModel';
  public static Filter: string = 'http://localhost:4000/filtroImagen';

  // Variable de prueba heroku
    // public static Captcha :string = '6LfSkxAaAAAAAJjbsB9OzDdWDC-5KGdgHjHqsJr_';
    // public static Api: string = 'https://backend-scraping-1.herokuapp.com';
    // public static Model: string = 'https://backend-scraping-1.herokuapp.com/sendImgsModel';
    // public static Filter: string = 'https://backend-scraping-1.herokuapp.com/filtroImagen';
}
