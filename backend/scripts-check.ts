import mongoose from "mongoose";
const run = async () => {
  await mongoose.connect(process.env.MONGO_URI!);
  const db = mongoose.connection.db!;
  const cols = await db.listCollections().toArray();
  for (const c of cols) {
    console.log(c.name, "->", await db.collection(c.name).countDocuments(), "docs");
  }
  const prods = await db.collection("products").find({}, { projection: { name: 1, slug: 1, sku: 1 } }).toArray();
  console.log("PRODUCTS:", JSON.stringify(prods, null, 2));
  console.log("PRODUCT INDEXES:", JSON.stringify(await db.collection("products").indexes()));
  await mongoose.disconnect();
};
run();
