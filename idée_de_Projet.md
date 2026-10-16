# Compte-rendu du Projet : Gestion du Confort Thermique et Réorganisation des Espaces à l'ENSEA

## 1. Contexte et Problématique
Face aux vagues de chaleur estivales de plus en plus fréquentes, l'ENSEA fait face à des problématiques de surchauffe dans ses bâtiments (notamment les salles de TP, les espaces informatiques et les zones sous toiture). 

Actuellement, les occupants du campus errent de manière désorganisée pour trouver des espaces frais. L'objectif de notre projet est d'apporter une **démarche organisationnelle structurée**, basée sur des données scientifiques réelles, afin d'optimiser l'utilisation des locaux et d'aider la communauté (étudiants, enseignants, chercheurs) à traverser ces périodes de forte chaleur.

---

## 2. Analyse des Facteurs de Surchauffe
Pour évaluer objectivement le comportement thermique des locaux, nous avons mis en place une formule simplifiée d'**Indice de Surchauffe Intrinsèque (ISI)** évalué pour une salle vide :

$$\text{Indice de Surchauffe} = T_{\text{ext}} + \frac{P_{\text{solaire}}}{H_{\text{total}}}$$

Les variables clés retenues sont :
* **$T_{\text{ext}}$ :** La température extérieure de référence.
* **$P_{\text{solaire}}$ (Apports solaires) :** 
  * La surface vitrée exposée (notamment façades Sud et Ouest).
  * L'état et l'utilisation des protections solaires (volets, stores).
* **$H_{\text{total}}$ (Capacité d'évacuation et résistance) :** 
  * Le volume de la salle.
  * L'étage (effet de stratification et proximité de la toiture).
  * La typologie d'isolation (classée visuellement de 1 à 4 sur le terrain selon l'état des menuiseries et des parois).
  * Le potentiel de renouvellement d'air.

---

## 3. Recueil des Besoins (Enquête Usagers)
Afin de croiser la performance thermique des salles avec les besoins réels, un questionnaire (Google Form) est déployé pour :
* Identifier les profils des personnes présentes sur le campus (étudiants, chercheurs, etc.) et leur nombre.
* Recenser leurs besoins spécifiques (travail en groupe, besoin de matériel informatique ou de salles de TP).
* Évaluer leur flexibilité quant au déplacement vers des zones plus fraîches.

---

## 4. La Solution : Une Application Web Open Source & Collaborative
Le projet se matérialise par le développement d'un **site web centralisateur** destiné aux occupants de l'école :
* **Carte interactive (*Heatmap*) en temps réel :** Offre un visuel global de l'établissement et guide chaque utilisateur vers la salle la plus fraîche et adaptée à son profil.
* **Approche FlexOffice thermique :** Permet de répartir intelligemment les usagers là où les locaux sont physiologiquement viables, évitant la sous-utilisation de certaines zones.
* **Démarche Open Source :** Toute la base de recherche, les données d'enquête et les modélisations seront partagées en open source. L'école pourra ainsi s'en servir durablement pour repenser l'aménagement et l'usage du campus face aux futures canicules.

---

## 5. Livrables du Projet
* Cartographies des salles et plans de l'école analysés.
* Tableaux de suivi (Excel) intégrant les calculs de l'indicateur thermique.
* Prototype fonctionnel du site web interactif généré avec l'assistance d'un agent IA.