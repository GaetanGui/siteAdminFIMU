<template>
  <v-container class="form-center">
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-card-title>
            <h1 class="display-1">Ajouter une actualité</h1>
          </v-card-title>
          <v-card-text>
            <v-text-field
                v-model="actualite.titre"
                label="Titre de l'actualité"
                required
            ></v-text-field>
            <v-select
                v-model="actualite.typeactuId"
                :items="typeactuSelect"
                label="Type d'actualité"
                required
            ></v-select>
            <v-textarea
                v-model="actualite.contenu"
                label="Contenu"
                no-resize
                required
            ></v-textarea>
            <v-text-field
                v-model="actualite.lienImage"
                label="Photo de l'actualite'"
                required
            ></v-text-field>
            <v-text-field
                v-model="actualite.heureEnvoi"
                type="time"
                label="Heure d'envoi"
                required
            ></v-text-field>
            <v-text-field
                v-model="actualite.dateEnvoi"
                type="date"
                label="Date d'envoi"
                required
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="addActualite">Ajouter</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import {post} from "@/services/axios.service.js";
import {mapState} from "vuex";

export default {
  name: "ActualiteAddView",
  data: () => ({
    actualite: {
      titre: "",
      contenu: "",
      lienImage: "",
      dateEnvoi: null,
      heureEnvoi: null,
      typeactuId: "",
    },
  }),
  methods: {
    addActualite() {
      console.log(this.actualite);
      post('actualite', this.actualite)
        .then(() => {
          this.$store.dispatch('getActualites');
          this.$router.push('/actualite');
        })
          .catch(error => {
            alert(error.response.data.message);
          });
    }
  },
  computed: {
    ...mapState(["typeactu"]),
    typeactuSelect() {
      return this.typeactu.map(typeactu => {
        return {
          text: typeactu.libelle,
          value: typeactu.id
        }
      })
    }
  },
  mounted() {
    if (this.$store.state.typeactu.length === 0) {
      this.$store.dispatch("getTypeactu");
    }
  },
  watch: {
    actualite: {
      deep: true,
      handler(newVal) {
        // Faites quelque chose lorsque la variable actualite change
        console.log('La variable actualite a été modifiée :', newVal);
      }
    }
  },

}
</script>

<style scoped>

</style>