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
Viele Menschen verlieren im Alltag schnell den Überblick darüber, welche Produkte zuhause noch vorhanden sind, was bald aufgebraucht ist und was beim nächsten Einkauf wirklich benötigt wird. Das betrifft nicht nur WGs, Paare oder Familien, sondern auch Einzelpersonen, die ihren Haushalt selbst organisieren. Einkaufslisten entstehen häufig über WhatsApp, mündliche Absprachen, Notizen oder im Kopf. Dadurch gehen Informationen schnell verloren, Produkte werden doppelt gekauft oder wichtige Dinge fehlen beim Einkauf.
Die Web-App Homie setzt genau hier an: Sie unterstützt sowohl Einzelpersonen als auch gemeinsame Haushalte dabei, Vorräte, Einkaufslisten, To-do’s und das Wochenmenü übersichtlich zu organisieren. So wird der Alltag besser strukturiert, Einkäufe können gezielter geplant werden und alle wichtigen Haushaltsinformationen sind an einem zentralen Ort verfügbar.

- **Problem:** Es fehlt eine einfache, zentrale Lösung, mit der Einzelpersonen und gemeinsame Haushalte Vorräte, Einkaufslisten, Aufgaben und Mahlzeiten planen können. Dadurch entstehen Doppelkäufe, vergessene Produkte, unklare Absprachen und unnötige Verschwendung.
- **Ziele:** Ziel ist die Entwicklung einer intuitiven Web-App, mit der Nutzerinnen und Nutzer ihre Vorräte verwalten, Einkaufslisten erstellen, To-do’s organisieren und ein Wochenmenü planen können. Die App soll helfen, den Überblick im Alltag zu verbessern, Einkäufe gezielter zu planen, Lebensmittelverschwendung zu reduzieren und die Haushaltsorganisation zu vereinfachen.
- **Primäre Zielgruppe:** Die App richtet sich an Einzelpersonen sowie an Personen in gemeinsamen Haushalten wie WGs, Paare und Familien, die ihren Alltag besser organisieren möchten. Homie eignet sich somit für alle, die Vorräte, Einkäufe, Aufgaben und Mahlzeiten übersichtlich planen möchten.


## 2. Lösungsidee
Die entwickelte Web-App Homie ermöglicht es, Vorräte, Einkaufslisten, To-do’s und Wochenmenüs einfach und übersichtlich zu verwalten. Die App kann sowohl von Einzelpersonen als auch von mehreren Personen in einem gemeinsamen Haushalt genutzt werden. Über einen vierstelligen Haushalts-Code können Nutzerinnen und Nutzer einem Haushalt beitreten oder einen neuen Haushalt erstellen, ohne ein Benutzerkonto anlegen zu müssen. Dadurch bleibt der Einstieg bewusst unkompliziert und alltagstauglich.
Homie bündelt wichtige Funktionen der Haushaltsorganisation an einem zentralen Ort. Nutzerinnen und Nutzer können ihren Vorrat erfassen, Produkte nach Kategorien anzeigen lassen, Artikel auf die Einkaufsliste setzen und erledigte Einkäufe wieder in den Vorrat übernehmen. Zusätzlich unterstützt die App mit einer To-do-Liste und einem Wochenmenüplan die Planung des Haushaltsalltags.
- **Kernfunktionalität:**
    - Nutzung ohne klassisches Benutzerkonto oder Login
    - Verwaltung von Vorräten mit Artikelname, Menge, Einheit und Kategorie
    - Gruppierung der Vorräte nach Kategorien
    - Markierung von Artikeln, die bald leer sind
    - Übernahme von Artikeln aus dem Vorrat in die Einkaufsliste
    - Gemeinsame Einkaufsliste mit Hinzufügen, Anzeigen, Löschen und Übernehmen von Artikeln in den Vorrat
    - Speicherung von Mengenangaben und Einheiten wie Stück, Pack, kg, g, Liter oder eigener Angabe
    - To-do-Liste für Aufgaben im Haushalt
    - Wochenmenüplan mit Einträgen pro Wochentag
    - Möglichkeit, mehrere Menüeinträge pro Tag zu erfassen
    - Verschieben von Menüeinträgen per Drag & Drop
    - Automatische Speicherung der Daten in der Datenbank
    -  Automatische Synchronisation innerhalb eines Haushalts (alle sehen denselben Stand)  
- **Annahmen:**
    - Eine einfache Lösung ohne komplexen Login wird eher genutzt als umfangreiche Systeme
    - Nutzerinnen und Nutzer bevorzugen eine schnelle, intuitive und mobile Bedienung
    - Ein gemeinsamer Haushalts-Code reicht aus, um Haushalte voneinander zu trennen
    - Die App wird hauptsächlich im Alltag nebenbei genutzt, zum Beispiel beim Einkaufen, Kochen oder Planen
    - Eine klare visuelle Struktur hilft dabei, den Überblick über Vorräte, Einkäufe und Aufgaben zu behalten
    - Die Kombination aus Vorrat, Einkaufsliste, To-do’s und Wochenmenü deckt zentrale Bedürfnisse der Haushaltsorganisation ab
- **Abgrenzung:**
    - Keine Benutzerkonten oder Login-Systeme
    - Keine detaillierte Rechteverwaltung (alle im Haushalt haben dieselben Rechte)
    - Keine automatische Erkennung von Produkten oder Barcode-Scan
    - Keine komplexe Lagerverwaltung oder Statistiken
    - Fokus liegt auf einfacher Funktionalität, nicht auf Vollständigkeit

## 3. Vorgehen & Artefakte
Die Entwicklung des Projekts erfolgte in mehreren Phasen. Zu Beginn wurde das Problem der Haushaltsorganisation im Alltag analysiert. Ursprünglich lag der Fokus der Idee auf zwei zentralen Funktionen: der Verwaltung von Vorräten und einer gemeinsamen Einkaufsliste. Damit sollte zuerst das Kernproblem gelöst werden, nämlich den Überblick über vorhandene Produkte und benötigte Einkäufe zu verbessern.
Während der Weiterentwicklung wurde deutlich, dass Haushaltsorganisation mehr umfasst als nur Vorräte und Einkäufe. Deshalb wurde die App schrittweise erweitert. Es kamen ein Dashboard als zentrale Übersichtsseite, eine To-do-Liste für Aufgaben im Haushalt sowie ein Wochenmenüplan zur Essensplanung hinzu. Dadurch entwickelte sich Homie von einer einfachen Vorrats- und Einkaufslisten-App zu einer umfassenderen Lösung für die alltägliche Organisation im Haushalt.
Anschliessend wurden die Funktionen schrittweise als Prototyp umgesetzt und laufend angepasst. Im Fokus standen eine einfache Bedienung, eine klare visuelle Struktur und die Möglichkeit, die App sowohl alleine als auch gemeinsam in einem Haushalt zu nutzen.
Das Vorgehen orientierte sich an einem Design-Thinking-ähnlichen Prozess. Dabei standen die Bedürfnisse der Nutzerinnen und Nutzer im Mittelpunkt. Ziel war es, eine Lösung zu entwickeln, die nicht nur technisch funktioniert, sondern auch im Alltag verständlich, schnell nutzbar und hilfreich ist.

### 3.1 Understand & Define
**Zielgruppenverständnis:** In der ersten Phase wurde untersucht, in welchen Alltagssituationen Menschen den Überblick über ihre Haushaltsorganisation verlieren. Dabei zeigte sich, dass das Problem nicht nur gemeinsame Haushalte betrifft, sondern auch Einzelpersonen. Neben Vorräten und Einkaufslisten spielen im Alltag auch Aufgaben im Haushalt und die Essensplanung eine wichtige Rolle.
Bei Einzelpersonen entsteht das Problem häufig dadurch, dass Einkäufe spontan geplant werden und vorhandene Produkte nicht bewusst überprüft werden. Man kauft zum Beispiel ein Produkt nochmals, obwohl es zuhause noch vorhanden ist, oder vergisst wichtige Dinge, weil keine aktuelle Einkaufsliste geführt wird. Auch Aufgaben oder geplante Mahlzeiten werden oft nur im Kopf behalten oder auf einzelnen Notizen festgehalten.
In gemeinsamen Haushalten ist das Problem zusätzlich komplexer, weil mehrere Personen Produkte verbrauchen, einkaufen oder Aufgaben übernehmen. Dadurch entstehen Missverständnisse: Eine Person geht davon aus, dass ein Produkt noch vorhanden ist, während eine andere es bereits aufgebraucht hat. Einkaufslisten oder Aufgaben werden oft über verschiedene Kanäle geführt, zum Beispiel über WhatsApp oder mündliche Absprachen. Dadurch ist der aktuelle Stand nicht für alle klar ersichtlich.

**Proto-Persona 1: Einzelperson**
Name: Thomas
Alter: 39 Jahre
Situation: Lebt alleine in einer Wohnung
Bedürfnis: Thomas möchte beim Einkaufen besser wissen, welche Produkte er noch zuhause hat, welche Aufgaben anstehen und was er in der Woche kochen möchte.
Problem: Er kauft oft Dinge doppelt oder vergisst wichtige Produkte, weil er keine feste Einkaufsliste führt. Zusätzlich plant er Mahlzeiten spontan und verliert dadurch manchmal den Überblick über vorhandene Lebensmittel.
Ziel: Eine einfache App nutzen, mit der er Vorräte, fehlende Produkte, Aufgaben und Mahlzeiten schnell erfassen kann.

**Proto-Persona 2: Gemeinsamer Haushalt**
Name: Lara
Alter: 24 Jahre
Situation: Lebt in einer WG mit drei Mitbewohnerinnen und Mitbewohnern
Bedürfnis: Lara möchte schnell sehen können, welche Produkte im Haushalt vorhanden sind, was noch gekauft werden muss, welche Aufgaben offen sind und welche Mahlzeiten geplant sind.
Problem: In ihrer WG werden Einkaufslisten und Aufgaben oft über WhatsApp geführt. Dadurch gehen Nachrichten unter, Produkte werden mehrfach gekauft oder Aufgaben bleiben unklar verteilt.
Ziel: Eine gemeinsame App nutzen, in der alle WG-Mitglieder denselben aktuellen Stand zu Vorräten, Einkaufsliste und Aufgaben sehen.

**Wesentliche Erkenntnisse:**
    - Die App muss sowohl für Einzelpersonen als auch für gemeinsame Haushalte funktionieren.
    - Die Bedienung muss sehr einfach und schnell verständlich sein.
    - Ein klassischer Login könnte für eine kleine Haushalts-App unnötig kompliziert wirken.
    - Eine gemeinsame Nutzung über einen Haushalts-Code senkt die Einstiegshürde.
    - Vorräte, Einkaufsliste und To-do’s sollten in gemeinsamen Haushalten zentral und für alle sichtbar sein.
    - Der Wochenmenüplan ist besonders für Einzelpersonen oder Haushalte sinnvoll, in denen gemeinsam geplant wird.
    - In WGs kann der Wochenmenüplan weniger relevant sein, da viele Personen ihre Mahlzeiten individuell planen.
    - Vorräte und Einkaufsliste sollten klar voneinander getrennt sein.
    - Kategorien verbessern die Übersichtlichkeit im Vorrat.
    - Mengenangaben und Einheiten sind wichtig, damit Artikel genauer erfasst werden können.
    - Die App sollte besonders auf mobilen Geräten gut nutzbar sein.
    - Der Fokus soll auf Alltagstauglichkeit liegen.
    - Wenige, gut funktionierende Kernfunktionen sind wichtiger als zu viele komplexe Zusatzfunktionen.

### 3.2 Sketch
**Variantenüberblick:** In der Sketch-Phase wurden verschiedene Möglichkeiten überlegt, wie die App aufgebaut sein könnte. Dabei wurde besonders darauf geachtet, dass die App sowohl für Einzelpersonen als auch für gemeinsame Haushalte verständlich bleibt. Zu Beginn lag der Fokus auf Vorräten und Einkaufsliste. Später wurde die Idee erweitert, sodass auch ein Dashboard, To-do’s und ein Wochenmenüplan berücksichtigt wurden.

**Variante 1: Einfache Listenansicht**
In dieser Variante werden alle Artikel in einer einfachen Liste dargestellt. Nutzerinnen und Nutzer können Produkte hinzufügen und löschen.

BILD

**Vorteile:**
- Sehr einfach verständlich
- Schneller Einstieg
- Wenig Ablenkung

**Nachteile:**
- Bei vielen Produkten schnell unübersichtlich
- Keine klare Trennung zwischen Vorräten und Einkaufsliste
- Für gemeinsame Haushalte weniger strukturiert
- Keine zentrale Übersicht über Aufgaben oder Planung

**Variante 2: Getrennte Bereiche für Vorrat und Einkaufsliste**
Diese Variante trennt die App in zwei Hauptbereiche: Vorräte und Einkaufsliste. Dadurch ist klar ersichtlich, welche Produkte bereits vorhanden sind und welche noch gekauft werden müssen.

BILD

**Vorteile:**
- Gute Übersicht
- Klare Struktur
- Für Einzelpersonen und Gruppen geeignet
- Einfache Bedienung
  
**Nachteile:**
- Etwas mehr Navigation notwendig als bei einer einzigen Liste

**Variante 3: Haushalts-Dashboard mit Code-Zugang**
Diese Variante trennt die App in zwei Hauptbereiche: Vorräte und Einkaufsliste. Dadurch ist klar ersichtlich, welche Produkte bereits vorhanden sind und welche noch gekauft werden müssen.

BILD

**Vorteile:**
- Gemeinsame Nutzung ohne Login möglich
- Auch Einzelpersonen können einen eigenen Haushalt verwenden
- Klare Trennung der Funktionen
- Zentrale Übersicht über Haushalt, Einkauf, Aufgaben und Planung
- Einfacher Einstieg
- Gut erweiterbar
- Unterstützt unterschiedliche Nutzungssituationen, zum Beispiel Einzelperson, Paar, Familie oder WG

**Nachteile:**
- Der Code muss bekannt sein oder gemerkt werden
- Keine individuelle Benutzerverwaltung

**Skizzen:**
Für die App wurden mehrere grobe Skizzen erstellt. Die wichtigsten Ansichten waren:
- Startseite mit Eingabe eines Haushalts-Codes
- Übersicht nach dem Beitritt zu einem Haushalt
- Dashboard mit Zusammenfassung von Einkaufsliste, bald leeren Artikeln, To-do’s und Wochenmenü
- Vorratsansicht mit Kategorien
- Formular zum Hinzufügen neuer Produkte mit Menge, Einheit und Kategorie
- Einkaufsliste mit Mengenangaben und Möglichkeit zur Übernahme in den Vorrat
- To-do-Liste für Aufgaben im Haushalt
- Wochenmenüplan mit Einträgen pro Wochentag
- Möglichkeit zum Löschen erledigter oder falscher Einträge

Die Skizzen halfen dabei, die Struktur der App früh zu überprüfen. Besonders wichtig war, dass Nutzerinnen und Nutzer schnell verstehen, wo sie Produkte hinzufügen, fehlende Artikel eintragen, Aufgaben erfassen und Mahlzeiten planen können.

### 3.3 Decide
- **Gewählte Variante & Begründung:** Nach dem Vergleich der verschiedenen Varianten wurde die Variante „Haushalts-Dashboard mit Code-Zugang“ ausgewählt. Diese Lösung verbindet eine einfache Bedienung mit der Möglichkeit, die App sowohl alleine als auch gemeinsam in einem Haushalt zu nutzen. Der vierstellige Haushalts-Code wurde gewählt, weil dadurch kein klassisches Login-System notwendig ist. Das senkt die Einstiegshürde und macht die App besonders schnell nutzbar.

Die Entscheidung fiel auf diese Variante, weil sie die wichtigsten Anforderungen des Projekts am besten erfüllt:
- einfache Nutzung ohne Registrierung
- Nutzung für Einzelpersonen und gemeinsame Haushalte
- gemeinsamer Zugriff für mehrere Personen über denselben Haushalts-Code
- klare Trennung zwischen Vorräten, Einkaufsliste, To-do’s und Wochenmenü
- gute Übersicht durch Kategorien im Vorrat
- zentrale Startansicht durch das Dashboard
- einfache Erweiterbarkeit für spätere Funktionen
- geeignet für mobile Nutzung im Alltag

- **End-to-End-Ablauf:** Der typische Ablauf beginnt damit, dass eine Nutzerin oder ein Nutzer die Web-App öffnet. Auf der Startseite wird ein vierstelliger Haushalts-Code eingegeben. Falls der Haushalt bereits existiert, tritt die Person diesem Haushalt bei. Falls noch kein Code vorhanden ist, kann ein neuer Haushalt erstellt werden.
Nach dem Beitritt gelangt die Person zur Hauptansicht, dem Dashboard. Dort sind die wichtigsten Bereiche sichtbar: To-do’s, Einkaufsliste, bald leere Vorratsartikel und der Wochenmenüplan. Von dort aus kann die Person in die einzelnen Bereiche wechseln.
Im Vorratsbereich können vorhandene Produkte mit Namen, Menge, Einheit und Kategorie hinzugefügt werden. Die Produkte werden nach Kategorien gruppiert angezeigt. Wenn die Menge eines Vorratsprodukts auf 1 sinkt, wird es als bald leer erkennbar und kann mit einem Klick zur Einkaufsliste hinzugefügt werden.
In der Einkaufsliste können fehlende Produkte eingetragen, angezeigt, gelöscht und nach dem Einkauf wieder in den Vorrat übernommen werden. Dabei werden Mengenangaben und Einheiten mitgeführt, sodass die Informationen nicht erneut eingegeben werden müssen.
Zusätzlich können in der To-do-Liste Haushaltsaufgaben erfasst und erledigt werden. Der Wochenmenüplan ermöglicht es, Mahlzeiten für einzelne Wochentage einzutragen. Pro Tag können auch mehrere Menüeinträge erfasst und per Drag & Drop verschoben werden. Dadurch unterstützt die App nicht nur den Einkauf, sondern auch die Planung des Haushaltsalltags.

**User Journey:** 
1. Nutzerin oder Nutzer öffnet die Web-App.
2. Auf der Startseite wird ein vierstelliger Haushalts-Code eingegeben.
3. Falls der Haushalt bereits existiert, tritt die Person diesem Haushalt bei.
4. Falls noch kein Code vorhanden ist, erstellt die Person zuerst einen neuen Haushalt.
5. Nach dem Beitritt gelangt die Person zum Dashboard.
6. Im Dashboard sieht die Person eine Übersicht über To-do’s, Einkaufsliste, bald leere Artikel und Wochenmenü.
7. Im Vorratsbereich können Produkte mit Name, Menge, Einheit und Kategorie hinzugefügt werden.
8. Die vorhandenen Produkte werden nach Kategorien gruppiert angezeigt.
9. Produkte können bearbeitet, gelöscht oder in ihrer Menge angepasst werden.
10. Wenn die Menge eines Vorratsprodukts auf 1 sinkt, kann es mit einem Klick zur Einkaufsliste hinzugefügt werden.
11. In der Einkaufsliste können fehlende Produkte hinzugefügt, angezeigt oder gelöscht werden.
12. Nach dem Einkauf kann ein Produkt aus der Einkaufsliste wieder in den Vorrat übernommen werden.
13. Mengenangaben und Einheiten werden dabei übernommen.
14. In der To-do-Liste können Haushaltsaufgaben eingetragen und erledigt werden.
15. Im Wochenmenüplan können Mahlzeiten pro Wochentag eingetragen werden.
16. Pro Tag können mehrere Menüeinträge erstellt werden.
17. Menüeinträge können per Drag & Drop zwischen Tagen verschoben werden.
18. Alle Daten werden automatisch in der Datenbank gespeichert.
19. Alle Personen im Haushalt sehen denselben aktuellen Stand und können gemeinsam Vorräte, Einkäufe und Aufgaben verwalten.

**Mockup:**


### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
Der Prototyp von Homie wurde so gestaltet, dass die wichtigsten Funktionen schnell verständlich und einfach erreichbar sind. Der Fokus liegt auf einer klaren Struktur, einer einfachen Bedienung und einer alltagstauglichen Nutzung auf Desktop und mobilen Geräten. Nutzerinnen und Nutzer sollen ohne lange Erklärung verstehen, wo sie Vorräte, Einkaufslisten, Aufgaben und das Wochenmenü verwalten können.
**Informationsarchitektur:**  Die App ist in wenige zentrale Bereiche aufgeteilt. Nach dem Öffnen der Web-App gelangen Nutzerinnen und Nutzer zuerst zur Startseite. Dort können sie entweder einen bestehenden vierstelligen Haushalts-Code eingeben oder einen neuen Haushalt erstellen.
Nach dem Beitritt zu einem Haushalt öffnet sich das Dashboard. Dieses bildet die Hauptansicht der App und zeigt die wichtigsten Informationen auf einen Blick. Von dort aus sind die zentralen Bereiche erreichbar:
- Vorräte
- Einkaufsliste
- To-do-Liste
- Wochenmenüplan

Der Bereich Vorräte dient dazu, vorhandene Haushaltsprodukte zu verwalten. Produkte können mit Name, Menge, Einheit und Kategorie erfasst werden. Die Artikel werden nach Kategorien gruppiert, damit auch bei mehreren Produkten eine gute Übersicht erhalten bleibt.
Die Einkaufsliste zeigt Produkte, die gekauft werden müssen. Artikel können hinzugefügt, gelöscht und nach dem Einkauf wieder in den Vorrat übernommen werden. Mengenangaben und Einheiten werden dabei mitgeführt, damit Informationen nicht erneut eingegeben werden müssen.
Die To-do-Liste ermöglicht es, zusätzliche Aufgaben im Haushalt einzutragen und zu erledigen.
Der Wochenmenüplan unterstützt die Essensplanung für die aktuelle Kalenderwoche. Pro Wochentag können ein oder mehrere Menüeinträge erfasst werden. Menüeinträge können ausserdem per Drag & Drop zwischen den Tagen verschoben werden.
Diese Struktur wurde gewählt, weil sie den Alltag in einem Haushalt einfach abbildet: Was ist vorhanden, was muss gekauft werden, was muss erledigt werden und welche Mahlzeiten sind geplant?

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

**Designentscheidungen:** Eine zentrale Designentscheidung war die Nutzung eines vierstelligen Haushalts-Codes anstelle eines klassischen Logins. Dadurch können Nutzerinnen und Nutzer schnell starten, ohne ein Konto erstellen zu müssen. Gleichzeitig können mehrere Personen über denselben Code auf denselben Haushalt zugreifen.
Die Bereiche Vorräte, Einkaufsliste, To-do-Liste und Wochenmenüplan wurden klar getrennt, damit keine Verwirrung entsteht. Vorräte zeigen, was bereits vorhanden ist. Die Einkaufsliste zeigt, was noch gekauft werden muss. Die To-do-Liste zeigt offene Aufgaben. Der Wochenmenüplan unterstützt die Planung von Mahlzeiten.
Ausserdem wurde entschieden, Produkte mit Menge und Einheit zu speichern. Dadurch kann genauer nachvollzogen werden, wie viel von einem Produkt vorhanden ist oder gekauft werden muss. Unterstützt werden feste Einheiten wie Stück, Pack, kg, g und Liter sowie eine eigene Angabe.
Wenn die Menge eines Vorratsprodukts niedrig ist, kann es direkt zur Einkaufsliste hinzugefügt werden. Wird ein Produkt in der Einkaufsliste abgehakt, kann es wieder in den Vorrat übernommen werden. Dabei werden Name, Menge, Einheit und Kategorie berücksichtigt.
Beim Wochenmenüplan wurde darauf geachtet, dass Einträge flexibel bearbeitet werden können. Pro Tag können mehrere Gerichte eingetragen werden, und durch Drag & Drop lassen sich Menüeinträge einfach zwischen den Tagen verschieben.
Das visuelle Design wurde bewusst weich und freundlich gestaltet. Abgerundete Karten, warme Farben und klare Abstände sollen dafür sorgen, dass die App übersichtlich wirkt und angenehm zu bedienen ist. Besonders wichtig war auch die mobile Ansicht, da die App häufig im Alltag nebenbei genutzt wird, zum Beispiel beim Einkaufen oder Planen.
Diese Entscheidungen unterstützen das Hauptziel der App: den Haushalt übersichtlich, einfach und gemeinsam zu organisieren.

#### 3.4.2. Umsetzung (Technik)
Der Prototyp wurde als Web-App umgesetzt. Ziel war es, die wichtigsten Funktionen funktionsfähig darzustellen und eine einfache Nutzung für Einzelpersonen sowie gemeinsame Haushalte zu ermöglichen. Die App speichert alle relevanten Daten in einer Datenbank, sodass der aktuelle Stand auch nach dem Neuladen der Seite oder beim erneuten Beitritt zu einem Haushalt erhalten bleibt.
- **Technologie-Stack:** Für die Umsetzung wurde SvelteKit verwendet. SvelteKit eignet sich gut für moderne Web-Apps, da Seiten, Serverlogik und Formularaktionen übersichtlich strukturiert werden können. Die App wurde mit HTML, CSS, JavaScript und Svelte umgesetzt. Für die dauerhafte Speicherung der Daten wird MongoDB verwendet.

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
    - Dashboard als zentrale Hauptansicht
    - Vorratsbereich zur Verwaltung vorhandener Produkte
    - Einkaufsliste zur Verwaltung fehlender Produkte
    - To-do-Liste für Haushaltsaufgaben
    - Wochenmenüplan für die Essensplanung
    - Formulare zum Hinzufügen neuer Einträge
    - Buttons zum Löschen, Abhaken, Übernehmen oder Verschieben von Einträgen
    - Drag-and-Drop-Funktion zum Verschieben von Menüeinträgen im Wochenmenüplan

Die Navigation ist bewusst einfach gehalten. Nach dem Beitritt zu einem Haushalt befindet sich die Nutzerin oder der Nutzer direkt im Dashboard und kann von dort aus alle Hauptfunktionen verwenden.

**Daten & Schnittstellen:** Alle Daten der App werden in MongoDB gespeichert. Dazu gehören Haushalte, Vorratsprodukte, Einkaufslisten-Einträge, To-do-Einträge und Wochenmenü-Einträge. Der vierstellige Haushalts-Code dient dazu, einem Haushalt beizutreten. Intern werden die gespeicherten Daten dem jeweiligen Haushalt zugeordnet. Wenn mehrere Personen denselben Code verwenden, greifen sie auf dieselben Daten in MongoDB zu.

Für jeden Haushalt werden die relevanten Informationen gespeichert:
    - Haushalts-Code
    - Haushaltsname
    - Vorratsprodukte mit Name, Menge, Einheit und Kategorie
    - Artikel auf der Einkaufsliste mit Name, Menge, Einheit und Kategorie
    - Status von Einkaufslisten-Artikeln, zum Beispiel offen oder erledigt
    - To-do-Einträge
    - Wochenmenü-Einträge pro Kalenderwoche und Wochentag

Die App ruft die Daten aus MongoDB ab und zeigt sie im jeweiligen Bereich an. Wenn ein Produkt, ein Einkaufslisten-Eintrag, eine To-do-Aufgabe oder ein Menüeintrag hinzugefügt wird, wird dieser Eintrag in MongoDB gespeichert. Änderungen wie Löschen, Abhaken, Übernehmen von der Einkaufsliste in den Vorrat oder Verschieben von Menüeinträgen per Drag & Drop werden ebenfalls in MongoDB aktualisiert.
Beim Wochenmenüplan werden die Einträge pro Kalenderwoche gespeichert. Dadurch kann die App die aktuelle Woche anzeigen und alte Menüeinträge automatisch entfernen, wenn sie nicht mehr zur aktuellen Woche gehören.

**Deployment:** https://homie-appl.netlify.app
**Besondere Entscheidungen:** Eine wichtige Entscheidung war der Verzicht auf ein klassisches Login-System. Stattdessen wird ein vierstelliger Haushalts-Code verwendet. Diese Lösung ist einfacher und passt besser zum Ziel der App, da Nutzerinnen und Nutzer möglichst schnell starten können.
Alle Personen mit demselben Haushalts-Code haben dieselben Rechte. Es gibt keine Rollen wie Admin oder Mitglied. Diese Vereinfachung reduziert die Komplexität des Prototyps und macht die Bedienung verständlicher.
Ausserdem wurde entschieden, Mengenangaben und Einheiten bei Vorräten und Einkaufslisten zu speichern. Dadurch bleiben wichtige Informationen erhalten, wenn ein Artikel vom Vorrat auf die Einkaufsliste oder von der Einkaufsliste zurück in den Vorrat übernommen wird.
Beim Wochenmenüplan wurde Drag & Drop umgesetzt, damit Menüeinträge flexibel zwischen den Tagen verschoben werden können. Dies verbessert die Bedienung, da Pläne im Alltag häufig geändert werden.
Der Funktionsumfang wurde bewusst auf die wichtigsten Bereiche begrenzt: Vorräte verwalten, Einkaufsliste nutzen, To-do-Einträge erfassen, Wochenmenü planen und Daten pro Haushalt speichern. Weitere Funktionen wie Benutzerkonten, Barcode-Scan, Rechteverwaltung oder Benachrichtigungen wurden bewusst nicht umgesetzt, da sie den Prototyp komplexer gemacht hätten.
 
### 3.5 Validate
**URL der getesteten Version** https://homie-appl.netlify.app
**Ziele der Prüfung:** Mit der Validierung sollte überprüft werden, ob der Prototyp verständlich, nützlich und einfach bedienbar ist. Besonders wichtig war die Frage, ob Nutzerinnen und Nutzer die wichtigsten Funktionen ohne lange Erklärung verwenden können. Dabei wurde nicht nur die Verwaltung von Vorräten und Einkaufslisten geprüft, sondern auch das Dashboard, die To-do-Liste und der Wochenmenüplan.

Geprüft wurden folgende Fragen:
- Ist der Einstieg über den Haushalts-Code verständlich?
- Ist klar, wie ein neuer Haushalt erstellt wird?
- Finden Nutzerinnen und Nutzer das Dashboard schnell?
- Ist die Trennung zwischen Vorrat, Einkaufsliste, To-do-Liste und Wochenmenü verständlich?
- Können Produkte einfach hinzugefügt, gelöscht und verwaltet werden?
- Sind Mengenangaben und Einheiten verständlich?
- Ist klar, wie ein Produkt aus dem Vorrat zur Einkaufsliste hinzugefügt werden kann?
- Ist verständlich, dass Einkaufslisten-Produkte wieder in den Vorrat übernommen werden können?
- Können To-do-Einträge einfach erstellt und erledigt werden?
- Ist der Wochenmenüplan verständlich aufgebaut?
- Ist klar, dass mehrere Menüeinträge pro Tag möglich sind?
- Ist das Verschieben von Menüeinträgen per Drag & Drop verständlich?
- Funktioniert die App auch auf mobilen Geräten übersichtlich?

**Vorgehen:** Die Tests wurden mit einfachen Nutzungsszenarien durchgeführt. Die Testpersonen erhielten konkrete Aufgaben und sollten diese möglichst selbstständig lösen. Währenddessen wurde beobachtet, ob sie die Funktionen finden, verstehen und korrekt verwenden können.
Das Vorgehen war leicht moderiert. Falls eine Testperson nicht weiterkam, wurde notiert, an welcher Stelle das Problem auftrat. Es wurde aber möglichst wenig geholfen, damit sichtbar wurde, ob die App auch ohne Erklärung verständlich ist.


- **Stichprobe:** Getestet wurde mit Personen, die zur Zielgruppe der App passen. Dazu gehören Einzelpersonen sowie Personen aus gemeinsamen Haushalten wie WGs, Paarhaushalten oder Familien.

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
5. Gib dem Produkt einen Namen, eine Menge, eine Einheit und eine Kategorie.
6. Prüfe, ob das Produkt korrekt im Vorrat angezeigt wird.
7. Füge ein Produkt mit niedriger Menge zur Einkaufsliste hinzu.
8. Prüfe, ob die Mengenangabe in der Einkaufsliste übernommen wurde.
9. Hake ein Produkt in der Einkaufsliste ab.
10. Übernimm ein abgehaktes Produkt wieder in den Vorrat.
11. Erstelle einen Eintrag in der To-do-Liste.
12. Lösche einen nicht mehr benötigten Eintrag.
13. Erstelle einen Eintrag im Wochenmenüplan.
14. Füge für denselben Tag einen weiteren Menüeintrag hinzu.
15. Verschiebe einen Menüeintrag per Drag & Drop auf einen anderen Tag.

**Kennzahlen & Beobachtungen:** Während der Tests wurde beobachtet, ob die Aufgaben erfolgreich abgeschlossen werden konnten und an welchen Stellen Unsicherheiten entstanden.

Beobachtungen:
    - Der Einstieg über den Haushalts-Code wurde grundsätzlich verstanden.
    - Das Dashboard half dabei, die wichtigsten Bereiche schnell zu finden.
    - Die Trennung zwischen Vorrat, Einkaufsliste, To-do-Liste und Wochenmenü war verständlich.
    - Das Hinzufügen von Produkten war einfach nachvollziehbar.
    - Mengenangaben und Einheiten wurden als hilfreich wahrgenommen.
    - Die Übernahme von Artikeln aus dem Vorrat in die Einkaufsliste und zurück in den Vorrat wurde verstanden.
    - Die Speicherung der Daten in MongoDB funktionierte zuverlässig, da Einträge auch nach dem Neuladen der Seite erhalten blieben.
    - Die To-do-Liste wurde als einfache Ergänzung für Haushaltsaufgaben verstanden.
    - Der Wochenmenüplan wurde besonders für Einzelpersonen, Paare und Familien als nützlich wahrgenommen.
    - In WGs wurde der Wochenmenüplan weniger zentral bewertet, da dort viele Personen ihre Mahlzeiten individuell planen.
    - Das Verschieben von Menüeinträgen per Drag & Drop wurde positiv wahrgenommen, musste aber klar funktionieren, damit keine Einträge doppelt erscheinen.
    - Die mobile Nutzung ist wichtig, weil die Einkaufsliste oft direkt beim Einkaufen verwendet wird.
    - Bei gemeinsamen Haushalten war nicht klar ersichtlich, welche Person einen Eintrag erstellt hat. Dadurch kann es schwierig sein nachzuvollziehen, wer ein Produkt, einen Einkaufslisten-Eintrag oder eine To-do-Aufgabe hinzugefügt hat.

Kennzahlen:
    - Erfolgsquote: 15 von 15 Aufgaben erfolgreich gelöst
    - Durchschnittlicher Zeitbedarf: 3–6 Minuten pro Testperson
    - Häufigste Schwierigkeit: In gemeinsamen Haushalten ist nicht ersichtlich, von welcher Person ein Eintrag stammt.

**Zusammenfassung der Resultate:** Die Validierung zeigte, dass die Grundidee von Homie verständlich ist und die wichtigsten Funktionen sinnvoll zusammenarbeiten. Besonders positiv bewertet wurden der einfache Einstieg über den Haushalts-Code, das übersichtliche Dashboard, die klare Aufteilung in Vorrat, Einkaufsliste, To-do-Liste und Wochenmenü sowie die zuverlässige Speicherung der Daten in MongoDB.
Alle getesteten Aufgaben konnten erfolgreich abgeschlossen werden. Die App wurde als alltagstauglich wahrgenommen, besonders für das schnelle Erfassen von Vorräten, das Verwalten einer Einkaufsliste und die Planung von Aufgaben oder Mahlzeiten.
Verbesserungspotenzial gibt es vor allem bei der Nutzung in gemeinsamen Haushalten wie WGs oder Familien. Dort wäre es hilfreich, wenn sichtbar wäre, welche Person einen Eintrag erstellt hat. Zusätzlich wurde von Testpersonen der Wunsch geäussert, dass die App in Zukunft Rezeptvorschläge machen soll. Diese Rezeptvorschläge sollen auf den Produkten basieren, die bereits im Vorrat vorhanden sind.

**Abgeleitete Verbesserungen:** Aus der Validierung wurden mehrere Verbesserungen abgeleitet, die in einer nächsten Version umgesetzt werden sollten.

1. **Anzeige, wer einen Eintrag erstellt hat**  
   In gemeinsamen Haushalten wie WGs oder Familien wäre es hilfreich zu sehen, welche Person einen Eintrag erstellt hat. So könnten Haushaltsmitglieder besser nachvollziehen, wer ein Produkt zur Einkaufsliste hinzugefügt, eine Aufgabe erstellt oder einen Vorratsartikel eingetragen hat. Das würde die Transparenz und Kommunikation im Haushalt verbessern.

2. **Rezeptvorschläge anhand vorhandener Vorräte**  
   Nutzerinnen und Nutzer wünschten sich eine Funktion, mit der aus vorhandenen Produkten passende Rezeptideen vorgeschlagen werden. Dadurch könnte die App nicht nur beim Einkaufen helfen, sondern auch dabei, vorhandene Lebensmittel sinnvoll zu verwenden und Lebensmittelverschwendung zu reduzieren.

## 4. Erweiterungen

### 4.1 Verknüpfung Einkaufsliste ↔ Vorrat
**Beschreibung & Nutzen:** Artikel aus dem Vorrat können direkt zur Einkaufsliste hinzugefügt werden, sobald die Menge niedrig ist. Umgekehrt kann ein Artikel aus der Einkaufsliste nach dem Einkauf wieder in den Vorrat übernommen werden. Dabei werden Name, Menge, Einheit und Kategorie mitgeführt. Dadurch müssen Nutzerinnen und Nutzer dieselben Informationen nicht mehrfach eingeben.

Diese Erweiterung bildet den realen Ablauf im Haushalt besser ab: Ein Produkt wird zuerst im Vorrat erfasst, bei Bedarf auf die Einkaufsliste gesetzt und nach dem Einkauf wieder in den Vorrat übernommen. Dadurch entsteht ein geschlossener Workflow zwischen Vorratsverwaltung und Einkaufsliste.

**Wo umgesetzt:**
- **Frontend:** Vorrat-Seite mit Button „+ Einkaufsliste“; Einkaufsliste mit Modal „In Vorrat übernehmen“
- **Backend:** SvelteKit Form Actions zum Hinzufügen von Vorratsartikeln zur Einkaufsliste und zum Übernehmen von Einkaufslisten-Artikeln zurück in den Vorrat
- **Datenbank:** MongoDB-Collections "vorrat" und "einkaufsliste", verknüpft über die Haushalts-ID

**Referenz:** Beschrieben in Kapitel 3.3 bei der User Journey sowie in Kapitel 3.4.1 bei den Screenshots zur Vorratsübersicht, Einkaufsliste und Übernahme in den Vorrat.

**Aus Evaluation abgeleitet?:** Ja. Die Funktion wurde ergänzt beziehungsweise verbessert, weil deutlich wurde, dass die Verbindung zwischen Vorrat und Einkaufsliste für den Alltag besonders wichtig ist. Nutzerinnen und Nutzer sollen Artikel nicht doppelt erfassen müssen.

LINET HIER WEITER

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

