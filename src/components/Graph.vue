<template>
<div class="graph-container">
<svg version="1.2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="graph" aria-labelledby="title" role="img">
<g class="areas">
<line
  :x1="areas.hyperglycemia.x1"
  :x2="areas.hyperglycemia.x2"
  :y1="areas.hyperglycemia.y"
  :y2="areas.hyperglycemia.y" />

  <line
  :x1="areas.hypoglycemia.x1"
  :x2="areas.hypoglycemia.x2"
  :y1="areas.hypoglycemia.y"
  :y2="areas.hypoglycemia.y" />
</g>
<g class="grid x-grid">
  <line
    :x1="xGrid.x1"
    :x2="xGrid.x2"
    :y1="xGrid.y1"
    :y2="xGrid.y2"/>
</g>
<g class="grid y-grid">
  <line
    :x1="yGrid.x1"
    :x2="yGrid.x2"
    :y1="yGrid.y1"
    :y2="yGrid.y2"/>
</g>
  <g class="labels x-labels">
  <text
    :x="positionXValue(x.value)"
    :y="yGrid.y1 + 20"
    v-for="(x,index) in xScale"
    :key="index">
      {{x.title}}
    </text>
  <text
    :x="yGrid.middle"
    :y="yGrid.y1 + 40"
    class="label-title">
      Data da medição
    </text>
</g>
<g class="labels y-labels">
  <text
    :x="offset.x - 10"
    :y="positionYValue(y.value)"
    v-for="y in yScale"
    :key="y.value">
      {{y.value}}
    </text>
  <text x="55" y="200" class="label-title">
    Glicema
  </text>
  <text x="48" y="220">
    mg/dL
  </text>
</g>
<g class="lines">
  <line
  :x1="line.x1"
  :x2="line.x2"
  :y1="line.y1"
  :y2="line.y2"
  v-for="(line,index) in lines"
  :key="index"/>
</g>
<g class="data" data-setname="">
  <circle
  :cx="plot.x"
  :cy="plot.y"
  :data-value="plot.measurement"
  :class="plot.style"
  r="6"
  v-for="(plot,index) in plots"
  :key="index">
    <title>{{plot.text}}</title>
  </circle>
</g>
</svg>
</div>
</template>
<script>
export default {
  data () {
    return {
      offset: {
        x: 100,
        y: 100,
        top: 10,
        right: 10
      },
      size: {
        width: 1100,
        height: 500
      },
      yScale: [
        { value: 50 },
        { value: 70 },
        { value: 90 },
        { value: 110 },
        { value: 130 },
        { value: 150 },
        { value: 170 },
        { value: 190 },
        { value: 210 }
      ]
    }
  },
  props: {
    data: Array
  },
  methods: {
    positionYValue (value) {
      const { offset, size, yLimits } = this
      const canvasHeight = size.height - offset.y
      const scale = this.scaleValue(value, yLimits.min, yLimits.max, 0, canvasHeight)
      return Math.round((canvasHeight - scale) + offset.top)
    },
    positionXValue (value) {
      const { offset, size, xLimits } = this
      const canvasWidth = size.width - (offset.y + offset.right)
      const scale = this.scaleValue(value, xLimits.min, xLimits.max, offset.y, canvasWidth)
      return Math.round(scale)
    },
    scaleValue (value, min, max, newMin, newMax) {
      return (value - min) * (newMax - newMin) / (max - min) + newMin
    }
  },
  computed: {
    xScale () {
      const { data } = this
      const min = data.reduce((min, { measuredAt }) => +measuredAt < min ? measuredAt : min, +data[0].measuredAt)
      const max = data.reduce((max, { measuredAt }) => +measuredAt > max ? measuredAt : max, +data[0].measuredAt)
      const interval = max - min
      const steps = 10
      const step = interval / steps
      const scale = []
      for (let current = min; current <= max; current += step) {
        const date = new Date(current)
        scale.push({
          title: date.toLocaleDateString(),
          value: Math.floor(+current)
        })
      }

      return scale
    },
    xGrid () {
      const { offset, size } = this
      return {
        x1: offset.x,
        x2: offset.x,
        y1: offset.top,
        y2: (size.height - offset.y) + offset.top
      }
    },
    yGrid () {
      const { offset, size } = this
      const x1 = offset.x
      const x2 = size.width - (offset.x + offset.right)
      return {
        x1,
        x2,
        y1: (size.height - offset.y) + offset.top,
        y2: (size.height - offset.y) + offset.top,
        middle: ((x2 - x1) / 2) + offset.x
      }
    },
    yLimits () {
      const { yScale } = this
      const min = yScale[0].value
      const max = yScale[yScale.length - 1].value
      return { min, max }
    },
    xLimits () {
      const { xScale } = this
      const min = xScale[0].value
      const max = xScale[xScale.length - 1].value
      return { min, max }
    },
    plots () {
      return this.data.map(({ measurement, measuredAt }, index) => {
        return {
          x: this.positionXValue(+measuredAt),
          y: this.positionYValue(+measurement),
          value: +measurement,
          text: `${measuredAt.toLocaleString()} - ${measurement}mg/dL`,
          style:
            +measurement > 179 ? 'hyperglycemia'
              : +measurement < 71 ? 'hypoglycemia'
                : 'normal'
        }
      })
    },
    lines () {
      const { data, positionXValue, positionYValue } = this
      return data
        .slice(0, -1)
        .map(({ measurement, measuredAt }, index) => {
          const nextMeasurement = data[index + 1]
          return {
            x1: positionXValue(+measuredAt),
            y1: positionYValue(+measurement),
            x2: positionXValue(+nextMeasurement.measuredAt),
            y2: positionYValue(+nextMeasurement.measurement)
          }
        })
    },
    areas () {
      const { yGrid: { x1, x2 }, positionYValue } = this

      return {
        hypoglycemia: {
          x1,
          x2,
          y: positionYValue(70)
        },
        hyperglycemia: {
          x1,
          x2,
          y: positionYValue(180)
        }
      }
    }
  }
}

// I'm sorry, there's a lot of magic variables, and that is a antipattern :/
</script>
<style scoped>
.graph-container{
    width: 100%;
    overflow: auto;
}

.graph .labels.x-labels {
  text-anchor: middle;
}

.graph .labels.y-labels {
  text-anchor: end;
}

.graph {
  height: 500px;
  width: 1100px;
}

.graph .grid {
  stroke: #ccc;
  stroke-dasharray: 0;
  stroke-width: 1;
}

.lines {
  stroke: #53687E;
  stroke-dasharray: 0;
  stroke-width: 1.5;
}

.labels {
  font-size: 13px;
}

.label-title {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
  fill: black;
}

.data {
  stroke-width: 1;
}
.hypoglycemia{
  fill: #C60000;
}
.hypoglycemia:hover{
  fill: #dc6666;
}
.hyperglycemia{
  fill: #5120DD;
}
.hyperglycemia:hover {
  fill: #38169a;
}
.normal{
  fill: #039500;
}
.normal:hover{
  fill: #026800;
}
.areas{
  stroke: #ccc;
  stroke-dasharray: 1;
  stroke-width: 2;
}

</style>
