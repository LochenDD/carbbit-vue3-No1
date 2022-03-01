
<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <li v-if="$store.getters.userInfo.token !== undefined">
          <a href="javascript:;"><i class="iconfont icon-user"></i>{{userInfo.nickname === null ? userInfo.account : userInfo.nickname}}</a>
        </li>
        <li v-if="$store.getters.userInfo.token !== undefined"><a href="javascript:;"  @click="logout">退出登录</a></li>
        <li v-if="$store.getters.userInfo.token === undefined">
          <!-- <a href="javascript:;">请先登录</a> -->
          <RouterLink to="/login" >请先登录</RouterLink>
        </li>
        <li v-if="$store.getters.userInfo.token === undefined"><a href="javascript:;" >免费注册</a></li>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import message from '@/components/message'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'AppTopNav',
  setup () {
    const store = useStore()
    const router = useRouter()
    const logout = () => {
      message('success', '登出成功')
      store.commit('user/logout')
      router.push('/login')
    }
    const userInfo = computed(() => {
      return store.state.user.userInfo
    })
    return {
      logout,
      userInfo
    }
  }
})

</script>

<style scoped lang="less">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
