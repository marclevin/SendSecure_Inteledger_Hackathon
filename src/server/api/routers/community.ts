import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "$/src/server/api/trpc";
  import {
    communityGetSchema,
    communityUpdateSchema,
    communityGetOneSchema,
    UserSimplifiedSchema,
  } from "$/src/server/api/schemas/community";
  import { type Response } from "$/src/utils/types";
  
  export const communityRouter = createTRPCRouter({
    //get all campaigns by creator id
    get: publicProcedure
      .input(UserSimplifiedSchema)
      .query(async ({ input, ctx }) => {
        const response: Response = {
          success: true,
          message: "Communities Get",
          data: {},
        };
  
        const communities = await ctx.db.community.findMany({
            where: {
                creatorID: input.userId,
            },
            });
        return { ...response, ...{ data: communities } };
      }),
      // Get community by ID
    getOne: publicProcedure
    .input(communityGetOneSchema)
    .query(async ({ input, ctx }) => {
      const response: Response = {
        success: true,
        message: "Community Get",
        data: {},
      };

      const community = await ctx.db.community.findUnique({
        where: {
          id: input.id,
        },
      });
      return { ...response, ...{ data: community } };
    }),


  
    //get campaign by id
    // getOne: publicProcedure.input(idSchema).query(({ input, ctx }) => {
    //   return ctx.db.campaign.findUnique({
    //     where: idSchema.parse(input),
    //   });
    // }),
  
    // //delete campaign
    // deleteCampaign: protectedProcedure
    //   .input(idSchema)
    //   .mutation(({ input, ctx }) => {
    //     return ctx.db.campaign.delete({
    //       where: idSchema.parse(input),
    //     });
    //   }),
  });
  