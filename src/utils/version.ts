import packageInfo from '../../package.json'

export const getVersion = (): string => {
  return packageInfo.version
}
