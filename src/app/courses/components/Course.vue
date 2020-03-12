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
                        :items="allStudents"
                        v-model="selectedStudent"
                        item-text="name"
                        return-object
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
                    <v-text-field v-model="editedStudent.name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedStudent.town" label="Town"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedStudent.age" label="Age"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedStudent.groupe" label="Groupe"></v-text-field>
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
      <v-btn color="primary" dark class="mb-2" v-on="on">New Student</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { http } from "../../shared/services";
import { actionTypes as snackbarActionTypes } from "../../shared/shared-state";
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
      editedStudent: {
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
      })
      .catch(err => {
        this.$store.dispatch(snackbarActionTypes.setSnackbarError, {
          message: err.message
        });
      });
    http
      .get("students")
      .then(students => {
        this.allStudents = students.data;
      })
      .catch(err => {
        this.$store.dispatch(snackbarActionTypes.setSnackbarError, {
          message: err.message
        });
      });
  },

  methods: {
    editItem(student) {
      this.editedIndex = this.students.indexOf(student);
      this.editedStudent = Object.assign({}, student);
      this.dialog = true;
    },

    deleteItem(student) {
      student.courses = student.courses.filter(c => c !== this.course._id);
      http
        .put(`students/${student._id}`, student)
        .then(() => {
          this.$store.dispatch(snackbarActionTypes.setSnackbarSuccess, {
            message: "Successfly deleted!"
          });
        })
        .catch(err => {
          this.$store.dispatch(snackbarActionTypes.setSnackbarError, {
            message: err.message
          });
        });
      alert("Are you sure you want to delete this student?");
      this.students = this.students.filter(s => s !== student);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedStudent = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        http
          .put(`students/${this.editedStudent._id}`, this.editedStudent)
          .then(() => {
            this.$store.dispatch(snackbarActionTypes.setSnackbarSuccess, {
              message: "Successfly updated!"
            });
          })
          .catch(err => {
            this.$store.dispatch(snackbarActionTypes.setSnackbarError, {
              message: err.message
            });
          });
        Object.assign(this.students[this.editedIndex], this.editedStudent);
      } else if (this.selectedStudent) {
        this.editedStudent.courses = this.editedStudent.courses.concat(
          this.course._id
        );
        this.students.push(this.editedStudent);
        http
          .put(`students/${this.editedStudent._id}`, this.editedStudent)
          .then(() => {
            this.$store.dispatch(snackbarActionTypes.setSnackbarSuccess, {
              message: "Successfly added!"
            });
          })
          .catch(err => {
            this.$store.dispatch(snackbarActionTypes.setSnackbarError, {
              message: err.message
            });
          });
      } else {
        this.editedStudent.courses = this.editedStudent.courses.concat(
          this.course._id
        );
        this.students.push(this.editedStudent);
        http
          .post("students", this.editedStudent)
          .then(() => {
            this.$store.dispatch(snackbarActionTypes.setSnackbarSuccess, {
              message: "Successfly added!"
            });
          })
          .catch(err => {
            this.$store.dispatch(snackbarActionTypes.setSnackbarError, {
              message: err.message
            });
          });
      }
      this.close();
    },
    reset() {
      this.editedStudent.name = "";
      this.editedStudent.town = "";
      this.editedStudent.age = "";
      this.editedStudent.groupe = "";
      this.selectedStudent = "";
    },
    select() {
      this.editedStudent = this.selectedStudent;
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