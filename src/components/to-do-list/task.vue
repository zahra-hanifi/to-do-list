<template>
  <div
    class="bg-gray-100 p-4 rounded-lg flex justify-between items-center gap-x-4"
  >
    <div class="flex items-center gap-x-3">
      <button @click="toggleTaskStatus">
        <font-awesome-icon
          icon="circle-check"
          class="text-gray-500"
          :class="{ '!text-green-500': model.done }"
        />
      </button>

      <span :class="{ 'line-through text-gray-400': model.done }">
        {{ model.title }}
      </span>
    </div>

    <button
      class="text-red-300 hover:text-red-500 transition-all"
      @click="remove(model.id)"
    >
      <font-awesome-icon icon="trash" />
    </button>
  </div>
</template>

<script>
import modelMixin from "@/mixins/model.vue";

export default {
  name: "ToDoListTask",
  mixins: [modelMixin],
  methods: {
    toggleTaskStatus() {
      this.model.done = !this.model.done;
    },
    remove(id) {
      this.$emit("remove", id);
    },
  },
};
</script>
