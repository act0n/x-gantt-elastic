<template>
  <g
    class="gantt-elastic__chart-row-bar-wrapper gantt-elastic__chart-row-group-wrapper"
    :style="{
      ...root.style['chart-row-bar-wrapper'],
      ...root.style['chart-row-group-wrapper'],
      ...task.style['chart-row-bar-wrapper']
    }"
  >
    <foreignObject
      v-if="!noPrefix && displayExpander"
      class="gantt-elastic__chart-expander gantt-elastic__chart-expander--group"
      :style="{
        ...root.style['chart-expander'],
        ...root.style['chart-expander--group'],
        ...task.style['chart-expander']
      }"
      :x="
        task.x - root.state.options.chart.expander.offset - root.state.options.chart.expander.size
      "
      :y="task.y + (root.state.options.row.height - root.state.options.chart.expander.size) / 2"
      :width="root.state.options.chart.expander.size"
      :height="root.state.options.chart.expander.size"
    >
      <expander
        :tasks="[task]"
        :options="root.state.options.chart.expander"
        type="chart"
      ></expander>
    </foreignObject>
    <svg
      class="gantt-elastic__chart-row-bar gantt-elastic__chart-row-group"
      :style="{
        ...root.style['chart-row-bar'],
        ...root.style['chart-row-group'],
        ...task.style['chart-row-bar']
      }"
      :x="task.x"
      :y="task.y"
      :width="task.width"
      :height="task.height"
      :viewBox="`0 0 ${task.width} ${task.height}`"
      xmlns="http://www.w3.org/2000/svg"
      @click="emitEvent('click', $event)"
      @mouseenter="emitEvent('mouseenter', $event)"
      @mouseover="emitEvent('mouseover', $event)"
      @mouseout="emitEvent('mouseout', $event)"
      @mousemove="emitEvent('mousemove', $event)"
      @mousedown="emitEvent('mousedown', $event)"
      @mouseup="emitEvent('mouseup', $event)"
      @touchstart="emitEvent('touchstart', $event)"
      @touchmove="emitEvent('touchmove', $event)"
      @touchend="emitEvent('touchend', $event)"
    >
      <!-- <defs>
        <clipPath :id="clipPathId">
          <path :d="getPoints"></path>
        </clipPath>
      </defs> -->
      <path
        class="gantt-elastic__chart-row-bar-polygon gantt-elastic__chart-row-group-polygon"
        :style="{
          ...root.style['chart-row-bar-polygon'],
          ...root.style['chart-row-group-polygon'],
          ...task.style['base'],
          ...task.style['chart-row-bar-polygon'],
          ...fillColor
        }"
        :d="getPath"
      ></path>
      <progress-bar :task="task" :clip-path="'url(#' + clipPathId + ')'"></progress-bar>
    </svg>
    <chart-text v-if="noPrefix && root.state.options.chart.text.display" :task="task"></chart-text>
  </g>
</template>

<script>
import ChartText from '../Text.vue'
import ProgressBar from '../ProgressBar.vue'
import Expander from '../../Expander.vue'
import taskMixin from './Task.mixin.js'
export default {
  name: 'Group',
  components: {
    ChartText,
    ProgressBar,
    Expander
  },
  inject: ['root'],
  mixins: [taskMixin],
  props: {},
  data() {
    return {}
  },
  computed: {
    /**
     * Get clip path id
     *
     * @returns {string}
     */
    clipPathId() {
      return 'gantt-elastic__project-clip-path-' + this.task.id
    },

    /**
     * Get points
     *
     * @returns {string}
     */
    getPoints() {
      const task = this.task
      const bottom = task.height - task.height / 4
      const corner = task.height / 6
      const smallCorner = task.height / 8
      return `M ${smallCorner},0
                L ${task.width - smallCorner} 0
                L ${task.width} ${smallCorner}
                L ${task.width} ${bottom}
                L ${task.width - corner} ${task.height}
                L ${task.width - corner * 2} ${bottom}
                L ${corner * 2} ${bottom}
                L ${corner} ${task.height}
                L 0 ${bottom}
                L 0 ${smallCorner}
                Z
        `
    },

    /**
     * Get path
     */
    getPath() {
      const { width, height } = this.task
      const halfHeight = height / 2 + 1
      // 两个尖角的宽高尺寸
      const corner = halfHeight / 2
      return `M ${0},${halfHeight - corner}
                l ${width},0
                l ${0},${halfHeight}
                l ${-corner},${-corner}
                l ${-(width - corner * 2)},${0}
                l ${-corner},${corner}
                z
        `
    },

    /**
     * Should we display expander?
     *
     * @returns {boolean}
     */
    displayExpander() {
      const expander = this.root.state.options.chart.expander
      return (
        expander.display ||
        (expander.displayIfTaskListHidden && !this.root.state.options.taskList.display)
      )
    }
  }
}
</script>
