import { WebMDPage } from './app.po';

describe('web-md App', function() {
  let page: WebMDPage;

  beforeEach(() => {
    page = new WebMDPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('web works!');
  });
});
