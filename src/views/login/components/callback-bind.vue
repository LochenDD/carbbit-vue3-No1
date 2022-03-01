<template>
  <div class="xtx-form">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{nickname}} 欢迎来ddd，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <Form :validation-schema="rules" class="form" #default="{ errors }" ref="formRef" autocomplete="off">
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-phone"></i>
          <!-- <input class="input" type="text" placeholder="绑定的手机号" /> -->
          <Field v-model="form.mobile" name="mobile" class="input" :class="{error: errors.mobild}" type="text" placeholder="绑定的手机号"></Field>
          <ErrorMessage name="mobile"></ErrorMessage>
        </div>
        <div class="error"></div>
      </div>
      <div class="xtx-form-item">
        <div class="field">
          <i class="icon iconfont icon-code"></i>
          <!-- <input class="input" type="text" placeholder="短信验证码" /> -->
          <Field v-model="form.code" name="code" type="text" class="input" :class="{error: errors.code}" placeholder="短信验证码"></Field>
          <ErrorMessage name="code"></ErrorMessage>
          <span class="code" @click="sendCode" :class="{disabled: time !== timeNum}">{{time === timeNum ? '发送验证码' : time}}</span>
        </div>
        <div class="error"></div>
      </div>
    </Form>
    <a href="javascript:;" class="submit" @click="bindMobile">立即绑定</a>
  </div>
</template>

<script>
import message from '@/components/message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Form, Field, configure, ErrorMessage } from 'vee-validate'
import QC from 'qc'
import { reactive, toRefs, ref } from 'vue'
import { code, mobile } from '@/utils/validate'
import useCountDonw from '@/utils/countDown'
import { userQQBindCode, userQQBindLogin } from '@/api/user'
export default {
  name: 'CallbackBind',
  components: {
    Form, Field, ErrorMessage
  },
  setup () {
    const router = useRouter()
    const store = useStore()
    const timeNum = 60
    const { start, time } = useCountDonw(timeNum)
    const formRef = ref(null)

    const form = reactive({
      mobile: '',
      code: ''
    })

    configure({
      validateOnInput: true,
      validateOnChange: true,
      validateOnBlur: true
    })

    const rules = {
      code,
      mobile
    }

    const qqInfo = reactive({
      nickname: '',
      avatar: ''
    })

    if (QC.Login.check()) {
      QC.api('get_user_info').success(({ data }) => {
        qqInfo.avatar = data.figureurl_qq_1
        qqInfo.nickname = data.nickname
      })
    }

    const sendCode = async () => {
      if (time.value !== timeNum) return
      const valid = rules.mobile(form.mobile)
      if (valid !== true) {
        formRef.value.setFieldError('mobile', valid)
        return
      }
      const res = await userQQBindCode(form.mobile)
      console.log('🚀 ~ file: callback-bind.vue ~ line 82 ~ res', res)
      start()
    }

    const bindMobile = () => {
      formRef.value.validate().then(async valid => {
        console.log('🚀 ~ file: callback-bind.vue ~ line 91 ~ valid', valid)
        if (valid) {
          const openId = await QC.Login.getMe()
          const { result } = await userQQBindLogin({
            unionId: openId, mobile: form.mobile, code: form.code
          })
          store.commit('user/setUserInfo', result)
          router.push('/')
          message('success', '绑定成功')
        }
      })
    }

    return {
      ...toRefs(qqInfo),
      rules,
      formRef,
      sendCode,
      form,
      time,
      timeNum,
      bindMobile
    }
  }
}
</script>

<style scoped lang='less'>
.user-info {
    width: 320px;
    height: 70px;
    margin: 0 auto;
    display: flex;
    background: #f2f2f2;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 25px;
    img {
      background: #f2f2f2;
      width: 50px;
      height: 50px;
    }
    p {
      padding-left: 10px;
    }
  }
  .code {
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
    line-height: 50px;
    width: 80px;
    color: #999;
    &.disabled {
      background: #cfcdcd;
    }
    &:hover {
      cursor: pointer;
    }
  }
</style>
