<template>
<div class="p-6">
    <v-toolbar color="transparent" flat>
        <v-btn @click="$router.go(-1)" depressed color="gray" small><v-icon>mdi-chevron-left</v-icon> กลับ</v-btn>
        <v-spacer></v-spacer>
        <h2 class="font-semibold text-2xl">สร้างใบเสนอราคา ({{ customerLabel }})</h2>
    </v-toolbar>
    <div>
        <v-stepper v-model="e1" v-if="response">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                    ข้อมูลลูกค้า
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">
                    ขอบเขตบริการ
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 3" step="3">
                  รายละเอียดการทำงาน
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4" :complete="e1 > 4">
                    <div class="flex justify-center item-center">
                        <img class="w-6 h-6 rounded" src="https://line.me/static/c5bc5abac963fd619ec6d22240641a90/621c6/icon-line.png" alt="">
                        <span class="ml-2">ข้อความ</span>
                    </div>
                </v-stepper-step>
            </v-stepper-header> 
            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card  v-if="e1 == 1">
                        <v-card-text>
                            <v-form ref="step1">
                                <div v-if="type == 2">
                                    <v-autocomplete @change="getCustomerChange()" :rules=[$v.req,] v-model="form.contect_user_select"  :items="env.customers" item-value="id" item-text="label" dense outlined label="ลูกค้า">
                                    </v-autocomplete>
                                </div>
                                <div v-if="type == 3">
                                    <v-autocomplete @change="changeCustomerRec()" :rules=[$v.req,] v-model="form.contect_user_rec_id" :items="env.customers" item-text="label" item-value="id" dense outlined label="บอกต่อโดย">
                                    </v-autocomplete>
                                </div>
                                <div v-if="type == 1 || type == 3 || type == 99">
                                    <div>
                                        <div class="flex flex-col md:flex-row">
                                            <div class="w-full md:w-1/2 p-1">
                                                <v-text-field :rules="[$v.req]" v-model="form.contect_line_id" dense outlined label="Line ID">
                                                </v-text-field>
                                            </div>
                                            <div class="w-full md:w-1/2 p-1">
                                                <v-text-field  v-if="type!=99"  v-model="form.contect_firstname" dense outlined label="ชื่อ">
                                                </v-text-field>
                                            </div>
                                            <div class="w-full md:w-1/2 p-1">
                                                <v-text-field  v-if="type!=99" v-model="form.contect_lastname" dense outlined label="นามสกุล">
                                                </v-text-field>
                                            </div>
                                            <div class="w-full md:w-1/3 p-1">
                                                <v-text-field  v-if="type!=99" v-model="form.contect_tel" dense outlined label="เบอร์โทร"></v-text-field>
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
                                        <div class="flex flex-col md:flex-row"  v-if="type!=99">
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
                                        <div class="flex flex-col md:flex-row mt-6" >
                                            <div class="w-full md:w-1/2 p-1">
                                                <v-text-field v-model="form.contect_map" dense outlined label="ลิงค์แผนที่">
                                                </v-text-field>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="($refs.step1.validate())?e1 = 2:''">
                                ถัดไป
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card v-if="e1 == 2">
                        <v-card-text>
                         <v-form ref="step2"> 
                          <div class="flex flex-col md:flex-row">
                            <div class="w-full md:w-1/2 p-2">
                                <h2 class="font-semibold text-xl">เขตบริการ</h2> 
                                <v-autocomplete persistent-hint :rules="[$v.req]" class="mt-4" @change="changeWorkGroup()"
                                    :items="[{'name':'ไม่มีกลุ่มเขต','works':[]},...env.workgroups]" item-text="name"
                                    item-value="name" v-model="form.work_group" dense outlined label="แผนปฏิบัติการทำความสะอาด">
                                </v-autocomplete>
        
                                <v-checkbox @change="changeWorkGroupAll()" v-model="form.work_content_all" dense
                                    label="เลือกทั้งหมด"></v-checkbox>
        
                                <v-autocomplete chips :items="env.manageworks" item-text="name" item-value="name"
                                    :rules="[$v.req, $v.reqSelect ]" multiple   v-model="form.work_content" outlined
                                    label="เลือกเขตบริการ">
                                </v-autocomplete>
                                <v-textarea v-model="form.work_content_ect" dense outlined rows="2" label="เขตบริการอื่นๆ">
                                </v-textarea>
                            </div>
                            <div class="w-full md:w-1/2 p-2">
                                <h2 class="font-semibold text-xl">งานพิเศษ</h2>
                                <v-checkbox @change="changeEquipmentAll()" v-model="form.equipment_all" dense
                                    label="เลือกทั้งหมด"></v-checkbox>
                                <v-autocomplete v-model="form.equipment" multiple :items="env.equipments" item-text="name"
                                    item-value="name" chips outlined label="เลือกงานพิเศษ"></v-autocomplete>
        
                            </div>
                        </div>
                         </v-form>
        
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  text @click="e1 = 1">
                                กลับ
                            </v-btn>
                            <v-btn color="primary"  @click="($refs.step2.validate())?e1 = 3:''"  >
                                ถัดไป
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card  v-if="e1 == 3">
                        <v-card-text>
                            <v-form ref="step3">
                              <v-textarea v-model="form.paper_note" dense outlined  rows="10" label="รายละเอียดการทำงาน">
                              </v-textarea>
              
                              <div class="flex flex-col md:flex-row">
                                
                                <div class="w-full md:w-1/4 p-1">
                                      <v-text-field  type="number" v-model="form.period_count" dense outlined
                                          label="จำนวนวัน"></v-text-field>
                                  </div>
                                  <div class="w-full md:w-1/4 p-1">
                                      <v-combobox dense outlined :items="['9:00 - 17:00','22:00 - จนแล้วเสร็จ']"
                                          v-model="form.period_date" label="ระยะเวลานัดหมาย"></v-combobox>
              
                                  </div>
                                  <div class="w-full md:w-1/4 p-1">
                                      <v-text-field persistent-hint :hint="getHintPeople()" v-model="form.number_people" dense
                                          outlined label="จำนวนคนที่ต้องการ">
                                      </v-text-field>
                                  </div>
                                  <div class="w-full md:w-1/4 p-1">
                                      <v-text-field persistent-hint :hint="getHintArea()" v-model="form.area_size" dense outlined
                                          label="ขนาดพื้นที่"></v-text-field>
                                  </div>
                                  <div class="w-full md:w-1/4 p-1">
                                      <v-select :rules=[$v.req] v-model="form.area_meter" :items="[`ตารางเมตร`,`ตารางวา`]" dense outlined
                                          label="หน่วย"></v-select>
                                  </div>
                              </div>
                              <v-textarea v-model="form.job_description" dense outlined rows="2" label="Job Description"></v-textarea>
              
                              <h2>ราคา</h2>
                              <div class="flex flex-col md:flex-row">
                                  <div class="w-full md:w-1/2 p-1">
                                      <v-text-field v-model="form.price_vat" dense outlined label="ราคา"></v-text-field>
                                  </div>
                                  <div class="w-full md:w-1/2 p-1">
                                      <v-text-field v-model="form.no_installment" dense outlined label="จำนวนงวดการชำระ">
                                      </v-text-field>
                                  </div>
                              </div>
              
                              <div class="flex">
                                  <v-checkbox v-model="form.has_vat" label="รับใบกำกับภาษี (VAT 7%)"></v-checkbox>
                                  <v-checkbox v-model="form.is_company" label="ลูกค้าบริษัท (หัก ณ ที่จ่าย 3%)"></v-checkbox>
                              </div>
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="e1 = 2">
                                กลับ
                            </v-btn>
                            <v-btn color="primary" @click="($refs.step3.validate())?submitForm():''">
                                ถัดไป
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <v-card  v-if="e1 == 4">
                        <v-card-text>
                          <div> 
                            <v-toolbar color="transparent" flat dense>
                                <div class="flex font-semibold text-xl">                        
                                <img class="w-6 h-6 rounded" src="https://line.me/static/c5bc5abac963fd619ec6d22240641a90/621c6/icon-line.png" alt="">
                                <span class="ml-2">ข้อความสำหรับส่งไลน์</span>    
                            </div> 
                            <v-spacer></v-spacer>
                            <v-btn ref="copyBtn" @click="copyText()" small depressed color="success"><v-icon>mdi-content-copy</v-icon>Copy ข้อความ</v-btn>
                            </v-toolbar>
                            <textarea v-on:focus="$event.target.select()" v-model="txt" ref="linetxt" id="linetxt" style=" resize:none;" class="form-control" cols="100" rows="30">
                            </textarea> 
                          </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="e1 = 3">
                              กลับ
                          </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        <v-skeleton-loader v-if="!response" type="card" ></v-skeleton-loader>
    </div>
</div>
</template>

<script>
import _ from "lodash"
export default {
    data() {
        return {
            response:false,
            e1: 1,
            dialog: true,
            type: 1,
            env: {},
            form: {},
            menu: false,
            txt:'',
            
        }
    },
    async created() {
       
        await this.run(); 
        
    },
    methods: {
      
        async run() {
          this.response = false;
          await this.getEnv();
          await this.defaultForm();
            this.type = this.$route.query.type; 
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
                    this.form.number_people_view  = `1-2 คน`
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
                // form.period_date_all = form.period_date_all.join(",")
                let save = await this.$core.postHttp(`/api/bid`, form)
                if (save.id) {
                    await this.$web.alert('บันทึกข้อมูลสำเร็จ', 'success', 'ระบบได้บันทึกข้อความเสนอราคาสำเร็จแล้ว')  
                    await this.genTxt(save.id)
                    this.e1 = 4
                  
                } else {
                    await this.$web.alert('บันทึกข้อมูลไม่สำเร็จ', 'info', 'กรุณาตรวจสอบข้อมูลอีกครั้ง')
                }
        },
        async genTxt(id){
            let bid =  await this.$core.getHttp(`/api/bid/${id}` );
            let form = bid.bid;
            form.work_content = '+'+form.work_content.toString().replaceAll(',', '\n+');
            form.equipment =  '+'+form.equipment.toString().replaceAll(',', '\n+'); 
            console.log(form);
            this.txt = `
แผนปฏิบัติการทำความสะอาด ${form.work_group} \n 
สถานที่ ${(form.contect_address1)?form.contect_address1:''}${(form.contect_address2)?form.contect_address2:''} 
พื้นที่ ${(form.area_meter == 'ตารางวา')?form.area_size*4:form.area_size} ตารางเมตร
            
บริษัทจัดส่งพนักงานพร้อมวัสดุ-อุปกรณ์                
วันบริการ รอนัดหมาย
เริ่มทำงานประมาณ ${form.period_date} 
จำนวนพนักงาน ${form.number_people_view} คน จำนวน ${form.period_count} วัน

== ขอบเขตงาน ==
${form.work_content}
${(form.work_content_ect)?form.work_content_ect:''}

== อุปกรณ์เพิ่มเติม == 
${form.equipment}                       

== หมายเหตุ==
${ form.paper_note }
                                
รวมค่าบริการ ${ form.price_vat } บาท ไม่รวม VAT 
รวมค่าแรง ค่าเดินทาง อุปกรณ์ และน้ำยา 
 `   
        },
         async copyText(){
            this.$refs.linetxt.focus();
            document.execCommand('copy'); 
            alert('คัดลอกข้อความสำเร็จ');
        },
        async defaultForm(){
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
