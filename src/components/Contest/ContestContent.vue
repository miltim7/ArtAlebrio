<!-- src\components\Contest\ContestContent.vue -->

<template>
  <div class="content">
    <div class="content-body">
      <h2 class="section-title" v-if="activeTab !== 'participants'">
        До окончания осталось:
      </h2>

      <ParticipantsGrid v-if="activeTab === 'participants'" />

      <div class="content-text" v-else-if="activeTab === 'description'">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.
        </p>

        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

      <div class="content-text" v-else-if="activeTab === 'awards'">
        <p>Информация о наградах конкурса будет добавлена позже.</p>
      </div>

      <div class="content-text" v-else-if="activeTab === 'jury'">
        <p>Информация о жюри конкурса будет добавлена позже.</p>
      </div>
    </div>
  </div>
</template>

<script>
import ParticipantsGrid from "./ParticipantsGrid.vue";

export default {
  name: "ContestContent",
  components: {
    ParticipantsGrid,
  },
  props: {
    activeTab: {
      type: String,
      default: "description",
    },
  },
};
</script>

<style scoped>
.content {
  overflow: hidden;
  width: 100%;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #3f3f3f;
  margin: 0 0 24px 0;
}

.content-text p {
  margin: 0 0 16px 0;
  font-size: 16px;
  line-height: 1.6;
  color: #9f9f9f;
}

.content-text p:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .content-body {
    padding: 24px;
  }
}

@media (max-width: 480px) {
  .content-body {
    padding: 16px;
  }
}
</style>
