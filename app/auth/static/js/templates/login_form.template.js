const LoginFormTemplate = `
<div>

  <p v-if="errors.server">
    <span v-text="errors.server"></span>
  </p>
  <form id="validated-form">
  <p>
    <label for="username">Username</label>
    <input id="username" v-model="formData.username" type="text" name="username"
    placeholder="Username" required autofocus="">
    <span v-if="errors.username" v-text="errors.username"></span>
  </p>

  <p>
    <label for="password">Password</label>
    <input id="password" v-model="formData.password" type="password" name="password"
    placeholder="Password" required autofocus="">
    <span v-if="errors.password" v-text="errors.password"></span>
  </p>

  <p>
    <label for="remember_me">Remember me</label>
    <input type="checkbox" id="remember_me" v-model="formData.remember_me" name="remember_me">
  </p>

  <p>
    <input type="submit" value="Log in" @click.prevent="processForm">
  </p>
  </form>

  <hr>
  <router-link to="/register">Register new user</router-link><br>
  <router-link to="/reset_password">Reset password</router-link>
</div>
`

export default LoginFormTemplate
