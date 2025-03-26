<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="form.registration"
              label="Registro Acadêmico* (RA)"
              required
              :rules="[(v: string) => !!v || 'Registro Acadêmico é obrigatório']"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="form.name"
              label="Nome*"
              required
              :rules="[(v: string) => !!v || 'Nome é obrigatório']"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="12">
            <v-text-field
              v-model="form.cpf"
              label="CPF*"
              required
              :rules="[(v: number) => !!v || 'CPF é obrigatório']"
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
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface StudentForm {
  id?: number;
  registration: string;
  name: string;
  cpf: string;
}

const props = defineProps<{
  editedItem?: StudentForm;
}>();

const emit = defineEmits<{
  save: [student: StudentForm];
}>();

const defaultForm = {
  registration: "",
  name: "",
  cpf: "",
};

const form = ref<StudentForm>({ ...defaultForm });

const formTitle = "Cadastro de Aluno";

const close = () => {
  form.value = { ...defaultForm };
};

const save = () => {
  emit("save", form.value);
  close();
};
</script>
