import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothCard } from './booth-card';

describe('BoothCard', () => {
  let component: BoothCard;
  let fixture: ComponentFixture<BoothCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoothCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoothCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
