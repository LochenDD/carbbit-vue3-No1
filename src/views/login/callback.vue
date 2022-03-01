<template>
  <LoginHeader></LoginHeader>
  <section class="container">
    <nav class="tab">
      <a href="javascript:;" :class="{active: hasAccount}" @click="hasAccount = true">
        <i class="iconfont icon-bind" />
        <span>已有ddd账号，请绑定手机</span>
      </a>
      <a href="javascript:;" :class="{active: !hasAccount}" @click="hasAccount = false">
        <i class="iconfont icon-edit" />
        <span>没有ddd账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind></CallbackBind>
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch></CallbackPatch>
    </div>
  </section>
  <LoginFooter></LoginFooter>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QC from 'qc'
import CallbackBind from './components/callback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'
import LoginHeader from './components/login-header'
import LoginFooter from './components/login-footer'
import { ref } from 'vue'
import { userQQLogin } from '@/api/user'
export default {
  name: 'LoginCallback',
  components: {
    LoginHeader,
    LoginFooter,
    CallbackBind,
    CallbackPatch
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const hasAccount = ref(false)

    // unionId

    if (QC.Login.check()) {
      QC.Login.getMe(async openId => {
        try {
          const { result } = await userQQLogin(openId)
          hasAccount.value = true
          if (result.mobile) {
            store.commit('user/setUserInfo', result)
            router.push('/')
          }
        } catch (e) {
          console.log('🚀 ~ file: callback.vue ~ line 55 ~ e', e)
        }
      })
    }

    return {
      hasAccount
    }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
