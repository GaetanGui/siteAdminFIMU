<template>
  <v-container>
    <v-row>
      <!--      <v-col-->
      <!--          v-for="(file, titleIndex) in Object.keys(files)"-->
      <!--          :key="titleIndex" cols="4"-->
      <!--      >-->
      <!--        <ImportComponent-->
      <!--            v-model="files[file]"-->
      <!--            :title="file"-->
      <!--        >-->
      <!--        </ImportComponent>-->
      <!--      </v-col>-->
      <v-col>
        <ImportComponent
            v-model="files.artistes"
            title="Artistes"
        ></ImportComponent>

        <ImportComponent
            v-model="files.concerts"
            title="Concerts"
        ></ImportComponent>

        <ImportComponent
            v-model="files.scenes"
            title="Scenes"
        ></ImportComponent>

        <ImportComponent
            v-model="files.stand"
            title="Stands"
        ></ImportComponent>


      </v-col>

    </v-row>
    <v-row>
      <v-btn
          :disabled="!allValid"
          color="green"
          @click="submit"
      >Valider
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import ImportComponent from "@/components/ParsingData.vue";
import {post} from "@/services/axios.service.js";

export default {
  name: "ParserList",
  components: {ImportComponent},
  data() {
    return {
      files: {
        artistes: {valid: false, csv: null, colum: 12, sep: '£'},
        scenes: {valid: false, csv: null, colum: 5, sep: '\n'},
        concerts: {valid: false, csv: null, colum: 5, sep: '\n'},
        stand: {valid: false, csv: null, colum: 5, sep: '\n'},
      }
    }
  },

  computed: {
    allValid() {
      return Object.keys(this.files).every(file => this.files[file].valid)
    }
  },

  methods: {
    async submit() {
      if (this.allValid) {
        post(`/parser`, this.files)
            .then(() => {
              alert("Importation réussie");
            })
            .catch(error => {
              alert(error.response.data.message);
            });
      }
    }
  }
}
</script>

<style scoped>
</style>