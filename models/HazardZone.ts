import mongoose, { Schema, type InferSchemaType } from "mongoose";

const pointSchema = new Schema({ type: { type: String, enum:["Point"], required:true, default:"Point" }, coordinates:{ type:[Number], required:true } }, { _id:false });
const hazardZoneSchema = new Schema({
  name:{type:String,required:true}, state:{type:String,required:true,index:true}, location:{type:pointSchema,required:true,index:"2dsphere"},
  hazardType:{type:String,enum:["landslide","flash_flood","slope_failure"],required:true}, riskScore:{type:Number,min:0,max:100,required:true},
  rainfall24h:{type:Number,min:0,required:true}, slopeAngle:{type:Number,min:0,max:90,required:true}, soilSaturation:{type:Number,min:0,max:100,required:true},
  status:{type:String,enum:["normal","watch","warning","evacuate"],required:true}, affectedRoads:[String], isolatedVillages:[String]
}, { timestamps:true });
export type HazardZoneDocument = InferSchemaType<typeof hazardZoneSchema>;
export default mongoose.models.HazardZone ?? mongoose.model("HazardZone", hazardZoneSchema);
