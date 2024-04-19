<script>
export default {
  name: "ModelMixin",
  props: ["value"],
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update", val);
      },
    },
  },
};
</script>
