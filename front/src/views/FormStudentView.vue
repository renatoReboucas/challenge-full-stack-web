<template>
  <v-app>
    <SideMenu />

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <h1 class="text-h4 mb-4">{{ formTitle }}</h1>
            <v-card>
    <v-card-title>
      <span class="text-h5">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="form.ra"
              label="Registro Acadêmico* (RA)"
              required
              :readonly="!!route.params.id"
              :rules="[(v: string) => !!v || 'Registro Acadêmico é obrigatório']"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="form.nome"
              label="nome*"
              required
              :rules="[(v: string) => !!v || 'nome é obrigatório']"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="form.email"
              label="email*"
              required
              :rules="[(v: string) => !!v || 'email é obrigatório']"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="form.cpf"
              label="CPF*"
              required
              :readonly="!!route.params.id"
              :rules="[(v: string) => !!v || 'CPF é obrigatório']"
              mask="###.###.###-##"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-spacer class="my-4" />
      <small>*indica campo obrigatório</small>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn color="blue-darken-1" variant="text" @click="close">
        Cancelar
      </v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="save"> Salvar </v-btn>
    </v-card-actions>
  </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SideMenu from "@/components/SideMenu.vue";
import { ref, computed, onMounted } from 'vue';

import { useRoute,useRouter } from 'vue-router';
import { api } from "@/lib/api";
import type { Student } from '@/types/student';

const route = useRoute();
const router = useRouter();
const emit = defineEmits<{
  save: [student: Partial<Student>];
}>();

onMounted(async () => {
  if (route.params.id) {
    try {
      const studentId: Student['id'] = String(route.params.id)
      await loadStudent(studentId)
    } catch (error) {
      console.error('Erro ao carregar aluno:', error);
    }
  }
});

const defaultForm: Partial<Student> = {
  ra: "",
  nome: "",
  cpf: "",
  email: ""
};

const form = ref<Partial<Student>>({ ...defaultForm });


const formTitle = computed(() => route.params.id ? 'Edição de Aluno' : 'Cadastro de Aluno');


const loadStudent = async (studentId: Student['id']) => {
  try {
    const { data } = await api.get(`/students/${studentId}`);
    form.value = {
      ra: data.ra,
      nome: data.nome,
      cpf: data.cpf,
      email: data.email,
    };
  } catch (error) {
    console.error('Erro ao carregar aluno:', error);
  }
};
const close = () => {
  form.value = { ...defaultForm };
};

const save = async () => {
  try {
    if (route.params.id) {
      await api.put(`/students/${route.params.id}`, form.value);
    } else {
      await api.post('/students', form.value);
    }
    router.push({ name: 'students' });
  } catch (error) {
    console.error('Erro ao salvar aluno:', error);
  }
};
</script>
