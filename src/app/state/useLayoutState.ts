import store from '@/store'
import { DeviceType, SidebarState, useAppStore } from '@/store/modules/app'

function getAppStore() {
  return useAppStore(store)
}

const layoutState = {
  get device(): DeviceType {
    return getAppStore().device
  },
  get sidebar(): SidebarState {
    return getAppStore().sidebar
  },
  toggleSideBar(withoutAnimation: boolean): Promise<void> {
    getAppStore().toggleSideBar(withoutAnimation)
    return Promise.resolve()
  },
  closeSideBar(withoutAnimation: boolean): Promise<void> {
    getAppStore().closeSideBar(withoutAnimation)
    return Promise.resolve()
  },
  toggleDevice(device: DeviceType): Promise<void> {
    getAppStore().toggleDevice(device)
    return Promise.resolve()
  }
}

export function useLayoutState() {
  return layoutState
}
