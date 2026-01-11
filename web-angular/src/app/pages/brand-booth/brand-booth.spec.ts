import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandBooth } from './brand-booth';

describe('BrandBooth', () => {
  let component: BrandBooth;
  let fixture: ComponentFixture<BrandBooth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandBooth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandBooth);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
