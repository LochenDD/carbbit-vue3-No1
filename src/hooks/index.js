import { ref, onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export const useWindowScrollTop = () => {
  const scrollTop = ref(0)
  const scrollEvent = () => {
    scrollTop.value = document.documentElement.scrollTop
  }
  onMounted(() => {
    window.addEventListener('scroll', scrollEvent)
  })
  onUnmounted(() => {
    window.removeEventListener('scroll', scrollEvent)
  })
  return {
    scrollTop
  }
}

export const useLazyData = (apiFn) => {
  const list = ref([])
  const target = ref(null)
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      stop()
      apiFn().then(({ result }) => {
        list.value = result
      })
    }
  },
  {
    threshold: 0
  })

  return { target, list }
}
