import { MyAngularcliPage } from './app.po';

describe('my-angularcli App', () => {
  let page: MyAngularcliPage;

  beforeEach(() => {
    page = new MyAngularcliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
