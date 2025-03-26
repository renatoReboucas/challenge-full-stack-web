<template>
  <v-app>
    <SideMenu />

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <h1 class="text-h4 mb-4">Consulta de Alunos</h1>
            <DataTable />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SideMenu from "@/components/SideMenu.vue";
import DataTable from "@/components/DataTable.vue";
</script>
