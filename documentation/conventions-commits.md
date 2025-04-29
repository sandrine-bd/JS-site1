# 📝 Convention de Commit

Conforme à [Conventional Commits](https://www.conventionalcommits.org/fr/v1.0.0/).

## Structure

```
<type>(optional: scope): description courte
```

### Types principaux

- `feat`: ajout d’une nouvelle fonctionnalité
- `fix`: correction d’un bug
- `docs`: changement de documentation
- `style`: changement de style (indentation, CSS...)
- `refactor`: amélioration interne sans ajout de fonction
- `test`: ajout/modification de tests
- `chore`: tâche annexe (maj dépendance, config...)

### Exemples

```bash
feat(feed): affichage dynamique des articles
fix(form): validation des champs vide
feat(galerie): ajout du toggle mosaïque/colonne
docs: ajout des specs fonctionnelles dans la doc
```
