import * as mongoose from  'mongoose'
import * as bcrypt from 'bcrypt'

export interface Group extends mongoose.Document{
    name: String,
    password: String,
    site: String,
    description: String,
    match(password): boolean
    hasAnyProfile(...profiles: string[]): boolean
}

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 128
    },
    site: {
        type: String,
        required: false,
        maxlength: 128
    },
    description: {
        type: String,
        maxlength: 512
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role:{
        type: String,
        enum: ['admin','group']
    }
    
})


groupSchema.methods.match = function(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
}

groupSchema.methods.hasAnyProfile = function(...profiles: string[]): boolean {
    return profiles.some(profile => this.role.indexOf(profile) != -1 )
}

export const Group = mongoose.model<Group>('Group', groupSchema)