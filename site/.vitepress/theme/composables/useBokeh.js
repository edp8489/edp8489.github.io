import { onMounted } from 'vue'

export function useBokeh() {
  onMounted(() => {
    // Check if Bokeh is already loaded
    if (window.Bokeh !== undefined) {
      return
    }

    // Load script
    const script = document.createElement('script')
    script.src = 'https://cdn.bokeh.org/bokeh/release/bokeh-3.1.1.min.js'
    script.async = true
    
    document.head.appendChild(script)
  })
}
