<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols = "12">
          <v-card>
            <v-card-title>
              <h1 class="display-1">Ajouter un type de stand</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="typestand.libelle"
                  label="Nom du type de stand"
                  required
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="addTypeStand">Ajouter</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import {post} from "@/services/axios.service.js";
export default {
  name: "TypeStandAddView",
  data: () => {
    return {
      typestand: {
        libelle: "",
      }
    }
  },
  methods: {
    addTypeStand() {
      post('typestand', this.typestand)
          .then(() => {
            this.$store.dispatch('getTypestands');
            this.$store.dispatch('getStands');
            this.$router.push('/typestand');
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    }
  },

}
</script>

<style scoped>

</style>