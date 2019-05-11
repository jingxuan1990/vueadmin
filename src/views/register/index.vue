<template>
      <!--登陆卡片-->
      <div class="content">
        <div class="card">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="reg">注册账号</span>
          </div>

          <div class="text item">
            <el-form class="log in-form">
              <el-form-item prop="username" class="wrapper">
                <i class="fa fa-user-circle" aria-hidden="true"></i>
                <input type="text" v-model="name" placeholder="手机号/会员名" @blur.prevent="checkName">
              </el-form-item>
              <el-form-item prop="password" class="wrapper">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                <input type="password" v-model="pwd1" placeholder="密码">
              </el-form-item>
              <el-form-item prop="password" class="wrapper">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                <input type="password" v-model="pwd2" placeholder="确认密码">
              </el-form-item>
              <el-button class="strength" type="primary" @click="register">注册</el-button>
            </el-form>
          </div>


          <div class="clearfix">
            <p>已有用户，去 <router-link to="/login"> <span class="dl">登陆</span>  </router-link> </p>
            <i class="fa fa-qq blue" aria-hidden="true"></i>
            <span class="pass">QQ</span>
            <span class="pass">|</span>
            <i class="fa fa-weixin green" aria-hidden="true"></i>
            <span class="pass">微信</span>
            <span class="pass">|</span>
            <i class="fa fa-weibo red" aria-hidden="true"></i>
            <span class="pass">微博</span>
            <span class="pass">|</span>
            <i class="fa fa-credit-card-alt light" aria-hidden="true"></i>
            <span class="pass">合作卡</span>
          </div>
        </el-card>
        </div>
      </div>

</template>

<script>
  import {createAdminUser, queryAdminUserName} from '@/api/adminuser'
  export default {
    data() {
      return {
        name:'',
        pwd1:'',
        pwd2:'',
        isSubmit:false //是否允许提交
      }
    },
    methods: {
      checkName() {
        if (this.name === '') {
            this.$notify({
              title: '失败',
              message: '用户名不能为空',
              type: 'error',
              duration: 1000
            });
          return;
        }

        queryAdminUserName(this.name).then((result) => {
          if(result['data']>=1){
            this.$notify({
              title: '失败',
              message: '该用户名已经被占用，请换一个！',
              type: 'error',
              duration: 2000
            });
          }else {
            this.isSubmit=true;
          }
        });
      },
      register() {
        //1:获取用户名 密码 确认密码
        if (this.isSubmit === false) {
          //禁止提交
          this.$notify({
            title: '注册失败',
            message: '请检查注册信息是否正确',
            type: 'error',
            duration: 2000
          });
          return;
        }
        const name = this.name;
        const pwd1 = this.pwd1;
        const pwd2 = this.pwd2;
        // console.log(name+"|"+pwd1+"|"+pwd2);
        //2:验证用户名和密码是否正确
        const regname = /^[a-z0-9_]{5,12}$/i;
        const regpwd = /^[a-z0-9]{5,12}$/i;
        if (!regname.test(name)) {
          alert("用户名格式不正确");
          return;
        }
        if (!regpwd.test(pwd1)) {
          alert("密码格式不正确");
          return;
        }
        if (pwd1 !== pwd2) {
          alert("两次密码不一致，请修改");
          return;
        }

        if (pwd1 === pwd2) {
          //如果正确发送ajax请求
          let postData = {
            "username": this.name,
            "password": this.pwd1
          };
          createAdminUser(postData).then((result) => {
            console.log("result=" + result)

            this.$notify({
              title: '成功',
              message: '注册成功',
              type: 'success',
              duration: 2000
            });

            this.$router.push("/Login");//注册成功跳转到登陆页面
          });
        }
      }
    },
  };
</script>

<style scoped>

  /*登陆卡片*/

  .wrapper {
    position: relative;
  }
  i.fa-user-circle,
  i.fa-unlock-alt {
    position: absolute;
    top: 15px;
    left: 35px;
  }
  .wrapper input {
    text-indent: 30px;
  }

  .content {
    background-image: url("../../assets/images/bj4.jpg");
    height: 620px;
    overflow: hidden;
  }
  .reg{
    font-family: Hei;
    font-size: 18px;
    font-weight: bold;
    margin: 0 auto;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
  .card{
    width: 400px;
    height: 450px;
    margin:80px auto;
  }
  .box-card {
  text-align: center;
  }
  input[type="text"],
  input[type="password"] {
    height: 38px;
    width: 300px;
  }
  .dl{
    font-weight: bold;
    color: #409EFF;
  }
  .strength {
    width: 300px;
    margin: auto;
    /* margin-left: 110px; */
    /*margin-bottom: 30px;*/
  }
  .pass {
    margin-left: 5px;
    margin-right: 5px;
    font-size: 14px;
    color: #333;
  }
  p {
    font-size: 14px;
  }
  .blue {
    color: #00aaee;
  }
  .green {
    color: #4cbf00;
  }
  .red {
    color: #e7222e;
  }
  .light {
    color: #2ac09e;
  }
</style>
