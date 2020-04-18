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

***

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

***

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

```
Klic: '/api/DMs/:id/addMsg
Tip: put
```  

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

```
Klic: '/api/DMs/:id/removeMsg
Tip: put
```  

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

**NAMEN**   
Pridobi seznam sob uporabnika.

**PARAMETRI**
| Ime           | Opis          |
| ------------- |:-------------:|
| :userId         | ``` :userId: string ```|

**ODZIVI**  

```diff
+ Ob uspehu se vrne seznam sob in vrne koda 200.
- Ob neuspehu vrne kodo 500.
```

***

```
Klic: '/api/getRoom/:userId/:roomName'
Tip: get
```  

**NAMEN**   
Pridobi specifično sobo uporabnika.

**PARAMETRI**
| Ime           | Opis          |
| ------------- |:-------------:|
| :userId         | ``` :userId: string ```|
| :roomName         | ``` :title: string ```|

**ODZIVI**  

```diff
+ Ob uspehu se vrne izbrana soba in vrne koda 200.
- Ob neuspehu vrne kodo 500.
```

***

```
Klic: '/api/createRoom'
Tip: post
```  

**NAMEN**  
Ustvari novo sobo.

**PARAMETRI**
| Ime           | Opis          |
| ------------- |:-------------:|
| body        | ``` title: string ``` <br> ```creator: string```|

**ODZIVI**  

```diff
+ Ob uspehu se ustvari nova soba s pripadajočim klepetom in vrne koda 200.
- Ob neuspehu vrne kodo 500.
```

***

```
Klic: '/api/rooms/:id/:function'
Tip: put
```  
**NAMEN**  
Omogoča manipulacijo s sobo.

**PARAMETRI**  
| Ime           | Opis          |
| ------------- |:-------------:|
| :id         | ``` :roomId: string ```|
| :function          | ``` :function: 'addUser' \|\| 'changeName' ```|

### :function: addUser

```
Klic: '/api/rooms/:id/addUser'
Tip: put
```  

**NAMEN**  
Omogoča dodajanje deležnikov v sobo.

**PARAMETRI**
| Ime           | Opis          |
| ------------- |:-------------:|
| :id         | ``` :roomId: string ```|
| body          | ``` username: string ```|

**ODZIVI**  

```diff
+ Ob uspehu se v ustrezno sobo doda uporabnika in vrne koda 200.
- Ob neuspehu vrne kodo 500.
```

### :function: changeName

```
Klic: '/api/rooms/:id/changeName'
Tip: put
```  

**NAMEN**  
Omogoča spremembo imena sobe.

**PARAMETRI**
| Ime           | Opis          |
| ------------- |:-------------:|
| :id         | ``` :roomId: string ```|
| body          | ``` title: string ``` <br> ```creator: string``` <br> ```chatId: string```|

**ODZIVI**  

```diff
+ Ob uspehu se izbrani sobi in pripadajočemu klepetu spremeni ime in vrne koda 200.
- Ob neuspehu vrne kodo 500.
```

# Uporabniki
```
Klic: '/api/getUser/:user'  
Tip: get  
```

**NAMEN**  
Pridobi informacije o uporabniku.

**PARAMETRI**  
| Ime           | Opis          |
| ------------- |:-------------:|
| :user          | ``` user: string ```         |

**ODZIVI**   

```diff
+ Ob uspehu vrne informacije od zahtevanega uporabika in kodo 200.  
- Ob neuspehu vrne kodo 500.
```

***

```
Klic: '/api/registerUser'  
Tip: post  
```

**NAMEN**  
Registracija novega uporabnika.

**PARAMETRI**  
| Ime           | Opis          |
| ------------- |:-------------:|
| body          |``` email: string ``` <br> ```username: string``` <br> ```pass: string```         |

**ODZIVI**   

```diff
+ Ob uspehu se registrira novega uporabnika in vrne kodo 200.  
- Ob neuspehu vrne kodo 500.
```

***

```
Klic: '/api/authUser'  
Tip: post  
```

**NAMEN**  
Avtentikacija novega uporabnika.

**PARAMETRI**  
| Ime           | Opis          |
| ------------- |:-------------:|
| body          |``` username: string ``` <br> ```pass: string```         |

**ODZIVI**   

```diff
+ Ob uspehu se avtenticira novega uporabnika in vrne kodo 200.  
- Ob neuspehu vrne kodo 500.
```
