<template>
  <div
    class="bg-gray-100 p-4 rounded-lg flex justify-between items-center gap-x-4"
  >
    <div class="flex items-start gap-x-3">
      <button @click="toggleTaskStatus(task)">
        <font-awesome-icon
          icon="circle-check"
          class="text-gray-500"
          :class="{ '!text-green-500': task.completed }"
        />
      </button>

      <span :class="{ 'line-through text-gray-400': task.completed }">
        {{ task.todo }}
      </span>
    </div>

    <button
      class="text-red-300 hover:text-red-500 transition-all"
      @click="remove(task.id)"
    >
      <font-awesome-icon icon="trash" />
    </button>
  </div>
</template>

<script>
export default {
  name: "ToDoListTask",
  props: {
    task: { type: Object, required: true },
  },
  methods: {
    toggleTaskStatus(task) {
      this.$emit("toggleTaskStatus", task);
    },
    remove(id) {
      this.$emit("remove", id);
    },
  },
};
</script>
