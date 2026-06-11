# Magnifique Gráfica Digital

Site estático pronto para subir na Hostinger. Não precisa instalar nada, não usa carrinho, não usa servidor e não usa npm.

## Como abrir no computador

1. Abra a pasta `magnifique-site`.
2. Dê dois cliques no arquivo `index.html`.
3. O site deve abrir no navegador.

Se alguma foto não aparecer quando abrir por duplo clique, envie a pasta inteira para a Hostinger mesmo assim. O site foi feito para funcionar tanto localmente quanto no ar.

## Como subir para a Hostinger

1. Entre no painel da Hostinger.
2. Abra o Gerenciador de Arquivos.
3. Entre na pasta pública do site, normalmente `public_html`.
4. Envie todos os arquivos e pastas de `magnifique-site` para dentro dela:
   - `index.html`
   - `styles.css`
   - `main.js`
   - `.htaccess`
   - pasta `lib`
   - pasta `assets`
5. Depois, abra o domínio no navegador.

Não envie só o `index.html`. A pasta `lib` e a pasta `assets` precisam ir junto.

## Como colocar no GitHub

1. Crie um repositório novo no GitHub.
2. Envie todos os arquivos desta pasta para a raiz do repositório.
3. A raiz precisa ficar com `index.html`, `styles.css`, `main.js`, `.htaccess`, `README.md`, `lib/` e `assets/`.
4. Para publicar pelo GitHub Pages, vá em `Settings` → `Pages`.
5. Em `Build and deployment`, escolha `Deploy from a branch`.
6. Selecione a branch principal, normalmente `main`, e a pasta `/root`.
7. Salve e aguarde o GitHub gerar o link público.

O site é estático, então funciona no GitHub Pages sem build e sem instalar nada.

## Onde editar textos, WhatsApp, Instagram e serviços

O arquivo principal de edição é:

`lib/manifest.js`

Abra esse arquivo com o Bloco de Notas. Edite apenas o texto entre aspas.

Exemplo:

```js
tagline: "Cada detalhe, ampliado.",
coverage: "Ribeirão Preto",
whatsapp: "5516994526584",
whatsappLabel: "+55 16 99452-6584",
instagram: "@magnifiquegrafica",
email: "magnifiquegrafica@gmail.com",
hours: "Seg a Sex · 8h às 18h",
```

Cuidados importantes:

- Não apague aspas.
- Não apague vírgulas no fim das linhas.
- O WhatsApp em `whatsapp` deve ficar só com números, com DDI e DDD.
- O WhatsApp em `whatsappLabel` é o texto bonito que aparece no site.
- Se mudar o número de WhatsApp, também procure `5516994526584` no `index.html` e troque nos links fixos de segurança.

## Como editar os serviços

No `lib/manifest.js`, procure a parte `services`.

Cada serviço tem:

- `name`: nome do serviço.
- `accent`: cor do botão daquele serviço.
- `eyebrow`: frase curta.
- `summary`: explicação.
- `items`: lista de itens.

Se remover uma categoria do manifest, o site com JavaScript passa a mostrar só as categorias restantes. Os botões "Orçar este serviço" usam automaticamente o nome do serviço na mensagem do WhatsApp.

## Como trocar fotos

As fotos ficam em:

`assets/img/`

As imagens da galeria são:

`portfolio-01.webp` até `portfolio-16.webp`

Para trocar sem mexer em código:

1. Prepare a nova foto.
2. Renomeie com o mesmo nome da foto que quer substituir, por exemplo `portfolio-01.webp`.
3. Coloque na pasta `assets/img/`, substituindo a antiga.

Se preferir usar `.jpg` ou `.png`, também pode, mas aí precisa editar o caminho no `lib/manifest.js` e no bloco de galeria de segurança dentro do `index.html`.

## Créditos de imagens

As imagens atuais são placeholders livres buscados no Openverse. Os créditos estão em:

`assets/credits.json`

Quando o cliente tiver fotos reais dos próprios trabalhos, o ideal é substituir as imagens de placeholder.

## Quando a alteração não aparece

Às vezes o navegador guarda uma versão antiga.

Tente nesta ordem:

1. Aperte `Ctrl + F5`.
2. Abra em uma janela anônima.
3. Troque o número de versão `?v=20260611` no `index.html`, por exemplo para `?v=20260612`, nos arquivos `styles.css`, `main.js`, `lib/manifest.js`, `lib/gsap.min.js` e `lib/ScrollTrigger.min.js`.

## Observação sobre endereço físico

Este site não tem mapa e não mostra endereço de loja porque o modelo da Magnifique é atendimento, orçamento, produção e entrega. Isso está escrito no site como vantagem: o cliente resolve tudo pelo WhatsApp, sem deslocamento.

## O que não mexer

- Não apague a pasta `lib`.
- Não apague o arquivo `.htaccess`.
- Não troque os nomes dos arquivos principais.
- Não coloque scripts externos de terceiros sem necessidade.
- Não existe cursor personalizado neste site. O cursor do sistema fica normal.
