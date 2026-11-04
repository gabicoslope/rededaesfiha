import glob,sys,json,os
os.chdir(sys.argv[1]); M=json.load(open(sys.argv[2]))
ch=[]
for f in ['index.html']+glob.glob('assets/*.js')+glob.glob('assets/*.css'):
    s=open(f,encoding='utf-8').read(); o=s
    for n,i in M.items(): s=s.replace('./assets/'+n,'/_blob/'+i).replace('/assets/'+n,'/_blob/'+i)
    if s!=o: open(f,'w',encoding='utf-8',newline='').write(s); ch.append(f)
print(json.dumps({c:c for c in ch if c!='index.html'}))
