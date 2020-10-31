import IndexTemplate from "../templates/index.template.js";

const Index = {
  data () {
    return {
      randomNumber: 0,
      connect: false,
      // pusher: this.$parent.pusher,
    }
  },

  methods: {
    getRandom () {
      this.$parent.number +=1
      this.randomNumber = this.getAPIRandom()
    },
    getAPIRandom() {
      wretch('/api/random')
      .get()
      .json(json => {
        this.randomNumber = json.randomNumber
      })
      .catch(error => {
        console.log(error)
      })
    },
    subscribe() {
      this.connect = true;
      let channel = this.$parent.pusher.subscribe('my-channel');
      channel.bind('my-event', function(data) {
        alert('An event was triggered with message: ' + data.message);
      });
    }
  },

  template: IndexTemplate,
}

export default Index
