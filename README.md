> Vue3 HTTP Client using RxJS

## Features

* Can be used as a plugin for Vue
* Supports both Options and Composition API
* Ability to use custom interceptors similar to @angular/http client
* Full Typescript support

## Local Build

Run the following command to build a local .tar.gz file
```bash
npm run build:package
```
import the file into  your project's package.json
```json
"dependencies": {
  ...
  "v-http": "file:[path-to-folder]/v-http-module/[build-file-name].tar.gz"
  ...
}
```
after that run 
```bash
npm install --legacy-peer-deps
```
and you should be ready to go.


## Installation

```ts
import createApp from 'vue';
import App from 'vue/App';
import createVHttpClient from 'v-http';

const app = createApp(App)
app.use(createVHttpClient())
```

## Usage

### Options API
You can access the client via the registered globals
```ts
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

### Composition API
```ts
<script setup lang="ts">
const {put} = useVHttpClient();

deleteItem(item: {id: string, value: string}) {
    put('http://my-item.server./items/' + item.id, item, {
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
</script>
```

### Interceptors

Interceptors are chained in the order that they are passed to the array. They're useful for global level settings, like authentication headers, caching and logging.
```ts

function loggerInterceptor(req, next) {
    const start = performance.now();
    return next(req)
        .pipe(
            tap(_ => console.log(`request executed in ${performance.now() - start}`))
        );
}

function authInterceptor(req, next) {
    req = {
        ...req,
        headers: {
            ...req.headers,
            'Authorization': 'Basic [token]'
        }
    };
    
    return next(req);
}

const interceptors = [
    loggerInterceptor,
    authInterceptor,
]


app.use(createVHttpClient(interceptors))

```