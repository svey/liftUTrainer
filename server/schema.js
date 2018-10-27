const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const exercises = [
  {
    name: "Wall Extensions",
    type: "Warmup"
  },
  {
    name: "Band Dislocates",
    type: "Warmup"
  },
  {
    name: "Cat-Camels",
    type: "Warmup"
  },
  {
    name: "Scapular Shrugs",
    type: "Warmup"
  },
  {
    name: "Full Body Circles",
    type: "Warmup"
  },
  {
    name: "Front Leg Swings",
    type: "Warmup"
  },
  {
    name: "Side Leg Swings",
    type: "Warmup"
  },
  {
    name: "Wrist Mobility",
    type: "Warmup"
  },
  {
    name: "Handstands",
    type: "Skill"
  },
  {
    name: "Support",
    type: "Skill"
  },
  {
    name: "Pullups",
    type: "Strength"
  },
  {
    name: "Dips",
    type: "Strength"
  },
  {
    name: "Squats",
    type: "Strength"
  },
  {
    name: "L-Sits",
    type: "Strength"
  },
  {
    name: "Pushups",
    type: "Strength"
  },
  {
    name: "Rows",
    type: "Strength"
  }
];
const routines = [{ name: "bigginer", difficulty: 1, id: "1" }];

const ExerciseType = new GraphQLObjectType({
  name: "Exercise",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    type: { type: GraphQLString },
    routineId: { type: GraphQLString },
    routine: {
      type: RoutineType,
      resolve(parent, args) {
        return _.find(routines, { id: parent.routineId });
      }
    }
  })
});

const RoutineType = new GraphQLObjectType({
  name: "Routine",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    difficulty: { type: GraphQLInt },
    exercises: {
      type: GraphQLList(ExerciseType),
      resolve(parent, args) {
        return _.filter(exercises, { routineId: parent.id });
      }
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    exercise: {
      type: ExerciseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        return _.find(exercises, { id: args.id });
      }
    },
    routine: {
      type: RoutineType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(routines, { id: args.id });
      }
    },
    exercises: {
      type: new GraphQLList(ExerciseType),
      resolve() {
        return exercises;
      }
    },
    routines: {
      type: new GraphQLList(RoutineType),
      resolve() {
        return routines;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
