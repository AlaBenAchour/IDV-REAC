import {
  useState,
  useEffect,
  useRef,
  type ChangeEvent,
} from 'react'
import './App.css'
interface Project {
  id?: number
  name: string
  author?: string
  description?: string
  status: string
}
interface UserForm {
  nom: string
  prenom: string
  email: string
  motDePasse: string
}
interface User {
  nom: string
  prenom: string
  email: string
}
interface FormData {
  nom: string
  email: string
  motDePasse: string
}

interface FormErrors {
  nom?: string
  email?: string
  motDePasse?: string
}
interface UserData {
  nom: string
  prenom: string
  email: string
  age: number
}
const projects: Project[] = [
  {
    id: 1,
    name: "Code2Work Dashboard",
    author: "Ala",
    status: "En cours"
  },
  {
    id: 2,
    name: "Application E-commerce",
    author: "Ahmed",
    status: "Terminé"
  },
  {
    id: 3,
    name: "AI Chatbot",
    author: "Sarah",
    status: "En attente"
  },
  {
    id: 4,
    name: "Gestion des stocks",
    author: "Mohamed",
    status: "En cours"
  }
]
function App() {
  const projectName = "Code2Work Dashboard"
  const currentYear = new Date().getFullYear()
  const firstName = "Ala"
  const isLoggedIn = true
  const currentDate = new Date().toLocaleDateString('fr-FR')
  const notificationCount = 5

  const [completedTasks, setCompletedTasks] = useState<number>(0)
  const [userName, setUserName] = useState<string>("Ala")
  const [score, setScore] = useState<number>(0)
  const [formName, setFormName] = useState<string>("")
  const [formEmail, setFormEmail] = useState<string>("")
  const [formMessage, setFormMessage] = useState<string>("")
  const [count, setCount] = useState<number>(0)
  const [counter, setCounter] = useState<number>(0)
  const isFirstRender = useRef<boolean>(true)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userData, setUserData] = useState<UserData | null>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const renderCount = useRef<number>(0)
  let normalVariable = 0
  renderCount.current += 1
  normalVariable += 1
  const [userForm, setUserForm] = useState<UserForm>({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: ""
  })
  const [user, setUser] = useState<User>({
    nom: "",
    prenom: "",
    email: ""
  })

  const [project, setProject] = useState<Project>({
    name: "",
    description: "",
    status: "En cours"
  })
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    email: '',
    motDePasse: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})



  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUserName(event.target.value)
  }

  const handleFormNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setFormName(event.target.value)
  }

  const handleFormEmailChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setFormEmail(event.target.value)
  }

  const handleFormMessageChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setFormMessage(event.target.value)
  }

  // const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
  //   event.preventDefault()

  //   console.log("Formulaire envoyé :", {
  //     name: formName,
  //     email: formEmail,
  //     message: formMessage
  //   })
  // }
  const handleCompleteTask = (): void => {
    setCompletedTasks((prevCount) => prevCount + 1)
  }

  const handleIncreaseScore = (): void => {
    setScore((previousScore) => previousScore + 1)
  }

  const handleResetName = (): void => {
    setUserName("Ala")
  }


  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target

    setUserForm((previousForm) => ({
      ...previousForm,
      [name]: value
    }))
  }

  const handleUserChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target

    setUser((previousUser) => ({
      ...previousUser,
      [name]: value
    }))
  }

  const handleProjectChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = event.target

    setProject((previousProject) => ({
      ...previousProject,
      [name]: value
    }))
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))
  }

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    // Validation du nom
    if (formData.nom.trim() === '') {
      newErrors.nom = 'Le nom est obligatoire.'
    }

    // Validation de l'e-mail
    if (!formData.email.includes('@')) {
      newErrors.email = "L'adresse e-mail doit contenir un @."
    }

    // Validation du mot de passe
    if (formData.motDePasse.length < 12) {
      newErrors.motDePasse =
        'Le mot de passe doit contenir au moins 12 caractères.'
    } else if (!/[A-Z]/.test(formData.motDePasse)) {
      newErrors.motDePasse =
        'Le mot de passe doit contenir au moins une majuscule.'
    } else if (!/[a-z]/.test(formData.motDePasse)) {
      newErrors.motDePasse =
        'Le mot de passe doit contenir au moins une minuscule.'
    } else if (!/[^A-Za-z0-9\s]/.test(formData.motDePasse)) {
      newErrors.motDePasse =
        'Le mot de passe doit contenir au moins un caractère spécial.'
    }

    return newErrors
  }
  const handleSubmit = (
    event: React.SyntheticEvent<HTMLFormElement>
  ): void => {
    event.preventDefault()

    const validationErrors = validateForm()

    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      console.log('Inscription réussie !', formData)
    }
  }
  const handleOpenModal = () => {
    setIsVisible(true)
  }

  const handleCloseModal = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    console.log("Le composant App est monté !")
  }, [])
  useEffect(() => {
    console.log("Le composant App vient d'être rendu !")
  })
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    console.log("Le nom de l'utilisateur a changé :", userName)
  }, [userName])
  useEffect(() => {
    console.log("Initialisation de l'intervalle")

    const intervalId = setInterval(() => {
      setCounter((previousCounter) => previousCounter + 1)
    }, 1000)

    // Fonction de nettoyage
    return () => {
      console.log("Nettoyage de l'intervalle")
      clearInterval(intervalId)
    }
  }, [])
  useEffect(() => {
    console.log('Simulation du chargement des données...')

    const timeoutId = setTimeout(() => {
      setUserData({
        nom: 'Dupont',
        prenom: 'Jean',
        email: 'jean.dupont@example.com',
        age: 28,
      })

      setIsLoading(false)

      console.log('Données chargées !')
    }, 2000)

    // Nettoyage du timeout
    return () => {
      clearTimeout(timeoutId)
      console.log('Nettoyage du timeout')
    }
  }, [])
  useEffect(() => {
    emailInputRef.current?.focus()

    console.log('Focus automatique sur le champ email')
  }, [])
  useEffect(() => {
    if (isVisible) {
      console.log('Ouverture de la modale')

      timeoutRef.current = setTimeout(() => {
        setIsVisible(false)
        console.log('Fermeture automatique de la modale')
      }, 3000)
    }
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
        console.log('Nettoyage de la minuterie')
      }
    }
  }, [isVisible])
  return (
    <div>
      <h1>Welcome to {projectName}</h1>
      <p>React app successfully running in {currentYear} 🎉</p>
      {isLoggedIn ? (
        <h1>Bienvenue {firstName} !</h1>
      ) : (
        <h1>Veuillez vous connecter pour continuer</h1>
      )}

      <p>Nous sommes le {currentDate}</p>

      <p>
        Vous avez {notificationCount} nouvelles notifications
      </p>
      <div>
        <h1>Mes projets récents</h1>
        {projects.map((project) => (
          <div key={project.id}>
            <h2>{project.name}</h2>
            <p>Auteur : {project.author}</p>
            <p>Statut : {project.status}</p>
          </div>
        ))}
      </div>

      <div>
        <h1>Tableau de bord</h1>

        <h2>Bienvenue {userName} !</h2>

        <div>
          <label htmlFor="userName">Modifier votre nom :</label>

          <input
            id="userName"
            type="text"
            value={userName}
            onChange={handleNameChange}
            placeholder="Entrez votre nom"
          />

          <button onClick={handleResetName}>
            Réinitialiser le nom
          </button>
        </div>
      </div>

      {/* <div>
        <h1>Tableau de bord</h1>
        <h2>Bienvenue {userName} !</h2>
        <div>
          <label>Modifier votre nom :</label>
          <input
            type="text"
            value={userName}
            onChange={handleNameChange}
            placeholder="Entrez votre nom"
          />
        </div>
      </div> */}
      <div>
        <h1>Gestion des tâches</h1>
        <p>
          Tâches complétées : {completedTasks}
        </p>

        <button onClick={handleCompleteTask}>
          Compléter une tâche
        </button>
      </div>
      <div>
        <h1>Mon compteur de score</h1>

        <p>Votre score actuel est : <strong>{score}</strong></p>

        <button onClick={handleIncreaseScore}>
          Augmenter le score
        </button>
      </div>
      <div>
        <h1>Formulaire de contact</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="formName">Nom :</label>
            <input
              id="formName"
              type="text"
              value={formName}
              onChange={handleFormNameChange}
              placeholder="Entrez votre nom"
            />
          </div>

          <div>
            <label htmlFor="formEmail">Adresse e-mail :</label>
            <input
              id="formEmail"
              type="email"
              value={formEmail}
              onChange={handleFormEmailChange}
              placeholder="Entrez votre adresse e-mail"
            />
          </div>

          <div>
            <label htmlFor="formMessage">Message :</label>
            <textarea
              id="formMessage"
              value={formMessage}
              onChange={handleFormMessageChange}
              placeholder="Écrivez votre message"
              rows={5}
            />
          </div>

          <button type="submit">Envoyer</button>
        </form>

        <h2>Aperçu en temps réel</h2>

        <p>Nom : {formName || "Non renseigné"}</p>
        <p>E-mail : {formEmail || "Non renseigné"}</p>
        <p>Message : {formMessage || "Aucun message"}</p>
      </div>
      <div>
        <h1>Inscription utilisateur</h1>

        <form onSubmit={(event) => event.preventDefault()}>

          <div>
            <label htmlFor="nom">Nom :</label>
            <input
              id="nom"
              type="text"
              name="nom"
              value={userForm.nom}
              onChange={handleInputChange}
              placeholder="Votre nom"
            />
          </div>

          <div>
            <label htmlFor="prenom">Prénom :</label>
            <input
              id="prenom"
              type="text"
              name="prenom"
              value={userForm.prenom}
              onChange={handleInputChange}
              placeholder="Votre prénom"
            />
          </div>

          <div>
            <label htmlFor="email">E-mail :</label>
            <input
              id="email"
              type="email"
              name="email"
              value={userForm.email}
              onChange={handleInputChange}
              placeholder="Votre e-mail"
            />
          </div>

          <div>
            <label htmlFor="motDePasse">Mot de passe :</label>
            <input
              id="motDePasse"
              type="password"
              name="motDePasse"
              value={userForm.motDePasse}
              onChange={handleInputChange}
              placeholder="Votre mot de passe"
            />
          </div>

          <button type="submit">Valider</button>
        </form>

        <h2>Aperçu des données</h2>

        <pre>{JSON.stringify(userForm, null, 2)}</pre>
      </div>
      <div>
        <h1>Gestion des utilisateurs et des projets</h1>


        <section>
          <h2>Ajouter un utilisateur</h2>

          <form onSubmit={(event) => event.preventDefault()}>
            <div>
              <label htmlFor="nom">Nom :</label>
              <input
                id="nom"
                name="nom"
                type="text"
                value={user.nom}
                onChange={handleUserChange}
                placeholder="Nom"
              />
            </div>

            <div>
              <label htmlFor="prenom">Prénom :</label>
              <input
                id="prenom"
                name="prenom"
                type="text"
                value={user.prenom}
                onChange={handleUserChange}
                placeholder="Prénom"
              />
            </div>

            <div>
              <label htmlFor="email">E-mail :</label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleUserChange}
                placeholder="Adresse e-mail"
              />
            </div>
          </form>
        </section>


        <section>
          <h2>Ajouter un projet</h2>

          <form onSubmit={(event) => event.preventDefault()}>
            <div>
              <label htmlFor="projectNom">Nom du projet :</label>
              <input
                id="projectNom"
                name="nom"
                type="text"
                value={project.name}
                onChange={handleProjectChange}
                placeholder="Nom du projet"
              />
            </div>

            <div>
              <label htmlFor="description">Description :</label>
              <textarea
                id="description"
                name="description"
                value={project.description}
                onChange={handleProjectChange}
                placeholder="Description du projet"
              />
            </div>

            <div>
              <label htmlFor="statut">Statut :</label>
              <select
                id="statut"
                name="statut"
                value={project.status}
                onChange={handleProjectChange}
              >
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="En attente">En attente</option>
              </select>
            </div>
          </form>
        </section>

        {/* Récapitulatif */}
        <section>
          <h2>Récapitulatif des données</h2>

          <h3>Utilisateur</h3>
          <pre>{JSON.stringify(user, null, 2)}</pre>

          <h3>Projet</h3>
          <pre>{JSON.stringify(project, null, 2)}</pre>
        </section>
      </div>
      <div>
        <h1>Formulaire d'inscription</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nom">Nom :</label>
            <input
              id="nom"
              name="nom"
              type="text"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Votre nom"
            />
            {errors.nom && (
              <p className="error">{errors.nom}</p>
            )}
          </div>

          <div>
            <label htmlFor="email">E-mail :</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Votre adresse e-mail"
            />
            {errors.email && (
              <p className="error">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="motDePasse">Mot de passe :</label>
            <input
              id="motDePasse"
              name="motDePasse"
              type="password"
              value={formData.motDePasse}
              onChange={handleChange}
              placeholder="Minimum 12 caractères"
            />
            {errors.motDePasse && (
              <p className="error">{errors.motDePasse}</p>
            )}
          </div>

          <button type="submit">S'inscrire</button>
        </form>
      </div>
      <div>
        <h1>Découverte de useEffect</h1>

        <p>Nombre de clics : {count}</p>

        <button onClick={() => setCount((previousCount) => previousCount + 1)}>
          Incrémenter
        </button>
      </div>
      <div>
        <h1>Surveillance du nom utilisateur</h1>

        <label htmlFor="userName">Modifier votre nom :</label>

        <input
          id="userName"
          type="text"
          value={userName}
          onChange={handleNameChange}
          placeholder="Entrez votre nom"
        />

        <h2>Bienvenue {userName} !</h2>
      </div>
      <div>
        <h1>Compteur automatique</h1>
        <h2>{counter}</h2>
        <p>Le compteur augmente chaque seconde.</p>
      </div>
      <div>
        <h1>Chargement des utilisateurs</h1>

        {isLoading ? (
          <p>Chargement des données…</p>
        ) : (
          <div>
            <h2>Informations utilisateur</h2>
            <p>Nom : {userData?.nom}</p>
            <p>Prénom : {userData?.prenom}</p>
            <p>Email : {userData?.email}</p>
            <p>Âge : {userData?.age} ans</p>
          </div>
        )}
      </div>
      <div>
        <h1>Connexion</h1>

        <label htmlFor="email">Adresse e-mail :</label>

        <input
          ref={emailInputRef}
          id="email"
          type="email"
          placeholder="Entrez votre adresse e-mail"
        />
      </div>
      <div>
        <h1>Différence entre useState et useRef</h1>

        <h2>Compteur (useState) : {counter}</h2>

        <button onClick={() => setCounter(previous => previous + 1)}>
          Incrémenter
        </button>

        <hr />

        <h2>Nombre de rendus (useRef) : {renderCount.current}</h2>

        <h2>Variable classique : {normalVariable}</h2>
      </div>
      <div>
        <h1>Gestion d'une modale</h1>

        <button onClick={handleOpenModal}>
          Ouvrir la modale
        </button>

        {isVisible && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Bienvenue !</h2>
              <p>
                Cette modale va se fermer automatiquement
                dans 3 secondes.
              </p>

              <button onClick={handleCloseModal}>
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App