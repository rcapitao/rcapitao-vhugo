+++
ShowToc = true
TocOpen = true
noindex = true
searchHidden = true
title = 'Style Guide'

[sitemap]
  disable = true
+++

Referência rápida de formatação em Markdown usada neste site.

## Títulos

```markdown
# Título H1
## Título H2
### Título H3
#### Título H4
```

## Ênfase

```markdown
*itálico* ou _itálico_
**negrito** ou __negrito__
***negrito e itálico***
~~riscado~~
```

*itálico*, **negrito**, ***negrito e itálico***, ~~riscado~~

## Links e imagens

```markdown
[Texto do link](https://exemplo.com)
[Link com título](https://exemplo.com "Título ao passar o mouse")
![Texto alternativo](/images/exemplo.jpg)
```

## Listas

```markdown
- Item não ordenado
- Outro item
  - Sub-item

1. Item ordenado
2. Outro item
   1. Sub-item

- [ ] Tarefa pendente
- [x] Tarefa concluída
```

- Item não ordenado
- Outro item
  - Sub-item

1. Item ordenado
2. Outro item
   1. Sub-item

- [ ] Tarefa pendente
- [x] Tarefa concluída

## Listas de definição

```markdown
Termo
: Definição do termo.

Outro termo
: Outra definição.
```

Termo
: Definição do termo.

Outro termo
: Outra definição.

## Citação

```markdown
> Uma citação em bloco.
>
> Pode ter várias linhas.
```

> Uma citação em bloco.
>
> Pode ter várias linhas.

## Notas de rodapé

```markdown
Aqui vai uma afirmação que precisa de uma fonte[^1].

[^1]: Aqui vai a fonte ou explicação complementar.
```

Aqui vai uma afirmação que precisa de uma fonte[^1].

[^1]: Aqui vai a fonte ou explicação complementar.

## Código

````markdown
Código `inline` dentro de uma frase.

```go
func main() {
    fmt.Println("olá, mundo")
}
```
````

Código `inline` dentro de uma frase.

```go
func main() {
    fmt.Println("olá, mundo")
}
```

## Tabela

```markdown
| Coluna A | Coluna B |
| -------- | -------- |
| valor 1  | valor 2  |
| valor 3  | valor 4  |
```

| Coluna A | Coluna B |
| -------- | -------- |
| valor 1  | valor 2  |
| valor 3  | valor 4  |

## Linha horizontal

```markdown
---
```

---

## Bloco recolhível

```markdown
{{%/* details summary="Texto do título" */%}}
Conteúdo que fica escondido até clicar no título. Aceita markdown normal.
{{%/* /details */%}}
```

Fica fechado por padrão. Exemplo:

{{% details summary="O que é isso?" %}}
Você já deve ter visto por aqui a página [Sobre](/sobre). Esta é a [/now](https://nownownow.com/about), um conceito que existe em vários blogs pessoais e que mostra no que estou **focado neste momento da minha vida**, não um currículo nem um feed de redes sociais.

A ideia, criada por [Derek Sivers](https://sive.rs/now2), é simples: é o que eu contaria a um amigo que não vejo há um ano. Atualizo esta página de tempos em tempos, então, se você está lendo isso daqui a alguns meses, pode já estar desatualizado.
{{% /details %}}

## Sumário (TOC)

Ativado por página, no front matter. Gera automaticamente uma lista com os títulos (`##`, `###`...) do post, dentro de um bloco recolhível.

```toml
+++
title = 'Meu post'
ShowToc = true
TocOpen = true # opcional: já vem aberto
+++
```

Esta própria página tem `ShowToc = true` e `TocOpen = true` — por isso o sumário já aparece aberto por padrão, logo acima deste parágrafo.

## Série de posts

Agrupa posts relacionados numa sequência numerada, com navegação entre eles. Basta usar o mesmo valor de `series` em 2 ou mais posts — a navegação só aparece quando há mais de uma post com a mesma série.

```toml
+++
title = 'Parte 1 - Introdução'
series = 'Guia de Privacidade Digital'
+++
```

## Front matter completo

Todos os campos reconhecidos pelo site, em TOML (o padrão do Hugo):

```toml
+++
title = 'Título da página' # obrigatório
date = 2026-08-24T00:00:00-03:00 # data de publicação
lastmod = 2026-08-25T00:00:00-03:00 # última atualização (opcional; padrão = date)
description = 'Resumo curto' # meta description, cards de compartilhamento e busca
tags = ['Privacidade', 'lgpd']
series = 'Nome da série' # ativa a navegação de série (ver acima)
ShowToc = true # ativa o sumário (ver acima)
TocOpen = true # sumário já aberto por padrão
cover = '/images/capa-do-post.jpg' # imagem de OpenGraph própria (substitui o card gerado automaticamente)
subtitle = 'Texto do menu expansivo' # usado em páginas com layout "now"
showLastmod = true # exibe "Última atualização" (baseada em lastmod/git) abaixo do título
aliases = ['/url-antiga/'] # redireciona URLs antigas para esta página
draft = true # não publica a página (fica de fora do build de produção)
noindex = true # remove dos mecanismos de busca (robots meta), mas continua no site
searchHidden = true # remove da busca interna do site, mas continua indexável
hidden = true # remove do /llms.txt, mas continua no site normalmente

[sitemap]
  disable = true # remove do sitemap.xml
+++
```
