const express = require('express');
const router = express.Router();
const { createRule, combineRules, evaluateRule, modifyRule } = require('../controllers/ruleController');

router.post('/create_rule', createRule);
router.post('/combine_rules', combineRules);
router.post('/evaluate_rule', evaluateRule);
router.post('/modify_rule', modifyRule);

module.exports = router;
