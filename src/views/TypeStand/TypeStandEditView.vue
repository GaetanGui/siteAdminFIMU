<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols = "12">
          <v-card>
            <v-card-title>
              <h1 class="display-1">Modifier un type de stand</h1>
            </v-card-title>
            <v-card-text>
              <v-text-field
                  v-model="typestand.libelle"
                  label="Nom du type de stand"
                  required
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="editTypeStand">Modifier</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import {get, put} from "@/services/axios.service.js";
export default {
  name: "TypeStandEditView",
  data: () => {
    return {
      typestand: {
        libelle: "",
      }
    }
  },
  methods: {
    async getTypeStand() {
      await get('typestand/' + this.$route.params.id)
          .then((response) => {
            this.service = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    editTypeStand() {
      put('typestand/' + this.$route.params.id, this.typestand)
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
  mounted() {
    this.getTypeStand();
  },

}
</script>

<style scoped>

</style>