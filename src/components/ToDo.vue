<template>
  <form @submit.prevent="addNewTask" class="flex mb-6" :class="{ 'apply-shake': shake }">
    <label for="task" class="sr-only">Add Task</label>
    <input v-model="newTask" name="task" id="task" placeholder="Enter a new task ..." class="grow sm:text-2xl border-indigo-100 appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-300">
    <input type="submit" value="Add" class="flex-none bg-gray-600 text-white font-bold py-2 px-4 rounded-r hover:bg-gray-800">
  </form>
  <h2 class="mb-4">Pending</h2>
  <div v-if="items.length">
    <draggable
        :list="items"
        :disabled="!enabled"
        item-key="task"
        class="list-group"
        ghost-class="ghost"
        @start="dragging = true"
        @end="reorder"
    >
      <template #item="{ element }">
        <div class="list-group-item flex" :class="{ 'not-draggable': !enabled }">
          <div class="no-flex">
            <label :for="`complete-${element.id}`" class="sr-only">Complete Task</label>
            <input type="checkbox" @click="completeTask(element)" :id="`complete-${element.id}`" class="mr-2" title="Complete item">
          </div>
          <div class="grow cursor-pointer">{{ element.task }}</div>
          <div class="no-flex text-gray-300 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        </div>
      </template>
    </draggable>
  </div>
  <div v-else>
    <p>You don't have any tasks in your list yet</p>
  </div>
  <div v-if="completedItems.length" class="mt-6">
    <h2 class="mb-4">Completed</h2>
    <div>
      <div v-for="item in completedItems" :key="item.id" class="list-group-item flex">
        <div class="grow line-through">{{ item.task }}</div>
        <div class="no-flex text-gray-700 hover:text-gray-800 mr-2">
          <a @click.prevent="revertComplete(item)" :id="`revert-${item.id}`" href="#" aria-label="Add back to pending" title="Revert to pending">
            <img class="mt-1" width="20" height="20" src="/images/undo.svg" alt="Revert to pending">
          </a>
        </div>
        <div class="no-flex text-gray-700 hover:text-gray-800">
          <a @click.prevent="deleteComplete(item)" :id="`delete-${item.id}`" href="#" aria-label="Delete task" title="Delete item">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      enabled: true,
      dragging: false,
      shake: false,
      items: [],
      completedItems: [],
      newTask: ''
    }
  },
  mounted() {
   this.loadLists()
  },
  methods: {
    loadLists() {
      if (localStorage.getItem('pendingTasks') !== null) {
        this.items = JSON.parse(localStorage.getItem('pendingTasks'));
      }

      if (localStorage.getItem('completedTasks') !== null) {
        this.completedItems = JSON.parse(localStorage.getItem('completedTasks'));
      }
    },
    storeLists() {
      localStorage.setItem('pendingTasks', JSON.stringify(this.items));
      localStorage.setItem('completedTasks', JSON.stringify(this.completedItems));
    },
    completeTask(item) {
      this.completedItems.unshift(item)
      this.items = this.items.filter(({id}) => id !== item.id)
      this.storeLists()
    },
    addNewTask() {
      if (!this.isValidTask(this.newTask)) {
        this.shakeAnimation()
        return
      }

      this.items.unshift({
        id: this.getNextId(),
        task: this.newTask,
      })
      this.newTask = ''
      this.storeLists()
    },
    isValidTask(task) {
      return (task.trim() !== '')
    },
    getNextId() {
      if (this.items.length === 0 && this.completedItems.length === 0) {
        return 1
      }

      const allItems = [...this.items, ...this.completedItems];

      const ids = allItems.map(({id}) => {
        return id;
      });

      const max = Math.max(...ids);

      return max + 1
    },
    reorder() {
      this.dragging = false
      this.storeLists()
    },
    deleteComplete(item) {
      this.completedItems = this.completedItems.filter(({id}) => id !== item.id)
      this.storeLists()
    },
    revertComplete(item) {
      this.completedItems = this.completedItems.filter(({id}) => id !== item.id)
      this.items.push(item)
      this.storeLists()
    },
    shakeAnimation() {
      this.shake = true;

      setTimeout(() => {
        this.shake = false;
      }, 820); // timeout value depending on the duration of the animation
    },
  },
}

</script>

<style scoped>

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.apply-shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

</style>
