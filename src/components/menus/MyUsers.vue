<template>
  <div>
    <!-- 标题 -->
    <h4 class="text-center">用户管理</h4>

    <!-- 用户列表 -->
    <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>头衔</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in userlist" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>{{ item.position }}</td>
          <td>
            <a href="#" @click.prevent="gotoDetail(item.id)">详情</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyUser',
  data() {
    return {
      // 用户列表数据
      userlist: [
        { id: 1, name: '张三', age: 18, position: '快递员' },
        { id: 2, name: '张四', age: 18, position: '外卖员' },
        { id: 3, name: '张五', age: 19, position: 'Boss' },
        { id: 4, name: '老六', age: 22, position: '老六' }
      ]
    }
  },
  methods:{
    gotoDetail(id){
      // console.log('ok')
      this.$router.push('/home/userinfo/' + id )
      console.log(this);
    }
  }
}
</script>

<style lang="less" scoped></style>
