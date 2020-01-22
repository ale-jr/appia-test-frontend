<template>
  <div class="root">
    <div class="container-app">
      <h1>Suas medições</h1>
      <Graph />
      <ValueCardsContainer>
      <ValueCard :value="hypoglycemias" unit="Vezes" title="Hipoglicemias" />
      <ValueCard :value="average" unit="mg/dL" title="Média" />
      <ValueCard :value="hyperglycemias" unit="Vezes" title="Hiperglicemias" />
      </ValueCardsContainer>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ValueCard from '@/components/ValueCard'
import ValueCardsContainer from '@/components/ValueCardsContainer'
import Graph from '@/components/Graph'
export default {
  data () {
    return {
    }
  },
  components: {
    ValueCard,
    ValueCardsContainer,
    Graph
  },
  methods: {
    ...mapActions(['getMeasurements'])
  },
  computed: {
    ...mapState(['measurements']),
    average () {
      return (this.measurements.reduce((total, { measurement }) => total + +measurement, 0) / this.measurements.length).toFixed(1)
    },
    hypoglycemias () {
      return this.measurements.filter(({ status }) => status === 'HYPOGLICEMIC').length
    },
    hyperglycemias () {
      return this.measurements.filter(({ status }) => status === 'HYPERGLICEMIC').length
    }
  },
  mounted () {
    this.getMeasurements()
  }
}
</script>

<style scoped>
.root{
  display: flex;
  align-items: center;
  justify-content: center;
}
.container-app{
  width: 60%;
  padding:10px;
}
@media(max-width: 815px) {
  .container-app {
    width: 100%;
    padding:10px;
  }
}
</style>
