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
        <v-icon size="small" class="me-2" @click="editItem(item.id)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { api } from "@/lib/api";
import type { Student } from "@/types/student"

const router = useRouter();

const search = ref("");
const loading = ref(false);

const headers = [
  { title: "Registro Acadêmico", align: "start", key: "ra" },
  { title: "Nome", key: "nome" },
  { title: "CPF", key: "cpf" },
  { title: "Ações", key: "actions", sortable: false },
];

const students = ref<Student[]>([]);
const fetchStudents = async () => {
  try {
    loading.value = true;
    const response = await api.get('/students')
    if(response.status !== 200) {
      throw new Error("Erro ao buscar alunos");
    }
    students.value = response.data as Student[]
  } catch (error) {
    console.error('Error fetching students:', error);
    // You might want to handle the error appropriately
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchStudents();
});

const handleAddNew = () => {
  router.push("/cadastro-alunos");
};

const editItem = (id:Student['id']) => {
  router.push({ name: 'form', params: { id } });
};

const deleteItem = async (id: Student['id']) => {
 try {
  const response = await api.delete(`/students/${id}`);
  if(response.status === 204) {
    fetchStudents();
  }
 } catch (err) {
  console.error('Error deleting student:', err);
 }

};
</script>
