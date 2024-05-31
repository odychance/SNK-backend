const Admin = require('../models/Admin')
const AnimeSummary = require('../models/AnimeSummary')
const BackOf = require('../models/BackOf')
const Character = require('../models/Character')
const MilitaryDivision = require('../models/MilitaryDivision')
const Titan = require('../models/Titan')
const User = require('../models/User')
const WhereToSee = require('../models/WhereToSee')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path : 'variables.env'});

const createToken = ( user, secret, expiresIn ) => {
    console.log(user)
    const { id, email, name, lastname, admin, created } = user

    return jwt.sign( { id, email, name, lastname, admin, created }, secret, { expiresIn } )
}

//RESOLVERS
const resolvers = {
    Query: {

        //#Admin

        getAdmin: async ( _, {}, ctx ) => {
            console.log(ctx.admin)
            return ctx.admin
        },

        //#User
// AQUI EMPIEZAN LOS CAMBIOS!
        getUser: async ( _, {}, ctx ) => {
            return ctx.user
        },

        //#Character
        
        getCharacters: async () => {
            try {
                const character = await Character.find({})
                return character
            } catch (error) {
               console.log(error) 
            }
        },

        getCharacter: async (_, { id }) => {
            //Revisar si existe el producto
            const character = await Character.findById(id)

            if(!character) {
                throw new error('Character not found.')
            }

            return character
        },

        //#Titans

        getTitans: async () => {
            try {
                const titan = await Titan.find({})
                return titan
            } catch (error) {
                console.log(error)
            }
        },

        getTitan: async ( _, { id } ) => {
            const titan = await Titan.findById(id)

            if(!titan) {
                throw new Error('Titan not found.')
            }

            return titan
        },

        //#Summary

        getAnimeSummaries: async () => {
            try {
                const animeSummaries = await AnimeSummary.find({})
                return animeSummaries
            } catch (error) {
                console.log(error)
            }
        },

        getAnimeSummary: async ( _, { id } ) => {
            const animeSummary = await AnimeSummary.findById(id)

            if(!animeSummary) {
                throw new Error('Summary not found.')
            }

            return animeSummary
        },

        //#Where To See
        getWhereToSees: async () => {
            try {
                const whereToSees = await WhereToSee.find({})
                return whereToSees
            } catch (error) {
                console.log(error)                
            }
        },

        getWhereToSee: async ( _, { id } ) => {
            const whereToSee = await WhereToSee.findById(id)
            
            if(!whereToSee) {
                throw new Error('Link not found')
            }

            return whereToSee
        },

        //Military Division
        getMilitaryDivisions: async () => {
            const militaryDivisions = await MilitaryDivision.find({})

            if(!militaryDivisions) {
                throw new Error('Division not found.')
            }

            return militaryDivisions
        },

        getMilitaryDivision: async ( _, { id } ) => {

            const militaryDivision = await MilitaryDivision.findById(id)

            if(!militaryDivision) {
                throw new Error('Division not found.')
            }

            return militaryDivision
        },

        //Back Of
        getBackOfs: async () => {
            const backOfs = await BackOf.find({})

            if(!backOfs) {
                throw new Error('Information not found.')
            }

            return backOfs
        },

        getBackOf: async ( _, { id } ) => {
            const backOf = await BackOf.findById(id)

            if(!backOf) {
                throw new Error('Information not found.')
            }

            return backOf
        }
    },

    Mutation: {

        // #ADMIN

        newAdmin: async ( _, { input } ) => {
            const { email, password } = input

            //Revisar si existe el usuario
            const adminExists = await Admin.findOne({email})
            if(adminExists) {
                throw new Error('Already admin has been exists.')
            }

            //Hashear el password
            const salt = await bcryptjs.genSalt(10)
            input.password = await bcryptjs.hash(password, salt)

            //Guardar en DB
            try {
                const admin = new Admin(input)
                admin.save()
                return admin 
            } catch (error) {
                console.log(error)
            }
        },

        authenticateAdmin: async ( _, { input } ) => {
            const { email, password } = input
            //Revisar si existe usuario
            const adminExists = await Admin.findOne({email})
            if(!adminExists) {
                throw new Error("Admin doesn't exists")
            }

            //Revisar password
            const rightPassword = await bcryptjs.compare( password, adminExists.password)
            if(!rightPassword) {
                throw new Error('Wrong password.')
            }
            
            //Crear token
            return {
                token: createToken(adminExists, process.env.SECRET, '24h')
            }
        },

        updateAdmin: async ( _, { id, input } ) => {
            let admin = await Admin.findById(id)

            admin = await Admin.findOneAndUpdate( { _id : id }, input, { new: true } )

            return admin
        },

        // #USER


        newUser: async (_, { input } ) => { 

            const { email, password } = input

            //Revisar si el usuario ya esta registrado
            const userExists = await User.findOne({email})
            if(userExists) {
                throw new Error('Already user has been exists.')
            }
            
            //Hashear el password
            const salt = await bcryptjs.genSalt(10)
            input.password = await bcryptjs.hash(password, salt)

            //Guardar en la Base de datos
            try {  
                const user = new User(input)
                user.save()
                return user;
            } catch (error) {
                console.log(error)
            }
        },

        authenticateUser: async ( _, {input} ) => {

            const { email, password } = input

            //Revisar si existe usuario
            const userExists = await User.findOne({email})

            if(!userExists) {
                throw new Error(`User doesn't exists.`)
            }

            //Revisar si el password es correcto
            const rightPassword = await bcryptjs.compare( password, userExists.password)
            if(!rightPassword) {
                throw new Error('Wrong password.')
            }
            //Crear el token
            return {
                token: createToken(userExists, process.env.SECRET, '24h')
            }
        },

        updateUser: async ( _, { id, input } ) => {
            let user = await User.findById(id)

            user = await User.findOneAndUpdate( { _id : id }, input, { new: true } )
            
            return user
        },

        // #CHARACTER

        newCharacter: async ( _, { input }, ctx ) => {

            //REVISAR SI EXISTE EL PERSONAJE

            const { name } = input
            
            const character = await Character.findOne({name})
            if(character) {
                throw new Error('Already character has been exists.')
            }

            const newCharacter = new Character(input)
            
            //ASIGNAR CREADOR
            
            newCharacter.uploadedBy = ctx.admin.id
            
            //GUARDAR
            try {
                const result = await newCharacter.save()
                return result

            } catch (error) {
                console.log(error)                
            }
        },

        updateCharacter: async ( _, { id, input }, ctx ) => {

            //Revisar que exista el personaje
            let character = await Character.findById(id)

            if(!character) {
                throw new Error("Character not found.")
            }

            //Guardar en la base de datos
            character = await Character.findOneAndUpdate( { _id : id }, input, { new: true } )

            character.uploadedBy = ctx.admin.id
            await character.save()
            return character
        },

        deleteCharacter: async ( _, { id } ) => {
            //Revisar si eiste el personaje
            let character = await Character.findById(id)

            if(!character) {
                throw new Error("Character not found.")
            }

            //Eliminamos
            await Character.findOneAndDelete({ _id: id })

            return "Character deleted."
        },

        // #TITAN

        newTitan: async ( _, { input }, ctx) => {

            const { name } = input

            //Revisamos si existe el titan
            const titan = await Titan.findOne({ name })

            if(titan) {
                throw new Error('Already titan has been exists.')
            }

            const newTitan = new Titan(input)
            
            //Asignar creador
            newTitan.uploadedBy = ctx.admin.id

            //Guardar
            try {  
                const result = await newTitan.save()

                return result
                
            } catch (error) {
                console.log(error)
            }
        },

        updateTitan: async (_, { id, input }, ctx ) => {

            //Revisar si existe el titan
            let titan = await Titan.findById(id)

            if(!titan) {
                throw new Error('Titan not found.')
            }

            //Guardar en base de datos
            titan = await Titan.findOneAndUpdate( { _id : id }, input, { new: true } )

            titan.uploadedBy = ctx.admin.id
            await titan.save()
            return titan
        },

        deleteTitan: async ( _, { id } ) => {

            //Revisar si existe el titan
            let titan = await Titan.findById(id)

            if(!titan) {
                throw new Error('Titan not found.')
            }

            //Eliminamos el dato
            await Titan.findOneAndDelete({ _id : id })
            return "Titan deleted."
        },

        //#Summary

        newAnimeSummary: async ( _, { input }, ctx ) => {

            const { season } = input

            //Revisar que no exista
            let animeSummary = await AnimeSummary.findOne( { season } )
            if(animeSummary) {
                throw new Error('Already summary has been exists')
            }

            const newAnimeSummary = new AnimeSummary(input)
            //Asignar creador

            newAnimeSummary.uploadedBy = ctx.admin.id

            //Guardar
            try {
                const result = await newAnimeSummary.save()

                return result
            } catch (error) {
                console.log(error)
            }
        },

        updateAnimeSummary: async ( _, { id, input }, ctx ) => {
            
            // Revisar que existe el resumen
            let animeSummary = await AnimeSummary.findById(id)

            if(!animeSummary) {
                throw new Error('Summary not found.')
            }

            // Guardar datos
            animeSummary = await AnimeSummary.findOneAndUpdate( { _id : id }, input , { new : true })
            animeSummary.uploadedBy = ctx.admin.id

            await animeSummary.save()
            return animeSummary
        },

        deleteSummary: async (_, { id } ) => {
            const animeSummary = await AnimeSummary.findById(id)

            if(!animeSummary) {
                throw new Error('Summary not found.')
            }

            await AnimeSummary.findOneAndDelete({ _id : id})
            return "Summary deleted."
        },

        //# Where to see
        newWhereToSee: async ( _, { input }, ctx ) => {

            const { episode } = input
            //Verificar si existe el capitulo
            let whereToSee = await WhereToSee.findOne({episode})

            if(whereToSee) {
                throw new Error('Already episode has been exists')
            }

            const newWhereToSee = new WhereToSee(input)
            //Asignar admin
            newWhereToSee.uploadedBy = ctx.admin.id

            //Guardar datos
            try {
                const result = await newWhereToSee.save()
                return result
            } catch (error) {
                console.log(error)
            }
        },

        updateWhereToSee: async ( _, { id, input }, ctx ) => {
            //Revisamos si existe
            let whereToSee = await WhereToSee.findById(id)

            if(!whereToSee) {
                throw new Error('Episode not found.')
            }

            //guardamos datos
            whereToSee = await WhereToSee.findOneAndUpdate( { _id : id }, input, { new: true } )
            whereToSee.uploadedBy = ctx.admin.id

            await whereToSee.save()
            return whereToSee
        },

        deleteWhereToSee: async ( _, { id } ) => {
            const whereToSee = await WhereToSee.findById(id)

            if(!whereToSee) {
                throw new Error('Episode not found.')
            }

            await WhereToSee.findOneAndDelete( { _id : id } )
            return "Episode deleted."
        },

        //# Military Divisions
        newMilitaryDivision: async ( _, { input }, ctx ) => {
            const { division } = input

            // Verificar si existe
            let militaryDivision = await MilitaryDivision.findOne({division})
            if(militaryDivision) {
                throw new Error('Already this division has been exists.')
            }

            const newMilitaryDivision = new MilitaryDivision(input)
            newMilitaryDivision.uploadedBy = ctx.admin.id

            // Guardar datos
            try {
                const result = await newMilitaryDivision.save()
                return result
            } catch (error) {
                console.log(error)
            }
        },

        updateMilitaryDivision: async ( _, { id, input }, ctx ) => {

            // Revisar si existe la division
            let militaryDivision = await MilitaryDivision.findById(id)

            if(!militaryDivision) {
                throw new Error('Military division not found.')
            }

            //actualizamos info
            militaryDivision = await MilitaryDivision.findOneAndUpdate( { _id : id }, input, { new : true } )
            militaryDivision.uploadedBy = ctx.admin.id   

            // guardamos cambios
            await militaryDivision.save()
            return militaryDivision
        },

        deleteMilitaryDivision: async ( _, { id } ) => {

            const militaryDivision = await MilitaryDivision.findById(id)

            if(!militaryDivision) {
                throw new Error('Military division not found.')
            }

            await MilitaryDivision.findOneAndDelete( { _id : id } )
            return "Military division deleted."

        },

        //# BackOf
        newBackOf: async ( _, { input }, ctx ) => {

            const { title } = input

            const backOf = await BackOf.findOne({title})

            if(backOf) {
                throw new Error('Already information has been exists.')
            }

            let newBackOf = new BackOf(input)
            newBackOf.uploadedBy = ctx.admin.id

            await newBackOf.save()
            return newBackOf
        },

        updateBackOf: async ( _, { id, input }, ctx ) => {
            let backOf = await BackOf.findById(id)
            
            if(!backOf) {
                throw new Error('Information not found.')
            }

            backOf = await BackOf.findOneAndUpdate( { _id: id }, input, { new: true } )
            backOf.uploadedBy = ctx.admin.id

            await backOf.save()
            return backOf

        },

        deleteBackOf: async ( _, { id } ) => {
            const backOf = await BackOf.findById(id)

            if(!backOf) {
                throw new Error('Information not found.')
            }

            await BackOf.findOneAndDelete({ _id : id })
            return "Information deleted."
        }
    }
}

module.exports = resolvers;