import IndexTemplate from "../templates/index.template.js";

const Index = {
  data () {
    return {
      randomNumber: 0
    }
  },

  methods: {
    getRandom () {
      this.randomNumber = this.getAPIRandom()
    },
    getAPIRandom() {
      wretch('http://localhost:5000/api/random')
      .get()
      .json(json => {
        this.randomNumber = json.randomNumber
      })
      .catch(error => {
        console.log(error)
      })
    }
  },

  created () {
    this.getRandom()
  },

  template: IndexTemplate,
}

export default Index
