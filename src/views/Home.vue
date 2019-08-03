<template>
  <div class="home">
    <section class="section bd-content">

      <!-- content -->
        <h1 class="title">
          A* Manhattan
        </h1>
        <p class="subtitle is-4" style="color: #7a7a7a;">
          Find the shortest path between green and red boxes using <strong style="color:#ccc;">A*</strong> algorithm with <strong style="color:#ccc;">Manhattan</strong> heuristic.
        </p>
        <hr class="hr" style="margin-bottom:45px;" />
        <div class="columns">
          <div class="column is-one-third content">
            <p class="subtitle is-4">
              Instructions
            </p>
            <ul>
              <li>Select a cell type<br /><br />
                <b-radio v-model="radio"
                  name="name"
                  native-value="start">
                  Start
                </b-radio>
                <b-radio v-model="radio"
                  name="name"
                  native-value="finish">
                  Finish
                </b-radio>
                <b-radio v-model="radio"
                  name="name"
                  native-value="obstacle">
                  Obstacle
                </b-radio>
                <b-radio v-model="radio"
                  name="name"
                  native-value="walkable">
                  Walkable
                </b-radio>
                <br />
                <br />
              </li>
              <li>Click and drag on the grid to define cells</li>
              <li>Click Find Path<br /><br />
              <b-button @click="findPath" :disabled="path.length > 0">Find Path</b-button><br /><br /></li>
              <li>Click Reset to try again
                <br /><br />
                <b-button @click="reset">Reset</b-button>
                <br /><br />
              </li>
            </ul>
          </div>
          <div class="column is-two-thirds">
            <div class="grid-container">
              <div class="grid-row" v-for="(row, rowKey) in matrix.nodes" :key="rowKey">
                <div class="grid-column" v-for="(column, columnKey) in row" :key="columnKey">
                  <div
                    class="grid-cell"
                    :class="{
                      'obstacle': !column.walkable,
                      'start': column.type === `start`,
                      'finish': column.type === `finish`,
                      'path': column.path
                    }"
                    @mousedown="onMouseDownColumn(row, rowKey, column, columnKey)"
                    @mouseover="onMouseOverColumn($event, row, rowKey, column, columnKey)"
                    >
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    </section>
  </div>
</template>

<script>
  import PF from 'pathfinding'

  export default {
    name: 'home',
    data () {
      return {
        column: {
          x: null,
          y: null,
          walkable: null,
          type: null
        },
        start: {
          x: 0,
          y: 0
        },
        finish: {
          x: 0,
          y: 14
        },
        radio: 'start',
        path: [],
        matrix: {}
      }
    },
    methods: {
      reset () {
        this.path = []
        this.matrix = new PF.Grid(30, 15)
        const dimensions = new Array(30)
        dimensions.fill(new Array(15))
        dimensions.forEach(dimension => dimension.forEach(d => this.matrix.setWalkableAt(d.x, d.y, true)))
        this.matrix.nodes[this.start.y][this.start.x].type = `start`
        this.matrix.nodes[this.finish.y][this.finish.x].type = `finish`
      },
      findPath () {
        const finder = new PF.AStarFinder()
        this.path = finder.findPath(this.start.x, this.start.y, this.finish.x, this.finish.y, this.matrix)
        this.path.forEach(tuple => this.matrix.nodes[tuple[1]][tuple[0]].path = true)
      },
      toggleColumn (column) {
        if (this.radio === 'obstacle') {
          this.matrix.setWalkableAt(column.x, column.y, false)
        } else if (this.radio === 'walkable') {
                  this.matrix.setWalkableAt(column.x, column.y, true)
        }
      },
      onMouseOverColumn ($event, row, rowKey, column, columnKey) {
        if ($event.buttons) {
          this.onMouseDownColumn(row, rowKey, column, columnKey)
        }
        this.column = column
      },
      onMouseDownColumn (row, rowKey, column, columnKey) {
        if (this.radio === 'start') {
          this.matrix.nodes[this.start.y][this.start.x].type = 'none'
          column.type = 'start'
          this.start.x = column.x
          this.start.y = column.y
        } else if (this.radio === 'finish') {
          this.matrix.nodes[this.finish.y][this.finish.x].type = 'none'
          column.type = 'finish'
          this.finish.x = column.x
          this.finish.y = column.y
        } else {
          this.toggleColumn(column)
        }
        this.$forceUpdate()
      }
    },
    mounted () {
      this.reset()
    }
  }
</script>

<style>
  .home {
    display: inherit;
  }
  .grid-container {
    /* border:5px solid cyan; */
    width: 300px;
  }
  .grid-row {
    display: flex;
    /* border: 5px solid magenta; */
  }
  .grid-column {
    /* border: 5px solid yellow; */
  }
  .grid-cell {
    border-top: 1px solid black;
    border-left: 1px solid black;
    height: 25px;
    width: 25px;
    cursor: pointer;
    user-select: none;
  }

  .grid-column:last-child > .grid-cell {
    border-right: 1px solid black;
  }

  .grid-row:last-child > .grid-column > .grid-cell {
    border-bottom: 1px solid black;
  }

  .grid-cell:hover {
    opacity: .5;
  }

  .obstacle {
    background-color: #444;
  }

  div.start {
    background-color: green;
  }

  div.finish {
    background-color: red;
  }

  .path {
    background-color: lime;
  }

</style>
