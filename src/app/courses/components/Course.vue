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
        <v-avatar class="mr-4">
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
        </v-avatar>
        <h3 class="title mr-4">
          <span>Course:</span>
          {{course.title}}
        </h3>
        <h3 class="title mr-4">
          <span>Duration:</span>
          {{course.duration}} weeks
        </h3>
        <h3 class="title mr-4">
          <span>Start:</span>
          {{course.startDate}}
        </h3>
        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add Student</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <template v-if="!isEditForm">
                    <h3 class="title">Select student from student list</h3>
                    <v-col cols="12" sm="8">
                      <v-select
                        :items="studentList"
                        v-model="selectedStudent"
                        dense
                        label="Select student..."
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-btn
                        color="blue darken-1"
                        text
                        class="add-student mb-2"
                        @click="select"
                      >Select</v-btn>
                    </v-col>
                  </template>
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
              <v-btn color="blue darken-1" text @click="reset">Reset</v-btn>
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
  data() {
    return {
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
      selectedStudent: null,
      allStudents: [],
      students: [],
      editedIndex: -1,
      editedItem: {
        name: "",
        town: "",
        age: "",
        groupe: "",
        courses: []
      },
      defaultItem: {
        name: "",
        town: "",
        age: "",
        groupe: ""
      }
    };
  },

  props: {
    course: {}
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add Student" : "Edit Student";
    },
    studentList() {
      return this.allStudents.map(s => s.name);
    },
    isEditForm() {
      return this.formTitle === "Edit Student";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    http
      .get(`students/?query={"courses":"${this.course._id}"}`)
      .then(({ data }) => {
        this.students = data;
        this.loading = false;
      });
    http
      .get("students")
      .then(students => {
        this.allStudents = students.data;
      })
      .catch(err => console.error(err));
  },

  methods: {
    editItem(student) {
      this.editedIndex = this.students.indexOf(student);
      this.editedItem = Object.assign({}, student);
      this.dialog = true;
    },

    deleteItem(student) {
      http
        .delete(`students/${student._id}`)
        .then(() => {
          console.log("Deleted!");
        })
        .catch(err => console.error(err));
      const index = this.students.indexOf(student);
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
        this.editedItem.courses.push(this.course._id);
        http
          .post("students", this.editedItem)
          .then(() => {})
          .catch(err => console.error(err));
        this.students.push(this.editedItem);
      }
      this.close();
    },
    reset() {
      this.editedItem.name = "";
      this.editedItem.town = "";
      this.editedItem.age = "";
      this.editedItem.groupe = "";
      this.selectedStudent = "";
    },
    select() {
      http
        .get(`students/?query={"name":"${this.selectedStudent}"}`)
        .then(({ data }) => {
          const { name, town, age, groupe } = data[0];
          this.editedItem.name = name;
          this.editedItem.town = town;
          this.editedItem.groupe = groupe;
          this.editedItem.age = age;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.title span {
  color: #3d88d2;
}

.add-student {
  margin-left: 20px;
}
</style>