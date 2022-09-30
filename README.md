> Vue3 HTTP Client using RxJS

Table of Contents
=================
* [Fetures](#features)
* [Install](#install)
* [Usage](#usage)
  * [Options API](#options-api)
  * [Composition API](#composition-api)
  * [Interceptors](#interceptors)
  * [Promises](#promises)
* [Docs](#docs)
* [Build](#build)

# Features

- [X] XMLHttpRequests from the browser
- [X] Supports the rxjs API
- [X] Intercept requests and responses globally
- [X] Supports both Options and Composition API
- [X] Full Typescript support
- [X] Can be used as a plugin for Vue


# Install
install using npm
```bash
npm install vee-http
```

# Usage
```js
import createApp from 'vue';
import App from 'vue/App';
import createVHttpClient from 'v-http';

const app = createApp(App)
app.use(createVHttpClient())
```


## Options API
You can access the client via the registered globals
```js
export default createComponent({
    data() {
        names: []
    },
    beforeMount() {
        this.$vHttpClient.get('my.api-server.com/endpoint')
            .subscribe(endpointData => this.name = endpointData)
    }
})
```

## Composition API
```js
const {http} = useVHttpClient();

updateItem(item: {id: string, value: string}) {
    http.put('http://my-item.server./items/' + item.id, item, {
        queryParams: {full: 'true'}
    })
        .pipe(
            map(res => true),
            catchError(e => {
                if (e.status === 404) {
                    console.error(`item ${ id } does not exist!`);
                    return EMPTY;
                }
            }) 
        )
        .subscribe(res => console.log(`item ${ id } updated!`))
}
```

## Interceptors

Interceptors are chained in the order that they are passed to the array. They're useful for global level settings, like authentication headers, caching and logging.
```js
// you can use the interceptor to intercept responses
// by using the rxjs pipe operator
function loggerInterceptor(req, next) {
    const start = performance.now();
    return next(req)
        .pipe(
            tap(_ => console.log(`request executed in ${performance.now() - start}`))
        );
}

// or you can use the interceptors to 
// change the request
function authInterceptor(req, next) {
    const updatedReq = {
        ...req,
        headers: {
            ...req.headers,
            'Authorization': 'Basic [token]'
        }
    };
    
    return next(updatedReq);
}

const interceptors = [
    loggerInterceptor,
    authInterceptor,
]


app.use(createVHttpClient(interceptors))

```

## Promises

All the calls can be converted to promises using the lastValueFrom (or firstValueFrom) operator.

The caveat here is that this has to be the first interceptor in the chain and the types
have to be coerced into Promises.
```js
import lastValueFrom from 'rxjs/operators';

async function loggerInterceptor(req, next): Promise<unknown> {
    const start = performance.now();
    const res = await lastValueFrom(next(req))
    console.log(`request executed in ${performance.now() - start}`)
    return res;
}

```
# Docs

for more details please see the [documentation](https://luka-mo.github.io/vee-http/)

# Build

```bash
npm run build
```

If you wish to test the package locally use 
```bash
npm run build:local
```

## Warning
Library is under active development and may have API breaking changes for subsequent major versions after 1.0.0.
