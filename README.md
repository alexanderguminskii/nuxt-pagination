# nuxt-verify-code

> 📱 Pagination component NuxtJs. Writing on Composition API with TypeScript.

## Live demo

- [Demo](https://alexanderguminskii.github.io/nuxt-pagination/)

## Install dependencies
```bash
npm install
```

## Run project
```bash
npm run dev
```

## Usage

```jsx
<template>
  <div v-if="!$fetchState.pending" class="container">
    <div class="list">
      <div v-for="(item, idx) in viewItems" :key="idx" class="list-item"> {{ item }} </div>   
    </div>

    <Pagination :pages="pages" @pageView="pageViewChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, useFetch } from '@nuxtjs/composition-api'
import pagination from '@/mixins/pagination.mixin'

export default defineComponent({
  setup() {
    const { pages, viewItems, setupPagination, pageViewChange } = pagination()

    useFetch(async () => {
      await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => setupPagination(data))
    })

    return {
      pages,
      viewItems,
      pageViewChange,
    }
  }
})
</script>
```