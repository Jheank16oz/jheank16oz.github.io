# Builder (Creación de Objetos)

## Objetivo
Separar la construcción de un objeto complejo de su representación, así el mismo proceso de construcción puede crear diferentes  representaciones. 

## Aplicabilidad
Usar el patron Builder cuando

* El algoritmo para crear un objeto complejo debe ser independiente de las partes que conforman el objeto y de cómo se ensamblan.
* El proceso de construcción debe permitir diferentes representaciones para el objeto que se está construyendo. 

## Estructura
<img src="./../img/structure-builder.png">

## Participantes
* **Builder**
  - Especifica una interface Abstracta para crear partes de un producto.
* **ConcreteBuilder**
  - Construye y ensambla partes del producto mediante implementación de la interface del Builder.
  - Define y realiza seguimiento de la representación que el mismo crea.
  - Provee una interface para obtener el producto.
* **Director**
  - Construye un objeto usando la Builder interface.
*  **Product**
   - Representa el objeto complejo en construcción, ConcreteBuilder construye la representación interna del producto y define el proceso por el que se ensambla.
   - Incluye clases que definen las partes que constituye, incluyendo interfaces para ensamblar las partes en el resultado final.

## Colaboraciones
  * El cliente crea el objeto Director y lo configura con el objeto Builder deseado.
  * El Director notifica al builder cada vez que una parte  del producto debe construirse.
  * el Builder gestiona las solicitudes del director y agrega las partes del producto.
  * El cliente recibe el producto del builder.

El siguiente diagrama de interacción ilustra como un Builder y Director cooperan con un Cliente.

<img src="./../img/interaction-builder.png">

## Practica en Swift

* Builder
 ```swift
 // En swift no existen las clases abstractas por lo cual se puede usar para este caso un protocolo
 // el problema de los protocolos es que nos obligan a sobrescribir todas las propiedades
 protocol TextConverter {
    func convertText(text:NSAttributedString)
 } 

 // Para este caso yo utilicé Herencia básica para no estar obligado a sobrescribir funciones que no se utilicen
class TextConverter {
    func convertText(text:NSAttributedString) { }
}
```
* Concrete Builders
 ```swift
 // Creé dos builders en concreto una para la conversión de RTF a texto ascii y otro para RTF a una representación
 // en SwiftUI.Text
 class ASCIIConverter: TextConverter {
    
    private var asciiText = String()
    
    override func convertText(text: NSAttributedString) {
        do {
            asciiText = try String(contentsOfFile: text.string, encoding: .ascii)
        } catch {
            print("Error to covert to ascii")
        }
    }
    
    func getASCIIText() -> String {
        return asciiText
    }
}

class SwiftUITextConverter: TextConverter {
    
    private var suText = Text(String())
    
    override func convertText(text:NSAttributedString) {
        let attributed = AttributedString(text)
        suText = Text(attributed)
    }
    
    func getText() -> Text {
        return suText
    }
}
```
* Director
```swift
// Este director en concreto es para leer un archivo RTF en el bundle de a app
class RTFReader {
    
    let converter:TextConverter
    init(converter: TextConverter) {
        self.converter = converter
    }
    
    func parseRTF(forResource resource: String) {
        if let rtfPath = Bundle.main.url(forResource: resource, withExtension: "rtf") {
            do {
                let attributedString = try NSAttributedString(url: rtfPath, options: [NSAttributedString.DocumentReadingOptionKey.documentType: NSAttributedString.DocumentType.rtf], documentAttributes: nil)
                converter.convertText(text: attributedString)
            } catch {
                print("\(error.localizedDescription)")
            }
        }
    }
}
```

* Client
```swift
// El cliente en este caso es la App de SwiftUI
var body: some Scene {
    WindowGroup {
        VStack{
            makeText()
        }
    }
}
    
func makeText() -> Text {
    // Crea el ConcreteBuilder deseado
    let converter = SwiftUITextConverter()
    // Crea el Director y le pasa el Builder
    let reader = RTFReader(converter: converter)
    // El cliente avisa a Director para empezar la construcción
    reader.parseRTF(forResource: "document")
    // El cliente recibe el producto
    return converter.getText()
}
```


## Consecuencias
Estas son algunas de las consecuencias del patron Builder:
  1. *Permite variar una representación interna del producto.* El objeto Builder provee el director con una interface abstracta para construir el producto. La interface permite al builder ocultar la representación y la estructura interna de el producto. Este también  oculta como el producto es ensamblado. Porque el producto es construido a través  una interface abstracta, Todo lo que se debe hacer para cambiar la representación interna del producto es definir un nuevo tipo de Builder.
  2. *Aísla el código para la construcción y representación.* El patron builder mejora la "modularidad" mediante la encapsulación  de la forma en que un objeto complejo es construido y representado. Los clientes no necesitan saber nada acerca de las clases que definen la estructura interna del producto; Tales clases no aparecen en la interface del Builder.
  Cada ConcreteBuilder contiene todo el código para crear y ensamblar un particular tipo de producto. El código es escrito una vez, luego diferentes Directors pueden reutilizarlo  para construir variantes del producto con las mismas partes.
  3. .*Te da un control más preciso sobre el proceso de construcción.* A diferencia de patrones de construcción que construyen productos en un solo llamado, el patron Builder construye paso a paso bajo e control de del Director. Solo cuando el producto es finalizado el director lo recupera del constructor. Esto permite un control preciso sobre el proceso de construcción y consecuentemente de la estructura interna del producto resultante.

## Implementación
Generalmente existe una clase builder abstracta que define una operación para cada componente que la capa de Director puede solicitar crear. Las operaciones no hacen algo por defecto. Una clase ConcreteBuilder sobrescribe operaciones para componentes ya que se interesa en la creación.

Estas son algunos errores en la implementación a considerar:

1. *Interface de ensamble y construcción.* los Builders construyen sus productos  paso a paso. Por lo tanto la interface de la clase Builder debe ser lo suficientemente general  para permitir la construcción de productos de todos los tipos de ConcreteBuilder.
Un error clave en ese diseño referente al modelo de construcción y ensamblado. Un modelo donde los resultados de solicitudes de construcción simplemente  dependen del producto es normalmente suficiente pero algunas veces se puede necesitar acceder a partes del producto construido tempranamente. En el siguiente ejemplo de laberinto(Maze example) se presenta en ejemplo de código, el MazeBuilder interface permite agregar una puerta(door) entre los cuartos existentes. Las estructuras de árbol son otro ejemplo de construcciones de abajo hacia arriba es decir se comienza de las partes mas pequeñas o elementos individuales y se construye la estructura mas completa gradualmente.

2. *¿Por qué no hay clases abstractas para productos?* En un caso común, los productos producidos por los builders en concreto difieren tanto en su representación que hay poca ganancia al dar a diferentes productos una clase principal en común.
3. *Métodos vacías por defecto en el Builder* En C++ los métodos son intencionalmente declarados como miembros y no como virtual methods(funciones abstractas) algo similar al ejemplo de la clase TextConverter en swift, la cual implementa funciones vacías, permitiendo a los clientes anular(override) sólo las operaciones que les interesan.




