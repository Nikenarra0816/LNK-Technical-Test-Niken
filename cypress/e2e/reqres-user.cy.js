import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
ajvFormats(ajv); 

describe('GET https://reqres.in/api/users/2', () => {
  it('should return the correct user data and match schema', () => {
    cy.request('GET', 'https://reqres.in/api/users/2').then((response) => {
      // Step 1: Check status code
      expect(response.status).to.eq(200);

      // Define the expected JSON schema
      const schema = {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              id: { type: "integer" },
              email: { type: "string", format: "email" }, // Email format validation
              first_name: { type: "string" },
              last_name: { type: "string" },
              avatar: { type: "string", format: "uri" } // URI format validation
            },
            required: ["id", "email", "first_name", "last_name", "avatar"]
          },
          support: {
            type: "object",
            properties: {
              url: { type: "string", format: "uri" }, // URI format validation
              text: { type: "string" }
            },
            required: ["url", "text"]
          }
        },
        required: ["data", "support"]
      };

      // Step 2: Validate the response against the schema
      const validate = ajv.compile(schema);
      const valid = validate(response.body);

      if (valid) {
        // If schema is valid
        console.log("✅ Schema is valid!");
      } else {
        // If schema validation fails
        console.error("❌ Schema validation failed:", validate.errors);
      }

      // Assert the schema validation result
      expect(valid, 'Schema validation').to.be.true;
    });
  });
});
