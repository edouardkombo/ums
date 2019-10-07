<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label
        for="mediaobject_contentUrl"
        class="form-control-label">contentUrl</label>
      <input
        id="mediaobject_contentUrl"
        v-model="item.contentUrl"
        :class="['form-control', isInvalid('contentUrl') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('contentUrl', $event.target.value)">
      <div
        v-if="isInvalid('contentUrl')"
        class="invalid-feedback">{{ violations.contentUrl }}</div>
    </div>

    <button
      type="submit"
      class="btn btn-success">Submit</button>
  </form>
</template>

<script>
export default {
  props: {
    handleSubmit: {
      type: Function,
      required: true
    },

    handleUpdateField: {
      type: Function,
      required: true
    },

    values: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    // eslint-disable-next-line
    item () {
      return this.initialValues || this.values
    },

    violations () {
      return this.errors || {}
    }
  },

  methods: {
    isInvalid (key) {
      return Object.keys(this.violations).length > 0 && this.violations[key]
    }
  }
}
</script>
