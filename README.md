# Chat backend

### ***POMEMBNO***

Postopek work flowa:
* Ustvarite (<code>checkout</code>) svoj branch iz <code>master</code>
* Spremembe v razvoju pushajte na svoj branch
* Ko je vaša sprememba končana in funkcionalna, ustvarite pull request na <code>develop</code> branch - direktni push na <code>master</code> bo zavrnjen
* Repo owner bo ob pull requestu odobril spremembe in jih merge-al na <code>master</code> branch

#

### INCLUDED DEPENDENCIES (package.json)
To install:
```
npm install
```

### START SERVER & CLIENT
Server:
```
npm start
```
ali tako, da se ob vsaki spremembi kode strežnik restarta:
```
npm run nodemon
```
Client:
```
npm run dummy
```

### INSTALL MONGODB
**Preberite tudi pinned poste na Slacku @backend**

Če bi rad kdo bazo runnal lokalno si lahko pogleda tale [installation manual](https://docs.mongodb.com/manual/administration/install-community/).

Za manual management pa predlagam [Compass](https://docs.mongodb.com/compass/current/install/).
