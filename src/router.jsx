import { useSyncExternalStore } from 'react'

const subscribe = (cb) => {
  window.addEventListener('hashchange', cb)
  return () => window.removeEventListener('hashchange', cb)
}
const getSnapshot = () => window.location.hash.replace(/^#/, '') || '/'

// eslint-disable-next-line react-refresh/only-export-components
export const usePath = () => useSyncExternalStore(subscribe, getSnapshot)

// eslint-disable-next-line react-refresh/only-export-components
export const navigate = (to) => {
  window.location.hash = to
}

export function Link({ to, ...props }) {
  return <a href={`#${to}`} {...props} />
}
