<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4" md="4">
        <v-text-field
            v-model="search"
            class="ma-4"
            prepend-inner-icon="mdi-magnify"
            label="Rechercher"
            outlined
            hide-details></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-btn
          class="addDeleteBtn ma-6"
          color="success"
          :height="56"
          @click="$router.push('/typestand/add')">Ajouter un type de stand<v-icon>mdi-plus-box-outline</v-icon>
      </v-btn>
      <v-btn
          class="addDeleteBtn ma-6"
          color="error"
          :height="56"
          @click="deleteAll()">Tout supprimer&emsp;<v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-row>
    <v-row class="table-center">
      <TableList
          :data="filtres"
          :fields="['libelle']"
          :titles="['Nom type de stand', 'Actions']"
          :buttons="[
          {
            icon: 'mdi-pencil',
            color: 'primary'
          },
          {
            icon: 'mdi-delete',
            color: 'error'
          }
        ]"
          :pk="'id'"
          @button-click="buttonClick"
      ></TableList>
    </v-row>
  </v-container>
</template>

<script>
import {remove} from "@/services/axios.service.js";
import {mapState} from "vuex";
export default {
  name: "TypeStandListView",
  data: () => ({
    search: "",
  }),
  components: {
    TableList: () => import("@/components/TableList.vue"),
  },
  methods: {
    buttonClick(id, buttonIndex) {
      if (buttonIndex === 0) {
        this.$router.push(`/typestand/${id}/edit`);
      } else if (buttonIndex === 1) {
        this.deleteService(id);
      }
    },
    async deleteService(id) {
      await remove(`typestand/${id}`)
          .then(() => {
            this.$store.dispatch("getTypestands");
          })
          .catch(error => {
            alert(error.response.data.message);
          });
    },
    async deleteAll() {
      if (confirm("Voulez-vous vraiment supprimer tous les types de stands ?")) {
        await remove(`typestand`)
            .then(() => {
              this.$store.dispatch("getTypestands");
            })
            .catch(error => {
              alert(error.response.data.message);
            });
      }
    },
  },
  computed: {
    ...mapState(["typestands"]),
    filtres() {
      return this.typestands.filter(typestand => {
        return typestand.libelle.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  mounted() {
    if (this.typestands.length === 0) {
      this.$store.dispatch("getTypestands");
    }
  },

}
</script>

<style scoped>

</style>