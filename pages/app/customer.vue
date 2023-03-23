<template>
<div class="p-6">

    <v-dialog v-model="dialog" scrollable persistent max-width="500px" transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                จัดการฃข้อมูล <v-spacer></v-spacer>
                <v-btn text @click="run()" color="error">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <div class="mt-2">
                    <v-form ref="form">
                        <v-text-field outlined dense type="text" label="Line ID" v-model="form.line_id" :rules="[]"></v-text-field>
                        <v-text-field outlined dense type="text" label="ชื่อ" v-model="form.contect_firstname" :rules="[]"></v-text-field>
                        <v-text-field outlined dense type="text" label="นามสกุล" v-model="form.contect_lastname" :rules="[]"></v-text-field>
                        <v-text-field outlined dense type="text" label="เบอร์โทร" v-model="form.contect_tel" :rules="[]"></v-text-field>
                        <v-text-field outlined dense type="text" label="ที่อยู่" v-model="form.contect_address1" :rules="[]"></v-text-field>
                        <v-text-field outlined dense type="text" label="ถนน" v-model="form.contect_address2" :rules="[]"></v-text-field>
                        <!-- <v-text-field outlined dense type="text" label="ตำบล" v-model="form.contect_subdistrict" :rules="[]"></v-text-field>
                        <v-text-field outlined dense type="text" label="อำเภอ" v-model="form.contect_amphur" :rules="[]"></v-text-field>
                        <v-text-field outlined dense type="text" label="จังหวัด" v-model="form.contect_province" :rules="[]"></v-text-field>
                        <v-text-field outlined dense type="text" label="รหัสไปรษณีย์" v-model="form.contect_zipcode" :rules="[]"></v-text-field> -->
                        <addressinput-subdistrict v-model="form.contect_subdistrict"/> <!-- อำเภอ/เขต -->
                        <addressinput-district v-model="form.contect_amphur"/> <!-- จังหวัด -->
                        <addressinput-province  v-model="form.contect_province"  /> <!-- รหัสไปรษณีย์ -->
                        <addressinput-zipcode  v-model="form.contect_zipcode" /><br>
                        <v-text-field outlined dense type="text" label="Note" v-model="form.note" :rules="[]"></v-text-field>
                        <!-- <v-text-field outlined dense type="text" label="Line Token" v-model="form.line_token" :rules="[]"></v-text-field> -->
                        <div class="flex">
                            <v-spacer></v-spacer>
                            <v-btn @click="(form.id)?update():store()" :color="(form.id)?'warning':'success'">บันทึกข้อมูล</v-btn>
                        </div>
                    </v-form>

                </div>
            </v-card-text>
        </v-card>
    </v-dialog>

    <v-toolbar color="transparent" flat>
        <h2 class="font-semibold text-2xl">การจัดการข้อมูล</h2>
        <v-spacer></v-spacer>
        <v-btn @click="dialog=true" depressed small color="success" dark>
            <v-icon>mdi-plus</v-icon> เพิ่มข้อมูล
        </v-btn>
    </v-toolbar>

    <v-data-table v-if="response" :search="search" :headers="headers" :items="items">

        <template v-slot:top>
            <v-text-field outlined dense v-model="search" label="ค้นหา" class="mx-4 pt-2"></v-text-field>
        </template>

        <template v-slot:item.created_at="{ item }">
            <div class="p-2">
                <h2 class="font-normal"> <b>สร้าง: </b> {{item.created_at}}</h2>
                <h2 class="font-normal" v-if="item.created_at != item.updated_at"> <b>แก้ไข: </b> {{item.updated_at}}</h2>
            </div>
        </template>
        <template v-slot:item.updated_at="{ item }">

        </template>
        <template v-slot:item.action="{ item }">
            <v-btn depressed @click="openUpdateDialog(item)" color="warning" small>
                <v-icon>mdi-pencil</v-icon>แก้ไข
            </v-btn>
            <v-btn depressed @click="remove(item)" color="error" small>
                <v-icon>mdi-delete</v-icon> ลบ
            </v-btn>
        </template>

    </v-data-table>
    <v-skeleton-loader v-if="!response" type="date-picker"></v-skeleton-loader>

</div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
export default {
    data: () => {
        return {
            req: v => !!v || "ฟิลล์นี้ต้องระบุข้อมูล",
            items: [],
            headers: [

                {
                    text: 'No',
                    value: 'no',
                },
                {
                    text: 'Line ID',
                    sortable: true,
                    value: 'line_id',
                }, {
                    text: 'ชื่อ',
                    sortable: true,
                    value: 'contect_firstname',
                }, {
                    text: 'นามสกุล',
                    sortable: true,
                    value: 'contect_lastname',
                }, {
                    text: 'เบอร์โทร',
                    sortable: true,
                    value: 'contect_tel',
                }, {
                    text: 'ที่อยู่',
                    sortable: true,
                    value: 'contect_address1',
                }, {
                    text: 'ถนน',
                    sortable: true,
                    value: 'contect_address2',
                }, {
                    text: 'ตำบล',
                    sortable: true,
                    value: 'contect_subdistrict',
                }, {
                    text: 'อำเภอ',
                    sortable: true,
                    value: 'contect_amphur',
                }, {
                    text: 'จังหวัด',
                    sortable: true,
                    value: 'contect_province',
                }, {
                    text: 'รหัสไปรษณีย์',
                    sortable: true,
                    value: 'contect_zipcode',
                }, {
                    text: 'Note',
                    sortable: true,
                    value: 'note',
                }, {
                    text: 'วันที่สร้าง/แก้ไข',
                    sortable: true,
                    value: 'created_at',
                },
                {
                    text: 'จัดการ',
                    sortable: false,
                    value: 'action',
                }
            ],
            page: 1,
            maxPage: 3,
            search: "",
            form: {},
            response: false,
            dialog: false,
        };
    },
    async created() {
        await this.run();
    },
    methods: {
        async run() {
            this.response = false;
            this.items = await this.$core.getHttp(`/api/customer`);

            this.items = this.items.map((item, index) => {
                item.no = index + 1
                item.created_at = this.$kit.cd(item.created_at)
                item.updated_at = this.$kit.cd(item.updated_at)
                return item
            })
            await this.closeDialog()
            this.response = true;
        },

        async closeDialog() {
            this.form = {}
            this.dialog = false;
        },
        async openUpdateDialog(item) {
            this.form = item
            this.dialog = true
        },
        async update() {

            this.dialog = false
            let check = await this.$web.confirm('คุณแน่ใจใช่ไหมที่จะแก้ไขข้อมูลนี้')
            if (check && this.$refs.form.validate()) {
                let data = await this.$core.putHttp('/api/customer/' + this.form.id, this.form)
                if (data.id) {
                    await this.$web.alertAuto('บันทึกข้อมูลสำเร็จ');
                    await this.closeDialog()
                    await this.run()
                } else {
                    await this.$web.alertAuto('ลบข้อมูลไม่สำเร็จ', '1000', 'error');
                }
            } else {
                this.dialog = true
            }
        },
        async remove(item) {
            let check = await this.$web.confirm('คุณแน่ใจใช่ไหมที่จะลบข้อมูลนี้')
            if (check) {
                let data = await this.$core.deleteHttp('/api/customer/' + item.id)
                if (data) {
                    await this.$web.alertAuto('ลบข้อมูลสำเร็จ');
                }
                await this.closeDialog()
                await this.run()
            }
        },

        async store() {
            if (this.$refs.form.validate()) {
                let data = await this.$core.postHttp(`/api/customer`, this.form)
                if (data.id) {
                    await this.$web.alertAuto(`บันทึกข้อมูลสำเร็จ`);
                    await this.run();
                } else {
                    this.dialog = false
                    await this.$web.alertAuto('บันทึกข้อมูลไม่สำเร็จ', 2000, 'error');
                    await this.run();
                }
            }
        }
    }
}
</script>
