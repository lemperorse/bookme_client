<template>
<div>
    <div>
        <v-expansion-panels flat  v-model="panel" multiple v-if="response">
            <v-expansion-panel class="border-2 border-gray-300"  outlined >
                <v-expansion-panel-header><span class="font-semibold text-xl">ข้อมูลลูกค้า</span> </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-card outlined>
                        <v-card-text>
                            <span class="text-orange-500">* ลิ้งกรอกข้อมูลที่อยู่ของลูกค้า ในกรณีที่ยังไม่มีข้อมูลหรือ ต้องการให้ลูกค้ากรอกข้องมูลด้วยตนเอง</span>
                           <div class="flex mt-1">
                            <v-text-field v-model="userLink" ref="userLink" dense outlined label="ลิ้งกรอกข้อมูลส่วนตัว"></v-text-field>
                            <v-btn depressed @click="copyUserLink()" class="ml-2" color="success">คัดลอกลิ้ง</v-btn>
                           </div>
                        </v-card-text>
                    </v-card>
                    <v-form class="mt-3" ref="step1">
                                <div >
                                    <v-autocomplete @change="getCustomerChange()" :rules=[$v.req,] v-model="form.contect_user_select" :items="env.customers" item-value="id" item-text="label" dense outlined label="ลูกค้า">
                                    </v-autocomplete>
                                </div>
                                <div >
                                    <v-autocomplete @change="changeCustomerRec()" :rules=[$v.req,] v-model="form.contect_user_rec_id" :items="env.customers" item-text="label" item-value="id" dense outlined label="บอกต่อโดย">
                                    </v-autocomplete>
                                </div>
                                <div >
                                    <div>
                                        <div class="flex flex-col md:flex-row">
                                            <div class="w-full md:w-1/2 p-1">
                                                <v-text-field :rules="[$v.req]" v-model="form.contect_line_id" dense outlined label="Line ID">
                                                </v-text-field>
                                            </div>
                                            <div class="w-full md:w-1/2 p-1">
                                                <v-text-field v-if="type!=99" v-model="form.contect_firstname" dense outlined label="ชื่อ">
                                                </v-text-field>
                                            </div>
                                            <div class="w-full md:w-1/2 p-1">
                                                <v-text-field v-if="type!=99" v-model="form.contect_lastname" dense outlined label="นามสกุล">
                                                </v-text-field>
                                            </div>
                                            <div class="w-full md:w-1/3 p-1">
                                                <v-text-field v-if="type!=99" v-model="form.contect_tel" dense outlined label="เบอร์โทร"></v-text-field>
                                            </div>
                                        </div>
                                        <div class="flex flex-col md:flex-row">
                                            <div class="w-full md:w-1/2 p-1">
                                                <v-text-field v-model="form.contect_address1" dense outlined label="ที่อยู่">
                                                </v-text-field>
                                            </div>
                                            <div class="w-full md:w-1/2 p-1">
                                                <v-text-field v-model="form.contect_address2" dense outlined label="ถนน"></v-text-field>
                                            </div>
                                        </div>
                                        <div class="flex flex-col md:flex-row" v-if="type!=99">
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
                                <v-toolbar dense flat color="transparent">
                                    <v-spacer></v-spacer>
                                    <v-btn depressed @click="($refs.step1.validate())?submitForm():''" color="warning">แก้ไขข้อมูล</v-btn>
                                </v-toolbar>
                    </v-form>
                 </v-expansion-panel-content>
            </v-expansion-panel> 
            <v-expansion-panel class="border-2 border-gray-300"  outlined >
                <v-expansion-panel-header><span class="font-semibold text-xl">กำหนดวันที่ปฏิบัติงาน</span> </v-expansion-panel-header>
                <v-expansion-panel-content> 
                    <v-form class="mt-3" ref="stepx">
                        <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-1/5 p-1"> 
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                                    :return-value.sync="form.period_date_all" transition="scale-transition" offset-y
                                    min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-combobox v-model="form.period_date_all" multiple chips small-chips
                                            label="Multiple picker in menu" prepend-icon="mdi-calendar" readonly
                                            v-bind="attrs" v-on="on"></v-combobox>
                                    </template>
                                    <v-date-picker v-model="form.period_date_all" multiple no-title scrollable>
                                        <v-spacer></v-spacer>
                                        <v-btn text color="primary" @click="menu = false">
                                            Cancel
                                        </v-btn>
                                        <v-btn text color="primary" @click="$refs.menu.save(form.period_date_all)">
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </div>
                            <div class="w-full md:w-1/5 p-1">
                                <v-combobox :rules=[req] dense outlined :items="['9:00 - 17:00','22:00 - จนแล้วเสร็จ']"
                                    :disabled="disabled" v-model="form.period_date" label="ระยะเวลานัดหมาย">
                                </v-combobox> 
                            </div> 
                        </div>
                                <v-toolbar dense flat color="transparent">
                                    <v-spacer></v-spacer>
                                    <v-btn depressed @click="($refs.stepx.validate())?submitForm():''" color="success">บันทึกข้อมูล</v-btn>
                                </v-toolbar>
                    </v-form>
                 </v-expansion-panel-content>
            </v-expansion-panel> 
            <v-expansion-panel  class="border-2 border-gray-300"  >
                <v-expansion-panel-header > <div class="flex ">
                        <img class="w-6 h-6 rounded" src="https://line.me/static/c5bc5abac963fd619ec6d22240641a90/621c6/icon-line.png" alt="">
                        <span class="ml-2 font-semibold text-xl">ข้อความสำหรับส่งไลน์เพื่อให้ลูกค้า ยืนยันตัวตนและจ่ายเงิน</span>
                    </div> </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div>
                                <v-toolbar color="transparent" flat dense> 
                                    <v-spacer></v-spacer>
                                    <v-btn ref="copyBtn" @click="copyText()" small depressed color="success">
                                        <v-icon>mdi-content-copy</v-icon>Copy ข้อความ
                                    </v-btn>
                                </v-toolbar>
                                <textarea v-on:focus="$event.target.select()" v-model="txt" ref="linetxt" id="linetxt" style=" resize:none;" class="form-control" cols="100" rows="30">
                                </textarea>
                            </div>
                 </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
 
        <v-skeleton-loader v-if="!response" type="card"></v-skeleton-loader>
    </div>
</div>
</template>

<script>
import _ from "lodash"
import moment from "moment"
export default {
    data() {
        return {
            panel: [0, 1, 2, 3, 4],
            response: false,
            e1: 1,
            dialog: true,
            type: 1,
            env: {},
            form: {},
            menu: false,
            txt: '', 
        }
    },
    props: {
        bid: {
            type: Object,
            default: () => {}
        }
    },
    async created() {
        this.form = this.bid.bid;
        this.userLink = `${this.$env.web}/#/customer/${moment().format('YYYYMMDD')}BID${this.form.id}`
        await this.run();

    },
    methods: {

        async run() {
            this.response = false;
            await this.getEnv();
            await this.genTxt(this.form.id) 
            this.response = true;
        },
        async getEnv() {
            this.env = await this.$core.getHttp('/api/bidenv');
            console.log(this.env);
            this.env.customers = _.map(this.env.customers, (item, index) => {
                item.label = `${item.contect_firstname} (${item.contect_lastname})`
                return item
            })
        },
        async changeCustomerRec() {
            let customer = _.find(this.env.customers, (item, index) => {
                return item.id == this.form.contect_user_rec_id
            })
            this.form.contect_user_rec = customer.label
        },
        async changeWorkGroup() {
            if (this.form.work_group == 'ไม่มีกลุ่มเขต') {
                this.form.work_content = []

            } else {
                let data = _.find(this.env.workgroups, (r) => {
                    return r.name == this.form.work_group
                })
                this.form.work_content = (data.works).split(",")
            }

        },
        async changeWorkGroupAll() {
            if (this.form.work_content_all == true) {
                this.form.work_content = _.map(this.env.manageworks, (item, index) => {
                    return item.name
                })
            } else {
                this.form.work_content = []
            }
        },
        async changeEquipmentAll() {
            if (this.form.equipment_all == true) {
                this.form.equipment = _.map(this.env.equipments, (item, index) => {
                    return item.name
                })
            } else {
                this.form.equipment = []
            }
        },
        async getCustomerChange() {
            let customer = _.find(this.env.customers, (item, index) => {
                return item.id == this.form.contect_user_select
            })
            if (customer) {
                this.form.contect_firstname = customer.contect_firstname
                this.form.contect_lastname = customer.contect_lastname
                this.form.contect_tel = customer.contect_tel
                this.form.contect_address1 = customer.contect_address1
                this.form.contect_address2 = customer.contect_address2
                this.form.contect_subdistrict = customer.contect_subdistrict
                this.form.contect_amphur = customer.contect_amphur
                this.form.contect_province = customer.contect_province
                this.form.contect_zipcode = customer.contect_zipcode
                this.form.contect_line_id = customer.line_id
                this.form.line_token = customer.line_token

            }
        },
        getHintPeople() {
            if (this.form.number_people) {
                if (this.form.number_people < 3 && this.form.number_people > 0) {
                    this.form.number_people_view = `1-2 คน`
                    return `1-2 คน`
                } else {
                    this.form.number_people_view = `${this.form.number_people -1 } - ${this.form.number_people} คน`
                    return `${this.form.number_people -1 } - ${this.form.number_people} คน`
                }
            } else {
                return `0 คน`
            }
        },
        getHintArea() {
            if (this.form.area_size) {
                if (this.form.area_meter == 'ตารางเมตร') {
                    return ``
                } else {
                    return `${this.form.area_size * 4} ตารางเมตร`
                }
            } else {
                return ``
            }
        },
        async submitForm() {
            let form = {
                ...this.form
            };
            form.work_content = form.work_content.join(",")
            form.equipment = form.equipment.join(",") 
            let save = await this.$core.putHttp(`/api/bid/${form.id}`, form)
            if (save.id) {
                await this.$emit('reload',true);
                await this.$web.alert('บันทึกข้อมูลสำเร็จ', 'success', 'ระบบได้บันทึกข้อความเสนอราคาสำเร็จแล้ว') 

            } else {
                await this.$web.alert('บันทึกข้อมูลไม่สำเร็จ', 'info', 'กรุณาตรวจสอบข้อมูลอีกครั้ง')
            }
        },
        async genTxt(id) {
            let bid = await this.$core.getHttp(`/api/bid/${id}`);
            let form = bid.bid;
            form.work_content = '+' + form.work_content.toString().replaceAll(',', '\n+');
            form.equipment = '+' + form.equipment.toString().replaceAll(',', '\n+');
            console.log(form);
            this.txt = `
    แผนปฏิบัติการทำความสะอาด ${form.work_group} \n 
    สถานที่ ${(form.contect_address1)?form.contect_address1:''}${(form.contect_address2)?form.contect_address2:''} 
    พื้นที่ ${(form.area_meter == 'ตารางวา')?form.area_size*4:form.area_size} ตารางเมตร
   
    ${form.contect_map}           
    
    บริษัทจัดส่งพนักงานพร้อมวัสดุ-อุปกรณ์                
    วันบริการ รอนัดหมาย
    เริ่มทำงานประมาณ ${form.period_date} 
    จำนวนพนักงาน ${form.number_people_view} คน จำนวน ${form.period_count} วัน
    


    == ขอบเขตงาน ==
    ${form.work_content}
    ${(form.work_content_ect)?form.work_content_ect:''}
    
    == อุปกรณ์เพิ่มเติม == 
    ${form.equipment}                       
     

    เบอร์โทร 089-932-6357                              
    ลูกค้า ${form.contect_firstname} ${form.contect_lastname}
     `
        },
        async copyText() {
            this.$refs.linetxt.focus();
            document.execCommand('copy');
            alert('คัดลอกข้อความสำเร็จ');
        },
        async copyUserLink() {
            this.$refs.userLink.focus();
            this.$copyText(this.userLink) 
            alert('คัดลอกข้อความสำเร็จ');
        },
        async defaultForm() {
            this.form = {
                contect_user_type: 2,
                bid_no: `BIDss`,
                no_installment: 1,
                area_meter: 'ตารางเมตร',
                paper_note: `
    + กําหนดยืนราคา 30 วัน 
    + พนักงานของดีคลีนได้รับการฉีดวัคซีนแล้ว ราคาค่าบริการไม่รวมการตรวจ ATK หากลูกค้าต้องการให้ทีม งานตรวจ ATK จะมีค่าใช้จ่ายเพิ่มเติม 
    + ลูกค้าอําานวยความสะดวกในการจอดรถ หากมีค่าจอดรถ รบกวนลูกค้าเป็นผู้ชําระ 
    + ขออนุญาตให้บริการพื้นที่ที่มี น้ํา ไฟ และแสงสว่าง 
    + ไม่รวมการทําความสะอาดพิเศษ เช่น โคมไฟระย้า ซักเบาะ เก้าอี้ เตียงนอน ฯลฯ 
    + บริการทําความสะอาด ไม่รวมการจัดของภายตู้หรือชั้นต่างๆ เพื่อป้องกันของเสียหาย ชํารุด หรือสูญหายแต่จะทําการเคลื่อนย้ายเพื่อทําความสะอาด 
    + ชําระมัดจํา 50% เพื่อยืนยันวันนัดเริ่มงาน 50% ทันทีหลังเสร็จงาน 
    + ขออนุญาติบริการเฉพาะวันที่ไม่มีการตกแต่ง ต่อเติม ก่อสร้าง รื้อถอน ในพื้นที่ 
    + บริการทําความสะอาด ไม่รวมการกําจัดขยะออกนอกพื้นที่ 
    + บริการ Big Clean เป็นบริการรับเหมาทําความสะอาดเพียงครั้งเดียว ขอสงวนสิทธิ์ในการกลับไปทําความ สะอาด จึงจําเป็นต้องมีตัวแทนของผู้ว่าจ้างในการตรวจรับงาน 
    + รับประกันความเสียหายตามค่าเสียหายจริงไม่เกิน 1 เท่าของค่าบริการ 
    + สามารถเลื่อนนัดได้ก่อน 24 ชม. ไม่มีค่าใช้จ่าย 
    + ราคาอาจมีการเปลี่ยนแปลงตามขนาดพื้นที่จริง `,
            }
        }

    },
    computed: {
        customerLabel() {
            if (this.$route.query.type == 1) {
                return 'ลูกค้าใหม่'
            } else if (this.$route.query.type == 2) {
                return 'ลูกค้าเก่า'
            } else if (this.$route.query.type == 3) {
                return 'ลูกค้าบอกต่อ'
            } else if (this.$route.query.type == 99) {
                return ''
            }
        }
    },
}
</script>

<style>
    
    </style>
