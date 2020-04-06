import RegisterFormTemplate from "../templates/register.template.js";

const Register = {
  data () {
    return {
      regSuccess: false,
      errors: {},
      formData: {
        username: "",
        email: "",
        password: "",
        password2: "",
      }
    }
  },

  methods: {
    processForm() {
      if (this.validate()) this.register()
    },

    validate() {
      const vm = this; //current vue instance;
      this.errors = {}
      const formId = 'validated-form';
      let nodes = document.querySelectorAll(`#${formId} :invalid`);

      if (this.formData.password2 != this.formData.password)
         this.errors['password2'] = 'Passwords must match'

      if (nodes.length > 0 || this.errors['password2']) {
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

    register() {
      wretch("/auth/register")
        .post(this.formData)
        .json(json => {
          console.log(json)
          this.errors = { ...this.errors, 'server': json.message}
          if (json.ok) this.regSuccess=true
        })
        .catch(error => {console.log(error)})
    },
  },
  template: RegisterFormTemplate,
}

export default Register
