import { TestBed } from '@angular/core/testing';
import { IsoComponent } from './iso.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [IsoComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(IsoComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ngx-iso-app'`, () => {
    const fixture = TestBed.createComponent(IsoComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ngx-iso-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(IsoComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('ngx-iso-app app is running!');
  });
});
