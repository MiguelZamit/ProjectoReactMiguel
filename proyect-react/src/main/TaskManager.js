import Store from 'electron-store'

export default class TaskManager extends Store {
    constructor(options) {
        super(options)
        this.list = this.get('item-list') || []
    }
    saveList() {
        this.set('item-list', this.list)
        return this.list
    }
    getList() {
        this.list = this.get('item-list') || []
        return this.list
    }
    getItem(itemId) {
        return this.list.find((i) => i.id == itemId)
    }
    addItem(item) {
        this.list = [...this.list, item]
        return this.saveList()
    }
    deleteItem(item) {
        this.list = this.list.filter((i) => i.id !== item.id)
        return this.saveList()
    }
    updateItem(item) {
        this.list = this.list.map((i) => (i.id === item.id ? item : i))
        return this.saveList()
    }
    
}