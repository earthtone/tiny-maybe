# Tiny Maybe

A tiny, point-free implementation of Maybe utilities. Useful for when you want to avoid explicity `null` checks but don't need a more comprehensive/advanced implementation of an ADT.

---


## Usage

```js
import { compose } from '@earthtone/tiny-compose'
import * as Maybe from '@earthtone/tiny-maybe'
import { isNil } from '@earthtone/tiny-predicates'

const has = prop => obj => obj.hasOwnProperty(prop)
const get = prop => obj => obj[prop]

const safeName = compose(
  Maybe.option('John Smith'),
  Maybe.map(get('name')),
  Maybe.of(has('name'))
)

const name = fetch('http://api.com')
  .then(r => r.json())
  .then(safeName)
```

### Note

This is a faithful fork of [Ian Hoffman-Hick's original code](https://github.com/evilsoft/eggheadio-functional). It's strongly recommended that you use something like [Crocks](https://crocks.dev/) or [Folktale](https://folktale.origamitower.com/) if you want to use ADTs in your production code.
