<template>
    <h1>Тест модального окна</h1>
    <button @click="openModal" style="padding: 10px 20px; margin: 20px;">Открыть модалку</button>
    <Modal ref="modal" />
</template>

<script>
import Modal from '../components/Modal.vue'

export default {
  name: 'CompetitionAddition',
  components: {
    Modal
  },
  methods: {
    openModal() {
      this.$refs.modal.showModal()
    }
  }
}
</script>