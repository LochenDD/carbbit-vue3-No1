<template>
  <div class='home-category' @mouseleave="currentCategoryName = null">
    <ul class="menu">
      <li v-for="i in menuList" :key="i" @mouseenter="currentCategoryName = i.name" :class="{active: menuList.find(i => i.id) === i.id}">
        <RouterLink :to="`/category/${i.id}`">{{i.name}}</RouterLink>
        <template v-if="i.children">
          <RouterLink :to="`/category/sub/${sub.id}`" v-for="sub in i.children" :key="sub.id">{{sub.name}}</RouterLink>
        </template>
        <template v-else>
          <XtxSkeleton
            v-for="i in 2"
            :key="i"
            width="70px"
            height="18px"
            style="margin-right:5px"
            bg="rgba(255,255,255,0.2)"
            animated
          />
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>{{currentCategoryName === '品牌' ? '品牌' : '分类'}}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <ul v-if="currentCategory?.brands">
        <li class="brand" v-for="i in currentCategory?.brands" :key="i">
          <RouterLink to="/">
            <img :src="i.picture" alt="">
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{i.name}}</p>
              <p class="name ellipsis">{{i.nameEn}}</p>
              <p class="desc ellipsis-2">{{i.desc}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <ul v-else>
        <li v-for="i in currentCategory?.goods" :key="i.id">
          <RouterLink to="/">
            <img
              :src="`${i.picture}?imageView&thumbnail=78x78&quality=95`"
              alt=""
            />
            <div class="info">
              <p class="name ellipsis-2">{{i.name}}</p>
              <p class="desc ellipsis">{{i.desc}}</p>
              <p class="price"><i>¥</i>{{i.price}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@/api/home'
const store = useStore()

const brand = reactive({
  id: 'brand',
  name: '品牌',
  children: [{ id: 'brand-chilren', name: '品牌推荐' }],
  brands: []
})
const currentCategoryName = ref(null)
const menuList = computed(() => {
  const list = store.state.category.categoryList.map(item => ({
    id: item.id,
    name: item.name,
    goods: item.goods,
    children: item.children?.slice(0, 2)
  }))
  list.push(brand)
  return list
})
const currentCategory = computed(() => {
  return menuList.value.find(item => item.name === currentCategoryName.value)
})

const { result } = await findBrand()
brand.brands = result
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;

  .layer {
  width: 990px;
  height: 500px;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  left: 250px;
  top: 0;
  display: none;
  padding: 0 15px;
  h4 {
    font-size: 20px;
    font-weight: normal;
    line-height: 80px;
    small {
      font-size: 16px;
      color: #666;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    li.brand {
      height: 180px;
      a {
        align-items: flex-start;
        img {
          width: 120px;
          height: 160px;
        }
        .info {
          p {
            margin-top: 8px;
          }
          .place {
            color: #999;
          }
        }
      }
    }
    li {
      width: 310px;
      height: 120px;
      margin-right: 15px;
      margin-bottom: 15px;
      border: 1px solid #eee;
      border-radius: 4px;
      background: #fff;
      &:nth-child(3n) {
        margin-right: 0;
      }
      a {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        padding: 10px;
        &:hover {
          background: #e3f9f4;
        }
        img {
          width: 95px;
          height: 95px;
        }
        .info {
          padding-left: 10px;
          line-height: 24px;
          width: 190px;
          .name {
            font-size: 16px;
            color: #666;
          }
          .desc {
            color: #999;
          }
          .price {
            font-size: 22px;
            color: @priceColor;
            i {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}
&:hover {
  .layer {
    display: block;
  }
}
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover, &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
