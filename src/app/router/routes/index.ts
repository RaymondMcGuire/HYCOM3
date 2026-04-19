import type { RouteRecordRaw } from 'vue-router'
import { coreRoutes, fallbackRoute } from './core'
import { section1Routes } from './section1'
import { section2Routes } from './section2'
import { section3Routes } from './section3'
import { section4Routes } from './section4'
import { section5Routes } from './section5'
import { section6Routes } from './section6'
import { section7Routes } from './section7'
import { section8Routes } from './section8'

export const routes: RouteRecordRaw[] = [
  ...coreRoutes,
  ...section1Routes,
  ...section2Routes,
  ...section3Routes,
  ...section4Routes,
  ...section5Routes,
  ...section6Routes,
  ...section7Routes,
  ...section8Routes,
  fallbackRoute
]
