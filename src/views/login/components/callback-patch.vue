<template>
  <Form :validation-schema="rules" class="form" #default="{ errors }" ref="formRef" autocomplete="off">
    <button @click="unbind">解绑</button>
    <div class="xtx-form">
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-user"></i>
          <Field name="account" v-model="form.account" type="text" class="input" :class="{error: errors.account}" placeholder="请输入用户名"></Field>
          <!-- <input class="input" type="text" placeholder="请输入用户名" /> -->
        </div>
        <div class="error"><ErrorMessage name="account"></ErrorMessage></div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <Field name="mobile" v-model="form.mobile" type="text" class="input" :class="{error: errors.mobile}" placeholder="请输入手机号"></Field>
          <!-- <input class="input" type="text" placeholder="请输入手机号" /> -->
        </div>
        <div class="error"><ErrorMessage name="mobile"></ErrorMessage></div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-code"></i>
          <Field name="code" v-model="form.code" type="text" class="input" :class="{error: errors.code}" placeholder="请输入验证码"></Field>
          <!-- <input class="input" type="text" placeholder="请输入验证码" /> -->
          <span class="code" @click="sendCode" :class="{ disabled: time !== timeNum }">{{ time !== timeNum ? time : '发送验证码'}}</span>
        </div>
        <div class="error"><ErrorMessage name="code"></ErrorMessage></div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field name="password" v-model="form.password" type="password" class="input" :class="{error: errors.password}" placeholder="请输入密码"></Field>
          <!-- <input class="input" type="password" placeholder="请输入密码" /> -->
        </div>
        <div class="error"><ErrorMessage name="password"></ErrorMessage></div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-lock"></i>
          <Field name="rePassword" v-model="form.rePassword" type="password" class="input" :class="{error: errors.rePassword}" placeholder="请确认密码"></Field>
          <!-- <input class="input" type="password" placeholder="请确认密码" /> -->
        </div>
        <div class="error"><ErrorMessage name="rePassword"></ErrorMessage></div>
      </div>
      <a href="javascript:;" class="submit" @click="bindNow">立即提交</a>
    </div>
  </Form>
</template>

<script>
import message from '@/components/message'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Form, Field, configure, ErrorMessage } from 'vee-validate'
import { reactive, ref } from 'vue'
import { password, account, mobile, code, rePassword } from '@/utils/validate'
import useCountDonw from '@/utils/countDown'
import { userQQBindCode, userQQPatchLogin, unBind } from '@/api/user'
import QC from 'qc'
export default {
  name: 'CallbackPatch',
  components: {
    Form, Field, ErrorMessage
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    configure({
      validateOnInput: true,
      validateOnChange: true,
      validateOnBlur: true
    })

    const formRef = ref(null)

    const form = reactive({
      account: '',
      mobile: '',
      code: '',
      password: ''
    })

    const rules = {
      account,
      mobile,
      code,
      password,
      rePassword
    }

    const { start, time, timeNum } = useCountDonw(60)

    const sendCode = async () => {
      if (time.value !== timeNum) return
      const valid = rules.mobile(form.mobile)
      console.log('🚀 ~ file: callback-patch.vue ~ line 89 ~ valid', valid)
      if (valid !== true) {
        formRef.value.setFieldError('mobile', valid)
        return
      }
      const res = await userQQBindCode(form.mobile)
      console.log('🚀 ~ file: callback-patch.vue ~ line 92 ~ res', res)
      start()
    }

    const bindNow = () => {
      formRef.value.validate().then(valid => {
        if (valid) {
          QC.Login.getMe(async openId => {
            const { result } = await userQQPatchLogin(openId, {
              mobile: form.mobile, code: form.code, account: form.account, password: form.password
            })
            store.commit('user/setUserInfo', result)
            router.push('/')
            message('success', '绑定成功')
          })
        }
      })
    }

    const unbind = async () => {
      const res = await unBind(form.mobile)
      console.log('🚀 ~ file: callback-patch.vue ~ line 117 ~ res', res)
    }

    return {
      formRef,
      form,
      rules,
      time,
      timeNum,
      sendCode,
      bindNow,
      unbind
    }
  }
}
</script>

<style scoped lang='less'>
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  text-align: center;
  &.disabled {
    background: #cfcdcd;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
