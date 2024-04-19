<template>
  <div id="app">
    <div class="bg-gray-100 min-h-screen flex justify-center items-center p-8">
      <div class="w-full lg:w-1/2 xl:w-1/3 2xl:w-1/3 flex flex-col gap-y-8">
        <div class="flex justify-center items-center gap-x-1 flex-wrap">
          <span class="text-gray-600">A Vue To Do list Application by</span>

          <a
            href="https://github.com/zahra-hanifi/"
            target="_blank"
            class="font-bold"
          >
            Zahra Hanifi
          </a>
        </div>

        <div class="bg-white shadow rounded-lg">
          <ToDoList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToDoList from "@/components/to-do-list/index.vue";

export default {
  name: "App",
  components: {
    ToDoList,
  },
};
</script>
