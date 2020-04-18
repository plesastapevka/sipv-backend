# SIPV projekt - backend
### API dokumentacija

Verzija: 1.0.0  

Dokumentacija se nanaša na "backend" SIPV projekta, kjer izdelujemo aplikacija za komunikacijo na daljavo.

Vsebina  
... naštej vesbino tukaj ...  

# Kanali
```
Klic: '/api/channels/requestChannel'  
Tip: post  
```

**NAMEN**  
Naredi zahtevo za željeni kanal.

**PARAMETRI**
| Ime           | Opis          |
| ------------- |:-------------:|
| body          | ime kanala    |

**ODZIVI**  


```diff
+ Ob uspehu vrne vrata do zahtevanega kanala in kodo 200.  
- Ob neuspehu vrne kodo 500.
```

# Klepet
```
Klic: '/api/chat/:id/:function'
Tip: put
```
Namen:
Omogoča manipulacijo klepeta.

*:id* -> predstavlja identifikator deležnika.  
*:function* -> predstavlja funkcionalnost v klepetu.

Funkcionalnosti klepeta:
- 'addMsg'
- 'removeMsg'

### addMsg

```
Klic: '/api/chat/:id/addMsg'
Tip: put
```

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
