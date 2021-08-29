<template>
  <ul v-if="pages > 1" class="pagination">
    <li
      class="pagination-item__prev"
      :class="{ disabled: curPage === 1 }"
      @click="prev"
    >
      <a class="pagination-link">
        <span>Назад</span>
      </a>
    </li>

    <template v-if="curPage > amoutLaterals + 1 && pages > visibleItems">
      <li class="pagination-item" @click="curPage = 1" >
        <a class="pagination-link" >1</a>
      </li>
      ...
    </template>

    <template v-for="(page, idx) in pages">
      <li
        v-if="page >= lastLateralPrev && page <= lastLateralNext"
        :key="idx"
        class="pagination-item"
        :class="{ active: page === curPage }"
        @click="clickHandler(idx + 1)"
      >
        <a class="pagination-link" >
          {{ page }}
        </a>
      </li>
    </template>

    <template v-if="curPage < pages - amoutLaterals && pages > visibleItems">
      ...
      <li class="pagination-item" @click="curPage = pages" >
        <a class="pagination-link" >
          {{ pages }}
        </a>
      </li>
    </template>

    <li
      class="pagination-item__next"
      :class="{ disabled: curPage === pages }"
      @click="next"
    >
      <a class="pagination-link" >
        <span>Вперед</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  props: { 
    pages: {
      type: Number,
      default: 0
    }
  },

  setup(props, { emit }) {
    const route = useRoute()

    const curPage = ref(+route.value.query.page || 1)
    const visibleItems = ref(8)
    const amoutLaterals = ref(3)

    watchEffect(() => emit('pageView', curPage));

    const clickHandler = (index: number) => {
      curPage.value = index
    }

    const next = () => {
      curPage.value++
    }

    const prev = () => {
      curPage.value--
    }

    const lastLateralPrev = computed(() => {
      if(props.pages < curPage.value + 4) {
        return props.pages - (visibleItems.value - 1)
      } else {
        return curPage.value - amoutLaterals.value
      }
    })

    const lastLateralNext = computed(() => {
      if(curPage.value < 6) {
        return visibleItems.value
      } else {
        return curPage.value + amoutLaterals.value
      }
    })

    return {
      curPage,
      clickHandler,
      next,
      prev,

      visibleItems,
      amoutLaterals,
      lastLateralPrev,
      lastLateralNext,
    }
  },
})
</script>

<style lang="scss" scoped>
.pagination {
  margin: 0 auto;
  margin-top: 44px;
  padding-left: 0;
  width: max-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: 700;
    margin-right: 9px;
    color: rgb(110, 110, 110);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: 0.5s all;
    list-style-type: none;
    margin: 0 5px;
    border: 1px solid rgb(110, 110, 110);
    &__prev {
      font-size: 12px;
      font-weight: 700;
      list-style-type: none;
      margin-right: 20px;
      text-transform: uppercase;
      a {
        color: rgb(110, 110, 110);
      }
      svg {
        margin-right: 10px;
        fill: rgb(110, 110, 110);
        width: 12px;
        height: 12px;
        transform: scale(-1, 1);
      }
    }
    &__next {
      font-size: 12px;
      font-weight: 700;
      list-style-type: none;
      margin-left: 20px;
      text-transform: uppercase;
      a {
        color: rgb(110, 110, 110);
      }
      svg {
        margin-left: 10px;
        fill: rgb(110, 110, 110);
        width: 12px;
        height: 12px;
      }
    }
    &:hover {
      background-color: rgb(110, 110, 110);
      a {
        color: white;
      }
    }
  }
  &-link {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    transition: 0.5s all;
    color: rgb(110, 110, 110);
  }
  .active {
    background-color: rgb(110, 110, 110);
    a {
      color: white;
    }
  }
  .disabled {
    pointer-events: none;
  }
}
</style>