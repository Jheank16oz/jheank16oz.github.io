# Abstract Factory (Creación de Objetos)

## Intención
Proveer una interface para la creación de familias de parientes o objetos dependientes sin especificar sus clases concretas.

## También conocida como
Kit

## Motivación
Considerar un kit de herramientas(toolkit) de interfaz de usuario que soporta multiples estándares de `look-and-feel` como Motif(Motif es una biblioteca para la creación de entornos gráficos bajo X Window System) y Presentation Manager(Presentation Manager (PM) es la interfaz gráfica de usuario (GUI) que IBM y Microsoft presentaron en la versión 1.1 de su sistema operativo OS/2 en 1988). Diferentes `look-and-feels` definen diferentes apariencias y comportamientos para los `widgets` de la interfaz de usuario como barras de scroll, ventana, y botones. Para ser portable a través de estándares look-and-feel, una aplicación no debe hacer hard-code de sus widgets para un look-and-feel particular. Instanciando clases de widgets con un look-and-feel especifico a lo largo de la aplicación hace muy difícil cambiar luego de look-and-feel.

Podemos solventar este problema definiendo una clase WidgetFactory abstracta que declara una interface para crear cada tipo básico de widget. También hay una clase abstracta para cada tipo de widget, y subclases concretas que implementan widgets para específicos estándares de look-and-feel. la interface de WidgetFactory tiene una operación que retorna un nuevo objeto widget para cada clase abstracta de widget. Los clientes llaman estas operaciones para obtener instancias de widget, pero los clientes no son conscientes de que clases concretas están usando. Por lo tanto esos clientes se mantienen independientes del look-and-feel prevaleciente. 

<img src="./../img/relationships-widget-factory.png">

Existe una subclase concreta de WidgetFactory para cada estándar de look-and-feel. Cada subclase implementa las operaciones para crear los widgets apropiados para el look-and-feel. Por ejemplo, la operación `CreateScrollBar` en el `MotifWidgetFactory` instancia y retorna un Motif scroll bar, mientras la operación correspondiente en el PMWidgetFactory retorna un scroll bar para Presentation Manager. Los Clientes crean los widgets solo a través de la interface WidgetFactory y no tienen conocimiento de las clases que implementan los widgets para un particular look and feel.

* **AbstractFactory** (Widget Factory)
  - Declara una interface para operaciones que crean objetos de productos abstractos.
* **ConcreteFactory** (MotifWidgetFactory, PMWidgetFactory)
  - implementa las operaciones para crear objetos de producto concretos.
* **AbstractProduct** (Window,ScrollBar)
  - Declara una interface para un tipo de objeto de producto.
* **ConcreteProduct** (MotifWindow,MotifScrollBar)
  - Define un objeto de producto para ser creado por la correspondiente ConcreteFactory.
  - Implementa la interface AbstractProduct.
* **Client**
  - Usa solo interfaces declaradas por clases AbstractFactory y AbstractProduct.

## Colaboraciones
* Normalmente una única instancia de una clase de ConcreteFactory crea objetos de producto que tienen una implementación particular. Para crear diferentes objetos de producto,los clientes deben usar diferentes ConcreteFactory.

* AbstractFactory delega la creación de objetos de producto a su subclase ConcreteFactory.

## Consecuencias
El patrón AbstractFactory tiene los siguientes beneficios y riesgos:
1. *Aísla las clases concretas*. El patrón AbstractFactory ayuda a controlar los objetos de clase que la aplicación crea. Puesto que una factory encapsula la responsabilidad y el proceso de crear objetos de producto, este aísla los clientes de la implementación de clases. Los clientes manipulan instancias a través de sus interfaces abstractas. Los nombres de las clases de producto son aislados en la implementación de la ConcreteFactory; ellas no aparecen en el código del cliente.
2. *Facilita el intercambio de familias de productos*.
La clase de una ConcreteFactory aparece una única vez en la aplicación, la cual seria donde es instanciada. Esto hace mas fácil cambiar una ConcreteFactory que una aplicación usa. Esta puede usar diferentes configuraciones de productos simplemente cambiando la ConcreteFactory. Ya que un abstract factory crea una familia completa de productos, toda la familia de productos cambian una única vez. En el ejemplo de interfaz de usuario, Podemos cambiar de widgets  Motif a widgets de Presentation Manager simplemente cambiando los correspondientes objetos factory y recreando la interfaz.
3. *Promueve consistencia entre productos*. Cuando los objetos de producto en una familia son diseñados para trabajar juntos, es importante que una aplicación use objetos de solo una familia al tiempo. AbstractFactory hace que sea mas fácil de reforzarlo.
4. *Soportar nuevos tipos de productos es difícil*. Extender abstract factories para producir nuevos tipos de productos no es fácil. Esto sucede porque la interface de AbstractFactory acopla el conjunto de productos que pueden ser creados. Soportar nuevos tipos de productos requiere extender la interface de factory, lo cual involucra cambiar la clase AbstractFactory y todas sus subclases.  Se discute una solución a este problema en la sección de implementación.

## Implementación
Estas son algunas técnicas útiles para implementar el patrón AbstractFactory. 
1. *Factories como singletons*. Una aplicación típicamente necesita solo una instancia de una ConcreteFactory por familia de producto. Entonces usualmente es mejor implementarla como una Singleton.
2. *Creando los productos*. AbstractFactory solo declara una *interface* para crear productos. Depende de las subclases  de ConcreteProduct crear los productos. El camino mas común  para hacerlo es definir un FactoryMethod para cada product. Si bien esta implementación es simple, requiere una nueva subclase de concrete factory para cada familia de productos, incluso si las familias de productos difieren ligeramente.
Si es posible que tengamos muchas familias de productos, la concrete factory puede implementarse usando el patron Prototype. La concrete factory es inicializada con una instancia prototipo. El enfoque Prototype-based elimina la necesidad de una nueva clase concrete factory para cada nueva familia de productos.

A continuación se presenta una forma de implementar una factory Prototype-based en Smalltalk. El concrete factory almacena los prototipos a ser clonados en un diccionario llamado partCatalog. El método `make:` recupera el prototipo y lo clona:

```smalltalk
make: partName
    ^ (partCatalog at: partName) copy
```

La concrete factory tiene un método para agregar partes al catalogo.
```smalltalk
addPart: partTemplate named: partName
    partCatalog at: partName put: partTemplate
```
Los Prototypes son agregados a la factory identificándolos con un símbolo:
```smalltalk
aFactory addPart: aPrototype named: #ACMEWidget
```
Una variación sobre el enfoque Prototype-based es posible en lenguajes que tratan sus clases como objetos first-class(Smalltalk y Objective C, por ejemplo). Podemos pensar en una clase en estos lenguajes como una factory deteriorada que crea sólo un tipo de producto. Podemos almacenar clases dentro de una concrete factory que crea varios concrete productos en variables, muy parecido a los prototype.
Estas clases crean nuevas instancias en nombre de la concrete factory. Se define una nueva factory inicializando una instancia de una concrete factory con *clases* de productos en lugar de subclases. Este enfoque toma ventaja  de las características del lenguaje, Mientras que el enfoque netamente Prototype-based es independiente del lenguaje.
Como el Prototype-based factory en Smalltalk discutido, la versión class-based tendrá una única instancia de variable `partCatalog`, la cual es un diccionario cuya key es el nombre de la parte. En ...