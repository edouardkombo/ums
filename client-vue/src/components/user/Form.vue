<template>
  <form @submit.prevent="handleSubmit(item)">
    <div class="form-group">
      <label
        for="user_firstname"
        class="form-control-label">firstname</label>
      <input
        id="user_firstname"
        v-model="item.firstname"
        :class="['form-control', isInvalid('firstname') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('firstname', $event.target.value)">
      <div
        v-if="isInvalid('firstname')"
        class="invalid-feedback">{{ violations.firstname }}</div>
    </div>
    <div class="form-group">
      <label
        for="user_lastname"
        class="form-control-label">lastname</label>
      <input
        id="user_lastname"
        v-model="item.lastname"
        :class="['form-control', isInvalid('lastname') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('lastname', $event.target.value)">
      <div
        v-if="isInvalid('lastname')"
        class="invalid-feedback">{{ violations.lastname }}</div>
    </div>
    <div class="form-group">
      <label
        for="user_email"
        class="form-control-label">email</label>
      <input
        id="user_email"
        v-model="item.email"
        :class="['form-control', isInvalid('email') ? 'is-invalid' : '']"
        type="email"
        placeholder=""
        @input="handleUpdateField('email', $event.target.value)">
      <div
        v-if="isInvalid('email')"
        class="invalid-feedback">{{ violations.email }}</div>
    </div>
    <div class="form-group">
      <label
        for="user_username"
        class="form-control-label">username</label>
      <input
        id="user_username"
        v-model="item.username"
        :class="['form-control', isInvalid('username') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('username', $event.target.value)">
      <div
        v-if="isInvalid('username')"
        class="invalid-feedback">{{ violations.username }}</div>
    </div>
    <div class="form-group">
      <label
        for="user_dob"
        class="form-control-label">dob</label>
      <input
        id="user_dob"
        v-model="item.dob"
        :class="['form-control', isInvalid('dob') ? 'is-invalid' : '']"
        type="dateTime"
        placeholder=""
        @input="handleUpdateField('dob', $event.target.value)">
      <div
        v-if="isInvalid('dob')"
        class="invalid-feedback">{{ violations.dob }}</div>
    </div>
    <div class="form-group">
      <label
        for="user_telephone"
        class="form-control-label">telephone</label>
      <input
        id="user_telephone"
        v-model="item.telephone"
        :class="['form-control', isInvalid('telephone') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('telephone', $event.target.value)">
      <div
        v-if="isInvalid('telephone')"
        class="invalid-feedback">{{ violations.telephone }}</div>
    </div>
    <div class="form-group">
      <label
        for="user_password"
        class="form-control-label">password</label>
      <input
        id="user_password"
        v-model="item.password"
        :class="['form-control', isInvalid('password') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('password', $event.target.value)">
      <div
        v-if="isInvalid('password')"
        class="invalid-feedback">{{ violations.password }}</div>
    </div>
    <div class="form-group">
      <label
        for="user_roles"
        class="form-control-label">roles</label>
      <input
        id="user_roles"
        v-model="item.roles"
        :class="['form-control', isInvalid('roles') ? 'is-invalid' : '']"
        type="text"
        placeholder=""
        @input="handleUpdateField('roles', $event.target.value)">
      <div
        v-if="isInvalid('roles')"
        class="invalid-feedback">{{ violations.roles }}</div>
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
