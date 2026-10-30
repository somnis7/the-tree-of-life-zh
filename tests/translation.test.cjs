const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function runtime() {
    const context = vm.createContext({ localStorage: { getItem: () => null } });
    for (const file of ['zh-CN.js', 'progression.js', 'runtime.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/i18n', file), 'utf8'), context);
    return context.LifeI18n;
}
test('exact terms stay distinct and include the English names', () => {
    const t = runtime().translate;
    assert.equal(t('Totipotent'), '全能 Totipotent');
    assert.equal(t('Pluripotent'), '多潜能 Pluripotent');
    assert.equal(t('Multipotent'), '多能 Multipotent');
});
test('dynamic amounts and formulas are preserved exactly', () => {
    const t = runtime().translate;
    assert.equal(t('Goal: 1e36963 Cells'), '目标：1e36963 细胞');
    assert.equal(t(' Cost: 5e58 Tissues '), ' 花费：5e58 组织 ');
    assert.equal(t('α → ∂γ = x^1.05'), 'α → ∂γ = x^1.05');
    assert.equal(t('1.23e456 OOM^2s'), '1.23e456 OOM^2s');
    assert.equal(t('stem_cells.points'), 'stem_cells.points');
});
test('option values and complete resource names translate without duplicate fragments', () => {
    const t = runtime().translate;
    assert.equal(t('Autosave: ON'), '自动保存：开启');
    assert.equal(t('Show Milestones: ALL (recommended)'), '里程碑显示：全部（推荐）');
    assert.equal(t('Stem Cells'), '干细胞');
    assert.equal(t('Reset for'), '重置获得 ');
});
test('display translation skips editable text and changes only visible text nodes', () => {
    const api = runtime();
    const child = { text: 'Save' };
    const node = { tag: 'button', children: [child] };
    api.translateVNode(node);
    assert.equal(child.text, '保存');
    const input = { tag: 'textarea', children: [{ text: 'Save' }] };
    api.translateVNode(input);
    assert.equal(input.children[0].text, 'Save');
});
test('multiplier explanations preserve the exact large number', () => {
    assert.equal(runtime().translate(': *1.49e16,614 to Stem Cell gain'), '：×1.49e16,614（干细胞产量）');
});
test('reward labels resolve complete sentences without repeating bilingual terms', () => {
    const t = runtime().translate;
    assert.equal(t('Reward: Top Quark effect is its best ever and autobuy Multipotent'), '奖励：顶夸克 Top Quark 的效果改用历史最高值；自动购买多能 Multipotent');
    assert.equal(t('Omnipotent cost base is 9.25'), '万能 Omnipotent 的花费底数变为 9.25');
    assert.equal(t('Next: Unlock Heart and another Cell buyable'), '下一项：解锁心脏和另一项细胞购买项');
});
test('challenge rules keep coefficients, exponents, and goals intact', () => {
    const t = runtime().translate;
    assert.equal(t('Subtract 14.15 from Omnipotent base'), '万能 Omnipotent 底数减少 14.15');
    assert.equal(t('Raise Stem Cell gain ^0.02'), '干细胞产量取 0.02 次方');
    assert.equal(t('Requires: 6e11 Cells on reset'), '需要：细胞重置收益达到 6e11');
    assert.equal(t('α  →  ∂γ = x^1.05'), 'α  →  ∂γ = x^1.05');
});
test('font sizes accept only supported display settings', () => {
    const api = runtime();
    api.setTextSize(1.12);
    assert.equal(api.textSize, 1.12);
    api.setTextSize(5);
    assert.equal(api.textSize, 1.12);
});
