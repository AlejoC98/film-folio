import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmdbcallbackComponent } from './tmdbcallback.component';

describe('TmdbcallbackComponent', () => {
  let component: TmdbcallbackComponent;
  let fixture: ComponentFixture<TmdbcallbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TmdbcallbackComponent]
    });
    fixture = TestBed.createComponent(TmdbcallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
