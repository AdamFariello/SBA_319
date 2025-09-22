# SBA 319

## Setting up the project
### 1. Cloning the project
```bash
git clone https://github.com/AdamFariello/SBA_319
```
Then <code>cd</code> into the cloned repository

### 2. Create .env file
```bash
echo "mongoURI = {INSERT MONGO URL}" >> .env
```

### 3. Setup npm
```bash
npm init -y
npm install
```

### 4. Initializing the database"
Run this code as many times until it says, "Database has been initalized!"
```bash
node initDatabase.mjs #
```
Only run this again if you want a clean slate with the data

### 5. Staring 
```bash 
node server.mjs
```


## Errors
### initDatabase taking too long
Connection to the mongodb during initalizing (or re-initializing), can get stuck.   
I don't know if it resolves itself since I'm patient -- just <code>ctrl-c</code> from the terminal and run it again.

### Data validation
When testing the POST method in userRoutes, you're gonna want to use a body such as this:
```json
{
  "username":"username",
  "password":"password"
}
```
If you only include one, mongodb will reject it since of the collection's (schema) validator.