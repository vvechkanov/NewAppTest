/* eslint-disable @typescript-eslint/no-explicit-any */
export class PrismaClient {
  game = {
    findMany: () => [],
    create: (args: any) => args,
  };
  user = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findUnique: async (_args: any) => ({} as any),
    create: async ({ data }: any) => ({ id: '1', ...data }),
    update: async ({ where, data }: any) => ({ id: where.id, ...data }),
  };
  async $disconnect() {}
}
