<template>
  <v-data-table
    :headers="headers"
    :items="students"
    sort-by="name"
    class="elevation-1"
    :items-per-page="5"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title class="font-weight-bold">
          <div>Course: Typescript</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="font-weight-bold">
          <div>Duration 3 weeks</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-title class="font-weight-bold">
          <div>Start: 03.04.2020</div>
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.town" label="Town"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.age" label="Age"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.groupe" label="Groupe"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { http } from "../../shared/services";

export default {
  name: "Course",
  data: () => ({
    loading: true,
    dialog: false,
    headers: [
      {
        text: "Full name",
        align: "start",
        value: "name"
      },
      { text: "Town", value: "town" },
      { text: "Age", value: "age" },
      { text: "Groupe", value: "groupe" },
      { text: "Actions", value: "action", sortable: false }
    ],
    students: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      town: "",
      age: "",
      groupe: ""
    },
    defaultItem: {
      name: "",
      town: "",
      age: "",
      groupe: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    http
      .get("students")
      .then(students => {
        this.loading = false;
        this.students = students.data;
      })
      .catch(err => console.error(err));
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      http.delete(`students/${item._id}`).then(() => {
        console.log('Deleted!')
      }).catch(err => console.error(err))
      const index = this.students.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.students.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        http
          .put(`students/${this.editedItem._id}`, this.editedItem)
          .then(() => {})
          .catch(err => console.error(err));
        Object.assign(this.students[this.editedIndex], this.editedItem);
      } else {
        http
          .post("students", this.editedItem)
          .then(() => {})
          .catch(err => console.error(err));
        this.students.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style scoped>
</style>