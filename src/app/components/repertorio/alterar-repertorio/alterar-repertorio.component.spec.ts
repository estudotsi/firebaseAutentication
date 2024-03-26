import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarRepertorioComponent } from './alterar-repertorio.component';

describe('AlterarRepertorioComponent', () => {
  let component: AlterarRepertorioComponent;
  let fixture: ComponentFixture<AlterarRepertorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlterarRepertorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlterarRepertorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
