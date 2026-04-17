import AV from 'leancloud-storage';
import { runtimeConfig } from '@/app/config/runtime';

let initialized = false;

export function initializeLeanCloud(): typeof AV {
  if (initialized) {
    return AV;
  }

  const options: {
    appId: string;
    appKey: string;
    serverURLs?: string;
  } = {
    appId: runtimeConfig.leancloud.appId,
    appKey: runtimeConfig.leancloud.appKey
  };

  if (runtimeConfig.leancloud.serverURL) {
    options.serverURLs = runtimeConfig.leancloud.serverURL;
  }

  AV.init(options);
  initialized = true;

  return AV;
}

export function getLeanCloud(): typeof AV {
  return initializeLeanCloud();
}

export { AV };
