import AV from 'leancloud-storage';
import { getLeanCloudRuntimeConfig } from '@/app/config/runtime';

let initialized = false;

export function initializeLeanCloud(): typeof AV {
  if (initialized) {
    return AV;
  }

  const runtimeConfig = getLeanCloudRuntimeConfig();
  const options: {
    appId: string;
    appKey: string;
    serverURL?: string;
  } = {
    appId: runtimeConfig.appId,
    appKey: runtimeConfig.appKey
  };

  if (runtimeConfig.serverURL) {
    options.serverURL = runtimeConfig.serverURL;
  }

  AV.init(options);
  initialized = true;

  return AV;
}

export function getLeanCloud(): typeof AV {
  return initializeLeanCloud();
}

export async function runLeanCloudFunction<T>(
  name: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  const leanCloud = getLeanCloud();
  return leanCloud.Cloud.run(name, params) as Promise<T>;
}

export async function getCurrentLeanCloudUser(): Promise<InstanceType<typeof AV.User> | null> {
  const leanCloud = getLeanCloud();
  const currentUser = leanCloud.User.current();

  if (!currentUser) {
    return null;
  }

  if (typeof currentUser.isAuthenticated !== 'function') {
    return currentUser;
  }

  try {
    const authenticated = await currentUser.isAuthenticated();
    return authenticated ? currentUser : null;
  } catch {
    return null;
  }
}

export { AV };
