import * as mongoose from  'mongoose'
import { Group } from '../Group/group.model'

export interface Sub extends mongoose.Document{
    name: String,
    format: String,
    anime: String,
    episode: number,
    maker: String,
    recomendedRaw: String,
    isPack: boolean,
    group: Group
}

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength:256
    },
    format: {
        type: String,
        required: true,
        maxlength: 5
    },
    anime: {
        type: String,
        required: true,
        maxlength: 256
    },
    episode: {
        type: Number,
        required: true
    },
    maker: {
        type: String,
        required: false
    },
    recomendedRaw:{
        type: String,
        required: false
    },
    isPack:{
        type: Boolean,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: false
    }
})

export const Sub = mongoose.model<Sub>('Sub', subSchema)