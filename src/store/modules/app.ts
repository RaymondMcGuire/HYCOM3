import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface SidebarState {
  opened: boolean;
  withoutAnimation: boolean;
}

export interface IAppState {
  device: DeviceType;
  sidebar: SidebarState;
}

export const createAppState = (): IAppState => {
  const sidebarStatus = Cookies.get('sidebarStatus')

  return {
    device: DeviceType.Desktop,
    sidebar: {
      opened: sidebarStatus ? sidebarStatus !== 'closed' : true,
      withoutAnimation: false
    }
  }
}

export const useAppStore = defineStore('app', {
  state: createAppState,
  actions: {
    toggleSideBar(withoutAnimation: boolean) {
      if (this.sidebar.opened) {
        Cookies.set('sidebarStatus', 'closed')
      } else {
        Cookies.set('sidebarStatus', 'opened')
      }

      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = withoutAnimation
    },
    closeSideBar(withoutAnimation: boolean) {
      Cookies.set('sidebarStatus', 'closed')
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device: DeviceType) {
      this.device = device
    }
  }
})

export default useAppStore
