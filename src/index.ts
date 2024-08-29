import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    courses: async () => {
      return await prisma.course.findMany({
        include: {
          lessons: true,
          reviews: true,
        },
      });
    },

    course: async (_: any, args: { id: number }) => {
      return await prisma.course.findUnique({
        where: { id: args.id },
        include: {
          lessons: true,
          reviews: true,
        },
      });
    },

    courseTypes: async () => {
      const distinctCourses = await prisma.course.findMany({
        distinct: ["courseType"],
        select: {
          courseType: true,
        },
      });

      // Extract and return the distinct course types
      return distinctCourses.map((course) => course.courseType);
    },

    coursesByType: async (_: any, args: { courseType: string }) => {
      return await prisma.course.findMany({
        where: {
          courseType: args.courseType,
        },
        include: {
          lessons: true,
          reviews: true,
        },
      });
    },

    skills: async () => {
      // Fetch all courses with their skills
      const courses = await prisma.course.findMany({
        select: {
          skills: true,
        },
      });

      // Flatten the array of skills and remove duplicates
      const allSkills = courses.flatMap((course) => course.skills);
      const distinctSkills = Array.from(new Set(allSkills));

      return distinctSkills;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = parseInt(process.env.PORT || "4000");
await startStandaloneServer(server, {
  listen: { port: PORT },
});
