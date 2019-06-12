let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: key => savedItems[key],
  clear: (savedItems = {})
}

window.localStorage = localStorageMock
