<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-data-table
          :headers="headers"
          :items="students"
          sort-by="name"
          class="elevation-20 pa-6"
          :items-per-page="5"
          :loading="loading"
        >
          <template v-slot:top>
            <v-toolbar flat color="white" height="150">
              <v-row>
                <v-col cols="12" md="1">
                  <v-avatar class="">
                    <img :src="course.imageUrl" alt="JS" />
                  </v-avatar>
                </v-col>
                <v-col cols="12" md="3">
                  <p class="toolbar-title ">
                    <span>Course:</span>
                    {{ course.title }}
                  </p>
                </v-col>
                <v-col cols="12" md="3">
                  <p class="toolbar-title ">
                    <span>Duration:</span>
                    {{ course.duration }} weeks
                  </p>
                </v-col>
                <v-col cols="12" md="3">
                  <p class="toolbar-title">
                    <span>Start:</span>
                    {{ course.startDate }}
                  </p>
                </v-col>
              </v-row>

              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2 add-btn" v-on="on"
                    >Add Student</v-btn
                  >
                </template>

                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <template v-if="formTitle !== 'Edit Student'">
                          <h3 class="title">
                            Select student from student list
                          </h3>
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
                              >Select</v-btn
                            >
                          </v-col>
                        </template>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedStudent.name"
                            label="Name"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedStudent.town"
                            label="Town"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedStudent.age"
                            label="Age"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field
                            v-model="editedStudent.groupe"
                            label="Groupe"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="reset"
                      >Reset</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon small class="mr-2" @click="editStudent(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteStudent(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { rules } from '../../shared/services/validators';
import {
  getStudents,
  postStudent,
  updateStudent,
  removeStudent
} from '../+store/course-state';

export default {
  name: 'Course',
  data() {
    return {
      rules,
      drawer: false,
      group: null,

      loading: false,
      headers: [
        {
          text: 'Full name',
          align: 'start',
          value: 'name'
        },
        { text: 'Town', value: 'town' },
        { text: 'Age', value: 'age' },
        { text: 'Groupe', value: 'groupe' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      dialog: false,
      editedIndex: -1,
      students: this.course.students,
      editedStudent: {
        name: '',
        town: '',
        age: '',
        groupe: '',
        courses: []
      },
      selectedStudent: null,
      defaultStudent: {
        name: '',
        town: '',
        age: '',
        groupe: '',
        courses: []
      }
    };
  },

  props: {
    course: {}
  },

  computed: {
    ...mapGetters(['allStudents', 'getStudentInfo']),

    formTitle() {
      return this.editedIndex === -1 ? 'Add Student' : 'Edit Student';
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this[getStudents]();
  },

  methods: {
    ...mapActions([getStudents, postStudent, updateStudent, removeStudent]),

    editStudent(student) {
      this.dialog = true;
      this.editedIndex = this.students.indexOf(student);
      this.editedStudent = Object.assign({}, student);
    },

    deleteStudent(student) {
      this[removeStudent]({ student, course: this.course });
      this.students = this.students.filter(s => s !== student);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedStudent = Object.assign({}, this.defaultStudent);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        this[updateStudent]({ student: this.editedStudent });

        Object.assign(this.students[this.editedIndex], this.editedStudent);
      } else {
        const action = this.selectedStudent ? updateStudent : postStudent;
        this.editedStudent.courses = this.editedStudent.courses.concat(
          this.course._id
        );
        this.students = this.students.concat(this.editedStudent);
        this[action]({ student: this.editedStudent });
      }
      this.close();
    },
    reset() {
      this.editedStudent = this.defaultStudent;
      this.selectedStudent = '';
    },
    select() {
      this.editedStudent = this.selectedStudent;
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar-title {
  span {
    font-weight: bold;
    color: #3d88d2;
  }
  font-size: 20px;
}
@media (max-width: 1200px) {
  .toolbar-title {
    font-size: 16px;
  }
  div.col-md-3.col-12 {
    padding: 0px;
  }
  .add-btn {
    width: 50px;
  }
}
</style>
