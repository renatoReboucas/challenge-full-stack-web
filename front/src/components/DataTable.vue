<template>
  <v-card class="pa-4">
    <v-card-title>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            hide-details
          />
        </v-col>
        <v-col cols="12" sm="6" md="8" class="d-flex justify-end">
          <v-btn color="primary" prepend-icon="mdi-plus" @click="handleAddNew">
            Cadastrar Aluno
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="students"
      :search="search"
      :loading="loading"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item.raw)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item.raw)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

interface Student {
  id: number;
  registration: string;
  name: string;
  cpf: string;
}

const search = ref("");
const loading = ref(false);

const headers = [
  { title: "Registro Acadêmico", align: "start", key: "registration" },
  { title: "Nome", key: "name" },
  { title: "CPF", key: "cpf" },
  { title: "Ações", key: "actions", sortable: false },
];

const students = ref<Student[]>([
  {
    id: 1,
    registration: "101235",
    name: "Paula Souza",
    cpf: "121.999.999-99",
  },
  {
    id: 2,
    registration: "111687",
    name: "João Silva",
    cpf: "122.999.999-99",
  },
  {
    id: 3,
    registration: "111365",
    name: "Marina Miranda",
    cpf: "123.999.999-99",
  },
  {
    id: 4,
    registration: "101299",
    name: "Mauricio Souza",
    cpf: "124.999.999-99",
  },
]);

const router = useRouter();

const handleAddNew = () => {
  router.push("/cadastrar-aluno");
};

const editItem = (item: Student) => {
  // Implement edit logic
  console.log("Edit item:", item);
};

const deleteItem = (item: Student) => {
  // Implement delete logic
  console.log("Delete item:", item);
};
</script>
