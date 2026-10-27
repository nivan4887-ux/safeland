import mongoose, { Schema, type InferSchemaType } from "mongoose";
const alertDispatchSchema = new Schema({
  targetArea:{type:String,required:true}, severity:{type:String,enum:["LOW","MEDIUM","HIGH","CRITICAL"],required:true}, message:{type:String,required:true,maxlength:1200},
  recipients:[{type:String,enum:["Authorities","Citizens","Emergency Teams"]}], channels:[{type:String,enum:["SMS","WhatsApp","Siren"]}], timestamp:{type:Date,default:Date.now}
});
export type AlertDispatchDocument = InferSchemaType<typeof alertDispatchSchema>;
export default mongoose.models.AlertDispatch ?? mongoose.model("AlertDispatch", alertDispatchSchema);
