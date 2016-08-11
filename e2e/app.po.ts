export class WebMDPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('web-root h1')).getText();
  }
}
