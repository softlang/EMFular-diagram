import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriangleComponent } from './triangle.component';

describe('TriangleComponent', () => {
  let component: TriangleComponent;
  let fixture: ComponentFixture<TriangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriangleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriangleComponent);
    component = fixture.componentInstance;

    component.A= {x: 1, y: 1};
    component.B= {x: 2, y: 1};
    component.C= {x: 1, y: 2};

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
