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
Keine individuelle Benutzerverwaltung

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
- **Gewählte Variante & Begründung:** _[Entscheidkriterien nennen]_  
- **End-to-End-Ablauf:** _[Beschreibung inkl. User Journey Map]_  
- **Mockup:** _[URL, z. B. Figma; Screenshots mit kurzen Beschreibungen]_  

### 3.4 Prototype

#### 3.4.1. Entwurf (Design)
Beschreibt die Gestaltung und Interaktion.
> **Hinweis:** Hier wird der **Prototyp** beschrieben, nicht das **Mockup**.
- **Informationsarchitektur:** _[z. B. Seiten/Navigation: Konzept, nicht die technische Umsetzung]_
- **User Interface Design:** _[wichtige Screens: Screenshots mit kurzen Erläuterungen]_  
- **Designentscheidungen:** _[zentrale Entscheidungen und Begründungen]_

#### 3.4.2. Umsetzung (Technik)
Fasst die technische Realisierung zusammen.
- **Technologie-Stack:** _[SvelteKit, Bibliotheken falls genutzt]_
- **Tooling:** _[IDE/Erweiterungen, lokale/Cloud-Tools; den Einsatz von KI beschreiben Sie im Kapitel **KI-Deklaration**]_  
- **Struktur & Komponenten:** _[Seiten, Routen, State/Stores, wichtige Komponenten]_
- **Daten & Schnittstellen:** _[Wie werden Daten gespeichert, verwaltet, abgerufen?]_
- **Deployment:** _[URL]_  
- **Besondere Entscheidungen:** _[z. B. Trade-offs, Vereinfachungen]_  

### 3.5 Validate
- **URL der getesteten Version** (separat deployt)
- **Ziele der Prüfung:** _[welche Fragen sollen beantwortet werden?]_  
- **Vorgehen:** _[moderiert/unmoderiert; remote/on-site]_  
- **Stichprobe:** _[Mit wem wurde getestet? Profil; Anzahl]_  
- **Aufgaben/Szenarien:** _[Ausformulierte Testaufgaben]_  
- **Kennzahlen & Beobachtungen:** _[z. B. Erfolgsquote, Zeitbedarf, qualitative Findings]_  
- **Zusammenfassung der Resultate:** _[Wichtigste Erkenntnisse; 2-4 Sätze]_  
- **Abgeleitete Verbesserungen:** _[Anforderungen, die als nächstes umgesetzt werden sollten, priorisiert, kurz begründet; falls Verbesserungen im Prototyp konkret umgesetzt wurden: In Kap. 4 dokumentieren]_  

## 4. Erweiterungen [Optional]
Dokumentiert Erweiterungen über den Mindestumfang hinaus.
> **Hinweis:** Jede Erweiterung ist separat nach dem folgenden Schema zu beschreiben.

### _[4.x Kurzbeschreibung / Titel]_  
- **Beschreibung & Nutzen:** _[Was wurde erweitert? Warum?]_  
- **Wo umgesetzt:** _[Wie und wo wurde es gemacht? Frontend, Backend, Datenbank?]_  
- **Referenz:** _[Wo wird die Erweiterung auch noch beschrieben, z.B. Screenshot oder Beschreibung in einem anderen Kapitel]_  
- **Aus Evaluation abgeleitet?:** _[Wurde diese Erweiterung als Folge eines in der Evaluation identifizierten Issues implementiert?]_  

> Das folgende **Beispiel** wurde bewusst kurz gehalten. Erweiterungen dürfen auch ausführlicher beschrieben werden.

### 4.1 Tabelle nach Kategorien filtern
- **Beschreibung & Nutzen:** Tabelle X kann nach Kategorie gefiltert werden, weil User typischerweise nur an einer bestimmten Kategorie interessiert sind.  
- **Wo umgesetzt:** 
  - **Frontend:** Tabelle mit Dropdown in Datei ...
  - **Backend:** Form Action ... in Datei ...
  - **Datenbank:** MongoDB-Query in Datei ...
- **Referenz:** Screenshot in Kap. x.y
- **Aus Evaluation abgeleitet?:** Ja, Issue x.y

## 5. Projektorganisation [Optional]
Beispiele:
- **Repository & Struktur:** _[Link; kurze Strukturübersicht]_  
- **Issue-Management:** _[Vorgehen kurz beschreiben]_  
- **Commit-Praxis:** _[z. B. sprechende Commits]_

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

