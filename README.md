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

### 4. Run the server
```bash
node server.mjs
```