# rcapitao-vhugo

Site pessoal de Rafael Capitão — advogado especialista em Privacidade, Proteção de Dados e Segurança da Informação — gerado com [Hugo](https://gohugo.io/) e publicado no GitHub Pages, no domínio próprio [rcapitao.com](https://rcapitao.com/).

O tema é baseado em [Ink](https://github.com/vinooganesh/hugo-ink), de Vinoo Ganesh (MIT — ver `LICENSE`), incorporado diretamente neste repositório para permitir edição livre.

## Stack

- **Hugo** `0.165.0` (extended), front matter em **TOML**
- **GitHub Pages** com deploy automático via **GitHub Actions** (`.github/workflows/hugo.yml`) a cada push em `main`
- Domínio próprio configurado via `static/CNAME` — sem dependência de configuração manual nas Settings do repositório
- Sem framework JS/build step: CSS e JS são escritos à mão em `assets/`

## Página inicial (bio link)

A página inicial ([rcapitao.com](https://rcapitao.com/)) é uma página de links, separada do visual do blog:

- **Conteúdo:** `content/_index.md` (perfil, redes sociais, destaque, grupos de cartões e frase do rodapé). Também é editável no CMS em **Página inicial (bio link)**.
- **Último post:** um cartão com `latest = true` mostra sozinho o post mais recente de `content/posts/`, atualizado a cada publicação.
- **Templates:** `layouts/index.html` é uma página completa, que não usa `baseof.html`, `header.html`, `footer.html` nem `main.css`. Os partials ficam em `layouts/partials/biolink/`.
- **Visual e scripts:** `assets/biolink/biolink.css` (paleta Oslo, modo claro/escuro) e `assets/biolink/actions.js` (botões Compartilhar e QR code).
- **Ícones:** SVGs em `assets/biolink/icons/` (Font Awesome Free, CC BY 4.0). Para um ícone novo, salve o SVG ali e acrescente o nome nas opções de ícone em `static/admin/config.yml`.
- **Tema:** segue o sistema ou a escolha feita no botão de tema do blog (mesmo `localStorage`).
- **Imagem de prévia:** `static/images/og-home.png` (1200×630), usada ao compartilhar o link. Para gerar de novo: `pip install pillow fonttools brotli && python3 scripts/og-home.py`.
- **Fonte:** Open Sans variável (`static/fonts/open-sans-latin-wght-normal.woff2`), local.

O blog continua em [/posts/](https://rcapitao.com/posts/), com os mesmos endereços, e o nome no topo das páginas leva para a página inicial.

## Conteúdo

- `content/posts/` — posts do blog
- `content/*.md` — páginas fixas do site (Sobre, Diretório, Agora, Apps e Ferramentas, Certificações, RSS, Links, Style Guide, Busca)
- Todas as páginas usam front matter TOML; campos reconhecidos (`ShowToc`, `TocOpen`, `series`, `lastmod`, `noindex`, `searchHidden`, `hidden`, `sitemap.disable`, etc.) estão documentados ao vivo em [`/style-guide/`](https://rcapitao.com/style-guide/)

## Desenvolvimento local

```bash
hugo server -D
```

Build de produção (mesmo comando usado no deploy):

```bash
hugo --gc --minify --baseURL "https://rcapitao.com/"
```

## Deploy

Automático: todo push em `main` dispara o workflow do GitHub Actions, que builda o site com Hugo e publica no GitHub Pages. Não é necessário nenhum passo manual.

## Crossposting

Depois que o deploy termina, o job `notify-crosspost` (no mesmo workflow, `.github/workflows/hugo.yml`) dispara um evento `repository_dispatch` (`blog-published`) para o repositório `rcapitao/blog-crossposting`, que fica responsável por publicar os novos posts nas redes sociais. Requer o secret `CROSSPOST_DISPATCH_TOKEN` neste repositório (um fine-grained personal access token com permissão de leitura/escrita em Actions, restrito ao repositório `blog-crossposting`).
