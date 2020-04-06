const ResetPasswordTemplate = `
<div>
  <p v-if="errors.server">
    <span v-text="errors.server"></span>
  </p>
  <form id="validated-form" v-if="!resetSuccess">
  <p v-if="!gotToken">
    <label for="username">Username</label>
    <input id="username" v-model="formData.username" type="text" name="username"
    placeholder="Username" :required="!gotToken" autofocus="">
    <span v-if="errors.username" v-text="errors.username"></span>
  </p>

  <p v-if="gotToken">
    <label for="token">Token</label>
    <input id="token" v-model="formData.token" type="text" name="token"
    placeholder="Paste token" :required="gotToken">
    <span v-if="errors.token" v-text="errors.token"></span>
  <br>
    <label for="password">Password</label>
    <input id="password" v-model="formData.password" type="password" name="password"
    placeholder="Password" :required="gotToken" autofocus="">
    <span v-if="errors.password" v-text="errors.password"></span>
  <br>
    <label for="password2">Repeat Password</label>
    <input id="password2" v-model="formData.password2" type="password" name="password2"
    placeholder="Password" :required="gotToken" autofocus="">
    <span v-if="errors.password2" v-text="errors.password2"></span>
  </p>

  <p>
    <input type="submit" :value="gotToken? 'Change password' : 'Get Token'" @click.prevent="processForm">
    <input type="button" :value="gotToken? 'I dont have a token' : 'Already have a token'" @click="gotToken=!gotToken">
  </p>
  </form>

  <hr>
  <router-link to="/login">Back</router-link>
</div>
`

export default ResetPasswordTemplate
