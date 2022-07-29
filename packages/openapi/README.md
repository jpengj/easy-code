## @easy-code/openapi
`@easy-code/openapi`是一款用来将openapi文档生成轻量级、易读易使用的函数的工具。不依赖于任何第三方网络请求库。

Generated code styles:
```js
interface Pets { /* Some properties. */}
export const getPetsByType = (type: string) => {
  return Request.instance.get<Pets[]>('/pets/' + type)
}

interface GetPetsQuery { type: string }
export const getPets = (query: IGetPetsQuery) => {
  return Request.instance.get<Pets[]>('/pets' + type, { query })
}
```

## Installation
```sh
pnpm install @easy-code/openapi -D
# or
yarn add @easy-code/openapi -D
# or
npm install @easy-code/openapi -D
```

## Usage
```js
// Step 1.
// In your build scripts.
import { createOpenApi } from '@easy-code/openapi'
import path from 'path'

// Should development only.
if (process.env.NODE_ENV === 'development') {
  createOpenApi({
    document: 'http://baidu.com/openapi.json',
    dir: path.resolve(__dirname, '/src/http'),
    includesTags: ['pet-store'],
    excludesTags: ['pet-store'],
    includesPaths: ['/pets'],
    excludesPaths: ['/pets'],
    rewriteApiNames: {
      '/pets': 'getPets',
      '/pets'(path, methods, operation) {
          return `getPetsByPetType`
        }
    },
  })
}

// Step 2.
// In your application setup file.
import { Request } from '@easy-code/openapi'
Request.handleRequest((url, method, options = {}) => {
  // With axios or other network request library.
  return axios(url, { method, ...options})
})

// Step 3.
// Run your npm dev script.

// Step 4.
// In your source code.
import { getPetsByType } from '@/http/apis'
getPetsByType('dog').then(res => {
  console.log(res)
})
```