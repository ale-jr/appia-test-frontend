import * as storage from '@/utils/localStorage'

// High order function for commiting values form localstorage
export default ({
  key, // state key (same for localstorage key)
  mutation, // mutation to be commited
  commitIf // optional high order function to limit unecessary commits, receives the state as as parameter
}) => ({ commit, state }) => {
  const item = storage.getItem(key)
  if ((item && !commitIf) || (item && commitIf && commitIf(state[key]))) { commit(mutation, { [key]: item }) }
}
