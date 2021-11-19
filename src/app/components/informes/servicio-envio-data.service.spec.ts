import { TestBed } from '@angular/core/testing';

import { ServicioEnvioDataService } from './servicio-envio-data.service';

describe('ServicioEnvioDataService', () => {
  let service: ServicioEnvioDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioEnvioDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
