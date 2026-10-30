/* Display-only localization. No game state, IDs, formulas, or saves are translated. */
(function (root) {
    'use strict';
    const dictionary = root.LIFE_ZH;
    const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
    const missing = new Set();
    const escape = text => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const termPattern = new RegExp('\\b(?:' + Object.keys(dictionary.terms)
        .sort((a, b) => b.length - a.length).map(escape).join('|') + ')\\b', 'g');
    let language = 'zh-CN';
    try { language = localStorage.getItem('life-translation-language') || language; } catch (_) {}
    const htmlCache = new Map();
    function translate(text) {
        if (language !== 'zh-CN' || typeof text !== 'string' || !/[A-Za-z]/.test(text)) return text;
        const key = text.trim().replace(/\s+/g, ' ');
        let result;
        if (own(dictionary.exact, key)) result = dictionary.exact[key];
        else {
            for (const [pattern, replacement] of dictionary.rules) {
                if (pattern.test(key)) { result = key.replace(pattern, replacement); break; }
            }
            if (result === undefined) {
                // Only record stable, short strings; do not store changing giant numbers or saves.
                if (key.length < 240 && !/[0-9]/.test(key) && missing.size < 2000) missing.add(key);
                result = key;
            }
            // Translate complete resources, never isolated substrings inside identifiers.
            result = result.replace(termPattern, match => dictionary.terms[match]);
            // Option values occur inside labels as well as in their own nodes.
            if (/^(Autosave|Offline Prod|Theme|Show Milestones|High-Quality Tree|Completed Challenges|Single-Tab Mode|Shift-Click to Toggle Tooltips|Popups are):/.test(key)) {
                for (const word of ['ALL (recommended)', 'LAST, AUTO, INCOMPLETE', 'AUTOMATION, INCOMPLETE', 'INCOMPLETE', 'NONE', 'HIDDEN', 'SHOWN', 'ALWAYS', 'AUTO', 'ON', 'OFF', 'default']) {
                    result = result.replace(word, dictionary.exact[word]);
                }
            }
        }
        return text.slice(0, text.length - text.trimStart().length) + result + text.slice(text.trimEnd().length);
    }
    function translateHTML(html) {
        if (language !== 'zh-CN' || typeof html !== 'string') return html;
        if (htmlCache.has(html)) return htmlCache.get(html);
        const template = document.createElement('template');
        template.innerHTML = html;
        const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (!node.parentElement?.closest('script,style,textarea,code,pre,[translate="no"]')) {
                node.nodeValue = translate(node.nodeValue);
            }
        }
        const result = template.innerHTML;
        if (htmlCache.size >= 512) htmlCache.delete(htmlCache.keys().next().value);
        htmlCache.set(html, result);
        return result;
    }
    function translateVNode(node) {
        if (!node) return;
        if (Array.isArray(node)) { node.forEach(translateVNode); return; }
        if (/^(input|textarea|script|style|code|pre)$/.test(node.tag || '') || node.data?.attrs?.translate === 'no') return;
        if (typeof node.text === 'string') node.text = translate(node.text);
        if (node.data?.domProps && typeof node.data.domProps.innerHTML === 'string') {
            // Copy shared data objects instead of modifying the source component's props.
            node.data = Object.assign({}, node.data, {
                domProps: Object.assign({}, node.data.domProps, { innerHTML: translateHTML(node.data.domProps.innerHTML) }),
            });
        }
        if (node.children) node.children.forEach(translateVNode);
    }
    if (root.Vue) root.Vue.mixin({
        beforeMount() {
            const render = this.$options.render;
            if (!render || render.lifeTranslated) return;
            function localizedRender() {
                const vnode = render.apply(this, arguments);
                translateVNode(vnode);
                return vnode;
            }
            localizedRender.lifeTranslated = true;
            this.$options.render = localizedRender;
        },
    });
    for (const name of ['alert', 'confirm', 'prompt']) {
        if (typeof root[name] !== 'function') continue;
        const original = root[name].bind(root);
        root[name] = function (message, ...args) { return original(translate(message), ...args); };
    }
    function setLanguage(next) {
        if (!['zh-CN', 'en'].includes(next)) return;
        language = next;
        htmlCache.clear();
        try { localStorage.setItem('life-translation-language', language); } catch (_) {}
        // Reload regenerates every component and does not change stored game progress.
        if (typeof root.save === 'function' && typeof root.allSaves !== 'undefined') root.save();
        root.location.reload();
    }
    root.LifeI18n = {
        translate, translateHTML, translateVNode, setLanguage,
        get language() { return language; },
        getMissing: () => Array.from(missing).sort(),
    };
    if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', () => {
        document.documentElement.lang = language === 'zh-CN' ? 'zh-CN' : 'en';
        document.title = language === 'zh-CN' ? '生命树 · 独立汉化' : 'The Tree of Life';
        const button = document.createElement('button');
        button.id = 'life-language';
        button.className = 'opt';
        button.textContent = language === 'zh-CN' ? 'English' : '简体中文';
        button.setAttribute('aria-label', language === 'zh-CN' ? 'Switch to English' : '切换为简体中文');
        button.addEventListener('click', () => setLanguage(language === 'zh-CN' ? 'en' : 'zh-CN'));
        document.body.appendChild(button);
    });
})(typeof window === 'undefined' ? globalThis : window);
