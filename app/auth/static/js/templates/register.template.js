const RegisterFormTemplate = `
<div>
  <p v-if="errors.server">
    <span v-text="errors.server"></span>
  </p>
  <form id="validated-form" v-if="!regSuccess">
  <p>
    <label for="username">Username</label>
    <input id="username" v-model="formData.username" type="text" name="username"
    placeholder="Username" required autofocus="">
    <span v-if="errors.username" v-text="errors.username"></span>
  </p>
  <p>
    <label for="email">Email</label>
    <input id="email" v-model="formData.email" type="email" name="email"
    placeholder="user@example.com" required autofocus="">
    <span v-if="errors.email" v-text="errors.email"></span>
  </p>

  <p>
    <label for="password">Password</label>
    <input id="password" v-model="formData.password" type="password" name="password"
    placeholder="Password" required autofocus="">
    <span v-if="errors.password" v-text="errors.password"></span>
  </p>
  <p>
    <label for="password2">Repeat Password</label>
    <input id="password2" v-model="formData.password2" type="password" name="password2"
    placeholder="Password" required autofocus="">
    <span v-if="errors.password2" v-text="errors.password2"></span>
  </p>

  <p>
    <input type="submit" value="Register" @click.prevent="processForm">
  </p>
  </form>

  <hr>
  <router-link to="/login">Back</router-link>
</div>
`

export default RegisterFormTemplate
