import { EventEmitter, Injectable, Output } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioEnvioDataService {
  @Output() disparador: EventEmitter<any> = new EventEmitter(); 

  mensaje: string;
  private enviarMensajeSubject = new ReplaySubject<string>(1);
  enviarObservable = this.enviarMensajeSubject.asObservable();
  constructor() { }

  enviarMensaje(mensaje: string) {
    this.mensaje = mensaje;
    this.enviarMensajeSubject.next(mensaje);
  }
}
