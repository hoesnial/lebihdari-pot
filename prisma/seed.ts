import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt-ts";

const prisma = new PrismaClient();

async function main() {
  const password = await hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@lebihdari.pot" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@lebihdari.pot",
      password,
      role: "admin",
    },
  });
  console.log("  ✓ Admin user created:", admin.email);

  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "tanaman-hias" },
      update: {},
      create: {
        name: "Tanaman Hias",
        slug: "tanaman-hias",
        description:
          "Koleksi tanaman hias kurasi untuk mempercantik ruang indoor dan outdoor Anda.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "pot-planter" },
      update: {},
      create: {
        name: "Pot & Planter",
        slug: "pot-planter",
        description:
          "Pot dan planter berkualitas dari berbagai bahan — terakota, keramik, dan semen.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "media-tanam" },
      update: {},
      create: {
        name: "Media Tanam",
        slug: "media-tanam",
        description:
          "Media tanam siap pakai, pupuk organik, dan perlengkapan gardening.",
      },
    }),
    prisma.category.upsert({
      where: { slug: "aksesoris" },
      update: {},
      create: {
        name: "Aksesoris",
        slug: "aksesoris",
        description:
          "Aksesoris dan dekorasi pendukung untuk tampilan tanaman yang lebih menarik.",
      },
    }),
  ]);
  console.log(`  ✓ ${categories.length} categories created`);

  const products = [
    {
      name: "Monstera Deliciosa",
      slug: "monstera-deliciosa",
      description:
        "Tanaman hias tropis ikonik dengan daun berlubang unik. Cocok untuk sudut ruang tamu atau kantor.",
      price: 185000,
      categorySlug: "tanaman-hias",
      images: [],
      featured: true,
    },
    {
      name: "Sansevieria Laurentii",
      slug: "sansevieria-laurentii",
      description:
        "Lidah mertua dengan tepi kuning. Tanaman pembersih udara terbaik, sangat mudah dirawat.",
      price: 85000,
      categorySlug: "tanaman-hias",
      images: [],
      featured: true,
    },
    {
      name: "Calathea Orbifolia",
      slug: "calathea-orbifolia",
      description:
        "Daun lebar dengan corak perak yang elegan. Tanaman yang aktif bergerak mengikuti cahaya.",
      price: 145000,
      categorySlug: "tanaman-hias",
      images: [],
      featured: false,
    },
    {
      name: "Pothos Golden",
      slug: "pothos-golden",
      description:
        "Tanaman rambat populer dengan daun motif kuning keemasan. Sangat mudah beradaptasi.",
      price: 55000,
      categorySlug: "tanaman-hias",
      images: [],
      featured: true,
    },
    {
      name: "Palem Areca",
      slug: "palem-areca",
      description:
        "Palem areca dengan rumbai hijau segar. Penyaring udara alami dan peneduh ruangan.",
      price: 250000,
      categorySlug: "tanaman-hias",
      images: [],
      featured: false,
    },
    {
      name: "Pot Terakota Klasik 25cm",
      slug: "pot-terakota-25cm",
      description:
        "Pot terakota handmade dengan warna natural. Dilengkapi lubang drainase. Diameter 25cm.",
      price: 75000,
      categorySlug: "pot-planter",
      images: [],
      featured: true,
    },
    {
      name: "Pot Keramik Putih Minimalis",
      slug: "pot-keramik-putih",
      description:
        "Pot keramik glazed finish putih. Tampilan minimalis modern. Diameter 20cm.",
      price: 120000,
      categorySlug: "pot-planter",
      images: [],
      featured: false,
    },
    {
      name: "Planter Gantung Macrame",
      slug: "planter-gantung-macrame",
      description:
        "Planter gantung anyaman macrame berkualitas. Cocok untuk tanaman rambat kecil.",
      price: 65000,
      categorySlug: "pot-planter",
      images: [],
      featured: true,
    },
    {
      name: "Pot Semen Cor Garis",
      slug: "pot-semen-cor-garis",
      description:
        "Pot semen cor dengan motif garis geometris. Kokoh dan modern. Diameter 30cm.",
      price: 185000,
      categorySlug: "pot-planter",
      images: [],
      featured: false,
    },
    {
      name: "Media Tanam Siap Pakai 5L",
      slug: "media-tanam-siap-pakai",
      description:
        "Campuran tanah, sekam bakar, kompos, dan cocopeat. Siap pakai langsung.",
      price: 35000,
      categorySlug: "media-tanam",
      images: [],
      featured: true,
    },
    {
      name: "Pupuk Organik Cair 1L",
      slug: "pupuk-organik-cair",
      description:
        "Pupuk organik cair dari limbah dapur yang difermentasi. Kaya nutrisi untuk tanaman.",
      price: 45000,
      categorySlug: "media-tanam",
      images: [],
      featured: false,
    },
    {
      name: "Set Alat Gardening 3in1",
      slug: "set-alat-gardening",
      description:
        "Paket alat kebun mini: sekop, garpu, dan penggembur. Ergonomis dan nyaman digenggam.",
      price: 85000,
      categorySlug: "aksesoris",
      images: [],
      featured: true,
    },
  ];

  const productRecords: { id: string; slug: string }[] = [];

  for (const p of products) {
    const category = categories.find((c) => c.slug === p.categorySlug);
    if (!category) continue;

    const record = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        price: p.price,
        categoryId: category.id,
        images: p.images,
        featured: p.featured,
        inStock: true,
      },
    });
    productRecords.push({ id: record.id, slug: record.slug });
  }
  console.log(`  ✓ ${products.length} products created`);

  const variantData: Record<string, { type: string; value: string; label: string; price?: number }[]> = {
    "pot-terakota-25cm": [
      { type: "ukuran", value: "20cm", label: "20 cm", price: 55000 },
      { type: "ukuran", value: "25cm", label: "25 cm" },
      { type: "ukuran", value: "30cm", label: "30 cm", price: 95000 },
    ],
    "pot-keramik-putih": [
      { type: "ukuran", value: "15cm", label: "15 cm", price: 80000 },
      { type: "ukuran", value: "20cm", label: "20 cm" },
      { type: "ukuran", value: "25cm", label: "25 cm", price: 150000 },
    ],
    "pot-semen-cor-garis": [
      { type: "warna", value: "natural", label: "Natural Grey" },
      { type: "warna", value: "putih", label: "White Wash", price: 210000 },
      { type: "warna", value: "hitam", label: "Charcoal Black", price: 210000 },
    ],
    "monstera-deliciosa": [
      { type: "ukuran", value: "kecil", label: "Kecil (30cm)", price: 125000 },
      { type: "ukuran", value: "sedang", label: "Sedang (50cm)" },
      { type: "ukuran", value: "besar", label: "Besar (80cm)", price: 320000 },
    ],
  };

  for (const prod of productRecords) {
    const variants = variantData[prod.slug];
    if (!variants) continue;

    for (let i = 0; i < variants.length; i++) {
      const v = variants[i];
      await prisma.productVariant.create({
        data: {
          productId: prod.id,
          type: v.type,
          value: v.value,
          label: v.label,
          price: v.price ?? null,
          stock: true,
          order: i,
        },
      });
    }
  }
  console.log("  ✓ Product variants created");

  const now = new Date();
  const weatherData = [
    {
      temperature: 28,
      humidity: 75,
      rainfall: "0.0",
      uvIndex: "medium",
      windSpeed: 12,
      condition: "cerah berawan",
      recordedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
    },
    {
      temperature: 31,
      humidity: 65,
      rainfall: "0.0",
      uvIndex: "high",
      windSpeed: 8,
      condition: "cerah",
      recordedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000),
    },
    {
      temperature: 26,
      humidity: 82,
      rainfall: "2.5",
      uvIndex: "low",
      windSpeed: 15,
      condition: "hujan ringan",
      recordedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    },
    {
      temperature: 24,
      humidity: 88,
      rainfall: "5.0",
      uvIndex: "low",
      windSpeed: 18,
      condition: "hujan sedang",
      recordedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000),
    },
    {
      temperature: 27,
      humidity: 78,
      rainfall: "0.0",
      uvIndex: "medium",
      windSpeed: 10,
      condition: "berawan",
      recordedAt: now,
    },
  ];

  for (const w of weatherData) {
    await prisma.weatherData.create({ data: w });
  }
  console.log(`  ✓ ${weatherData.length} weather records created`);

  const recommendations = [
    {
      message:
        "Kelembaban tinggi (>85%). Waspada jamur — pastikan sirkulasi udara di area tanaman hias Anda tetap baik.",
      createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    },
    {
      message:
        "Cuaca cerah dengan UV index tinggi. Lindungi tanaman sensitif dari sinar langsung, pindahkan ke area teduh.",
      createdAt: new Date(now.getTime() - 3 * 60 * 60 * 1000),
    },
    {
      message:
        "Kondisi optimal untuk perawatan tanaman. Saat yang tepat untuk memupuk dan membersihkan daun tanaman.",
      createdAt: now,
    },
  ];

  for (const r of recommendations) {
    await prisma.recommendation.create({ data: r });
  }
  console.log(`  ✓ ${recommendations.length} recommendations created`);

  console.log("\n✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
