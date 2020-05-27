import { observable, action } from 'mobx';
export class PageStore {
  @observable page = 1
  @action testAction(){
    this.page++
  }

  @action
  actionTest = () => {
    this.fetchTest().then(() => {
      console.log(111)
    })
  }

  @action
  fetchTest = () => {
    return Promise.resolve()
  }
}

export default new PageStore();