<template>
  <span id="qqLoginBtn" v-show="false"></span>
  <div class="account-box">
    <div class="toggle">
      <a href="javascript:;" v-if="useMessage" @click="useMessage = false">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a href="javascript:;" v-else @click="useMessage = true">
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form :validation-schema="rules" class="form" #default="{ errors }" ref="formRef">
      <template v-if="!useMessage">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入用户名或手机号"
              autocomplete="off"
              :class="{ error: errors.account }"
            />
            <!-- <div class="error" v-if="errors.account">
              <i class="iconfont icon-warning" />{{ errors.account }}
            </div> -->
            <ErrorMessage name="account"></ErrorMessage>
            <!-- <input type="text" placeholder="请输入用户名或手机号" /> -->
          </div>
          <!-- <div class="error"><i class="iconfont icon-warning" />请输入手机号</div> -->
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              v-model="form.password"
              type="password"
              name="password"
              placeholder="请输入密码"
              :class="{ error: errors.password }"
            />
            <ErrorMessage name="password"></ErrorMessage>
            <!-- <div class="error" v-if="errors.password">
              <i class="iconfont icon-warning" />{{ errors.password }}
            </div> -->
            <!-- <input type="password" placeholder="请输入密码" /> -->
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <!-- <input type="text" placeholder="请输入手机号" /> -->
            <Field
              v-model="form.mobile"
              type="text"
              name="mobile"
              placeholder="请输入手机号"
              :class="{ error: errors.mobile }"
            />
            <ErrorMessage name="mobile"></ErrorMessage>
            <!-- <div class="error" v-if="errors.mobile">
              <i class="iconfont icon-warning" />{{ errors.mobile }}
            </div> -->
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <!-- <input type="password" placeholder="请输入验证码" /> -->
            <Field
              v-model="form.code"
              type="text"
              name="code"
              placeholder="请输入验证码"
              :class="{ error: errors.code }"
            />
            <ErrorMessage name="code"></ErrorMessage>
            <!-- <div class="error" v-if="errors.code">
              <i class="iconfont icon-warning" />{{ errors.code }}
            </div> -->
            <span class="code" :class="{disabled: time !== countNum}" @click="sendCode">{{ time === countNum ? '发送验证码' : time}}</span>
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
            <!-- <XtxCheckbox v-model="form.isAgree"><span>我已同意</span></XtxCheckbox> -->
            <Field as="XtxCheckbox" name="isAgree" v-model="form.isAgree"/>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a>
            <!-- <div class="error" v-if="errors.isAgree">
                <i class="iconfont icon-warning" />{{ errors.isAgree }}
            </div> -->
        </div>
        <ErrorMessage name="isAgree"></ErrorMessage>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>
    <div class="action">
      <a href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
          <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
        </a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import QC from 'qc'
import message from '@/components/message'
import { userAccountLogin, userMobileLoginMsg, userMobileLogin } from '@/api/user'
import { Form, Field, configure, ErrorMessage } from 'vee-validate'
import { account, mobile, code, password, isAgree } from '@/utils/validate'
import useCountDonw from '@/utils/countDown'

export default {
  name: 'LoginForm',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const formRef = ref(null)
    const form = ref({
      account: '',
      password: '',
      mobile: '',
      code: '',
      isAgree: false
    })

    const rules = {
      account,
      password,
      mobile,
      code,
      isAgree
    }
    configure({
      validateOnInput: true,
      validateOnChange: true,
      validateOnBlur: true
    })
    const useMessage = ref(false)
    watch(useMessage, () => {
      form.value = {
        account: '',
        password: '',
        mobile: '',
        code: '',
        isAgree: false
      }
    })

    const login = () => {
      formRef.value.validate().then(async valid => {
        if (!valid) return
        try {
          if (useMessage.value) {
            const { result } = await userMobileLogin(form.value.mobile, form.value.code)
            store.commit('user/setUserInfo', result)
          } else {
            const { result } = await userAccountLogin(form.value.account, form.value.password)
            store.commit('user/setUserInfo', result)
          }
          message('success', '登录成功')
          router.push('/')
        } catch (e) {
          message('error', '账号或密码错误')
        }
      })
    }

    const countNum = 10
    const { start, time } = useCountDonw(countNum)

    const sendCode = async () => {
      if (time.value !== countNum) return
      const valid = rules.mobile(form.value.mobile)
      if (valid !== true) {
        formRef.value.setFieldError('mobile', valid)
        return
      }
      const res = await userMobileLoginMsg(form.value.mobile)
      start()
      console.log('🚀 ~ file: login-form.vue ~ line 187 ~ res', res)
    }

    onMounted(() => {
      // 组件渲染完毕，使用QC生成QQ登录按钮
      QC.Login({
        btnId: 'qqLoginBtn'
      })
    })

    return {
      useMessage,
      form,
      rules,
      formRef,
      login,
      sendCode,
      time,
      countNum
    }
  }
}
</script>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
          &.disabled {
            background: #cfcdcd;
          }
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
