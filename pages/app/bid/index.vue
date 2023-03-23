<template>
  <div class="p-6">
    <v-toolbar color="transparent" flat>
      <h2 class="font-semibold text-2xl">การจัดการข้อมูลงาน</h2>
      <v-spacer></v-spacer>
      <v-btn @click="dialog=true" depressed small color="success" dark>
          <v-icon>mdi-plus</v-icon> สร้างใบเสนอราคา
      </v-btn>
  </v-toolbar>
  <v-dialog v-model="dialog"  max-width="500px" persistent >
      <v-card >
        <v-card-title class="success text-white" >
           สร้างใบเสนอราคา
          <v-spacer></v-spacer>
          <v-btn dark icon @click="dialog=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
           <div class="p-6 flex flex-col justify-center item-center"> 
                <v-card @click="$router.push('/app/bid/create?type=99')" outlined  class="p-4 m-2 cursor-pointer">
                  <v-icon size="40">mdi-file-document-check-outline</v-icon>
                  <span class="ml-2 font-semibold text-xl">ไม่มีข้อมูลลูกค้า</span>
                </v-card> 
                <v-card @click="$router.push('/app/bid/create?type=1')" outlined  class="p-4 m-2 cursor-pointer">
                  <v-icon size="40">mdi-account-plus</v-icon>
                  <span class="ml-2 font-semibold text-xl">ลูกค้าใหม่</span>
                </v-card> 
                <v-card @click="$router.push('/app/bid/create?type=2')" outlined  class="p-4 m-2 cursor-pointer">
                  <v-icon size="40">mdi-account</v-icon>
                  <span class="ml-2 font-semibold text-xl">ลูกค้าเก่า</span>
                </v-card> 
                <v-card @click="$router.push('/app/bid/create?type=3')" outlined  class="p-4 m-2 cursor-pointer">
                  <v-icon size="40">mdi-account-group</v-icon>
                  <span class="ml-2 font-semibold text-xl">ลูกค้าบอกต่อ</span>
                </v-card> 
           </div>
        </v-card-text>
      </v-card>
  </v-dialog>
  </div>
</template>

<script>
export default {
  data: ()=>{
    return ({
      dialog: true
    })
  },
  async created(){
    await this.run();
  },
  methods:{
    async run(){

    }
  }
}
</script>

<style>

</style>