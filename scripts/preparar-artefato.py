"""Prepara o build (.output/public) pra ser publicado como artefato "ao vivo" no claude.ai.

O artefato não fica na raiz do domínio, então:
- os caminhos /assets/... viram ./assets/...
- o carregador de módulos do Vite passa a resolver pelo endereço da página
- um script no <head> fixa a <base> e coloca a rota em "/" pro roteador
- bytes NUL e U+FFFD dentro de strings viram escapes (o publicador recusa)

Uso: npm run build && python scripts/preparar-artefato.py <pasta-de-saida>
"""
import os
import re
import shutil
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, ".output", "public")
DST = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "artefato-ao-vivo")

BOOT = (
    '<script>(function(){try{var b=document.createElement("base");'
    'b.href=location.href.replace(/[?#].*$/,"").replace(/[^/]*$/,"");document.head.prepend(b);'
    'if(location.pathname!=="/"){history.replaceState(history.state,"","/"+location.search+location.hash)}'
    "}catch(e){}})();</script>"
)

ABS_REF = re.compile(r"([\"'`(=])/(assets/|favicon\.png|og-logo\.png)")
PRELOAD = re.compile(r"=function\((\w+)\)\{return`/`\+\1\}")

shutil.rmtree(DST, ignore_errors=True)
shutil.copytree(SRC, DST, ignore=shutil.ignore_patterns("termos", "privacidade", ".htaccess", "robots.txt"))

for d, _, files in os.walk(DST):
    for f in files:
        if not f.endswith((".html", ".js", ".css")):
            continue
        p = os.path.join(d, f)
        raw = open(p, "rb").read()
        raw = raw.replace(b"\x00", b"\\u0000").replace(b"\xef\xbf\xbd", b"\\uFFFD")
        s = raw.decode("utf-8")
        if f.endswith(".css"):
            s = re.sub(r"([\"'(])/assets/", r"\1./", s)
        else:
            s = ABS_REF.sub(r"\1./\2", s)
            s = PRELOAD.sub(lambda m: "=function(%s){return new URL(%s,document.baseURI).href}" % (m[1], m[1]), s)
        if f == "index.html" and d == DST:
            s = s.replace("<head>", "<head>" + BOOT, 1)
            painel = os.path.join(ROOT, "scripts", "painel-previa.html")
            if os.path.exists(painel) and "--sem-painel" not in sys.argv:
                s = s.replace("</body>", open(painel, encoding="utf-8").read() + "</body>", 1)
        open(p, "w", encoding="utf-8", newline="").write(s)

print("pronto:", DST)
