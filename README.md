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

# API dokumentacija


Vsebina
... naštej vesbino tukaj ...

# Kanali
```
Klic: '/api/channels/requestChannel'  
Tip: post  
```

Namen:
Ob uspehu se pridružimo obstoječemu kanalu ali ustvarimo nov kanal in vrne 200 (OK).  

Uporaba:
TODO

# Klepet
```
Klic: '/api/chat/:id/:function'
Tip: put
```
Namen:
Omogoča manipulacijo klepeta.

*:id* -> predstavlja identifikator deležnika klepeta.  
*:function* -> predstavlja funkcionalnost v klepetu.

Funkcionalnosti klepeta:
- 'addMsg'
- 'removeMsg'

### addMsg

Namen:
Omogoča vnos novega sporočila v klepet.

Parametri:
- username: uporabniško ime
- date: časovni žig sporočila
- message: vsebina sporočila

Ob uspehu vrne 200 (OK).

### removeMsg

Namen:
Omogoča izbris sporočila iz klepeta.

Parametri:
/

Ob uspehu vrne 200 (OK).

# DM
```
Klic: '/api/createDM'
Tip: post
```
Namen:  
Ustvari novi DM.  
Ob uspehu vrne 200 (OK).

```
Klic: '/api/getDMs/:id'
Tip: get
```

Namen:  
Pridobi zahtevani DM.
Ob uspehu vrne 200 (OK) in podatke o iskanem DMu.

```
Klic: '/api/DMs/:id/:function
Tip: put
```  
Namen:
Omogoča manipulacijo z DMji.

*:id* -> predstavlja identifikator deležnika klepeta.  
*:function* -> predstavlja funkcionalnost nad DMjem.

Funkcionalnosti DMja:
- 'addMsg'
- 'removeMsg'

### addMsg

Namen:
Omogoča vnos novega sporočila v DM.  

Ob uspehu vrne 200 (OK).

### removeMsg

Namen:
Omogoča izbris sporočila iz klepeta.

Parametri:
/

Ob uspehu vrne 200 (OK).

# Prostor

```
Klic: '/api/getRooms/:userId'
Tip: get
```  

Namen:   
Pridobi uporabnikove sobe.
Ob uspehu vrne 200 (OK) in seznam uporabnikovih sob.

```
Klic: '/api/getRoom/:userId/:roomName'
Tip: get
```  

Namen:  
Pridobi zahtevano sobo uporabnika.
Ob uspehu vrne 200 (OK) in podatke o zahtevani sobi.

```
Klic: '/api/createRoom'
Tip: post
```  

Namen:
Ustvari novo sobo.
Ob uspehu vrne 200 (OK).

```
Klic: '/api/rooms/:id/:function'
Tip: put
```  
Namen:
Omogoča manipulacijo s sobo.

*:id* -> predstavlja identifikator deležnika.  
*:function* -> predstavlja funkcionalnost nad sobo.

Funkcionalnosti DMja:
- 'addUser'
- 'changeName'

### addUser

Namen:
Omogoča dodajanje uporabnika v sobo.

Ob uspehu vrne 200 (OK).

### changeName

Namen:
Spremeni ime sobe.

Parametri:
/

Ob uspehu vrne 200 (OK).
