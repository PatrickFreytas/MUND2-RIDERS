import prisma from "../lib/prisma";

const execute = async () => {
  const company = await prisma().company.create({
    data: {
      id: crypto.randomUUID(),
      name: "Mund2 Riders",
      phone: "123456789",
      email: "test@test.com",
      createdAt: new Date(),
    },
  });

  const users = await prisma().user.findMany();
  const response = await prisma().user.updateMany({
    where: { id: { in: users.map((u) => u.id) } },
    data: { companyId: company.id },
  });
  console.log(response);

  const products = await prisma().product.findMany();
  const productsResponse = await prisma().product.updateMany({
    where: { id: { in: products.map((p) => p.id) } },
    data: { companyId: company.id },
  });

  console.log(productsResponse);
  const categories = await prisma().category.findMany();
  const categoriesResponse = await prisma().category.updateMany({
    where: { id: { in: categories.map((c) => c.id) } },
    data: { companyId: company.id },
  });

};

execute().then(() => {
  console.log("Listo buey");
});
