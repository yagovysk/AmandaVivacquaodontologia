# 🦾 Como Testar a Acessibilidade do Site

## 🔍 Ferramentas Recomendadas

### 1. **Lighthouse (Chrome DevTools)**

```
1. Abra o site no Chrome
2. F12 para abrir DevTools
3. Aba "Lighthouse"
4. Selecione "Accessibility"
5. Clique em "Generate report"
```

**Pontuação esperada: 95-100/100** ✅

### 2. **NVDA (Leitor de Tela Gratuito - Windows)**

- Download: https://www.nvaccess.org/download/
- Atalho: NVDA + Espaço (ativa/desativa)
- Teste: Navegue com Tab e ouça os anúncios

### 3. **VoiceOver (Mac)**

```
Cmd + F5 para ativar
Ctrl + Option + Setas para navegar
```

### 4. **WAVE (Web Accessibility Evaluation Tool)**

- Extensão: https://wave.webaim.org/extension/
- Mostra erros visuais de acessibilidade

### 5. **axe DevTools**

- Extensão Chrome: https://www.deque.com/axe/devtools/
- Análise automática completa

## ⌨️ Testes Manuais

### **Navegação por Teclado**

- [ ] Tab: Navega entre elementos interativos
- [ ] Shift+Tab: Volta para elemento anterior
- [ ] Enter/Space: Ativa botões e links
- [ ] Escape: Fecha modais e menus
- [ ] Arrow Keys: Navega na galeria de imagens

### **Skip Navigation**

- [ ] Tab na primeira visita mostra "Pular para o conteúdo principal"
- [ ] Enter pula direto para o conteúdo

### **Leitores de Tela**

- [ ] Todas as imagens têm descrição alt
- [ ] Links têm contexto claro
- [ ] Headings estão em ordem lógica (h1 → h2 → h3)
- [ ] Formulários têm labels associados
- [ ] Estados são anunciados (menu aberto/fechado)

### **Contraste de Cores**

- [ ] Texto tem contraste mínimo 4.5:1
- [ ] Modo alto contraste funciona
- [ ] Modo escuro funciona

### **Responsividade**

- [ ] Site funciona em 320px de largura
- [ ] Zoom de 200% não quebra layout
- [ ] Touch targets têm mínimo 44x44px

## 🎯 Checklist WCAG 2.1 AA

### **Perceivable (Perceptível)**

- [x] Alt text em todas as imagens
- [x] Contraste de cores adequado
- [x] Conteúdo adaptável (responsive)
- [x] Texto redimensionável (até 200%)

### **Operable (Operável)**

- [x] Acessível por teclado
- [x] Tempo suficiente para interações
- [x] Navegação clara e consistente
- [x] Múltiplas formas de navegação

### **Understandable (Compreensível)**

- [x] Linguagem clara (pt-BR)
- [x] Navegação previsível
- [x] Labels e instruções claras
- [x] Mensagens de erro descritivas

### **Robust (Robusto)**

- [x] HTML semântico válido
- [x] ARIA implementado corretamente
- [x] Compatível com tecnologias assistivas

## 🐛 Problemas Comuns Resolvidos

✅ **Menu mobile não anunciava estado** → Adicionado aria-expanded
✅ **Galeria não navegável por teclado** → Adicionado Enter/Space support
✅ **Ícones sem contexto** → Marcados como decorativos (aria-hidden)
✅ **Múltiplos h1** → Corrigido para apenas 1 h1 por página
✅ **Links sem contexto** → Adicionado aria-label descritivos
✅ **Modal sem focus trap** → Implementado focus management
✅ **Mudanças não anunciadas** → Implementado aria-live announcer

## 📊 Métricas de Sucesso

- **Lighthouse Accessibility Score**: 95-100
- **0 erros no WAVE**
- **0 erros no axe DevTools**
- **100% navegável por teclado**
- **Compatível com NVDA, JAWS, VoiceOver**

## 🚀 Melhorias Futuras Sugeridas

1. Adicionar indicador visual de focus mais destacado
2. Implementar modo de alto contraste com temas personalizáveis
3. Adicionar traduções (i18n) para outros idiomas
4. Implementar breadcrumbs para navegação secundária
5. Adicionar atalhos de teclado customizáveis

---

**Última atualização**: Outubro 2025
**Padrão**: WCAG 2.1 Nível AA
**Status**: ✅ Totalmente Acessível
