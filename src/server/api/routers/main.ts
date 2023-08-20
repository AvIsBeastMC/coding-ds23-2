import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const mainRouter = createTRPCRouter({
  getCategories: publicProcedure
    .query(async ({ ctx, input }) => {
      const {prisma} = ctx;

      const query = await prisma.category.findMany({})

      return query;
    }),
  getImagefromCategories: publicProcedure
    .input(z.object({
      categories: z.string().array(),
      localStorage: z.string().array()
    }))
    .mutation(async ({ctx, input}) => {
      const {prisma} = ctx;
      const {categories, localStorage} = input;

      const query = await prisma.image.findMany({
        include: {
          category: true,
          personality: true
        }
      })

      const filterThroughLocalStorage = query.filter((q) => !localStorage.includes(q.url))

      const filtered = filterThroughLocalStorage.filter((i) => {
        const imageCategories = i.category.map((c) => c.name);
        categories;

        const boolean = imageCategories.some((c) => categories.includes(c))

        return boolean;
      })

      return filtered[Math.floor(Math.random() * filtered.length)];
    })
});
