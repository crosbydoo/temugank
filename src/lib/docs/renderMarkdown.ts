/** Minimal markdown → HTML for internal doc pages (headings, lists, code, links). */
export function renderMarkdown(source: string): string {
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  const html: string[] = []
  let inPre = false
  let inList = false

  function closeList() {
    if (inList) {
      html.push('</ul>')
      inList = false
    }
  }

  for (const line of lines) {
    if (line.startsWith('```')) {
      closeList()
      if (inPre) {
        html.push('</code></pre>')
        inPre = false
      } else {
        html.push('<pre><code>')
        inPre = true
      }
      continue
    }

    if (inPre) {
      html.push(escapeHtml(line))
      continue
    }

    if (line.startsWith('# ')) {
      closeList()
      html.push(`<h1>${inline(line.slice(2))}</h1>`)
      continue
    }
    if (line.startsWith('## ')) {
      closeList()
      html.push(`<h2>${inline(line.slice(3))}</h2>`)
      continue
    }
    if (line.startsWith('### ')) {
      closeList()
      html.push(`<h3>${inline(line.slice(4))}</h3>`)
      continue
    }
    if (line.startsWith('- ')) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${inline(line.slice(2))}</li>`)
      continue
    }

    closeList()

    if (line.trim() === '') {
      continue
    }

    if (line.startsWith('|')) {
      html.push(line)
      continue
    }

    html.push(`<p>${inline(line)}</p>`)
  }

  closeList()
  if (inPre) html.push('</code></pre>')

  return html
    .join('\n')
    .replace(/\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g, (_, header, body) => {
      const heads = header.split('|').filter(Boolean).map((c: string) => c.trim())
      const rows = body
        .trim()
        .split('\n')
        .map((row: string) => row.split('|').filter(Boolean).map((c: string) => c.trim()))
      const thead = `<thead><tr>${heads.map((h: string) => `<th>${h}</th>`).join('')}</tr></thead>`
      const tbody = `<tbody>${rows.map((row: string[]) => `<tr>${row.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>`
      return `<table>${thead}${tbody}</table>`
    })
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function inline(text: string): string {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}
