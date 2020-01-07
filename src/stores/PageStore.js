import { observable, action } from 'mobx';
export class PageStore {
  @observable page = 1
  @action testAction(){
    this.page++
  }
}

export default new PageStore();