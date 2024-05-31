const { gql } = require('apollo-server')


const typeDefs = gql`

    type Admin {
        id: ID
        name: String
        lastname: String
        email: String
        created: String
        admin: String
    }

    type User {
        id: ID
        name: String
        lastname: String
        email: String
        created: String  
    }

    type Character {
        id: ID
        name: String
        titan: String
        skills: String
        history: String
        picture: String
        uploadedBy: ID
    }

    type Titan {
        id: ID
        name: String
        host: String
        skill: String
        history: String
        picture: String
        uploadedBy: String
        created: String
    }

    type AnimeSummary {
        id: ID
        season: Int
        resume: String
        picture: String
        uploadedBy: String
        created: String
    }

    type WhereToSee {
        id: ID
        episode: Int
        season: Int
        synopsis: String
        link: String
        picture: String
        uploadedBy: String
        created: String
    }

    type MilitaryDivision {
        id: ID
        division: MilitaryDivisionEnum
        purpose: String
        picture: String
        uploadedBy: String
        created: String
    }

    type BackOf {
        id: ID
        title: String
        description: String
        imgRef: String
        uploadedBy: String
        created: String
    }

    type Token {
        token: String
    }
    
    input AuthenticateInput {
        email: String!
        password: String!
    }

    input AdminInput {
        name: String!
        lastname: String!
        email: String!
        password: String!

    }    

    input UpdateAdminInput {
        name: String
        lastname: String
        email: String
    }    

    input UserInput {
        name: String!
        lastname: String!
        email: String!
        password: String!
    }    

    input UpdateUserInput {
        name: String
        lastname: String
        email: String
    }    

    input CharacterInput {
        name: String!
        titan: String!
        skills: String!
        history: String!
        picture: String
    }

    input UpdateCharacterInput {
        name: String
        titan: String
        skills: String
        history: String
        picture: String
    }

    input TitanInput {
        name: String!
        host: String!
        skill: String!
        history: String!
        picture: String
    }

    input UpdateTitanInput {
        name: String
        host: String
        skill: String
        history: String
        picture: String
    }

    input AnimeSummaryInput {
        season: Int!
        resume: String!
        picture: String!
    }

    input UpdateAnimeSummaryInput {
        season: Int
        resume: String
        picture: String
    }

    input WhereToSeeInput {
        episode: Int!
        season: Int!
        synopsis: String!
        link: String!
        picture: String
    }

    input UpdateWhereToSeeInput {
        episode: Int
        season: Int
        synopsis: String
        link: String
        picture: String
    }

    input MilitaryDivisionInput {
        division: MilitaryDivisionEnum!
        purpose: String!
        picture: String
    }

    input updateMilitaryDivisionInput {
        division: MilitaryDivisionEnum
        purpose: String
        picture: String
    }

    enum MilitaryDivisionEnum {
        RECRUIT_TROOP
        SCOUT_REGIMENT
        GARRISON_REGIMENT
        MILITARY_POLICE_BRIGADE
    }

    input BackOfInput {
        title: String
        description: String
        imgRef: String
    }

    type Query {
        # Admins
        getAdmin : Admin

        # Users
        getUser : User

        # Characters
        getCharacters : [ Character ]
        getCharacter( id: ID! ) : Character

        # Titans
        getTitans : [ Titan ]
        getTitan( id: ID! ) : Titan

        # Summary of anime
        getAnimeSummaries : [ AnimeSummary ]
        getAnimeSummary( id: ID! ) : AnimeSummary

        # Where to see
        getWhereToSees : [ WhereToSee ]
        getWhereToSee( id: ID! ) : WhereToSee

        # Military Divisions
        getMilitaryDivisions : [MilitaryDivision]
        getMilitaryDivision( id : ID! ) : MilitaryDivision

        # Back Of
        getBackOfs : [ BackOf ]
        getBackOf( id: ID! ) : BackOf
    }

    type Mutation {
        # Admins
        newAdmin( input: AdminInput ) : Admin
        authenticateAdmin( input: AuthenticateInput ) : Token
        updateAdmin( id: ID!, input: UpdateAdminInput ) : Admin

        # Users
        newUser( input: UserInput ) : User
        authenticateUser( input: AuthenticateInput ) : Token
        updateUser( id: ID!, input: UpdateUserInput ) : User

        # Characters
        newCharacter(input: CharacterInput) : Character
        updateCharacter(id: ID!, input : UpdateCharacterInput ) : Character
        deleteCharacter(id: ID!) : String

        # Titans
        newTitan( input: TitanInput ) : Titan
        updateTitan( id: ID!, input: UpdateTitanInput ) : Titan
        deleteTitan( id: ID! ) : String

        # Summary of anime
        newAnimeSummary( input: AnimeSummaryInput ) : AnimeSummary
        updateAnimeSummary( id: ID!, input: UpdateAnimeSummaryInput ) : AnimeSummary
        deleteSummary( id: ID! ) : String

        # Where to see
        newWhereToSee( input: WhereToSeeInput ) : WhereToSee
        updateWhereToSee( id: ID!, input: UpdateWhereToSeeInput ) : WhereToSee
        deleteWhereToSee( id: ID! ) : String

        # Military Divisions
        newMilitaryDivision( input: MilitaryDivisionInput ) : MilitaryDivision
        updateMilitaryDivision( id: ID! , input: updateMilitaryDivisionInput ) : MilitaryDivision
        deleteMilitaryDivision( id: ID! ) : String

        # Back Of
        newBackOf( input: BackOfInput ) : BackOf
        updateBackOf( id: ID!, input: BackOfInput ) : BackOf
        deleteBackOf( id: ID! ) : String
    }
`
//  AQUI EMPIEZAN LOS CAMBIOS 
module.exports = typeDefs;