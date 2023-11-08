# Nom de votre projet:

Gestion des évenements (event calendar)

- Description du projet:
  Ce projet consiste à concevoir une API qui permet la gestion d'un calendrier d'événement. Les utilisateurs peuvent ajouter, modifier et supprimer des évenemnts selon des condition d'authentification(authorisation d'utilisateur).

# Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Python 3.x
- Django
- Django Rest Framework
- Docker
  -django RestFrameworJWT
- Une base de données (SQLite)

## Installation

1. Clonez ce référentiel : `git clone https://github.com/mahamed1234/event_project.git`
2. Accédez au dossier du projet : `cd event_project/`
3. Créez un fichier `.env` et copiez le contenu du fichier `.env.example`.
4. Installez les dépendances nécessaires en utilisant pip : `pip install -r requirements.txt`
5. Exécutez la commande pour créer l'application : `python manage.py startapp events`
6. Ajoutez l'application à vos paramètres internes de Django : `settings.py INSTALLED_APPS
7. Appliquez les migrations : `python manage.py makemigrations`
8. Mettez à jour vos tables : `python manage.py migrate`
9. Démarrez le serveur de développement : `python manage.py runserver`

## Configuration

- Configurez les paramètres de base de données dans le fichier `settings.py`.
- Assurez-vous de configurer les paramètres d'authentification, par exemple, l'utilisation de JSON Web Tokens (JWT).

# Utilisation

- Utilisez un client API tel que [Postman](https://www.postman.com/) pour effectuer des requêtes sur l'API.
- Assurez-vous d'inclure un en-tête d'autorisation avec votre jeton JWT pour les requêtes protégées.

# admin interface

Vous pouvez accéder à la page d'administration de Django à l'adresse http://127.0.0.1:8000/admin et vous connecter avec le nom d'utilisateur « admin » et le mot de passe ci-dessus.
Un nouvel utilisateur administrateur peut également être créé en utilisant

python manage.py createsuperuser

# Créer un Événement

```http
POST /events/
Content-Type: application/json
Authorization: Bearer <token>
{
  "title": "Conférence sur la technologie",
  "start_date": "2023-11-15T14:00:00Z",
  "end_date": "2023-11-15T17:00:00Z",
  "description": "Une conférence sur les dernières avancées technologiques."
}

#get un Événement
GET /events/

#Mettre à Jour un Événement
PUT /events/1/
{
  "title": "Conférence sur la technologie (mise à jour)",
  "start_date": "2023-11-15T15:00:00Z"
}
#Supprimer un Événement
DELETE /events/1/

# Tests

Pour exécuter les tests, utilisez la commande suivante : `python manage.py test`.

# Documentation
La documentation est disponible via Swagger UI. Pour accéder à cette interface, allez sur `/docs/` après avoir démarré le serve
La documentation est disponible sur Postman ou Swagger UI.










```
