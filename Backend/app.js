const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models/Rule');
//const { parseRuleString, evaluateAST } = require('./utils/astUtils');
const app = express();
const ruleRoutes = require('./routes/ruleRoutes');

app.use(bodyParser.json());

sequelize.sync().then(() => console.log('Database connected'));
app.use('/api', ruleRoutes);

app.listen(3000, () => console.log('Server is running on port 3000'));
