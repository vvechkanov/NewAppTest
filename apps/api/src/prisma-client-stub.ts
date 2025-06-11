export class PrismaClient {
  game = {
    findMany: () => [],
    create: (args: any) => args,
  };
  user = {
    findUnique: async (_: any) => ({} as any),
    create: async ({ data }: any) => ({ id: '1', ...data }),
    update: async ({ where, data }: any) => ({ id: where.id, ...data }),
  };
  async $disconnect() {}
}
