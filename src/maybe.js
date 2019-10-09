// of :: (* -> Boolean) -> * -> Maybe a
export const of =
  pred => x => pred(x) ? [x] : []

// map :: (a -> b) -> Maybe a -> Maybe b
export const map =
  fn => m => m.map(fn)

// option :: a -> Maybe a -> a
export const option =
  defaultValue => m => m.length ? m[0] : defaultValue
