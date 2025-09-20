let express = require("Express");
let app = express();

let PORT = 4000;



app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`);
})