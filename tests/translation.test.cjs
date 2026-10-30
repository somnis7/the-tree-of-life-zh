const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
function runtime() {
    const context = vm.createContext({ localStorage: { getItem: () => null } });
    for (const file of ['zh-CN.js', 'runtime.js']) vm.runInContext(fs.readFileSync(path.join(__dirname, '../js/i18n', file), 'utf8'), context);
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
