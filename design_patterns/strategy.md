# Strategy (Objetos de comportamiento)

## Intención 
Define una familia de algoritmos, encapsula cada uno, y los hace intercambiables. Strategy permite al algoritmo variar independientemente de los clientes que lo usan.

## También conocido como
Policy

## Motivación
Muchos algoritmos existen para romper un transmisión de texto en lineas. No es deseable 'cablear directamente' todos esos algoritmos en las clases que los requieren por varias razones:
* Los clientes que necesitan line-breaking obtienen mas complejidad si incluyen el código de rompimiento de linea. Esto hace al cliente mas grande y difícil de mantener, especialmente si soporta multiples algoritmos para line-breaking.
* Diferentes algoritmos serán apropiados en ocasiones diferentes. No queremos soportar multiples algoritmos de line-breaking si no los usamos todos.
* Es difícil agregar nuevos algoritmos y variar los existentes cuando line-breaking es una parte integral del cliente.

Podemos evitar estos problemas definiendo clases que encapsulan diferentes algoritmos de line-breaking. Un algoritmo que es encapsulado de esta forma es llamado  **strategy**.

<img src="./../img/strategy-diagram.png"/>

Supongamos una clase Composition que es responsable de mantener y actualizar line-breaks(saltos de linea) de texto desplegado en una vista de texto. Las estrategias de LineBreaking no son implementadas por la clase Composition. En su lugar, son implementadas separadamente en una subclass de la  clase abstracta Compositor. las subclases de Compositor implementan diferentes estrategias:

* **SimpleCompositor** implementa una estrategia simple que determina saltos de linea de uno a la vez.
* **TeXCompositor** implementa algoritmos TeX para encontrar saltos de linea. Esta estrategia intenta optimizar line-breaks globalmente, es decir, una párrafo a la vez.
* **ArrayCompositor** implementa una estrategia que selecciona saltos entonces cada row tiene un número fijo de items. Por ejemplo, esto es útil para romper una colección de icons en dos filas.

Una Composition mantiene una referencia de un objeto Compositor. Siempre que una Composition re formatee su texto, este reenvía esta responsabilidad a su objeto Compositor. El cliente de la Composition especifica cual Compositor debe ser usado para instalar el Compositor que desea dentro del Composition.

## Aplicabilidad
Usar el patrón Strategy cuando
* muchas clases relacionadas difieren solo en su comportamiento. Las estrategias proveen un camino para configurar una clase con uno o muchos comportamientos.
* se necesita diferentes variantes de un algoritmo. Por ejemplo, Podrías definir algoritmos que reflejen diferentes compensaciones entre espacio y tiempo. Las estrategias pueden ser usadas cuando estas variantes son implementadas como una jerarquía de clases de algoritmos.
* un algoritmo usa data que el cliente no debe conocer. Usar el patrón Strategy evita exponer lo complejo, estructuras de datos específicas del algoritmo.
* una clase define muchos comportamientos, y esto se resume en multiples sentencias condicionales en sus operaciones. En lugar de multiples condiciones, mover ramas de condiciones relacionadas dentro de su propia clase Strategy.

## Estructura
<img src="./../img/strategy-structure-diagram.png"/>

## Participantes
* **Strategy**(Compositor)
  - declara una interface común para todos los algoritmos soportados. Context usa esta interface para llamar el algoritmo definido por una ConcreteStrategy.
* **ConcreteStrategy**(SimpleCompositor, TeXCompositor, ArrayCompositor)
  - implementa el algoritmo usando la interface Strategy.
* **Context**(Composition)
  - es configurado con un objeto ConcreteStrategy.
  - mantiene una referencia de un objeto Strategy.
  - podría definir una interface que permita a la Strategy acceder a su data.

## Colaboraciones
* Strategy y Context interactúan para implementar el algoritmo seleccionado. Un context puede ser pasar toda la data requerida por el algoritmo a la estrategia cuando el algoritmo es llamado. Alternativamente, el context puede pasarse a si mismo  como un argumento para las operaciones de Strategy. Esto permite a la strategy llamar de vuelta sobre el contexto  como requerido.
* Un contexto reenvía solicitudes desde sus clientes a sus estrategias. Los Client usualmente crean y pasan un objeto de ConcreteStrategy al contexto; los clientes interactúan con el contexto exclusivamente. Es usual una familia de clases ConcreteStrategy para que el cliente seleccione una.

## Consecuencias
El patrón Strategy tiene los siguientes beneficios y desventajas:

1. *Familias de algoritmos relacionados*. Las Jerarquías de clases Strategy definen una familia de algoritmos o comportamientos para que los contextos los usen. La herencia puede ayudar a factorizar la funcionalidad común de los algoritmos.
2. *Una alternativa a sub-classing*. La Herencia ofrece otro camino para soportar una variedad de algoritmos o comportamientos. Se puede crear una subclass de una clase Context Directamente pra dar diferentes comportamientos. Sin embargo, esto cablea directamente el comportamiento dentro del contexto. Esto mezcla la implementación del algoritmo con el Contexto, haciendo el Contexto difícil de de entender, mantener, y extender. Y no se puede variar el algoritmo de forma dinámica. Se termina con muchas clases relacionadas las cuales solo se diferencian en el algoritmo o el comportamiento que emplean. Encapsular el algoritmo en clases Strategy separadas permite variar el algoritmo independientemente de su contexto, haciéndolo fácil de  hacer switch, entender, y extender.
3. *Las Estrategias eliminan sentencias condicionales*. El patrón Strategy  ofrece una alternativa a las sentencias condicionales para seleccionar un comportamiento deseado. Cuando diferentes comportamientos son agrupados dentro de una sola clase, es difícil evitar usar sentencias condicionales para seleccionar el comportamiento correcto. Encapsular el comportamiento en clases separadas Strategy elimina estas sentencias condicionales.

Por ejemplo, sin estrategias, el código para saltos de lineas en texto puede verse
```cpp
void Composition::Repair () {
    switch (_breakingStrategy) {
      case SimpleStrategy:
          ComposeWithSimpleCompositor();
          break;
      case TeXStrategy:
          ComposeWithTeXCompositor();
          break;
      // ...
    }
    // mezclar  resultados con la composición existente, si es necesario
}
```

El patrón Strategy elimina estas sentencias case delegando la tarea de salto de linea a un objeto Strategy:
```cpp
void Composition::Repair () {
    _compositor->Compose();
    // mezclar resultados con la composición existente, si es necesario
}
```
El código que contiene muchas sentencias condicionales usualmente indica la necesidad de aplicar el patrón Strategy.

4. *Una elección de implementaciones*. Las estrategias pueden proveer diferentes implementaciones del mismo comportamiento. El cliente puede seleccionar entre estrategias con diferentes compensaciones de tiempo y espacio.
5. *Los clientes deben ser conscientes de las diferentes Estrategias*. El patrón  tiene una potencial desventaja en que un cliente debe entender como las Estrategias difieren antes de seleccionar la apropiada. Los clientes podrían estar expuestos a implementar issues. Por lo tanto se debe usar el patrón Strategy solo cuando la variación en el comportamiento es relevante para los clientes.
6. *Sobrecarga de comunicación entre Estrategia y Contexto*. La interface Strategy es compartida por todas las clases ConcreteStrategy sin importar si el algoritmo que implementan son triviales o complejos. De ahí es común que algunas ConcreteStrategy no utilizarán toda la información pasada a traves de esta interface; las ConcreteStrategies simples podrían usar nada de esto! Esto significa que habrán ocasiones cuando el contexto crea e inicializa  los parámetros que nunca serán usados. Si esto es unn problema, luego se necesitará un acoplamiento más estrecho entre Estrategia y Contexto.
7. *Incrementar el número de objetos*. Las estrategias incrementan el número de objetos en una aplicación. Algunas veces se pude reducir esta sobrecarga implementando estrategias como objetos sin estado que los contextos pueden compartir. Cualquier estado residual es mantenido por el contexto, el cual lo pasa en cada solicitud al objeto Strategy. Compartir estrategias podría no mantener el estado a traves de las invocaciones. El patrón Flyweight describe este enfoque.

## Implementación
Consideremos los siguientes issues de implementación:

1. *Definir las interfaces Strategy y Context*. Las interfaces Context y Strategy deben dar a un ConcreteStrategy un eficiente acceso a cualquier  data necesaria del context, y viceversa.
<br>
Un enfoque es que el Contexto pase datos como parámetros a las operaciones de la Estrategia. En otras palabras, pasar la data para el strategy. Esto mantiene el Strategy y Contexto desacoplado. En la otra mano, Context podría pasar data al Strategy que no necesita.
<br> 
Otra técnica tener un contexto que se pasa así mismo como un argumento, y la estrategia solicita la data desde el contexto explícitamente.
Alternativamente, la estrategia puede almacenar una referencia a su contexto, eliminando la necesidad de pasar cualquier cosa en absoluto. De cualquier manera, la estrategia puede solicitar exactamente lo que necesita. Pero ahora Context debe definir una mas elaborada interface para su data, lo que acopla Strategy Context mas cerca.
<br>
La necesidad de un algoritmo particular y su requerimiento de data determinan la mejor técnica.

2. *Estrategias como parámetros template*. En C++ los templates puede ser usados para configurar una clase con una estrategia. Esta técnica es solo aplicable si (1) la Strategy puede ser seleccionada en tiempo de compilación, y (2) esta no tiene que ser cambiada en tiempo de ejecución. En este caso, la clase a ser configurada(e.g., `Context`) es definida como una clase template que tiene una clase `Strategy` como parámetro:

```cpp
template <class AStrategy>
class Context {
  void Operation() { theStrategy.DoAlgorithm(); }
  // ...
private:
  AStrategy theStrategy;
};
```

La clase es luego configurada con una clase Strategy cuando es instanciada:

```cpp
class MyStrategy {
public:
    void DoAlgorithm();
};

Context<MyStrategy> aContext;
```
Con templates, no existe necesidad de definir una clase abstracta que defina la interface  de la `Strategy`. Usando `Strategy` como parámetro plantilla también  permite vincular una estrategia a su contexto de forma estática, lo que puede aumentar la eficiencia.

3. *Que Strategy sea un objeto opcional*. La clase Context puede simplificarse si no tiene sentido tener un objeto Strategy. Context verifica si tiene un objeto Strategy  antes de acceder a este. Si existe, Context lo usa normalmente. Si no existe una strategy, Context lleva a cabo el comportamiento por defecto. El beneficio de este enfoque es que los clientes no tengan que lidiar con objetos Strategy en absoluto a menos que no quieran el comportamiento por defecto.


## Código de Ejemplo
Se da el ejemplo de código a alto nivel del ejemplo Motivation, el cual esta basado en la implementación de las clases Composition y Compositor en entrevistas[LCI+92].

La clase `Composition` mantiene una colección de instancias `Component`, las cuales representan text y elementos gráficos en un documento. Una composición ancla objetos componentes dentro de lineas usando una instancia de una subclass `Compositor`, la cual encapsula una strategy de line-breaking. Cada componente tiene un tamaño natural asociado, estirabilidad(stretchability), y encogimiento(shrinkability). La estirabilidad define cuanto el componente puede crecer mas allá de su tamaño natural; el encogimiento es cuanto es capaz de encogerse. La composition pasa estos valores a un compositor, el cual usa estos para determinar la mejor ubicación de salto de lineas.

```cpp
class Composition {
public:
    Composition(Compositor*);
    void Repair();
private:
    Compositor* _compositor;
    Component* _components;   // la lista de componentes
    int _componentCount;      // el número de componentes
    int _lineWidth;           // el ancho de linea de la composición
    int _lineBreaks;          // la posición de saltos de linea
                              // en componentes
    int _lineCount;           // el número de lineas
};
```
Cuando un nuevo diseño es requerido, la composición pregunta a su compositor para determinar donde debe ubicar los saltos de linea. La composition pasa  al compositor tres arrays que define los tamaños naturales, stretch-abilities, y shrink-abilities de los components. También pasa el número de componentes, qué tan ancha de linea,  yh un listado que el compositor llena  con la posición de cada salto de linea. El compositor retorna el número de saltos calculados.

La interface `Compositor` permite a la composición  pasar al compositor toda la información que necesita. Este es un ejemplo de "llevar la data a la strategy":

```cpp
class Compositor {
public:
    virtual int Compose(
      Coord natural[], Coord stretch[], Coord shrink[], int componentCount, int lineWidth, int breaks[]
    ) = 0;
protected:
    Compositor();
};
```

Note que `Compositor` es una clase abstracta. Las subclases concretas especifican las estrategias de salto de linea.

La composición llama a su compositor en su operación `Repair`. la operación `Repair` primero inicializa los arrays con los tamaños naturales, stretchability, y shrinkability de cada componente (los detalles de cuales son omitidos). Luego este llama al compositor para obtener los saltos de linea y finalmente establece los componentes de acuerdo a los saltos.

```cpp
void Composition::Repair () {
  Coord* natural;
  Coord* stretchability;
  Coord* shrinkability;
  int componentCount;
  int* breaks;

  // prepare the arrays with the desired component sizes
  // ...

  // determine where the breaks are:
  int breakCount;
  breakCount = _compositor->Compose(
      natural, stretchability, shrinkability,
      componentCount, _lineWidth, breaks
  );

  // lay out components according to breaks
  // ...
}
```
Ahora miremos las subclases de `Compositor`. `SimpleCompositor` examina los components en linea a la vez que determina donde los saltos de linea deben ir:

```cpp
class SimpleCompositor : public Compositor {
public:
    SimpleCompositor();

    virtual int Compose(
      Coord natural[], Coord stretch[], Coord shrink[],
      int componentCount, int lineWidth, int breaks[]
    );
    // ...
}
```
`TeXCompositor` usa una estrategia mas global. Examina un párrafo a la vez, teniendo en cuenta el tamaño del componente y stretchability. Este también intenta dar incluso un "color" al párrafo minimizando los espacios blancos entre los componentes.

```cpp
class TeXCompositor : public Compositor {
public:
    TeXCompositor();

    virtual int Compose(
        Coord natural[], Coord stretch[], Coord shrink[],
        int componentCount, int lineWidth, int breaks[]
    );
    // ...
}
```

`ArrayCompositor` divide los componentes en lineas de intervalos regulares.

```cpp
class ArrayCompositor : public Compositor {
public:
    ArrayCompositor(int interval);

    virtual int Compose(
      Coord natural[], Coord stretch[], Coord shrink[], 
      int componentCount, int lineWidth, int breaks[]
    );
    // ...
}
```

Estas clases no usan toda la información pasada en `Compose`. `SimpleCompositor` ignora la stretchability de los componentes, teniendo en cuenta solo sus anchos naturales. `TeXCompositor` usa toda la información pasada, mientras que `ArrayCompositor` ignora todo.


Para instanciar `Composition`, se pasa el compositor que se quiere usar:
```cpp
Composition* quick = new Composition(new SimpleCompositor);
Composition* slick = new Composition(new TeXCompositor);
Composition* iconic = new Composition(new ArrayCompositor(100));
```

la interface `Compositor` es cuidadosamente diseñada para soportar todos los algoritmos de diseño que las subclases podrían implementar. No se quiere tener que cambiar esta interface con cada nueva subclase, porque esto va a requerir cambiar subclases existentes. En general, las interfaces Strategy y Context determinan que tan bien el patrón alcanza su intención.

## Usos Conocidos
Ambos ET++ [WGM88] y vistas internas usan estrategias para encapsular  diferentes algoritmos de saltos de linea como hemos descrito.

En el Sistema RTL para compilar optimización de código [JML92], Las estrategias definen diferentes esquemas de asignación de registros (RegisterAllocator) y políticas de programación del conjunto de instrucciones (RISCscheduler, CISCscheduler). Esto provee flexibilidad orientando el optimizer para diferentes arquitecturas de maquina.

El Marco del motor de cálculo  ET++SwapsManager calcula precios para diferentes instrumentos de finanzas [EG92]. Esta abstracción clave son Instrument y Yield-Curve. Deferentes instrumentos son implementados como subclases de Instrument. Yield-Curve calcula factores de descuentos, los cuales determinan el valor presente de futuros flujos de dinero. Ambas clases delegan algunos comportamientos  a objetos Strategy. El framework provee una familia de clases ConcreteStrategy para generar flujos de dinero, valorando swaps y calculando los valores de descuento. Este enfoque soporta mezclar y agrupar existentes implementaciones de Strategy al igual como nuevas definiciones.

Los componentes Booch[BV90] usa estrategias como argumentos de template. La colección de clases Booch soporta tres diferentes tipos de estrategias de asignación de memoria: gestionada (asignación de un grupo), controlada (asignaciones/des asignaciones son protegidas por cerraduras), y no gestionadas (El asignador de memoria normal). Estas estrategias se pasan como argumentos de plantilla a una clase de colección cuando se instancia. Por ejemplo, un UnboundedCollection que usa la strategy  unmanaged es instanciada como UnboundedCollection<MyItemType*, Unmanaged>.

RApp es un sistema para diseños de circuito integrado [GA89, AG90]. RApp debe colocar y enrutar cables que conectan subsistemas sobre circuitos. Los algoritmos de enrutado en RApp son definidos como subclasses de una clase abstracta Router. Router es una clase Strategy.

Borland's ObjectWindows [Bor94] usa estrategias para cajas de dialogo para asegurarse que el usuario ingresa la data valida. Por ejemplo, números que debe estar en cierto rango, y una entrada numérica debe aceptar solo dígitos. Validando que una cadena es correcta puede requerir una búsqueda de tabla.

ObjectWindows usa objetos Validator para encapsular estrategias. Validators son ejemplos de objetos Strategy. Los campos de datos de entrada delegan la estrategia de validación a un objeto Validator. El cliente anexa un validator a un campo si la validación es requerida (un ejemplo de una estrategia opcional). Cuando el dialogo es cerrado, los campos de entrada preguntan a sus validators para validar la data. La librería de clase provee validadores para casos comunes, como un validador de Rango para números. Nuevas estrategias para validaciones especificas del cliente pueden ser definidas fácilmente heredando la clase Validator.

## Patrones Relacionados
Flyweight: Los objetos de estrategia a menudo hacen buenos flyweights