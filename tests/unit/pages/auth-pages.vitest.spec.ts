import { beforeEach, describe, expect, it, vi } from 'vitest'

const { login, register, success, warning, error } = vi.hoisted(() => ({
  login: vi.fn(),
  register: vi.fn(),
  success: vi.fn(),
  warning: vi.fn(),
  error: vi.fn()
}))

vi.mock('@/services/authService', () => ({
  authService: {
    login,
    register
  }
}))

vi.mock('@/shared/ui/uiFeedback', () => ({
  uiFeedback: {
    success,
    warning,
    error
  }
}))

import { ServiceError } from '@/services/errors'
import LoginPage from '@/views/login/index.vue'
import RegisterPage from '@/views/register/index.vue'

type LoginPageDefinition = {
  data: () => {
    loginForm: {
      username: string;
      password: string;
    };
    loading: boolean;
    redirect?: string;
    version: string;
  };
  methods: {
    handleLogin(this: Record<string, unknown>): Promise<void>;
  };
}

type RegisterPageDefinition = {
  data: () => {
    registerForm: {
      username: string;
      password: string;
      confirm_password: string;
      work: string;
      level: string;
    };
    loading: boolean;
    redirect?: string;
    pwdType: string;
  };
  methods: {
    handleRegister(this: Record<string, unknown>): Promise<void>;
  };
}

function createLoginVm(overrides: Record<string, unknown> = {}) {
  const component = LoginPage as unknown as LoginPageDefinition

  return {
    ...component.data(),
    $refs: {},
    $router: {
      push: vi.fn()
    },
    ...overrides
  }
}

function createRegisterVm(overrides: Record<string, unknown> = {}) {
  const component = RegisterPage as unknown as RegisterPageDefinition

  return {
    ...component.data(),
    $refs: {},
    $router: {
      push: vi.fn()
    },
    ...overrides
  }
}

describe('auth pages feedback', () => {
  beforeEach(() => {
    login.mockReset()
    register.mockReset()
    success.mockReset()
    warning.mockReset()
    error.mockReset()
  })

  it('shows a warning and keeps login loading false when validation fails', async () => {
    const component = LoginPage as unknown as LoginPageDefinition
    const validate = vi.fn().mockRejectedValue(new Error('invalid'))
    const vm = createLoginVm({
      $refs: {
        loginForm: {
          validate
        }
      }
    })

    await component.methods.handleLogin.call(vm)

    expect(validate).toHaveBeenCalled()
    expect(login).not.toHaveBeenCalled()
    expect(warning).toHaveBeenCalledWith('请先输入有效的用户名和密码。')
    expect(vm.loading).toBe(false)
  })

  it('shows success feedback and redirects after login succeeds', async () => {
    const component = LoginPage as unknown as LoginPageDefinition
    const push = vi.fn()
    const vm = createLoginVm({
      redirect: '/dashboard',
      $router: {
        push
      },
      $refs: {
        loginForm: {
          validate: vi.fn().mockResolvedValue(true)
        }
      }
    })

    login.mockResolvedValue({
      username: 'alice',
      role: 'developer'
    })

    await component.methods.handleLogin.call(vm)

    expect(login).toHaveBeenCalledWith(vm.loginForm)
    expect(success).toHaveBeenCalledWith('登录成功，正在进入系统。')
    expect(push).toHaveBeenCalledWith({ path: '/dashboard' })
    expect(vm.loading).toBe(false)
  })

  it('shows service login errors from authService', async () => {
    const component = LoginPage as unknown as LoginPageDefinition
    const vm = createLoginVm({
      $refs: {
        loginForm: {
          validate: vi.fn().mockResolvedValue(true)
        }
      }
    })

    login.mockRejectedValue(new ServiceError('账号不匹配', 'AUTH_LOGIN_FAILED'))

    await component.methods.handleLogin.call(vm)

    expect(error).toHaveBeenCalledWith('账号不匹配')
    expect(vm.loading).toBe(false)
  })

  it('shows a fallback login error for unknown failures', async () => {
    const component = LoginPage as unknown as LoginPageDefinition
    const vm = createLoginVm({
      $refs: {
        loginForm: {
          validate: vi.fn().mockResolvedValue(true)
        }
      }
    })

    login.mockRejectedValue(new Error('boom'))

    await component.methods.handleLogin.call(vm)

    expect(error).toHaveBeenCalledWith('登录失败，请稍后重试。')
    expect(vm.loading).toBe(false)
  })

  it('shows a warning and keeps register loading false when validation fails', async () => {
    const component = RegisterPage as unknown as RegisterPageDefinition
    const validate = vi.fn().mockRejectedValue(new Error('invalid'))
    const vm = createRegisterVm({
      $refs: {
        registerForm: {
          validate
        }
      }
    })

    await component.methods.handleRegister.call(vm)

    expect(validate).toHaveBeenCalled()
    expect(register).not.toHaveBeenCalled()
    expect(warning).toHaveBeenCalledWith('请先完善注册信息并修正表单错误。')
    expect(vm.loading).toBe(false)
  })

  it('shows success feedback and clears the register form after success', async () => {
    const component = RegisterPage as unknown as RegisterPageDefinition
    const vm = createRegisterVm({
      $refs: {
        registerForm: {
          validate: vi.fn().mockResolvedValue(true)
        }
      }
    })

    vm.registerForm.username = 'alice1'
    vm.registerForm.password = 'secret1'
    vm.registerForm.confirm_password = 'secret1'
    vm.registerForm.work = 'engineer'
    vm.registerForm.level = 'senior'

    register.mockResolvedValue(undefined)

    await component.methods.handleRegister.call(vm)

    expect(register).toHaveBeenCalledWith({
      username: 'alice1',
      password: 'secret1',
      work: 'engineer',
      level: 'senior'
    })
    expect(success).toHaveBeenCalledWith('注册成功，可以返回登录。')
    expect(vm.registerForm).toEqual({
      username: '',
      password: '',
      confirm_password: '',
      work: '',
      level: ''
    })
    expect(vm.loading).toBe(false)
  })

  it('shows service register errors from authService', async () => {
    const component = RegisterPage as unknown as RegisterPageDefinition
    const vm = createRegisterVm({
      $refs: {
        registerForm: {
          validate: vi.fn().mockResolvedValue(true)
        }
      }
    })

    register.mockRejectedValue(new ServiceError('用户名已存在', 'AUTH_REGISTER_FAILED'))

    await component.methods.handleRegister.call(vm)

    expect(error).toHaveBeenCalledWith('用户名已存在')
    expect(vm.loading).toBe(false)
  })
})
