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

    <div class="p-4 sm:p-8 flex flex-col gap-y-8">
      <div class="flex gap-x-2 sm:gap-x-4">
        <input
          v-model="taskTitle"
          autofocus
          placeholder="New Task..."
          class="py-2 px-4 border border-gray-300 rounded-lg focus:border-blue-500 outline-0 grow"
          @keyup.enter="addNewTask"
        />

        <button
          class="bg-blue-500 text-white flex items-center justify-center p-2 sm:px-4 aspect-square rounded-lg hover:bg-blue-600 transition-all"
          @click="addNewTask"
        >
          <font-awesome-icon icon="plus" />
        </button>
      </div>

      <div v-if="loading" class="text-gray-400 text-center">
        Loading Todos...
      </div>

      <template v-else-if="tasks.length">
        <transition-group name="list" tag="div" class="flex flex-col gap-y-2">
          <Task
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @remove="removeTask"
            @toggleTaskStatus="toggleTaskStatus"
          />
        </transition-group>
      </template>

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
      tasks: [],
      options: {
        itemsPerPage: 10,
      },
      loading: false,
    };
  },
  computed: {
    doneTasks() {
      return this.tasks.filter((task) => task.completed).length;
    },
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      this.loading = true;
      this.$http
        .get("/todos", {
          params: {
            limit: this.options.itemsPerPage,
          },
        })
        .then((response) => {
          this.tasks = response.data.todos;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    removeAllTasks() {
      this.loading = true;
      this.tasks.forEach((task) => {
        this.removeTask(task.id);
      });
    },
    checkAllTasks() {
      this.loading = true;
      this.tasks.forEach((task) => {
        this.$http
          .put(`/todos/${task.id}`, {
            completed: true,
          })
          .then((response) => {
            task.completed = response.data.completed;
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    addNewTask() {
      const data = {
        todo: this.taskTitle,
        completed: false,
        userId: 5,
      };

      this.$http.post("/todos/add", data).then((response) => {
        this.tasks.unshift(response.data);
        this.taskTitle = "";
      });
    },
    removeTask(id) {
      this.$http
        .delete(`/todos/${id}`)
        .then((response) => {
          const taskIndex = this.tasks.findIndex(
            (task) => task.id === response.data.id
          );
          this.tasks.splice(taskIndex, 1);
        })
        .finally(() => {
          if (this.loading) this.loading = false;
        });
    },
    toggleTaskStatus(task) {
      this.$http
        .put(`/todos/${task.id}`, {
          completed: !task.completed,
        })
        .then((response) => {
          const taskIndex = this.tasks.findIndex(
            (task) => task.id === response.data.id
          );
          this.tasks[taskIndex].completed = response.data.completed;
        });
    },
  },
};
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
