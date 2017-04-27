import { MobileHDDCPage } from './app.po';

describe('mobile-hddc App', function() {
  let page: MobileHDDCPage;

  beforeEach(() => {
    page = new MobileHDDCPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
