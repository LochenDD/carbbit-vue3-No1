import { onUnmounted, ref, watch } from 'vue'
import { useIntervalFn } from '@vueuse/core'

export default function useCountDonw (num = 60) {
  const time = ref(num)
  const { pause, resume } = useIntervalFn(() => {
    time.value--
  }, 1000, {
    immediate: false
  })

  const start = () => {
    resume()
  }

  watch(time, (oldValue, newValue) => {
    if (newValue === 0) {
      pause()
      time.value = num
    }
  })

  onUnmounted(() => {
    pause()
  })

  return {
    start,
    time,
    timeNum: num
  }
}
