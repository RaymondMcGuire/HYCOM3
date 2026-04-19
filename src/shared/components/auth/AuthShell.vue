<template>
  <div class="auth-shell">
    <div
      class="auth-shell__panel"
      :style="panelStyle"
    >
      <div class="auth-shell__wave" />
      <div class="auth-shell__wave" />
      <div class="auth-shell__content">
        <h2 class="auth-shell__title">
          {{ title }}
          <span
            v-if="versionText"
            class="auth-shell__version"
          >
            {{ versionText }}
          </span>
        </h2>
        <p
          v-if="subtitle"
          class="auth-shell__subtitle"
        >
          {{ subtitle }}
        </p>
        <div class="auth-shell__body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthShell',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    panelHeight: {
      type: String,
      default: ''
    },
    versionText: {
      type: String,
      default: ''
    }
  },
  computed: {
    panelStyle(): Record<string, string> {
      if (!this.panelHeight) {
        return {}
      }

      return {
        '--auth-shell-panel-height': this.panelHeight
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.auth-shell {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, var(--auth-hero-start), var(--auth-hero-end));
  overflow-y: auto;
}

.auth-shell__panel {
  position: relative;
  width: min(400px, 100%);
  min-height: var(--auth-shell-panel-height, auto);
  padding: 40px 20px;
  border-radius: var(--radius-lg);
  background-color: var(--auth-surface);
  backdrop-filter: blur(5px);
  box-shadow: var(--shadow-auth);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
}

.auth-shell__wave {
  position: absolute;
  top: -50%;
  left: 50%;
  width: 1000px;
  height: 1000px;
  margin-left: -500px;
  margin-top: -500px;
  border-radius: 40%;
  background: var(--auth-surface);
  animation: auth-wave 15s infinite linear;

  &:nth-child(2) {
    animation-delay: -5s;
  }
}

@keyframes auth-wave {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.auth-shell__content {
  position: relative;
  z-index: 1;
  width: min(100%, 320px);
  text-align: center;
}

.auth-shell__title {
  margin: 0 0 10px;
  color: var(--auth-accent);
  font-size: 36px;
}

.auth-shell__version {
  font-size: 14px;
  vertical-align: super;
}

.auth-shell__subtitle {
  margin: 0 0 30px;
  color: var(--auth-accent);
  font-size: 18px;
}

.auth-shell__body {
  :deep(.auth-form) {
    width: 100%;
  }

  :deep(.auth-form-item) {
    margin-bottom: 20px;
  }

  :deep(.auth-input) {
    width: 100%;
  }

  :deep(.auth-input .el-input__wrapper) {
    background-color: var(--auth-field-surface);
    box-shadow: none;
    min-height: 40px;
  }

  :deep(.auth-input .el-input__inner) {
    color: var(--auth-accent);
  }

  :deep(.auth-input .el-input__inner::placeholder) {
    color: var(--auth-placeholder);
  }

  :deep(.auth-button) {
    width: 100%;
    min-height: 40px;
    font-size: 16px;
    font-weight: 700;
    transition: all 0.3s ease;
  }

  :deep(.auth-button--primary) {
    background-color: var(--auth-accent);
    border: none;
    color: var(--auth-hero-start);
  }

  :deep(.auth-button--primary:hover) {
    background-color: var(--auth-accent-strong);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  :deep(.auth-button--text) {
    margin-top: 10px;
    background: transparent;
    color: var(--auth-accent);
  }

  :deep(.auth-button--text:hover) {
    color: var(--auth-accent-strong);
  }
}

@media screen and (max-height: 600px) {
  .auth-shell__panel {
    padding: 20px 15px;
  }

  .auth-shell__title {
    font-size: 24px;
    margin-bottom: 15px;
  }

  .auth-shell__body {
    :deep(.auth-form-item) {
      margin-bottom: 15px;
    }
  }
}
</style>
