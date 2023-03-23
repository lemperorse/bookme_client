<template>
<div class="p-6">
    <h2 class="text-xl font-semibold">ข้อมูลลูกค้า</h2>
    <span>กรุณากรอกข้อมูลของคุณให้เราทราบถึงสถานที่ปฎิบัติงาน</span>
    <v-form ref="step1" class="mt-8"> 
        <div>
            <div>
                <div class="flex flex-col md:flex-row">
                    <div class="w-full md:w-1/2 p-1">
                        <v-text-field :rules="[$v.req]" v-model="form.contect_line_id" dense outlined label="Line ID">
                        </v-text-field>
                    </div>
                    <div class="w-full md:w-1/2 p-1">
                        <v-text-field  :rules="[$v.req]" v-model="form.contect_firstname" dense outlined label="ชื่อ">
                        </v-text-field>
                    </div>
                    <div class="w-full md:w-1/2 p-1">
                        <v-text-field  :rules="[$v.req]" v-model="form.contect_lastname" dense outlined label="นามสกุล">
                        </v-text-field>
                    </div>
                    <div class="w-full md:w-1/3 p-1">
                        <v-text-field :rules="[$v.req]"  v-model="form.contect_tel" dense outlined label="เบอร์โทร"></v-text-field>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row">
                    <div class="w-full md:w-1/2 p-1">
                        <v-text-field :rules="[$v.req]" v-model="form.contect_address1" dense outlined label="ที่อยู่">
                        </v-text-field>
                    </div>
                    <div class="w-full md:w-1/2 p-1">
                        <v-text-field v-model="form.contect_address2" dense outlined label="ถนน"></v-text-field>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row"  >
                    <div class="w-full md:w-1/4 p-1">
                        <addressinput-subdistrict class="w-full" placeholder="ตำบล" style="width:100%!important;" v-model="form.contect_subdistrict">
                        </addressinput-subdistrict>
                    </div>
                    <div class="w-full md:w-1/4 p-1">
                        <addressinput-district placeholder="อำเภอ" v-model="form.contect_amphur">
                        </addressinput-district>

                    </div>
                    <div class="w-full md:w-1/4 p-1">
                        <addressinput-province placeholder="จังหวัด" v-model="form.contect_province">
                        </addressinput-province>

                    </div>
                    <div class="w-full md:w-1/4 p-1">
                        <addressinput-zipcode placeholder="รหัสไปรษณีย์" class="w-full" v-model="form.contect_zipcode"></addressinput-zipcode>

                    </div>
                </div>
                <div class="flex flex-col md:flex-row mt-6">
                    <div class="w-full md:w-1/2 p-1">
                        <v-text-field v-model="form.contect_map" dense outlined label="ลิงค์แผนที่">
                        </v-text-field>
                    </div>

                </div>
            </div>
        </div>
        <v-btn block large depressed @click="($refs.step1.validate())?submitForm():''" color="success">บันทึดข้อมูล</v-btn>
    </v-form>
    <v-overlay opacity="0.9" v-if="success">
        <center class="p-4">
            <v-icon color="green" size="110">mdi-check-circle</v-icon>
            <h2 class="text-2xl font-semibold">ขอบคุณที่ใช้บริการ</h2>
            <span>ผู้ดูแลระบบจะติดต่อกลับ เพื่อส่งลิ้งยินยันการดำเนินงานและชำระจ่ายเงิน ในขั้นตอนต่อไป ขอบคุณที่ใช้บริการ</span>
        </center>
    </v-overlay>
</div>
</template>

<script>
export default {
    layout: 'customer',
    data: () => {
        return ({
            form: {},
            bid: {},
            success:false,
        })
    },
    async created() {
        await this.run();
    },
    methods: {
        async run() {
            let raw = this.$route.params.id;
            let id = raw.split('BID')[1];
            this.bid = await this.$core.getHttp('/api/bidcustomer/' + id);
            this.form = this.bid.bid;
        },
        async submitForm(){
            let form = {
                ...this.form
            };
            form.work_content = form.work_content.join(",")
            form.equipment = form.equipment.join(",") 
            let save = await this.$core.putHttp(`/api/bidcustomer/${form.id}`, form)
            if (save.id) { 
                await this.$web.alert('บันทึกข้อมูลสำเร็จ', 'success', 'ระบบได้บันทึกข้อความเสนอราคาสำเร็จแล้ว') 
                this.success = true;
            } else {
                await this.$web.alert('บันทึกข้อมูลไม่สำเร็จ', 'info', 'กรุณาตรวจสอบข้อมูลอีกครั้ง')
            }
        },
    }
}
</script>

<style>

</style>
