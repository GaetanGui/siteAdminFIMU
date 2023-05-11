<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ title }}
        <v-spacer/>
        <v-icon class="justify-center" :color="color" x-large>{{icon}} </v-icon>
      </v-card-title>
      <v-card-text>

        <v-file-input
            ref="fileInput"
            v-model="file"
            :label="title+'.csv'"
            accept="text/csv" @change="uploadFile"
        >

        </v-file-input>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>

import {parser} from "@/services/import.service";

export default {
  name: "ParsingData",
  props: {
    title: String,
    value: Object
  },
  data() {
    return {
      file: null,
      valid:false,
      data: this.value,
      colum: null,
    };
  },

  computed:{
    icon(){return this.valid?"mdi-check-circle":"mdi-close-circle"},
    color(){
      return this.valid?"green":"red"
    }
  },
  methods: {
    async uploadFile() {

      console.log(this.data)

      // check if a file is selected
      if (!this.file) {
        this.valid = false;
        this.data = this.value;
        //this.data = this.value;
        console.log("tetetet  :  " + this.data)
        return;
      }

      const reader = new FileReader();

      // Définir ce qui se passe lorsque le fichier est lu avec succès
      reader.onload = async (event) => {
        // Récupérer le contenu du fichier (le texte CSV)
        const csvContent = event.target.result;

        // Utiliser le contenu du fichier CSV pour vos traitements
        try {
          this.data = await parser(csvContent, '§', this.data.sep);
          this.valid = true;
          this.$emit('input', {csv: this.data, valid: this.valid});
        } catch (err) {
          this.valid = false;
          console.error(err);
        }
      };

      // Lire le contenu du fichier en tant que texte
      reader.readAsText(this.file);
    },
  }
}
</script>

<style scoped>

</style>