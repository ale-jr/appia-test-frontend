export const getItem = (key) => {
  const item = localStorage.getItem(key)
  try {
    const json = JSON.parse(item)
    return json
  } catch (error) {
    return item
  }
}

export const setItem = (key, item) => {
  const json = JSON.stringify(item)
  localStorage.setItem(key, json)
}
