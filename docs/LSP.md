# Liskov substitution Principle


El principio de Liskov fue introducido en el año 1987 por Barbara Liskov durante una conferencia, realmente ella nunca le dio este nombre más bien fue adoptado por la comunidad y e incluso ella se enteró vía email cuando un estudiante suyo le preguntó del tema bajo el nombre de Liskov substitution principle.


Barbara explica que se enteró que hierarchy(herencia) estaba siendo usado para dos diferentes propósitos, el primero para herencia simple, cuando un clase implementa algo podemos crear una subclase que traiga de esa implementación lo que queremos y podemos agregar métodos extras y cambiar la representación del mismo, el otro método por el cual se estaba utilizando es por Type Hierarchy(Herencia de Tipo), lo cual permite crear un super type y luego una subclase extiende este tipo para convertirse en una subtype, ella comenta que no era muy entendido esta regla, un ejemplo en particular que da es que se creía que un Stack(LIFO) y Queue(FIFO) eran subtypes de una supertype lo que para nada es correcto teniendo en cuenta la definición del siguiente principio.


En esta conferencia Barbara explicó lo siguiente:
>  A subtype should behave like an supertype as far as you can tell by using the super types methods


Este enunciado significa que un subtipo de una clase debe tener un comportamiento similar al de su supertipo, es decir, debe utilizar los mismos métodos que su supertipo y comportarse de manera consistente con él. En otras palabras, el subtipo debe seguir las reglas y comportamientos definidos por su supertipo para mantener la coherencia y consistencia en toda la jerarquía de clases.


Fuente
[Liskov: The Liskov Substitution Principle](https://youtu.be/-Z-17h3jG0A)


Adentrándonos más al ejemplo de Stacks y Queues que menciona Barbara, podemos ver el caso de LIFO(Last in first out) y FIFO(First in first out) para el cual asegura que no son subtipos del mismo supertipo:


Imaginemos que tenemos esta estructura de subtype:




```
// Super type
protocol AnySuperType {
   var items: [String] { get }
   func push(item: String)
   func pop() -> String
}
```


```
// FIFO: First in first out
// El primer ítem en entrar es el primero en salir.
class Queue : AnySuperType {
   var items: [String] = []


   func push(item: String) {
       items.append(item)
   }


   func pop() -> String{
       let itemToDrop:String = items.first ?? ""
       items = items.dropFirst().map{String($0)}
       return itemToDrop
   }
}
```


```
// LIFO: Last in first out
// El último en entrar es  el primero en salir.
class Stack : AnySuperType {
   var items: [String] = []
  
   func push(item: String) {
       items.insert(item, at: 0)
   }


   func pop() -> String {
       let itemToDrop:String = items.first ?? ""
       items = items.dropFirst().map{String($0)}
       return itemToDrop
   }
}
```


Imaginemos que mediante la siguiente clase se utiliza el SuperType para decidir del inventario que caja será enviada al cliente.
```
class ManageObjectToSend {
   private var  boxes: AnySuperType


   init(boxes: AnySuperType) {
       self.boxes = boxes
   }
  


   func deliver() -> String {
       return self.boxes.pop()
   }
}
```


Sí por alguna razón esperamos que cada caja sea repartida en el orden que llegaron de la primera a la última(FIFO), con este uso de subtype estamos abiertos a un problema si en lugar de un Queue recibimos un Stack ya que podríamos estar repartiendo las cajas cada que lleguen(LIFO).


Este ejemplo también aplica de manera contraria para sistemas que utilizan LIFO en lugar de FIFO, el punto que debemos tener en cuenta es que las subtypes deben limitar su comportamiento al SuperType, cualquier subtype puede comportarse como una supertype sin afectar el sistema.


Un meme muy popular ejemplificar este principio:
![](https://hackernoon.imgix.net/images/rrr2emx.jpg)


Es usual que queramos representar casos de la vida real en herencias de supertype pero esto es muy lejano de la realidad en arquitecturas de código, ya que una herencia de tipo mal estructurada puede dar cabida a errores no esperados, si bien la herencia de tipo nos permite estar abierto a extensiones de código debemos tener en cuenta que el uso de supertipos tiene como fin crear un lineamiento de cómo se va comportar una parte de nuestro sistema y sus subtipos no deben cambiar este comportamiento definido.
