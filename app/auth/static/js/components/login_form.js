import LoginFormTemplate from "../templates/login_form.template.js";

const LoginForm = {
  data () {
    return {
      errors: {},
      formData: {
        username: "",
        password: "",
        remember_me: false,
      }
    }
  },

  methods: {
    processForm() {
      if (this.validate()) this.login()
    },

    validate() {
      this.errors = {}
      const formId = 'validated-form';
      let nodes = document.querySelectorAll(`#${formId} :invalid`);
      const vm = this; //current vue instance;

      if (nodes.length > 0) {
        nodes.forEach(node => {
          this.errors[node.name] = node.validationMessage
          node.addEventListener('change', function (e) {
            vm.validate()
          })
        })
        return false
      }
      return true
    },

    login() {
      wretch("/auth/login")
        .post(this.formData)
        .json(json => {
          console.log(json)
          if (!json.ok) this.errors = { ...this.errors, 'server': json.message}
          else window.location.href = 'index'
        })
        .catch(error => {console.log(error)})
    },
  },
  template: LoginFormTemplate,
}

export default LoginForm
