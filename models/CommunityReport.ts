import mongoose, { Schema, type InferSchemaType } from "mongoose";
const locationSchema = new Schema({ type:{type:String,enum:["Point"],default:"Point",required:true}, coordinates:{type:[Number],required:true} },{_id:false});
const communityReportSchema = new Schema({
  reporterName:{type:String,required:true,trim:true}, contact:{type:String,required:true,trim:true}, location:{type:locationSchema,required:true,index:"2dsphere"},
  hazardType:{type:String,required:true}, description:{type:String,required:true,maxlength:1200}, verified:{type:Boolean,default:false}, createdAt:{type:Date,default:Date.now}
});
export type CommunityReportDocument = InferSchemaType<typeof communityReportSchema>;
export default mongoose.models.CommunityReport ?? mongoose.model("CommunityReport", communityReportSchema);
