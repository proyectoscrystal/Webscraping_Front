import { EventEmitter, Injectable, Output } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioPagination {
  @Output() disparador: EventEmitter<any> = new EventEmitter(); 

  mensaje: any;
  private enviarMensajeSubject = new ReplaySubject<string>(1);
  enviarObservable = this.enviarMensajeSubject.asObservable();
  constructor() { }

  enviarMensaje(mensaje: any) {
    this.mensaje = mensaje;
    this.enviarMensajeSubject.next(mensaje);
  }
}
