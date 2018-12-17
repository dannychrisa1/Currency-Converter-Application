<template>

<div>
      <v-layout class="mt-3">
          <v-flex  xs12 sm6 offset-sm3>
              
                <v-flex xs12>
                   <v-card class="service-photo">
              <v-img
              :src="image.srcA"
              height=600px
              img-fluid
            >
            </v-img>
          </v-card> 
            <v-layout class="app-background-body">
            </v-layout>
            <v-form ref="form" v-model="valid" class="pl-5 pr-5 reg-form  app-info">
              <v-layout class="p-2">
                  <v-flex xs12 sm12>
                    <h2 class="white--text app-title">Currency Converter</h2>
                  </v-flex>
                </v-layout>
                          <v-text-field
                          v-model="currencyValue"
                          :rules="currencyValueRules"
                          label="Enter Amount"
                          box
                          height:10px
                          color="black"
                          background-color="white"
                          type="number"
                          required
                          ></v-text-field>
                           <div class="loader" v-if="loader">
                              <!-- //display fetched data  -->
                            </div>
                             <div class="text-xs-center">
                        <v-dialog
                          v-model="dialog"
                          width="500"
                        >
                          <v-card>
                            <v-card-title
                              class="headline grey lighten-2"
                              primary-title
                            >
                              Network Error
                            </v-card-title>

                            <v-card-text>
                            Ooops! Network failed,check connection and retry
                          
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="black"
                                flat
                                @click="dialog = false"
                              >
                                OK
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                          
                          <div class="form-group" v-for="(value,index) in currencyData" :rules="currencyUnitARules" required>
                             <h6 class="grey--text">Convert from</h6>
                            <select class="form-control"  v-model="currencyUnitA" required>
                              <option value="">--select--</option>
                              <option v-for="data in value" :key="data.id" :value="data.id">{{data.id}}</option>
                            </select>
                            </div>
                            <div class="form-group" v-for="(value,index) in currencyData" :rules="currencyUnitBRules" required>
                               <h6 class="grey--text">Convert To</h6>
                            <select class="form-control"  v-model="currencyUnitB" required>
                              <option value="">--select--</option>
                              <option v-for="data in value" :key="data.id" :value="data.id">{{data.id}}</option>
                            </select>
                            </div>
                           <v-layout justify-center>
                             <v-card-actions>
                              <v-layout class="mb-3">
                              <v-btn dark round primary class="orange lighten-1 mt-3" @click="convert" :disabled="!valid || currencyUnitA == '' || currencyUnitB == ''">CONVERT</v-btn>
                          </v-layout>
                          </v-card-actions>
                          </v-layout>
                          
                         <v-layout class="mt-4" v-if="appIsRunning">
                          <v-text-field
                          label="Result"
                          v-model="convertedCurrency"
                          box
                          color="orange lighten-1"
                          background-color="white"
                          type="number"
                        ></v-text-field>
                      </v-layout>
                      </v-form>
                  </v-flex>
             
         
        </v-flex>
      </v-layout>
   </v-container>



</div>

</template>
<script>
import slideA from "@/assets/money.jpg"

import axios from "axios";
export default {
  data() {
    return {
      dialog: false,
        valid:false,
      currencyData: [],
      currencyUnitA: "",
      currencyUnitARules: [
        v => !!v || 'currencyUnit is required',
      ],
      currencyUnitB: "",
       currencyUnitBRules: [
        v => !!v || 'currencyUnit is required',
      ],
      currencyValue:"",
       currencyValueRules: [
        v => !!v || 'Amount is required',
      ],
     convertedCurrency:null,
     appIsRunning:false,
     loader:false,
       image: {
                srcA: slideA,
               },
    }
  },  
  created() {
    this.loader = true;
    axios
      .get( 
        "https://free.currencyconverterapi.com/api/v6/currencies"
         
      )
      .then(response => {
        console.log('network is slow');
        this.currencyData = response.data;
        this.loader = false;
       
      })
      .catch(e => {
      this.dialog = true;
      this.loader = false;
      });
  },
  methods: {
    convert() {

      this.valid = true;
       this.loader = true;
     const self = this;
     const currencyKey = `${this.currencyUnitA}_${this.currencyUnitB}`;
      axios
        .get(
           `http://free.currencyconverterapi.com/api/v5/convert?q=${
            this.currencyUnitA
          }_${this.currencyUnitB}&compact=ultra`
        )
        .then(response => {
          self.convertedCurrency = response.data[currencyKey];
          this.convertedCurrency *= this.currencyValue;
           this.loader= false;
           this.appIsRunning = true;
        });
    },
    
  }
};
</script>
<style>
.loader{
  position:absolute;
  left:35%;
  transform:translate(-50%,-50%);
  border:10px solid #f3f3;
  border-top:1px solid #3498db;
  border-radius:50%;
  width:50px;
  height:50px;
  animation:spin 2s linear infinite
}
@keyframes spin{
  0% {transform:rotate(0deg);}
  100% {transform:rotate(360deg);}
}
.app-background-body{
   height: 600px;
   background:black;
   position: relative;
   opacity:0.9;
   margin-top:-600px;
 }
 .app-info{
    margin-top:-540px;
  position: relative;
 }
.app-title{
  margin-top:-10px;
  font-family: sans-serif;
  margin-bottom: 40px;
}
</style>


