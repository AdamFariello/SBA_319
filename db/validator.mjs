export const userValidator = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "password"],
            properties: {
                username: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                password: {
                    bsonType: "string",
                    description: "must be a valid email address and is required"
                }
            }
        }
    },
    validationLevel: "strict", 
    validationAction: "error"
}