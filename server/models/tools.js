import mongoose from 'mongoose'
import timestamps from 'mongoose-timestamp'

mongoose.Promise = global.Promise

const Schema = mongoose.Schema

const CDMSchema = new Schema({
  mode: {
    type: String,
    required: true
  },
  runs: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
})

const H2Schema = new Schema()
const EmailSchema = new Schema()

const ToolSchema = new Schema({
  tester: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  fw: {
    type: String,
    required: true
  },
  toolname: {
    type: String,
    required: true
  },
  randomTag: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'ready'  //'ready', 'executing', 'success', 'failure'
  },
  CDM: CDMSchema,
  H2: H2Schema,
  EMAIL: EmailSchema
})

ToolSchema.plugin(timestamps)

export default mongoose.model('Tool', ToolSchema)
