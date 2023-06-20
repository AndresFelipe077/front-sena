import { TestBed } from '@angular/core/testing';

import { GrupoJornadaService } from './asignacion-jornada-grupo.service';

describe('GrupoJornadaService', () => {
  let service: GrupoJornadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoJornadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
