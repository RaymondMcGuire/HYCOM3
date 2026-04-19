import { defineComponent } from 'vue'
import { DeviceType, SidebarState } from '@/store/modules/app'
import { useLayoutState } from '@/app/state'

const WIDTH = 768

const layoutState = useLayoutState()

export default defineComponent({
  computed: {
    device(): DeviceType {
      return layoutState.device
    },
    sidebar(): SidebarState {
      return layoutState.sidebar
    }
  },
  watch: {
    $route() {
      if (this.device === DeviceType.Mobile && this.sidebar.opened) {
        void layoutState.closeSideBar(false)
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      void layoutState.toggleDevice(DeviceType.Mobile)
      void layoutState.closeSideBar(true)
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
    isMobile(): boolean {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        void layoutState.toggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
        if (isMobile) {
          void layoutState.closeSideBar(true)
        }
      }
    }
  }
})
