<template>
  <div>
    <div
      class="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-gray-300 p-8"
    >
      <div class="flex items-center gap-x-2">
        <span class="font-bold text-2xl">Tasks</span>

        <span class="text-gray-300 font-medium text-xl">
          ({{ doneTasks }}/{{ tasks.length }})
        </span>
      </div>

      <div class="flex items-center gap-x-4 text-sm">
        <button
          class="text-green-500 flex items-center gap-x-1"
          @click="checkAllTasks"
        >
          <font-awesome-icon icon="check" />
          Check All
        </button>

        <button
          class="text-red-500 flex items-center gap-x-1"
          @click="removeAllTasks"
        >
          <font-awesome-icon icon="trash" />
          Remove All
        </button>
      </div>
    </div>

    <div class="p-8 flex flex-col gap-y-8">
      <div class="flex gap-x-4">
        <input
          v-model="taskTitle"
          autofocus
          placeholder="New Task..."
          class="py-2 px-4 border border-gray-300 rounded-lg focus:border-blue-500 outline-0 grow"
          @keyup.enter="addNewTask"
        />

        <button
          class="bg-blue-500 text-white flex items-center justify-center px-4 rounded-lg hover:bg-blue-600 transition-all"
          @click="addNewTask"
        >
          <font-awesome-icon icon="plus" />
        </button>
      </div>

      <div v-if="tasks.length" class="flex flex-col gap-y-2">
        <Task
          v-for="(task, index) in tasks"
          :key="task.id"
          v-model="tasks[index]"
          @remove="removeTask"
        />
      </div>

      <div v-else class="text-gray-400 text-center">
        Your Task List is Empty!
      </div>
    </div>
  </div>
</template>

<script>
import Task from "@/components/to-do-list/task.vue";

export default {
  name: "ToDoList",
  components: { Task },
  data() {
    return {
      taskTitle: "",
      tasks: [
        {
          id: 1,
          title: "Upload more project on github",
          done: false,
        },
        {
          id: 2,
          title: "Start using vue3",
          done: false,
        },
        {
          id: 3,
          title: "Learn Nuxt",
          done: false,
        },
      ],
    };
  },
  computed: {
    doneTasks() {
      return this.tasks.filter((task) => task.done).length;
    },
  },
  methods: {
    removeAllTasks() {
      this.tasks.splice(0, this.tasks.length);
    },
    checkAllTasks() {
      this.tasks.map((task) => {
        task.done = true;
        return task;
      });
    },
    addNewTask() {
      this.tasks.push({
        id: this.tasks.length + 1,
        title: this.taskTitle,
        done: false,
      });
      this.taskTitle = "";
    },
    removeTask(id) {
      const taskIndex = this.tasks.findIndex((task) => task.id === id);
      this.tasks.splice(taskIndex, 1);
    },
  },
};
</script>
