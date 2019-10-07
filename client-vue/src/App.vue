<template>
  <div class='main-page'>
    <!--
    <nav>
      <ul class="nav nav-justified">
        <li class="active"><router-link :to="{ name: 'UserList' }" class="active">Users</router-link></li>
      </ul>
    </nav>
    -->

    <div>
      <router-view></router-view>
    </div>

    <flash-message class="flashMessage"></flash-message>
  </div>
</template>

<script>
import VueFlashMessage from 'vue-flash-message';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.main-page {
  height: 100%;
  width: 100%;
}

.flashMessage {
  width: 50%;
  bottom: 0;
  margin:0 auto;
  left:0;
  right:0;
  position: absolute;
}
</style>
