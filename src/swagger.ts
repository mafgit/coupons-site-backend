import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Coupons App API",
      description:
        "This API is made in internship using Express + Typescript + MongoDB",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:5000" }],
    components: {
      schemas: {
        Brand: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            slug: { type: "string" },
            category: { type: "string" },
            image: { type: "string" },
            website: { type: "string" },
            description: { type: "string" },
            view_count: { type: "number" },
            rating: { type: "number" },
            rating_count: { type: "number" },
            order: { type: "number" },
          }
        }
      }
    }
  },
  apis: ["src/routes/*.ts"],
} as swaggerJSDoc.Options);

export default swaggerSpec;
