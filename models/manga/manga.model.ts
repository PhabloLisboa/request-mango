import * as mongoose from 'mongoose'


export interface Manga extends mongoose.Document{
    name: string,
    alternativeNames: string[],
    author: string[],
    generes:string[],
    publication: Date,
    status: string,
    chapters: number,
    volumes: number,
    sinopse: string,  
}

const mangaSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    alternativeNames:{
        type: [String]
    },
    author:{
        type: [String],
        required: true
    },
    generes:{
        type: [String],
        required: true
    },
    publication:{
        type: Date,
    },
    status:{
        type: String,
        required: true
    },
    chapters:{
        type: Number,
    },
    volumes:{
        type: Number,
    },
    sinopse:{
        type: Text,    
    },
})

export const Manga = mongoose.model<Manga>('Manga', mangaSchema)