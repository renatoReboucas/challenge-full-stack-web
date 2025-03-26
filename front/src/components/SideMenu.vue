<template>
  <v-navigation-drawer permanent>
    <v-list>
      <v-list-item
        prepend-icon="mdi-school"
        title="Módulo Acadêmico"
        value="academic"
      />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-account-group"
        title="Alunos"
        value="students"
        :to="{ name: 'students' }"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
// Navigation is handled by vue-router
</script>
