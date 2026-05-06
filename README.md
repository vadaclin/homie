# Projektdokumentation - Homie

## Inhaltsverzeichnis

1. [Ausgangslage](#1-ausgangslage)
2. [Lösungsidee](#2-lösungsidee)
3. [Vorgehen & Artefakte](#3-vorgehen--artefakte)
    1. [Understand & Define](#31-understand--define)
    2. [Sketch](#32-sketch)
    3. [Decide](#33-decide)
    4. [Prototype](#34-prototype)
    5. [Validate](#35-validate)
4. [Erweiterungen [Optional]](#4-erweiterungen-optional)
5. [Projektorganisation [Optional]](#5-projektorganisation-optional)
6. [KI-Deklaration](#6-ki-deklaration)
7. [Anhang [Optional]](#7-anhang-optional)

> **Hinweis:** Massgeblich sind die im **Unterricht** und auf **Moodle** kommunizierten Anforderungen.

<!-- WICHTIG: DIE KAPITELSTRUKTUR DARF NICHT VERÄNDERT WERDEN! -->

<!-- Diese Vorlage ist für eine README.md im Repository gedacht. Abschnitte mit [Optional] können weggelassen werden, wenn in den Übungen nichts anderes verlangt wird. -->

## 1. Ausgangslage
Viele Menschen verlieren im Alltag den Überblick darüber, welche Produkte zuhause noch vorhanden sind. Besonders in WGs, Familien oder gemeinsamen Haushalten werden Lebensmittel, Putzmittel oder Alltagsprodukte oft doppelt gekauft oder vergessen. Einkaufslisten entstehen häufig über WhatsApp oder mündliche Absprachen, wodurch Informationen schnell verloren gehen. Das führt zu unnötigen Kosten, mehr Abfall und Stress beim Einkaufen.
- **Problem:** Es fehlt eine einfache, gemeinsame Lösung, um Vorräte und Einkaufslisten übersichtlich zu organisieren. Dadurch kommt es zu Doppelkäufen, fehlenden Produkten und unnötiger Verschwendung.
- **Ziele:** Eine intuitive Web-App entwickeln, die es ermöglicht, Vorräte und Einkaufslisten gemeinsam zu verwalten. Ziel ist es, den Überblick im Haushalt zu verbessern, Doppelkäufe zu vermeiden, Lebensmittelverschwendung zu reduzieren und die Kommunikation innerhalb eines Haushalts zu vereinfachen.
- **Primäre Zielgruppe:** Personen in gemeinsamen Haushalten wie WGs, Paare und Familien, die ihren Alltag besser organisieren möchten. Auch Einzelpersonen können die App nutzen, um ihren eigenen Vorrat im Blick zu behalten. 
- **Weitere Stakeholder [Optional]:** _[z. B. Verwaltung, Geschäftsleitung]_  


## 2. Lösungsidee
Die entwickelte Web-App „Homie“ ermöglicht es, Vorräte und Einkaufslisten innerhalb eines Haushalts einfach und gemeinsam zu verwalten. Über einen vierstelligen Haushalts-Code können mehrere Personen auf dieselben Daten zugreifen, ohne ein Benutzerkonto erstellen zu müssen. Dadurch wird die Nutzung bewusst einfach gehalten und der Einstieg erleichtert.
- **Kernfunktionalität:**
    - Eingabe eines vierstelligen Haushalts-Codes zum Beitreten oder Erstellen eines Haushalts
    - Gemeinsame Verwaltung von Vorräten (Artikel hinzufügen, anzeigen und löschen)
    - Gruppierung der Vorräte nach Kategorien
    - Gemeinsame Einkaufsliste mit Hinzufügen, Abhaken und Löschen von Artikeln
    - Automatische Synchronisation innerhalb eines Haushalts (alle sehen denselben Stand)  
- **Annahmen [Optional]:**
    - Eine einfache Lösung ohne Login wird eher genutzt als komplexe Systeme
    - Nutzer bevorzugen eine schnelle und unkomplizierte Bedienung
    - Ein gemeinsamer Code reicht aus, um Haushalte voneinander zu trennen
    - Die App wird hauptsächlich mobil oder nebenbei im Alltag genutzt
- **Abgrenzung [Optional]:**
    - Keine Benutzerkonten oder Login-Systeme
    - Keine detaillierte Rechteverwaltung (alle im Haushalt haben dieselben Rechte)
    - Keine automatische Erkennung von Produkten oder Barcode-Scan
    - Keine komplexe Lagerverwaltung oder Statistiken
    - Fokus liegt auf einfacher Funktionalität, nicht auf Vollständigkeit

## 3. Vorgehen & Artefakte
Die Entwicklung des Projekts erfolgte in mehreren Phasen. Zuerst wurde das Problem im Alltag analysiert. Danach wurden mögliche Lösungsansätze skizziert, bewertet und schliesslich als Prototyp umgesetzt.
Das Vorgehen orientierte sich an einem Design-Thinking-ähnlichen Prozess. Dabei standen die Bedürfnisse der Nutzerinnen und Nutzer im Mittelpunkt. Ziel war es, eine Lösung zu entwickeln, die nicht nur technisch funktioniert, sondern auch im Alltag verständlich und nützlich ist.

### 3.1 Understand & Define
**Zielgruppenverständnis:** In der ersten Phase wurde untersucht, in welchen Alltagssituationen Menschen den Überblick über ihre Haushaltsprodukte verlieren. Dabei zeigte sich, dass das Problem nicht nur in gemeinsamen Haushalten vorkommt.
Bei Einzelpersonen entsteht das Problem häufig dadurch, dass Einkäufe spontan geplant werden und vorhandene Produkte nicht bewusst überprüft werden. Man kauft zum Beispiel ein Produkt nochmals, obwohl es zuhause noch vorhanden ist, oder vergisst wichtige Dinge, weil keine aktuelle Einkaufsliste geführt wird.
In gemeinsamen Haushalten ist das Problem zusätzlich komplexer, weil mehrere Personen Produkte verbrauchen oder einkaufen. Dadurch entstehen Missverständnisse: Eine Person geht davon aus, dass ein Produkt noch vorhanden ist, während eine andere es bereits aufgebraucht hat. Einkaufslisten werden oft über verschiedene Kanäle geführt, wodurch der aktuelle Stand nicht für alle klar ersichtlich ist.

**Proto-Persona 1: Einzelperson**
Name: Thomas
Alter: 35 Jahre
Situation: Lebt alleine in einer Wohnung
Bedürfnis: Thomas möchte beim Einkaufen besser wissen, welche Produkte er noch zuhause hat.
Problem: Er kauft oft Dinge doppelt oder vergisst wichtige Produkte, weil er keine feste Einkaufsliste führt.
Ziel: Eine einfache App nutzen, mit der er Vorräte und fehlende Produkte schnell erfassen kann.

**Proto-Persona 2: Gemeinsamer Haushalt**
Name: Lara
Alter: 24 Jahre
Situation: Lebt in einer WG mit drei Mitbewohnerinnen und Mitbewohnern
Bedürfnis: Lara möchte schnell sehen können, welche Produkte im Haushalt vorhanden sind und was noch gekauft werden muss.
Problem: In ihrer WG werden Einkaufslisten oft über WhatsApp geführt. Dadurch gehen Nachrichten unter oder Produkte werden mehrfach gekauft.
Ziel: Eine gemeinsame App nutzen, in der alle WG-Mitglieder denselben aktuellen Stand sehen.

**Wesentliche Erkenntnisse:**
- Die App muss für Einzelpersonen und Gruppen funktionieren.
- Die Bedienung muss sehr einfach sein.
- Ein Login könnte für eine kleine Haushalts-App unnötig kompliziert wirken.
- Eine gemeinsame Nutzung über einen Code senkt die Einstiegshürde.
- Vorräte und Einkaufsliste sollten klar getrennt sein.
- Kategorien verbessern die Übersichtlichkeit.
- Die App sollte auch auf mobilen Geräten gut nutzbar sein.
- Der Fokus soll auf Alltagstauglichkeit liegen.
- Wenige, gut funktionierende Kernfunktionen sind wichtiger als viele Zusatzfunktionen.

### 3.2 Sketch
**Variantenüberblick:** In der Sketch-Phase wurden verschiedene Möglichkeiten überlegt, wie die App aufgebaut sein könnte. Dabei wurde besonders darauf geachtet, dass die App sowohl für Einzelpersonen als auch für gemeinsame Haushalte verständlich bleibt.

**Variante 1: Einfache Listenansicht**
In dieser Variante werden alle Artikel in einer einfachen Liste dargestellt. Nutzerinnen und Nutzer können Produkte hinzufügen und löschen.

**Vorteile:**
- Sehr einfach verständlich
- Schneller Einstieg
- Wenig Ablenkung

**Nachteile:**
- Bei vielen Produkten schnell unübersichtlich
- Keine klare Trennung zwischen Vorräten und Einkaufsliste
- Für gemeinsame Haushalte weniger strukturiert

**Variante 2: Getrennte Bereiche für Vorrat und Einkaufsliste**
Diese Variante trennt die App in zwei Hauptbereiche: Vorräte und Einkaufsliste. Dadurch ist klar ersichtlich, welche Produkte bereits vorhanden sind und welche noch gekauft werden müssen.

**Vorteile:**
- Gute Übersicht
- Klare Struktur
- Für Einzelpersonen und Gruppen geeignet
- Einfache Bedienung
  
**Nachteile:**
- Etwas mehr Navigation notwendig als bei einer einzigen Liste

**Variante 3: Haushalts-Dashboard mit Code-Zugang**
Bei dieser Variante gelangen Nutzerinnen und Nutzer zuerst über einen vierstelligen Code in ihren Haushalt. Danach sehen sie eine übersichtliche Ansicht mit den Bereichen Vorräte und Einkaufsliste.

**Vorteile:**
- Gemeinsame Nutzung ohne Login möglich
- Auch Einzelpersonen können einen eigenen Haushalt verwenden
- Klare Trennung der Funktionen
- Einfacher Einstieg
- Gut erweiterbar

**Nachteile:**
- Der Code muss bekannt sein oder gemerkt werden
- Keine individuelle Benutzerverwaltung

**Skizzen:**
Für die App wurden mehrere grobe Skizzen erstellt. Die wichtigsten Ansichten waren:
- Startseite mit Eingabe eines Haushalts-Codes
- Übersicht nach dem Beitritt zu einem Haushalt
- Vorratsansicht mit Kategorien
- Formular zum Hinzufügen neuer Produkte
- Einkaufsliste mit Abhak-Funktion
- Möglichkeit zum Löschen erledigter oder falscher Einträge
Die Skizzen halfen dabei, die Struktur der App früh zu überprüfen. Besonders wichtig war, dass die Nutzerinnen und Nutzer schnell verstehen, wo sie Produkte hinzufügen und wo sie fehlende Artikel eintragen können.

### 3.3 Decide
- **Gewählte Variante & Begründung:** Nach dem Vergleich der verschiedenen Varianten wurde die Variante "Haushalts-Dashboard mit Code-Zugang" ausgewählt. Diese Lösung verbindet die Vorteile einer einfachen Bedienung mit der Möglichkeit, die App gemeinsam in einem Haushalt zu nutzen. Der vierstellige Haushalts-Code wurde gewählt, weil dadurch kein klassisches Login-System notwendig ist. Das senkt die Einstiegshürde und macht die App besonders schnell nutzbar.

Die Entscheidung fiel auf diese Variante, weil sie die wichtigsten Anforderungen des Projekts am besten erfüllt:
- einfache Nutzung ohne Registrierung
- gemeinsamer Zugriff für mehrere Personen
- klare Trennung zwischen Vorräten und Einkaufsliste
- gute Übersicht durch Kategorien
- einfache Erweiterbarkeit für spätere Funktionen
- geeignet für mobile Nutzung im Alltag

- **End-to-End-Ablauf:** Der typische Ablauf beginnt damit, dass eine Nutzerin oder ein Nutzer die Web-App öffnet. Auf der Startseite wird ein vierstelliger Haushalts-Code eingegeben. Falls der Haushalt bereits existiert, tritt die Person diesem Haushalt bei. Falls die Person noch keinen Code hat, muss zuerst ein neuer Haushalt erstellt werden.
Nach dem Beitritt gelangt die Person zur Hauptansicht, dem Dashboard. Dort sind die wichtigsten Bereiche sichtbar: Vorräte, Einkaufsliste und To-do-Liste. Im Vorratsbereich können vorhandene Produkte mit Namen, Kategorie und Anzahl hinzugefügt werden. Die Produkte werden danach übersichtlich angezeigt und können bei Bedarf wieder gelöscht werden.
Wenn die Anzahl eines Vorratsprodukts auf 1 sinkt, kann es mit einem Klick zur Einkaufsliste hinzugefügt werden. Wird der Artikel in der Einkaufsliste abgehakt, kann er wieder dem Vorrat hinzugefügt werden. Dadurch bleibt der aktuelle Stand des Haushalts übersichtlich und einfach nachvollziehbar.

**User Journey:** 
1. Nutzerin oder Nutzer öffnet die Web-App.
2. Auf der Startseite wird ein vierstelliger Haushalts-Code eingegeben.
3. Falls der Haushalt bereits existiert, tritt die Person diesem Haushalt bei.
4. Falls noch kein Code vorhanden ist, erstellt die Person zuerst einen neuen Haushalt.
5. Nach dem Beitritt gelangt die Person zum Dashboard.
6. Im Dashboard sieht die Person die Bereiche Vorräte, Einkaufsliste und To-do-Liste.
7. Im Vorratsbereich können Produkte mit Name, Kategorie und Anzahl hinzugefügt werden.
8. Die vorhandenen Produkte werden übersichtlich angezeigt und können bei Bedarf gelöscht werden.
9. Wenn die Anzahl eines Vorratsprodukts auf 1 sinkt, kann es mit einem Klick zur Einkaufsliste hinzugefügt werden.
10. In der Einkaufsliste können fehlende Produkte angezeigt, abgehakt oder gelöscht werden.
11. Wenn ein Produkt in der Einkaufsliste abgehakt wird, kann es wieder dem Vorrat hinzugefügt werden.
12. In der To-do-Liste können zusätzliche Haushaltsaufgaben eingetragen werden.
13. Alle Personen im Haushalt sehen denselben aktuellen Stand und können gemeinsam Vorräte, Einkäufe und Aufgaben verwalten.

**Mockup:**


### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
Der Prototyp von Homie wurde so gestaltet, dass die wichtigsten Funktionen schnell verständlich und einfach erreichbar sind. Der Fokus liegt auf einer klaren Struktur, damit Nutzerinnen und Nutzer ohne lange Erklärung wissen, wo sie Vorräte, Einkaufslisten und Aufgaben verwalten können.
**Informationsarchitektur:** Die App ist in wenige zentrale Bereiche aufgeteilt. Nach dem Öffnen der Web-App gelangen Nutzerinnen und Nutzer zuerst zur Startseite. Dort können sie entweder einen bestehenden vierstelligen Haushalts-Code eingeben oder einen neuen Haushalt erstellen.

Nach dem Beitritt zu einem Haushalt öffnet sich das Dashboard. Dieses bildet die Hauptansicht der App. Von dort aus sind die wichtigsten Bereiche erreichbar:
- Vorräte
- Einkaufsliste
- To-do-Liste

Der Bereich **Vorräte** dient dazu, vorhandene Haushaltsprodukte zu verwalten. Produkte können mit Name, Kategorie und Anzahl erfasst werden.  
Die **Einkaufsliste** zeigt Produkte, die gekauft werden müssen. Artikel können hinzugefügt, abgehakt oder gelöscht werden.  
Die **To-do-Liste** ermöglicht es, zusätzliche Aufgaben im Haushalt einzutragen.

Diese Struktur wurde gewählt, weil sie den Alltag in einem Haushalt einfach abbildet: Was ist vorhanden, was muss gekauft werden und was muss erledigt werden?

**User Interface Design:** Die folgenden Screenshots zeigen die wichtigsten Ansichten der Homie-App.

![Startseite](prototype/FirstPage.png)
*Startseite der App, auf der Nutzerinnen und Nutzer einem Haushalt per Code beitreten können.*

![Haushalt erstellen](prototype/CreateHaushalt.png)
 *Ansicht zum Erstellen eines neuen Haushalts.*

![Dashboard](prototype/Dashboard.png)
*Dashboard mit Übersicht über Vorräte, Einkaufsliste und To-do-Bereich.*

![Vorratsübersicht](prototype/Vorrat.png)
*Übersicht über vorhandene Produkte im Vorrat mit Name, Kategorie und Anzahl.*

![Vorrat hinzufügen](prototype/VorratHinzufuegen.png)
*Maske zum Hinzufügen neuer Produkte in den Vorrat.*

![Einkaufsliste](prototype/Einkaufsliste.png)
*Einkaufsliste mit fehlenden Produkten, die abgehakt oder verwaltet werden können.*

![Vorrat übernehmen](prototype/Vorratuebernehmen.png)
*Ansicht zum Übernehmen oder Aktualisieren von Vorratsprodukten aus der Einkaufsliste, nachdem ein Produkt abgehakt wurde.*

**Designentscheidungen:** Eine zentrale Designentscheidung war die Nutzung eines vierstelligen Haushalts-Codes anstelle eines klassischen Logins. Dadurch können Nutzerinnen und Nutzer schnell starten, ohne ein Konto erstellen zu müssen.

Die Bereiche Vorräte, Einkaufsliste und To-do-Liste wurden klar getrennt, damit keine Verwirrung entsteht. Vorräte zeigen, was bereits vorhanden ist. Die Einkaufsliste zeigt, was noch gekauft werden muss. Die To-do-Liste zeigt zusätzliche Aufgaben im Haushalt.

Ausserdem wurde entschieden, Produkte mit einer Anzahl zu speichern. Dadurch kann besser nachvollzogen werden, wie viel von einem Produkt noch vorhanden ist. Wenn die Anzahl eines Produkts auf 1 sinkt, kann es mit einem Klick zur Einkaufsliste hinzugefügt werden. Wird ein Produkt in der Einkaufsliste abgehakt, kann es wieder dem Vorrat hinzugefügt werden.

Diese Entscheidungen unterstützen das Hauptziel der App: den Haushalt übersichtlich, einfach und gemeinsam zu organisieren.

#### 3.4.2. Umsetzung (Technik)
Der Prototyp wurde als Web-App umgesetzt. Ziel war es, die wichtigsten Funktionen funktionsfähig darzustellen und eine einfache gemeinsame Nutzung pro Haushalt zu ermöglichen.
- **Technologie-Stack:** Für die Umsetzung wurde SvelteKit verwendet. SvelteKit eignet sich gut für moderne Web-Apps, da Seiten, Komponenten und Logik übersichtlich strukturiert werden können. Die App wurde mit HTML, CSS und JavaScript beziehungsweise Svelte umgesetzt.

Verwendete Technologien:
- SvelteKit
- JavaScript / Svelte
- HTML
- CSS
- MongoDB

- **Tooling:** Für die Entwicklung wurde eine lokale Entwicklungsumgebung verwendet. Der Code wurde in einer IDE bearbeitet und über den lokalen Entwicklungsserver getestet.

Verwendete Tools:
- Visual Studio Code
- Terminal
- Node.js / npm
- Browser-Entwicklertools zum Testen und Debuggen
- Git / GitHub zur Versionsverwaltung
- Netlify

- **Struktur & Komponenten:** Die App wurde in mehrere Bereiche und Komponenten aufgeteilt. Dadurch bleibt der Code übersichtlich und die einzelnen Funktionen können einfacher angepasst werden.

Wichtige Bestandteile:
- Startseite für Haushalts-Code und Haushaltserstellung
- Dashboard als Hauptansicht
- Vorratsbereich zur Verwaltung vorhandener Produkte
- Einkaufsliste zur Verwaltung fehlender Produkte
- To-do-Liste für Haushaltsaufgaben
- Formulare zum Hinzufügen neuer Einträge
- Buttons zum Löschen, Abhaken oder Verschieben von Einträgen

Die Navigation ist bewusst einfach gehalten. Nach dem Beitritt zu einem Haushalt befindet sich die Nutzerin oder der Nutzer direkt im Dashboard und kann von dort aus alle Hauptfunktionen verwenden.

**Daten & Schnittstellen:** Alle Daten der App werden in MongoDB gespeichert. Dazu gehören die Haushalte, Vorratsprodukte, Einkaufslisten-Einträge und To-do-Einträge. Der vierstellige Haushalts-Code dient dazu, die Daten eindeutig einem Haushalt zuzuordnen. Wenn mehrere Personen denselben Code verwenden, greifen sie auf dieselben gespeicherten Daten in MongoDB zu.

Für jeden Haushalt werden die relevanten Informationen gespeichert:
- Haushalts-Code
- Vorratsprodukte mit Name, Kategorie und Anzahl
- Artikel auf der Einkaufsliste
- Status von Einkaufslisten-Artikeln, zum Beispiel offen oder abgehakt
- To-do-Einträge

Die App ruft die Daten aus MongoDB ab und zeigt sie im jeweiligen Bereich an. Wenn ein Produkt, ein Einkaufslisten-Eintrag oder eine To-do-Aufgabe hinzugefügt wird, wird dieser Eintrag in MongoDB gespeichert. Änderungen wie Abhaken, Löschen oder Verschieben zwischen Vorrat und Einkaufsliste werden ebenfalls in MongoDB aktualisiert.

**Deployment:** https://homie-appl.netlify.app
**Besondere Entscheidungen:** Eine wichtige Entscheidung war der Verzicht auf ein klassisches Login-System. Stattdessen wird ein vierstelliger Haushalts-Code verwendet. Diese Lösung ist einfacher und passt besser zum Ziel der App, da Nutzerinnen und Nutzer möglichst schnell starten können.

Alle Personen mit demselben Haushalts-Code haben dieselben Rechte. Es gibt keine Rollen wie Admin oder Mitglied. Diese Vereinfachung reduziert die Komplexität des Prototyps und macht die Bedienung verständlicher.

Ausserdem wurde der Funktionsumfang bewusst begrenzt. Der Prototyp konzentriert sich auf die wichtigsten Funktionen: Vorräte verwalten, Einkaufsliste nutzen, To-do-Einträge erfassen und Daten pro Haushalt speichern. Weitere Funktionen wie Benutzerkonten, Barcode-Scan oder Benachrichtigungen wurden bewusst nicht umgesetzt, da sie den Prototyp komplexer gemacht hätten.
 
### 3.5 Validate
**URL der getesteten Version** https://homie-appl.netlify.app
**Ziele der Prüfung:** Mit der Validierung sollte überprüft werden, ob der Prototyp verständlich, nützlich und einfach bedienbar ist. Besonders wichtig war die Frage, ob Nutzerinnen und Nutzer die wichtigsten Funktionen ohne lange Erklärung verwenden können.

Geprüft wurden folgende Fragen:
- Ist der Einstieg über den Haushalts-Code verständlich?
- Ist klar, wie ein neuer Haushalt erstellt wird?
- Finden Nutzerinnen und Nutzer das Dashboard schnell?
- Ist die Trennung zwischen Vorrat, Einkaufsliste und To-do-Liste verständlich?
- Können Produkte einfach hinzugefügt, gelöscht und verwaltet werden?
- Ist die Anzahl-Funktion bei Vorratsprodukten verständlich?
- Ist klar, wie ein Produkt zur Einkaufsliste hinzugefügt werden kann?
- Ist verständlich, dass abgehakte Einkaufslisten-Produkte wieder in den Vorrat übernommen werden können?
- Funktioniert die App auch auf mobilen Geräten übersichtlich?
 
**Vorgehen:** Die Tests wurden mit einfachen Nutzungsszenarien durchgeführt. Die Testpersonen erhielten konkrete Aufgaben und sollten diese möglichst selbstständig lösen. Währenddessen wurde beobachtet, ob sie die Funktionen finden, verstehen und korrekt verwenden können.

Das Vorgehen war leicht moderiert. Falls eine Testperson nicht weiterkam, wurde notiert, an welcher Stelle das Problem auftrat. Es wurde aber möglichst wenig geholfen, damit sichtbar wurde, ob die App auch ohne Erklärung verständlich ist.

- **Stichprobe:** Getestet wurde mit Personen, die zur Zielgruppe der App passen. Dazu gehören Personen, die alleine wohnen, sowie Personen aus gemeinsamen Haushalten wie WGs oder Familien.

Stichprobe:
- Anzahl Testpersonen: 6
- Profil: Einzelpersonen und Personen aus gemeinsamen Haushalten
- Alter: 25-45
- Technische Erfahrung: gemischt

**Aufgaben/Szenarien:** Für die Validierung wurden typische Alltagssituationen getestet. 
Testaufgaben:
1. Öffne die Web-App.
2. Erstelle einen neuen Haushalt oder tritt einem bestehenden Haushalt mit einem vierstelligen Code bei.
3. Öffne das Dashboard.
4. Füge ein neues Produkt zum Vorrat hinzu.
5. Gib dem Produkt einen Namen, eine Kategorie und eine Anzahl.
6. Prüfe, ob das Produkt korrekt im Vorrat angezeigt wird.
7. Füge ein Produkt mit niedriger Anzahl zur Einkaufsliste hinzu.
8. Hake ein Produkt in der Einkaufsliste ab.
9. Füge ein abgehaktes Produkt wieder zum Vorrat hinzu.
10. Erstelle einen Eintrag in der To-do-Liste.
11. Lösche einen nicht mehr benötigten Eintrag.

**Kennzahlen & Beobachtungen:** Während der Tests wurde beobachtet, ob die Aufgaben erfolgreich abgeschlossen werden konnten und an welchen Stellen Unsicherheiten entstanden.

Beobachtungen:
- Der Einstieg über den Haushalts-Code wurde grundsätzlich verstanden.
- Das Dashboard half dabei, die drei Bereiche Vorrat, Einkaufsliste und To-do-Liste schnell zu finden.
- Das Hinzufügen von Produkten war verständlich.
- Die Speicherung der Daten in MongoDB funktionierte zuverlässig, da Einträge auch nach dem Neuladen der Seite erhalten blieben.
- Die Anzahl-Funktion wurde als nützlich wahrgenommen.
- Die mobile Nutzung ist wichtig, weil die Einkaufsliste oft direkt beim Einkaufen verwendet wird.
- Bei gemeinsamen Haushalten wie WGs oder Familien war nicht klar ersichtlich, welche Person einen Eintrag erstellt hat. Dadurch kann es schwierig sein nachzuvollziehen, wer ein Produkt, einen Einkaufslisten-Eintrag oder eine To-do-Aufgabe hinzugefügt hat.

Kennzahlen:
- Erfolgsquote: 11 von 11 Aufgaben erfolgreich gelöst
- Durchschnittlicher Zeitbedarf: 2-5 Minuten pro Testperson
- Häufigste Schwierigkeit: In gemeinsamen Haushalten wie WGs oder Familien ist nicht ersichtlich, von welcher Person ein Eintrag stammt.

**Zusammenfassung der Resultate:** Die Validierung zeigte, dass die Grundidee von Homie verständlich ist und die wichtigsten Funktionen sinnvoll zusammenarbeiten. Besonders positiv bewertet wurden der einfache Einstieg über den Haushalts-Code, die klare Aufteilung in Vorräte, Einkaufsliste und To-do-Liste sowie die zuverlässige Speicherung der Daten in MongoDB. Alle getesteten Aufgaben konnten erfolgreich abgeschlossen werden.

Verbesserungspotenzial gibt es vor allem bei der Nutzung in gemeinsamen Haushalten wie WGs oder Familien. Dort wäre es hilfreich, wenn sichtbar wäre, welche Person einen Eintrag erstellt hat. Zusätzlich wurde von Testpersonen der Wunsch geäussert, dass die App in Zukunft Rezeptvorschläge machen soll. Diese Rezeptvorschläge sollen auf den Produkten basieren, die man bereits zuhause im Vorrat hat.

**Abgeleitete Verbesserungen:** Aus der Validierung wurden mehrere Verbesserungen abgeleitet, die in einer nächsten Version umgesetzt werden sollten.

1. **Anzeige, wer einen Eintrag erstellt hat**  
   In gemeinsamen Haushalten wie WGs oder Familien wäre es hilfreich zu sehen, welche Person einen Eintrag erstellt hat. So könnten Haushaltsmitglieder besser nachvollziehen, wer ein Produkt zur Einkaufsliste hinzugefügt, eine Aufgabe erstellt oder einen Vorratsartikel eingetragen hat. Das würde die Transparenz und Kommunikation im Haushalt verbessern.

2. **Rezeptvorschläge anhand vorhandener Vorräte**  
   Nutzerinnen und Nutzer wünschten sich eine Funktion, mit der aus vorhandenen Produkten passende Rezeptideen vorgeschlagen werden. Dadurch könnte die App nicht nur beim Einkaufen helfen, sondern auch dabei, vorhandene Lebensmittel sinnvoll zu verwenden und Lebensmittelverschwendung zu reduzieren.

## 4. Erweiterungen

### 4.1 Verknüpfung Einkaufsliste ↔ Vorrat
**Beschreibung & Nutzen:** Artikel aus dem Vorrat können direkt zur Einkaufsliste hinzugefügt werden, sobald die Anzahl auf 1 gesunken ist. Nach dem Einkauf kann ein Artikel in der Einkaufsliste abgehakt und mit einem Klick automatisch in den Vorrat übernommen werden — inklusive Menge und Kategorie. Die ursprüngliche Kategorie wird dabei mitgespeichert und beim Zurückübernehmen automatisch vorausgefüllt. So entfällt doppelte Dateneingabe und der reale Einkaufsablauf wird vollständig abgebildet.
**Wo umgesetzt:**
- Frontend: Vorrat-Seite mit „+ Einkaufsliste"-Button; Einkaufsliste mit Modal „In Vorrat übernehmen" (Mengen- und Kategorieauswahl vorausgefüllt)
- Backend: Form Action die einen Einkaufslisten-Eintrag als erledigt markiert und gleichzeitig einen Vorrats-Eintrag erstellt oder aktualisiert
- Datenbank: Collections einkaufsliste und vorrat in MongoDB, verknüpft über den Haushalts-Code
**Referenz:** Beschrieben in Kap. 3.3 (User Journey, Schritte 9–11) und Kap. 3.4.1 (User Interface Design)
**Aus Evaluation abgeleitet?:** Ja, die Funktion wurde erst später ergänzt, weil in der Validierung deutlich wurde, dass die Verbindung zwischen Vorrat und Einkaufsliste klarer und praktischer sein sollte.

### 4.2 To-do-Liste für Haushaltsaufgaben  
- **Beschreibung & Nutzen:** _[Was wurde erweitert? Warum?]_  
- **Wo umgesetzt:** _[Wie und wo wurde es gemacht? Frontend, Backend, Datenbank?]_  
- **Referenz:** _[Wo wird die Erweiterung auch noch beschrieben, z.B. Screenshot oder Beschreibung in einem anderen Kapitel]_  
- **Aus Evaluation abgeleitet?:** _[Wurde diese Erweiterung als Folge eines in der Evaluation identifizierten Issues implementiert?]_  

### 4.3 Artikelsuche im Vorrat
- **Beschreibung & Nutzen:** _[Was wurde erweitert? Warum?]_  
- **Wo umgesetzt:** _[Wie und wo wurde es gemacht? Frontend, Backend, Datenbank?]_  
- **Referenz:** _[Wo wird die Erweiterung auch noch beschrieben, z.B. Screenshot oder Beschreibung in einem anderen Kapitel]_  
- **Aus Evaluation abgeleitet?:** _[Wurde diese Erweiterung als Folge eines in der Evaluation identifizierten Issues implementiert?]_  

## 5. Projektorganisation
**Repository & Struktur:** https://github.com/vadaclin/homie
Das Repository enthält die Ordner src (SvelteKit-App mit Seiten und Komponenten), static (statische Assets) sowie Konfigurationsdateien wie svelte.config.js, vite.config.js und netlify.toml.
**Commit-Praxis:** Es wurden teilweise sprechende Commits verwendet, die grob beschreiben, was geändert wurde. Insgesamt wurden 34 Commits gemacht, wodurch die schrittweise Entwicklung von der Grundstruktur bis zum fertigen Prototyp grundsätzlich nachvollziehbar ist. Die Commit-Nachrichten waren jedoch nicht immer einheitlich oder sehr detailliert. Deshalb lässt sich der Entwicklungsverlauf zwar erkennen, aber nicht bei jedem Commit genau nachvollziehen.

## 6. KI-Deklaration
Die folgende Deklaration ist verpflichtend und beschreibt den Einsatz von KI im Projekt.

### 6.1 KI-Tools
- **Eingesetzte Tools**: _[z. B. Copilot, ChatGPT, Claude, lokale Modelle; Version/Variante wenn bekannt]_
- **Zweck & Umfang**: _[wie, wofür und in welchem Ausmass wurde KI eingesetzt (z. B. Textentwürfe, Codevorschläge, Tests, Refactoring); welche Teile stammen (ganz/teilweise) aus KI-Unterstützung?]_
- **Eigene Leistung (Abgrenzung):** _[was ist eigenständig erarbeitet/überarbeitet worden?]_

### 6.2 Prompt-Vorgehen
_[Überlegungen zu Prompt-Vorgehen, Qualität und Urheberrecht/Quellen. Wie wurde beim Prompting vorgegangen? Zu beschreiben ist die grundlegende Vorgehensweise. Einzelne, konkrete Prompts sollten höchstens als Beispiele aufgeführt werden. ]_

### 6.3 Reflexion
_[Nutzen, Grenzen, Risiken/Qualitätssicherung, ...]_

## 7. Anhang [Optional]
Beispiele:
- **Quellen:** _[verwendete Vorlagen/Assets/Modelle; Lizenz/Urheberrecht; ...]_
- **Testskript & Materialien:** _[Link/Datei]_  
- **Rohdaten/Auswertung:** _[Link/Datei]_  

