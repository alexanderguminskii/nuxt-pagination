import { ref, useRouter, useRoute } from '@nuxtjs/composition-api'

export default function() {
    const pageSize = ref(8)
    const pages = ref(0)
    const allItems = ref([]) as any
    const viewItems = ref([]) as any

    const router = useRouter() as any
    const route = useRoute() as any

    const setupPagination = (arr: any) => {

      for(let i = 0; i < Math.ceil(arr.length / pageSize.value); i++) {
        allItems.value[i] = arr.slice(i * pageSize.value, ((i * pageSize.value) + pageSize.value))
      }

      pages.value = allItems.value.length
    }

    const pageViewChange = (page: any) => {
      router.push(`${route.value.path}?page=${page.value}`)

      viewItems.value = allItems.value[page.value - 1] || allItems.value[0]
    }

    return {
      pageSize,
      pages,
      allItems,
      viewItems,
      setupPagination,
      pageViewChange,
    }
}