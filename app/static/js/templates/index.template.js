const IndexTemplate =
`<div>
  <p>Welcome to Crowns of madness </p>
  <button @click="subscribe" v-if="!connect">Lobby</button>
  <div v-if="connect">
    <p>{{ $parent.number }}</p>
    <p>Here's a random number: {{ randomNumber }}</p>
    <button @click="getRandom">New random number</button>
  </div>
</div>`

export default IndexTemplate
