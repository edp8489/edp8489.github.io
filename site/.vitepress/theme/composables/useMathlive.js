import { onMounted } from 'vue'

export function useMathlive() {
  onMounted(() => {
    // Check if Mathlive is already loaded
    if (window.Mathlive) {
      window.Mathlive.typesetPromise()
      return
    }

    // Load Mathlive script
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/mathlive'
    script.async = true
    
    document.head.appendChild(script)
  })
}