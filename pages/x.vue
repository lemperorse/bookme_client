<template>
    <div>
        <br><br>
        <!-- <pre>{{maps}}</pre> -->
        <textarea rows="100" class="w-full border-2 border-green-500 ">
            {{t}}
            {{forms}}
            {{tables}}
            {{et}}
            {{script}}
        </textarea>
    </div>
    </template>
    
    <script>
        import axios from '@/plugins/axios'
        import _ from 'lodash'
        export default {
            layout:'test',
            data: () => {
                return ({
                    t: '<template> <div class="p-6"> ',
                    et: '</div> </template>',
                    dhtml: '',
                    forms: '',
                    tables: '',
                    script: '',
                    host: '/api/genform?table=customers',
                    api:'/api/customer',
                    maps:{}
                })
            },
            async created() {
          
                let data = await axios.get(`${this.host}`).then(
                    (r) => {
                        return r.data
                    }
                )
                let lists = data
                let objs = Object.keys(lists);
                let raw = _.values(lists)
                let maps = _.map(raw, (r, index) => {
                    let obj = r
                    obj.key = r.Field
                    obj.type2 = 'string'
                    obj.type = (r.Type.indexOf('int') > -1) ? 'number' : (r.Type.indexOf('date') > -1) ? 'date' : 'string'
                    obj.label = (r.type == "nested object") ? obj.Comment + '(FK)' : obj.Comment
                    return obj
                })
                this.maps = maps
                this.forms = await this.genForm(maps)
                this.tables = await this.getDatable(maps)
                this.script = await this.getScript(maps)
            },
            methods: {
                async genForm(maps) {
                    let html = `<v-form ref="form">\n`
                    for (let index = 0; index < maps.length; index++) {
                        let f = maps[index]
                        if(f.key != 'id' && f.key != 'created_at' && f.key != 'updated_at'&& f.key != 'ect'){
                         html = html + `<v-text-field  outlined dense  type="${this.getType(f.type)}"  label="${f.label}" v-model="form.${f.key}"  :rules="[${(f.required)?"v => !!v || '"+ f.label +" ต้องระบุข้อมูล' ":""}]" ></v-text-field>\n`
    
                        }
                    }
                    html = html + `<div class="flex">
                            <v-spacer></v-spacer>
                            <v-btn @click="(form.id)?update():store()" :color="(form.id)?'warning':'success'">บันทึกข้อมูล</v-btn>
                        </div>\n`
                    html = html + '</v-form>\n'
    
                    let data = `
                 <v-dialog \n
                    v-model="dialog"
                    scrollable   
                    persistent 
                    max-width="500px"
                    transition="dialog-transition"
                >  
                    <v-card>  
                    <v-card-title primary-title> 
                        จัดการข้อมูล <v-spacer></v-spacer>
                        <v-btn text @click="run()" color="error"><v-icon>mdi-close</v-icon></v-btn> 
                    </v-card-title> 
                    <v-card-text> 
                        <div class="mt-2">
                            ${html} 
                            </div>
                    </v-card-text> 
                    </v-card> 
                </v-dialog> 
                `
                    return data
                },
                async getDatable(maps) {
                        let html = ''
                        html = html + `
                          <v-toolbar color="transparent" flat><h2 class="font-semibold text-2xl">การจัดการข้อมูล</h2>
                         <v-spacer></v-spacer>
                        <v-btn   @click="dialog=true" depressed small color="success" dark><v-icon>mdi-plus</v-icon> เพิ่มข้อมูล</v-btn> 
                    </v-toolbar> \n
                  <v-data-table  v-if="response"   :search="search" 
                    :headers="headers"
                    :items="items"  >
    
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
                <v-skeleton-loader
          v-if="!response"
          type="date-picker"
        ></v-skeleton-loader>
                `
              
                return html
            },
            getType(type) {
                if (type == 'string') {
                    return 'text'
                } else if (type == 'integer') {
                    return 'number'
                }else {
                    return type
                }
            },
    
            getScript(datas){
                let html = '<script>'  
                html = html + 'import _ from "lodash";\n'
                 html = html + 'import moment from "moment";\n'
                html = html + 'export default {\n'
                html = html + 'data: () => {\n'
                html = html + 'return {\n'
                html = html + 'req: v => !!v || "ฟิลล์นี้ต้องระบุข้อมูล",\n' 
                html = html + 'items: [],\n'
                html = html + `headers: [\n
                \n{
                      text: 'No',  
                        value: 'no',
                },
                `
                for (let index = 0; index < datas.length; index++) {
                    let f = datas[index]
                    if(f.key != 'id' && f.key != 'ect' && f.key != 'updated_at'){
                    html = html + `{
                        text: '${(f.key == 'created_at')?'วันที่สร้าง/แก้ไข':f.label}', 
                        sortable: true,
                        value: '${f.key}',
                    },`
                }
                } 
                html = html + `\n{
                      text: 'จัดการ', 
                        sortable: false,
                        value: 'action',
                }],\n`
                html = html + 'page: 1,\n'
                html = html + 'maxPage: 3,\n'
                html = html + 'search: "",\n'  
                html = html + 'form: {},\n' 
                html = html + 'response: false,\n' 
                html = html + 'dialog: false,\n'
                html = html + '};\n'
                html = html + '},\n'
                html = html + 'async created() {\n'
                html = html + 'await this.run();\n'
                html = html + '},methods:{\n'
                html = html + 'async run() {\n'
                html = html + 'this.response = false;\n'
                html = html + 'this.items = await this.$core.getHttp(`'+this.api+'`);\n'
                html = html + `
                this.items = this.items.map((item,index) => {
                    item.no = index + 1
                    item.created_at = this.$kit.cd(item.created_at)
                    item.updated_at = this.$kit.cd(item.updated_at)
                    return item
                })
                ` 
                html = html + 'await this.closeDialog()\n'
                html = html + 'this.response = true;\n'
                html = html + '},\n'
                html = html +   this.genUpdate()
                html = html + 'async store() {\n'
                 html = html + 'if(this.$refs.form.validate()) {\n'
                html = html + 'let data = await this.$core.postHttp(`'+this.api+'`, this.form)\n'
                html = html + 'if (data.id) {\n'
                html = html + 'await this.$web.alertAuto(`บันทึกข้อมูลสำเร็จ`); \n await this.run(); }'+`else{
                        this.dialog = false
                        await this.$web.alertAuto('บันทึกข้อมูลไม่สำเร็จ',2000,'error'); 
                        await this.run();
                    }`+' \n}\n}\n}\n}\n </'+'script'+'>'
                html = html + ""
                  return html
            },
              genUpdate(){
                let html = `
                async closeDialog(){
                    this.form = {}
                    this.dialog = false; 
                },
                async openUpdateDialog(item){
                    this.form = item
                    this.dialog = true
                }, 
                async update() {\n 
                    this.dialog = false
                    let check = await this.$web.confirm('คุณแน่ใจใช่ไหมที่จะแก้ไขข้อมูลนี้')
                    if(check && this.$refs.form.validate()){
                    let data = await this.$core.putHttp('${this.api}/'+this.form.id,this.form)
                    if(data.id){
                        await this.$web.alertAuto('บันทึกข้อมูลสำเร็จ');
                        await this.closeDialog()
                        await this.run()
                    } else{
                            await this.$web.alertAuto('ลบข้อมูลไม่สำเร็จ','1000','error');
                    } }else{
                        this.dialog = true
                    }
                },  
                async remove(item){
                    let check = await this.$web.confirm('คุณแน่ใจใช่ไหมที่จะลบข้อมูลนี้')
                    if(check){
                        let data = await this.$core.deleteHttp('${this.api}/'+item.id)
                        if(data){
                            await this.$web.alertAuto('ลบข้อมูลสำเร็จ');
                        } 
                        await this.closeDialog()
                        await this.run()
                    }
                }, 
    
                `
                return html
            }  
    
        }
    }
    </script>
    
    <style>
    </style>
    