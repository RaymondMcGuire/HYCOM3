import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    icon?: string;
    hidden?: boolean;
    breadcrumb?: boolean;
    noShowingChildren?: boolean;
    roles?: string[];
  }
}
