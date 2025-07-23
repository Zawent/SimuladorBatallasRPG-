# ⚔️ Simulador de Batallas RPG por Consola

Una aplicación interactiva por consola construida con **Node.js** que simula batallas por turnos entre personajes RPG como guerreros, magos, arqueros, esqueletos, entre otros. Diseñada con **Programación Orientada a Objetos (POO)** y principios **SOLID**, permite gestionar personajes, combatir enemigos controlados por IA, usar habilidades, equipar objetos y experimentar una experiencia RPG en terminal.


## 📌 Estado del Proyecto

✅ Gestión de personajes  
✅ Sistema de batalla por turnos  
✅ Habilidades únicas por clase  
⏳ Inventario funcional (armas, armaduras, pociones)  
✅ Enemigos controlados por IA con lógica de ataque  
⏳ Sistema de niveles y progresión  
⏳ Guardado/carga de progreso (en desarrollo)  
✅ Aplicación de principios SOLID  
✅ Interfaz por consola con `inquirer`  
✅ Estructura de proyecto modular y escalable

---

## 🚀 Instalación y ejecución

1. Clona este repositorio:
   git clone https://github.com/tuusuario/simulador-rpg-consola.git
   cd simulador-rpg-consola
Instala las dependencias:
npm install

Ejecuta la aplicación:
node src/index.js


🧩 Estructura del Proyecto
📦 simulador-rpg-consola
├── 📁 src/  
    ├── 📁 data/              # JSON o datos persistentes
    ├── 📁 models/            # Clases de personajes, enemigos, items, habilidades
    ├── 📁 services/          # Lógica del combate, IA, inventario
    ├── 📁 utils/             # Funciones auxiliares
    ├── 📁 src/               # Punto de entrada y menú principal
    └── README.md
    
📖 Principios SOLID aplicados
S - SRP (Responsabilidad única): Clases separadas para personajes, inventario, batalla y enemigos.
O - OCP (Abierto/Cerrado): Podemos agregar nuevas clases (como duende o esqueleto) sin modificar código existente.
L - LSP (Sustitución de Liskov): Todas las subclases de Personaje pueden ser tratadas como personajes base.
I - ISP (Segregación de interfaces): Separación conceptual entre IAtacante, ICurable, IMágico, etc.
D - DIP (Inversión de dependencias): Los servicios como GestorBatalla dependen de abstracciones, no implementaciones directas.

🧙‍♂️ Clases y Herencia
Cada personaje hereda de una clase base Personaje. Ejemplos de clases:

Guerrero: alta fuerza y defensa.
Mago: alto poder mágico y habilidades ofensivas.
Arquero: ataque a distancia y agilidad.
Esqueleto: enemigo IA con habilidades propias.

(Fácilmente extensible para nuevas clases)


⚔️ Sistema de Combate
Batallas por turnos entre un jugador y un enemigo IA.
Muestra estadísticas de ambos personajes antes de iniciar.
IA elige acciones de forma aleatoria e inteligente.
Se pueden usar habilidades, objetos o equiparse.
Equiparse consume turno pero modifica atributos como fuerza o defensa.


🎒 Inventario y Objetos
Los personajes cuentan con inventario limitado (máximo 7 ítems):

Armas: aumentan fuerza al equiparse.
Armaduras: aumentan defensa.
Pociones: restauran vida.

Ejemplo:
new Item('Espada de Hierro', 'Aumenta fuerza en +5', personaje => {
    personaje.fuerza += 5;
});


🧠 Enemigos IA
Enemigos como esqueletos atacan usando habilidades disponibles.
La IA elige entre atacar o usar objetos si tiene en su inventario.
También puede equipar ítems si lo considera necesario.


📈 Subida de Nivel **(NO SE LOGRO IMPLEMENTAR)**
Al ganar combates, el personaje sube de nivel 
Mejora automáticamente atributos como vida, fuerza y defensa.
Se desbloquean nuevas habilidades al llegar a ciertos niveles.


📺 Video Explicativo
🎥 Mira nuestro video en 3 partes:
Diseño de clases y diagrama UML.
Estructura del código y aplicación de SOLID.


Demostración de la app en ejecución.


📘 Diagrama UML


🤝 Autores
🧑‍💻 Uriel Vargas (Desarrollador Principal)

🎓 Proyecto educativo - Campuslands
