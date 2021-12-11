# Roadmap: Family Promise Homeless Shelter Intake System (Labs 29)

## Type

**Web (Node), DS** (Greenfield)

## Overview

Family Promise helps local communities coordinate their compassion to address the root causes of family homelessness. They tap existing local resources to empower families towards economic stability. Families come to them in crisis; they help them rebuild their lives with new skills and ongoing support. They address the issue holistically, providing prevention services before families reach crisis, shelter and case management when they become homeless, and stabilization programs once they have secured housing to ensure they remain independent.

The shelter currently has a paper intake system, so the head of household needs to fill out around 30 pages of questions.

Family Promise needs a digital intake system to digitize the intake process and allow supervisors, case managers, the executive director, and guests to access data relevant to them. They also need a way to identify risk factors for guests who are unlikely to exit to housing and determine which guests are more likely to require additional case management.

This product will take multiple Labs cohorts to complete.

For this initial round, we're focusing on the core functionality for the Guest, Supervisor, and Case Manager roles. We'll also develop a multiclass predictive model to attempt to identify risk factors for arriving guests.

This is a **user experience-heavy challenge**. We can't present the model in the traditional wonky, academic way—it has to be translated visually and verbally into a form highly suitable for a lay user.

## Contacts

**Stakeholder Name:** J Wylie

**Stakeholder Email:** [jwylie@familypromiseofspokane.org](mailto:jwylie@familypromiseofspokane.org)

## Technology Stack

- **BE:** Node
- **FE:** React
- **DS:** PostgreSQL
- **Auth:** Okta

## User Base

- **Family Promise Supervisor**: Responsible for handling the day-to-day needs of the guests at the shelter, including conducting intakes of new families.
- **Family Promise Case Manager:** Writes case notes on guests the shelter is serving as they work with them.
- **Guest:** A "head of household" arriving to or checked into the shelter as part of a family unit of some kind.

[Feature List](Roadmap%20Family%20Promise%20Homeless%20Shelter%20Intake%20Sys%207afa870a84f64c9c865391668d054cda/Feature%20List%205257d6ed0dcd44a3a0852d576dc3786f.csv)

## Resources

(Work with stakeholder for canonical versions)

[Exit Destination Model](https://colab.research.google.com/drive/15Y1WTWgVKQN8pKLTWCqWKJs_ZQnDKpmT?usp=sharing) [Google Colaboratory]

[Data](https://drive.google.com/file/d/1faYmEHN0Braa-Gyc-fLpQjBjHw8SjixD/view?usp=sharing) (2 years, redacted, "semi-"cleaned)

[Current Intake Packet](https://drive.google.com/file/d/1iLUgQtalpiRlW1x_nNg75CcIO09hunAr/view?usp=sharing) [Google Drive]

[Currently Deployed Prediction Model](https://fp-prediction.herokuapp.com) (binary classification)

**FamilyPromise Colors:**

- Purple: #472D5B
- Blue: #006FBA
- Lilac: #8D4982
- Yellow: #FEC357

[PAIR People + AI Guidebook](https://pair.withgoogle.com/guidebook/)
