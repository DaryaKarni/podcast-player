export class Router {
  constructor(){
    this.routes = [];
    window.addEventListener('popstate', () => {
      this.handleRoute(window.location.hash || '#/');
    });
    document.addEventListener('click', (e) => {
      const card = e.target.closest('[data-link]');
      if(card){
        e.preventDefault();
        this.navigate(card.dataset.link);
      }
      //buttonback
      const buttonBack = e.target.closest('[data-back]');
      if(buttonBack){
        e.preventDefault();
        this.goBack();
      }
    });
  }
  goBack(){
    window.history.back();
  }
  addRoute(pathname, handler){
    const paramNames = [];
    const regexStr = pathname.replace(/:(\w+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    const regex = new RegExp(`^${regexStr}$`);
    this.routes.push({regex, paramNames, handler});
  }
  handleRoute(path){
    for(const route of this.routes){
      const match = path.match(route.regex);
      if(match){
        const params = {};
        route.paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        })
        route.handler(params);//{id:'42'}
        return;
      }
    }
    this.routes.find(r => r.regex.test('/404'))?.handler({});
  }
  navigate(path){
    const safePath = path.startsWith('/') ? path : `/${path}`;
    window.history.pushState(null, '', safePath);
    this.handleRoute(path);
  }
  start(){
    this.handleRoute(window.location.hash || '#/');
  }
}