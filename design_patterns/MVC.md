# Model View Controller (MVC)
El patrón de diseño Modelo-Vista-Controlador (MVC) es quizás uno de los más reconocidos en el desarrollo de software, y es probable que la mayoría de nosotros hayamos escuchado hablar de él al menos una vez. Aquellos con más experiencia a menudo asumimos que comprendemos completamente su funcionamiento y su esencia. Sin embargo, al leer el libro "Design Patterns," me he dado cuenta de que existen fundamentos que en la actualidad no se aplican por completo.

Me dí a la tarea de traducir y ordenar las partes que mas me interesaron para también facilitar su entendimiento con algunas practicas en código.

## ¿Qué es MVC?
Model/View/Controller es una triada de de clases usada para la construcción de interfaces de usuario

## ¿En que Consiste?
Consiste en tres tipos de objetos

* **Modelo:** Es el objeto de la aplicación.
* **Vista:** Es la pantalla o representación de los datos.
* **Controller** Define la forma en que la interfaz de usuario reacciona a la entrada del usuario.

## ¿Porque separar la Vista el Modelo y el Controlador?
En el pasado, estos objetos solían estar juntos en los diseños de interfaces, Sin embargo; MVC desacopla estos objetos para incrementar la flexibilidad y reutilización de código..

## ¿Cómo se desacopla la vista del modelo?
Se establece un protocolo subscribe/notify entre ellos

## Características claves
Con el fin de que sea mas practico para cada característica he creado un código de ejemplo utilizando Swift.

* El **Modelo** notifica a las vistas dependientes si hay un cambio
  ```swift
  import Foundation
  /*
    Para este caso utilicé un observable object para que así se notifique a las vistas suscritas a este modelo.
  */
  class FaceValue:ObservableObject, Identifiable {
      let id = UUID()
      @Published var a:Double
      @Published var b:Double
      @Published var c:Double

      init(a: Double, b: Double, c: Double) {
          self.a = a
          self.b = b
          self.c = c
      }
  }
  ```
* La **Vista** está anclada al modelo, este enfoque permite proveer diferentes vistas
  ```swift
  /*
    Creé tres vistas distintas a las cuales anclé el mismo modelo de la siguiente forma
  */
  @ObservedObject internal var model:FaceValue
  ```

* Permite crear diferentes vistas sin necesidad de recrear el Modelo
  

// WIP
