import IndexTemplate from "../templates/index.template.js";

const Index = {
  data () {
    return {
      randomNumber: 0,
      pusher: new Pusher('82a3be9491eb5b937302', {
        cluster: 'ap4',
        encrypted: true
      }),
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
    },
    subscribe() {
      let channel = this.pusher.subscribe('my-channel');
      channel.bind('my-event', function(data) {
        alert('An event was triggered with message: ' + data.message);
      });
    }
  },

  created () {
    this.subscribe()
    this.getRandom()
  },

  template: IndexTemplate,
}

export default Index
