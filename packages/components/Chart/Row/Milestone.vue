<template>
  <g
    class="gantt-elastic__chart-row-bar-wrapper gantt-elastic__chart-row-milestone-wrapper"
    :style="{
      ...root.style['chart-row-bar-wrapper'],
      ...root.style['chart-row-milestone-wrapper'],
      ...task.style['chart-row-bar-wrapper']
    }"
  >
    <foreignObject
      v-if="!noPrefix && displayExpander"
      class="gantt-elastic__chart-expander gantt-elastic__chart-expander--milestone"
      :style="{
        ...root.style['chart-expander'],
        ...root.style['chart-expander--milestone'],
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
    <!-- 设置里程碑的宽度，避免因为时间维度的变化而变化 -->
    <svg
      class="gantt-elastic__chart-row-bar gantt-elastic__chart-row-milestone"
      :style="{
        ...root.style['chart-row-bar'],
        ...root.style['chart-row-milestone'],
        ...task.style['chart-row-bar']
      }"
      :x="task.x"
      :y="task.y"
      :width="getSvgWidth"
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
      <defs>
        <clipPath :id="clipPathId">
          <polygon :points="getPoints"></polygon>
        </clipPath>
      </defs>
      <polygon
        class="gantt-elastic__chart-row-bar-polygon gantt-elastic__chart-row-milestone-polygon"
        :style="{
          ...root.style['chart-row-bar-polygon'],
          ...root.style['chart-row-milestone-polygon'],
          ...task.style['base'],
          ...task.style['chart-row-bar-polygon'],
          ...fillColor
        }"
        :points="getPoints"
      ></polygon>
      <!-- <path
        class="gantt-elastic__chart-row-bar-polygon gantt-elastic__chart-row-milestone-polygon"
        :style="{
          ...root.style['chart-row-bar-polygon'],
          ...root.style['chart-row-milestone-polygon'],
          ...task.style['base'],
          ...task.style['chart-row-bar-polygon'],
          stroke: 0
        }"
        :d="getPath"
      ></path> -->
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
  name: 'Milestone',
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
      return 'gantt-elastic__milestone-clip-path-' + this.task.id
    },

    getSvgWidth() {
      const { width, height } = this.task
      return Math.max(Number(width), Number(height))
    },

    /**
     * Get points
     *
     * @returns {string}
     */
    getPoints() {
      const task = this.task
      const fifty = task.height / 2
      let offset = fifty
      if (task.width / 2 - offset < 0) {
        offset = task.width / 2
      }
      return `0,${fifty}
        ${offset},0
        ${task.width - offset},0
        ${task.width},${fifty}
        ${task.width - offset},${task.height}
        ${offset},${task.height}`
    },
    getPath() {
      const { width, height } = this.task
      const startX = width / 2
      const cornerW = height / 3
      const startY = height / 2 - cornerW
      const borderRadius = 2
      const borderW = cornerW - borderRadius * 2
      return `
        m ${startX + borderRadius},${startY + borderRadius}
        l ${borderW},${borderW}
        q ${borderRadius},${borderRadius} ${0},${borderRadius * 2}
        l ${-borderW},${borderW}
        q ${-borderRadius},${borderRadius} ${-borderRadius * 2},${0}
        l ${-borderW},${-borderW}
        q ${-borderRadius},${-borderRadius} ${0},${-borderRadius * 2}
        l ${borderW},${-borderW}
        q ${borderRadius},${-borderRadius} ${borderRadius * 2},${0}
      `
    }
  }
}
</script>
<style lang="scss"></style>
