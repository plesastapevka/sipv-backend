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
Naredi poizvedbo po željenem kanalu.

**PARAMETRI**  
| Ime           | Opis          |
| ------------- |:-------------:|
| body          | ``` name: string ```         |

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
**NAMEN**  
Omogoča manipulacijo klepeta.

*:id* -> predstavlja identifikator deležnika.  
*:function* -> predstavlja funkcionalnost v klepetu.

**PARAMETRI**  
| Ime           | Opis          |
| ------------- |:-------------:|
| :id         | ``` :id: string ```|
| :func          | ``` :func: 'addMsg' \|\| 'removeMsg' ```|

### :ifunc: addMsg

```
Klic: '/api/chat/:id/addMsg'
Tip: put
```

**NAMEN**  
Omogoča vnos novega sporočila v klepet.

**PARAMETRI**
| Ime           | Opis          |
| ------------- |:-------------:|
| :id         | ``` :id: string ```|
| :func          | ``` :func: 'addMsg' ```|
| body          | ``` username: string ``` <br> ```date: datetime``` <br> ``` message: string ```|

**ODZIVI**  

```diff
+ Ob uspehu se v klepet vnese novo sporočilo in vrne koda 200.
- Ob neuspehu vrne kodo 500.
```

### :ifunc: removeMsg

```
Klic: '/api/chat/:id/removeMsg'
Tip: put
```

**NAMEN**  
Omogoča izbris sporočila iz klepeta.

**PARAMETRI**  
| Ime           | Opis          |
| ------------- |:-------------:|
| :id         | ``` :id: string ```|
| :func          | ``` :func: 'removeMsg' ```|
| body          | ``` msgId: string ```|

**ODZIVI**  

```diff
+ Ob uspehu se iz klepeta izbriše sporočilo in vrne koda 200.
- Ob neuspehu vrne kodo 500.
```

# DM
```
Klic: '/api/createDM'
Tip: post
```
**NAMEN**  
Ustvari nov DM.

**PARAMETRI**  
| Ime           | Opis          |
| ------------- |:-------------:|
| body         | ``` user1: string ``` <br> ```user2: datetime``` |

**ODZIVI**  

```diff
+ Ob uspehu se ustvari novi DM in vrne koda 200.
- Ob neuspehu vrne kodo 500.
```

```
Klic: '/api/getDMs/:id'
Tip: get
```

**NAMEN**  
Pridobi zahtevani DM.

**PARAMETRI**  
| Ime           | Opis          |
| ------------- |:-------------:|
| :id         | ``` id: string ``` |

**ODZIVI**  

```diff
+ Ob uspehu se vrnejo informacije o zahtevanem DMju in vrne koda 200.
- Ob neuspehu vrne kodo 500.
```

```
Klic: '/api/DMs/:id/:function
Tip: put
```  
**NAMEN**  
Omogoča manipulacijo DMja.

*:id* -> predstavlja identifikator klepeta.  
*:function* -> predstavlja izbrano funkcionalnost.

**PARAMETRI**  
| Ime           | Opis          |
| ------------- |:-------------:|
| :id         | ``` :id: string ```|
| :func          | ``` :func: 'addMsg' \|\| 'removeMsg' ```|

### :func: addMsg

**NAMEN**  
Omogoča vnos novega sporočila v izbranem DMju.

**PARAMETRI**
| Ime           | Opis          |
| ------------- |:-------------:|
| :id         | ``` :id: string ```|
| :func          | ``` :func: 'addMsg' ```|
| body          | ``` msg: string ``` <br> ```date: datetime``` <br> ``` sender: string ``` <br> ``` reciever: string ```|

**ODZIVI**  

```diff
+ Ob uspehu se v ustrezen DM vnese sporočilo in vrne koda 200.
- Ob neuspehu vrne kodo 500.
```

### :func: removeMsg

**NAMEN**  
Omogoča izbris sporočila v izbranem DMju.

**PARAMETRI**
| Ime           | Opis          |
| ------------- |:-------------:|
| :id         | ``` :id: string ```|
| :func          | ``` :func: 'addMsg' ```|
| body          | ``` msgId: string ```|

**ODZIVI**  

```diff
+ Ob uspehu se v ustrezen DM izbriše sporočilo in vrne koda 200.
- Ob neuspehu vrne kodo 500.
```

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
